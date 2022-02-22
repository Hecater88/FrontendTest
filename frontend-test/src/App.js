import React, { createContext, useEffect, useState, useRef } from 'react';
import logo from './logo.svg';
import './App.css';

import Header from "./components/Header/Header";


export const DataContext = createContext(null);

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [rebase, setRebase] = useState({});
  const [filter, setFilter] = useState({});
  const [sportType, setSportType] = useState(0);

  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket('wss://unified-live.betfire.com/test/ws/live-feed?lang=en');
    ws.current.onopen = () => {
      ws.current.send('{"type":"login","data":{"lang":"en","skin":"api-new.betbuq.com"}}');
      ws.current.send('{"type":"menu"}');
    };
    const wsCurrent = ws.current;

    return () => {
      wsCurrent.close();
    };
    /*   ws.onmessage = function (event) {
        const json = JSON.parse(event.data);
        try {
          if ((json.type === 'rebase')) {
            console.log("Entra rebase")
            setRebase(
              {
                ...json.data.events,
              }
            );
            setFilter(
              {
                ...json.data.events,
              }
            );
            
          }
        } catch (err) {
          console.log(err);
        }
      }; */
  },
    []
  )

  useEffect(() => {
    if (!ws.current) return;
    ws.current.onmessage = function (event) {
      const json = JSON.parse(event.data);
      console.log("json",json)

      if ((json.type === 'rebase')) {
        const obj =json.data.events;
        console.log("Entra rebase")
        setRebase({...obj});
        setFilter({...obj});
      }
    };
  }, []);


  useEffect(() => {
    console.log("segundo useEffect", filter);
    const newRebase = {...rebase}
    Object.keys(rebase).forEach(key => {
      if (rebase[key].sport === sportType) {
        newRebase[key] = rebase[key];
        setFilter(newRebase);
      } else {
        delete newRebase[key]
        setFilter(newRebase);
      }

      setIsLoading(false)
    })
    console.log("newRebase",newRebase)
  }, [sportType]);
 
  console.log("filter",filter)

  return (
    <>
      <DataContext.Provider value={{ sportType, setSportType }}>
        <div className="App">
          <Header />
          <div>
            {
              !isLoading ? (
                Object?.keys(filter)?.map(key =>
                  <p key={key}>{filter[key]?.name}</p>
                )) : (<p>cargando</p>)
            }
          </div>
        </div>
      </DataContext.Provider>
    </>
  );
}

export default App;
