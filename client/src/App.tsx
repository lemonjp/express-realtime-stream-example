//import React from 'react';
import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const [data,setData] = useState<any>([]);

  useEffect(() => {
    // An instance of EventSource by passing the events URL
    const eventSource = new EventSource('http://localhost:4000/events');

    // A function to parse and update the data state
    const updateData = (messageEvent: MessageEvent) => {
      const parsedData = JSON.parse(messageEvent.data);
      setData((data: any) => [...data, parsedData]);
      if (parsedData.id === 9) {
        eventSource.close();
      }
    };

    // eventSource now listening to all the events named 'message'
    eventSource.addEventListener('message', updateData);

    // Unsubscribing to the event stream when the component is unmounted
    return () => eventSource.close();
  }, []);

  return (
    <div>
      <ul>
        {data.map((_: any) => (
          <li>{_.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
