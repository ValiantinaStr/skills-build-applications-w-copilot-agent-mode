import { useEffect, useState } from 'react';

const apiEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const response = await fetch(apiEndpoint);
        const data = await response.json();
        const leaderboardList = Array.isArray(data) ? data : data.leaderboard ?? data.results ?? [];
        setLeaderboard(leaderboardList);
      } catch (err) {
        setError(err.message || 'Could not load leaderboard.');
      }
    };

    loadLeaderboard();
  }, []);

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Leaderboard</h2>
        {leaderboard.length === 0 ? (
          <p className="text-muted mb-0">Leaderboard is empty.</p>
        ) : (
          <div className="list-group">
            {leaderboard.map((entry) => (
              <div key={entry._id || entry.username || entry.rank} className="list-group-item">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>#{entry.rank || 1} {entry.username}</strong>
                    <div className="text-muted small">{entry.badge || 'Top performer'}</div>
                  </div>
                  <span className="badge bg-warning text-dark">{entry.score || 0}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;
