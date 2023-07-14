import { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client, Stomp } from '@stomp/stompjs';
import './App.css';

function App() {

  const [message, setMessage] = useState(null);
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    let sock = new SockJS("http://localhost:8080/notify");
    const client = Stomp.over(sock);
    client.connect({}, (frame) => {
      client.subscribe('/topic/cohorts', (msg) => {
        const msgBody = JSON.parse(msg.body)
        console.log(msgBody)
        setMessage(msgBody);
      });

      client.send('/app/update-associate-assessment', {}, JSON.stringify({
        type: 'TEST_CLIENT_EMIT',
        payload: {
          id: 2,
          name: 'fudge'
        }
      }));
    });

    setStompClient(client);

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
      <button type="button" onClick={handleSendMessage}>Send</button>
      {message && <div>{message.type}</div>}
    </div>
  );
}

export default App;
 