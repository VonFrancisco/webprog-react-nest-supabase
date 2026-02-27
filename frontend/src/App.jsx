import { useEffect, useState } from 'react';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function App() {
  const [entries, setEntries] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function fetchEntries() {
    try {
      const res = await fetch(`${API_URL}/guestbook`);
      const data = await res.json();
      setEntries(data);
    } catch (err) {
      console.error('failed to load entries', err);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name || !message) return;
    setLoading(true);
    try {
      await fetch(`${API_URL}/guestbook`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message }),
      });
      setName('');
      setMessage('');
      await fetchEntries();
    } catch (err) {
      console.error('failed to post', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <div className="App" style={{ padding: '1rem', maxWidth: 600, margin: '0 auto' }}>
      <h1>Guestbook</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <div>
          <label>
            Name
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
          </label>
        </div>
        <div>
          <label>
            Message
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={loading}
            />
          </label>
        </div>
        <button type="submit" disabled={loading || !name || !message}>
          {loading ? 'Sending…' : 'Submit'}
        </button>
      </form>
      {entries.length === 0 ? (
        <p>No entries yet.</p>
      ) : (
        <ul>
          {entries.map((e) => (
            <li key={e.id} style={{ marginBottom: '0.5rem' }}>
              <strong>{e.name}</strong>: {e.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
