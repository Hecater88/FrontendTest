import React, { createContext, useEffect, useState, useRef } from 'react';
import './App.css';
import Header from "./components/Header/Header";
import RowDetails from "./components/RowDetails/Rowdetails";


export const DataContext = createContext(null);
var _ = require('lodash');

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [rebase, setRebase] = useState({});
  const [filter, setFilter] = useState({});
  const [sportType, setSportType] = useState(0);

  const ws = useRef(null);

  function updateObject(object, newValue, path) {
    if (typeof path === "string") {
      path = path.substring(1).replaceAll('/', '.');
    }
    _.set(object, path, newValue)
    setRebase({ ...object });
  }

  function removeObject(object, path) {
    if (typeof path === "string") {
      path = path.substring(1).replaceAll('/', '.');
    }
    _.unset(object, path)
    setRebase({ ...object });
  }


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
  },
    []
  )

  useEffect(() => {
    setIsLoading(true)
    if (!ws.current) return;
    ws.current.onmessage = function (event) {
      const json = JSON.parse(event.data);
      if ((json.type === 'rebase')) {
        const obj = json.data.events;
        setRebase({ ...obj });
        setFilter({ ...obj });
        setIsLoading(false);
      } else if ((json.type === 'update')) {
        const newRebase = { ...rebase }
        Object.keys(json.data).forEach(key => {
          if (json.data[key].op === "replace" || json.data[key].op === "add") {
            updateObject(newRebase, json.data[key].value, json.data[key].path)
            setRebase(newRebase);
          }
          if (json.data[key].op === "remove") {
            removeObject(newRebase, json.data[key].path);
          }
          setIsLoading(false)
        })
      } else {
        return;
      }
    };
  }, [rebase]);


  useEffect(() => {
    setIsLoading(true)
    const newRebase = { ...rebase }
    Object.keys(rebase).forEach(key => {
      if (rebase[key].sport === sportType) {
        newRebase[key] = rebase[key];
        setFilter(newRebase);
      } else if (sportType === 0) {
        setFilter({ ...rebase });
      }
      else {
        delete newRebase[key]
        setFilter(newRebase);
      }

      setIsLoading(false)
    })

  }, [sportType, rebase]);

  return (
    <>
      <DataContext.Provider value={{ sportType, setSportType }}>
        <div className="App">
          <Header />
          <div>
            {isLoading ?
              (<p>Cargando</p>) : (
                Object.keys(filter).length !== 0 ? (
                  Object?.keys(filter)?.map(key =>
                    <RowDetails key={key} 
                      name1={filter[key]?.teams?.away?.name} 
                      name2={filter[key]?.teams?.home?.name}
                      gamestatus={filter[key]?.status?.phase}
                      result={filter[key]?.current?.result}
                      values={filter[key]?._odds} />
                  )) : (<p>No hay eventos</p>))
            }
          </div>
        </div>
      </DataContext.Provider>
    </>
  );
}

export default App;
