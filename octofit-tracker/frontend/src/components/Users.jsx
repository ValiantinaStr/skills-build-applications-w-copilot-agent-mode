import { useEffect, useState } from 'react';

const apiEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetch(apiEndpoint);
        const data = await response.json();
        const usersList = Array.isArray(data) ? data : data.users ?? data.results ?? [];
        setUsers(usersList);
      } catch (err) {
        setError(err.message || 'Could not load users.');
      }
    };

    loadUsers();
  }, []);

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Users</h2>
        {users.length === 0 ? (
          <p className="text-muted mb-0">No users available.</p>
        ) : (
          <div className="list-group">
            {users.map((user) => (
              <div key={user._id || user.id || user.username} className="list-group-item">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{user.name || user.username}</strong>
                    <div className="text-muted small">{user.email || user.username}</div>
                  </div>
                  <span className="badge bg-primary">{user.team || 'Unassigned'}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Users;
