import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [message, setMessage] = useState(null);


  useEffect(() => {
    // const socket = new WebSocket(`ws://localhost:8080/messages`);   
    const socket = new WebSocket(`ws://${window.location.host}/messages`);   
    socket.onmessage = function (message) {
      const p = JSON.parse(message.data);
      setMessage(p)
      console.log(p);
    };
    socket.onerror = function (err) {
      console.log('ws err:', err);
    };
    socket.onopen = function () {
      console.log('ws opened.');
      socket.send(JSON.stringify({
        type: 'TEST_CLIENT_EMIT',
        payload: {
          id: 1,
          name: 'fudge'
        }
      }));
    };

  }, []);


  const handleSendMessage = async () => {
    const request = {
      type: 'TEST_SERVER_EMIT',
      payload: {
        id: 1,
        name: 'fudge'
      }
    };

    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    };

    const response = await fetch('http://localhost:8080/message', init);

    if (response.status === 201) {
      console.log('good!')
    }
  };

  return (
    <div className="App">
      <button type="button" onClick={handleSendMessage}>Test Server Emit</button>
      {message && <div>{message.type}</div>}
    </div>
  );
}

export default App;
 