import { useEffect, useState } from 'react';

const apiEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const response = await fetch(apiEndpoint);
        const data = await response.json();
        const teamsList = Array.isArray(data) ? data : data.teams ?? data.results ?? [];
        setTeams(teamsList);
      } catch (err) {
        setError(err.message || 'Could not load teams.');
      }
    };

    loadTeams();
  }, []);

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Teams</h2>
        {teams.length === 0 ? (
          <p className="text-muted mb-0">No teams available.</p>
        ) : (
          <div className="list-group">
            {teams.map((team) => (
              <div key={team._id || team.id || team.name} className="list-group-item">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{team.name}</strong>
                    <div className="text-muted small">Captain: {team.captain}</div>
                  </div>
                  <span className="badge bg-secondary">{team.members?.length || 0} members</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Teams;
