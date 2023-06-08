import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/who')
      .then(response => {
        const { stats, images } = response.data;
        setData({ stats, images });
        console.log(response.data)
      })
      .catch(error => console.error(error));
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <p>
          {/* Message from server: {data} */}
        </p>
      </header>
    </div>
  );
}

export default App;
