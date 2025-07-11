import React, { useEffect, useState } from 'react';

function UserDashboard() {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState('');

  const fetchStores = async () => {
    const res = await fetch('http://localhost:5000/api/user/stores', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    const data = await res.json();
    setStores(data);
  };

  useEffect(() => { fetchStores(); }, []);

  const submitRating = async (storeId, rating) => {
    await fetch('http://localhost:5000/api/user/rate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ storeId, rating }),
    });
    fetchStores();
  };

  const filtered = stores.filter(store =>
    store.name.toLowerCase().includes(search.toLowerCase()) ||
    store.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Store Listings</h2>
      <input
        placeholder="Search by name or address"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <ul>
        {filtered.map(store => (
          <li key={store.id}>
            <h3>{store.name}</h3>
            <p>{store.address}</p>
            <p>Average Rating: {store.averageRating}</p>
            <p>Your Rating: {store.userRating ?? 'Not Rated'}</p>
            <select
              value={store.userRating || ''}
              onChange={e => submitRating(store.id, parseInt(e.target.value))}
            >
              <option value="">Rate</option>
              {[1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserDashboard;
