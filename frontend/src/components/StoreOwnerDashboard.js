import React, { useEffect, useState } from 'react';

function StoreOwnerDashboard() {
  const [data, setData] = useState(null);

  const fetchRatings = async () => {
    const res = await fetch('http://localhost:5000/api/owner/ratings', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const json = await res.json();
    setData(json);
  };

  useEffect(() => {
    fetchRatings();
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h2>{data.storeName}</h2>
      <p>Average Rating: {data.averageRating}</p>
      <h3>User Ratings:</h3>
      <ul>
  {Array.isArray(data.ratings) && data.ratings.length > 0 ? (
    data.ratings.map((r, i) => (
      <li key={i}>
        <strong>{r.userName}</strong> ({r.userEmail}) - ⭐ {r.rating}
      </li>
    ))
  ) : (
    <li>No ratings found.</li>
  )}
</ul>

    </div>
  );
}

export default StoreOwnerDashboard;
