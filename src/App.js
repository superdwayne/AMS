import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/who')
      .then(response => setMessage(response.data.message))
      .catch(error => console.error(error));
      console.log(message)
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Message from server: {message}
        </p>
      </header>
    </div>
  );
}

export default App;
