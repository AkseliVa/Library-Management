import React, { useEffect, useState } from 'react';
import api from './services/api';

const App: React.FC = () => {
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    api.get('/')
      .then(response => {
        setMessage(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
};

export default App;
