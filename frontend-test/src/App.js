import React, { createContext, useEffect, useState, useRef } from 'react';
import './App.css';

import Header from "./components/Header/Header";


export const DataContext = createContext(null);

function deleteItemObject(object, path) {
  console.log("object", object)
  path = path.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
  path = path.replace(/^\./, '');           // strip a leading dot
  var stack = path.split('/').filter(el => el !== '');

  console.log("stack", stack);
  for (var i = 0, n = stack.length; i < n; ++i) {
    console.log("stack[i]", stack[i])
    var k = stack[i];
    if (k in object) {
      console.log("entra if");
      object = object[k];
      
    } else {
      return;
    }
    return _.get(object);
  }
  
  /* delete object[stack.shift()] */

}

function updateObject(object, newValue, path) {

  var stack = path.split('/');

  while (stack.length > 1) {
    object = object[stack.shift()];
  }

  object[stack.shift()] = newValue;

}

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
          if (json.data[key].op === "remove") {
            console.log("path", json.data[key].path);
            console.log("newRebase", newRebase)
            console.log("deteted",deleteItemObject(newRebase, json.data[key].path));
            setRebase(newRebase);
          } /* else if (rebase[key].op === "replace") {
            console.log("entra replace");
            updateObject(newRebase, rebase[key].value, rebase[key].op.path)
            setRebase(newRebase);
          }
          else if (rebase[key].op === "add") {
            console.log("add");
            updateObject(newRebase, rebase[key].value, rebase[key].op.path)
            setRebase(newRebase);
          } */

          setIsLoading(false)
        })
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
                    <p key={key}>{filter[key]?.name}</p>
                  )) : (<p>No hay eventos</p>))
            }
          </div>
        </div>
      </DataContext.Provider>
    </>
  );
}

export default App;
