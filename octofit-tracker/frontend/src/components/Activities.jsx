import { useEffect, useState } from 'react';
import { buildApiUrl } from '../utils/api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const response = await fetch(buildApiUrl('activities'));
        const data = await response.json();
        const activitiesList = Array.isArray(data) ? data : data.activities ?? data.results ?? [];
        setActivities(activitiesList);
      } catch (err) {
        setError(err.message || 'Could not load activities.');
      }
    };

    loadActivities();
  }, []);

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Activities</h2>
        {activities.length === 0 ? (
          <p className="text-muted mb-0">No activities available.</p>
        ) : (
          <div className="list-group">
            {activities.map((activity) => (
              <div key={activity._id || activity.id || activity.date} className="list-group-item">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{activity.type}</strong>
                    <div className="text-muted small">{activity.user}</div>
                  </div>
                  <span className="badge bg-success">{activity.durationMinutes} min</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Activities;
