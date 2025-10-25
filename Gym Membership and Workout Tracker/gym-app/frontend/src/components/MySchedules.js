import React, { useEffect, useState } from 'react';
import API from '../api';

export default function MySchedules({ user, reloadKey = 0 }) {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    const userId = user.id || user._id;
    if (!userId) {
      setSchedules([]);
      setLoading(false);
      return;
    }

    API.get(`/schedules/user/${userId}`)
      .then(res => { if (mounted) setSchedules(res.data || []); })
      .catch(err => { console.error(err); if (mounted) setSchedules([]); })
      .finally(() => { if (mounted) setLoading(false); });

    return () => { mounted = false; };
  }, [user, reloadKey]); // note dependency on reloadKey

  if (loading) return <p>Loading your schedules...</p>;
  if (!schedules.length) return <p>You have no scheduled workouts yet.</p>;

  return (
    <div>
      <h5>My Scheduled Workouts</h5>
      <div className="list-group">
        {schedules.map(s => {
          const date = new Date(s.date);
          const workout = s.workout || {};
          const trainer = s.trainer ? (s.trainer.name || s.trainer) : 'N/A';
          return (
            <div key={s._id} className="list-group-item">
              <div className="d-flex justify-content-between">
                <div>
                  <strong>{workout.title || 'Unnamed workout'}</strong>
                  <div><small>{workout.description}</small></div>
                  <div className="text-muted"><small>Trainer: {trainer}</small></div>
                </div>
                <div className="text-end">
                  <div>{date.toLocaleDateString()}</div>
                  <div>{date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                </div>
              </div>
              {s.notes && <div className="mt-2"><small>Notes: {s.notes}</small></div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
