import React, { useEffect, useState } from 'react';
import API from '../api';

export default function WorkoutScheduler({ user, onScheduled }) {
  const [workouts, setWorkouts] = useState([]);
  const [workoutId, setWorkoutId] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    API.get('/workouts')
      .then(res => { if (mounted) setWorkouts(res.data || []); })
      .catch(() => { if (mounted) setWorkouts([]); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!workoutId || !dateTime) return alert('Please select a workout and date/time.');
    try {
      const userId = user.id || user._id;
      const payload = { user: userId, workout: workoutId, date: dateTime };
      const res = await API.post('/schedules', payload);
      alert('Workout scheduled!');
      // clear inputs
      setWorkoutId('');
      setDateTime('');
      // notify parent to refresh schedules
      if (typeof onScheduled === 'function') onScheduled(res.data);
    } catch (err) {
      alert(err.response?.data?.message || 'Error scheduling workout');
    }
  };

  return (
    <div className="card p-3">
      {loading ? <p>Loading workouts...</p> : (
        <>
          <form onSubmit={submit}>
            <div className="mb-2">
              <select className="form-select" value={workoutId} onChange={e => setWorkoutId(e.target.value)}>
                <option value="">-- Select workout --</option>
                {workouts.map(w => <option key={w._id} value={w._id}>{w.title}</option>)}
              </select>
            </div>

            <div className="mb-2">
              <input
                className="form-control"
                type="datetime-local"
                value={dateTime}
                onChange={e => setDateTime(e.target.value)}
              />
            </div>

            <button className="btn btn-primary" type="submit">Schedule Workout</button>
          </form>
        </>
      )}
    </div>
  );
}
