import { useEffect, useState } from 'react';

const apiEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const response = await fetch(apiEndpoint);
        const data = await response.json();
        const workoutsList = Array.isArray(data) ? data : data.workouts ?? data.results ?? [];
        setWorkouts(workoutsList);
      } catch (err) {
        setError(err.message || 'Could not load workouts.');
      }
    };

    loadWorkouts();
  }, []);

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Workouts</h2>
        {workouts.length === 0 ? (
          <p className="text-muted mb-0">No workouts available.</p>
        ) : (
          <div className="list-group">
            {workouts.map((workout) => (
              <div key={workout._id || workout.id || workout.name} className="list-group-item">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{workout.name}</strong>
                    <div className="text-muted small">{workout.category}</div>
                  </div>
                  <span className="badge bg-info text-dark">{workout.durationMinutes} min</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Workouts;
