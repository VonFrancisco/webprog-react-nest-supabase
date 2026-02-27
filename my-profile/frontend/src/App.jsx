import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import './App.css';

function App() {
  const [entries, setEntries] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchEntries = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('guestbook')
      .select('*')
      .order('inserted_at', { ascending: false });
    if (error) console.error(error.message);
    else setEntries(data);
    setLoading(false);
  };

  const addEntry = async (e) => {
    e.preventDefault();
    if (!name || !message) return;
    setLoading(true);
    const { error } = await supabase
      .from('guestbook')
      .insert([{ name, message }]);
    if (error) {
      console.error(error.message);
    } else {
      setName('');
      setMessage('');
      fetchEntries();
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <div className="App" style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1>Guestbook</h1>
      <form onSubmit={addEntry} style={{ marginBottom: 20 }}>
        <div>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Sign'}
        </button>
      </form>
      {loading && <p>Loading...</p>}
      <ul>
        {entries.map((entry) => (
          <li key={entry.id} style={{ marginBottom: 10 }}>
            <strong>{entry.name}</strong>: {entry.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
