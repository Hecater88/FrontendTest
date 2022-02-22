import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
/* import { SocketContext, socket } from './context/socket'; */



function App() {
  const [bids, setBids] = useState();
  const socket = new WebSocket('wss://unified-live.betfire.com/test/ws/live-feed?lang=en');

  // Abre la conexión
  socket.addEventListener('open', function (event) {
    socket.send('{"type":"login","data":{"lang":"en","skin":"api-new.betbuq.com"}}');
    socket.send('{"type":"menu"}');
  });

  // Escucha por mensajes
  socket.addEventListener('message', function (event) {
    /* console.log('Message from server', event.data); */
    const json = JSON.parse(event.data)
    console.log("json:", json["data"]);
    setBids(json.data.slice(0, 5));
  });

  const firstBids = bids?.map((item, i) => {
    return (
      <div key={i}>
        <p> {item.op}</p>
        <p> {item.path}</p>
      </div>
    );
  });
  return (
    //<SocketContext.Provider value={socket}>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        
      </header>
      <div>
      {firstBids}
      </div>
    </div>
    //</SocketContext.Provider>
  );
}

export default App;
