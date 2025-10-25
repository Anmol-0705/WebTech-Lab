import React, { useEffect, useState } from 'react';
import API from '../api';
import MembershipPlans from './MembershipPlans';
import WorkoutScheduler from './WorkoutScheduler';
import MySchedules from './MySchedules';

export default function Dashboard({ user }) {
  const [plans, setPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(true);

  // key used to trigger reload of MySchedules
  const [schedulesReloadKey, setSchedulesReloadKey] = useState(0);

  useEffect(() => {
    let mounted = true;
    setLoadingPlans(true);
    API.get('/plans')
      .then(res => { if (mounted) setPlans(res.data || []); })
      .catch(() => { if (mounted) setPlans([]); })
      .finally(() => { if (mounted) setLoadingPlans(false); });

    return () => { mounted = false; };
  }, []);

  // handler passed to WorkoutScheduler - increment the key to trigger reload
  const handleScheduled = () => {
    setSchedulesReloadKey(k => k + 1);
  };

  return (
    <div>
      <h3>Welcome, {user.name}</h3>

      <div className="row mt-3">
        <div className="col-md-4 mb-3">
          <h5>Membership Plans</h5>
          {loadingPlans ? <p>Loading plans...</p> : <MembershipPlans plans={plans} />}
        </div>

        <div className="col-md-4 mb-3">
          <h5>Schedule a Workout</h5>
          <WorkoutScheduler user={user} onScheduled={handleScheduled} />
        </div>

        <div className="col-md-4 mb-3">
          <MySchedules user={user} reloadKey={schedulesReloadKey} />
        </div>
      </div>
    </div>
  );
}
