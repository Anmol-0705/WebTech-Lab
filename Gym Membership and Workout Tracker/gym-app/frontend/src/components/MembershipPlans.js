import React from 'react';

export default function MembershipPlans({ plans = [] }) {
  if (!plans.length) {
    return <p>No plans available at the moment.</p>;
  }

  return (
    <div className="list-group">
      {plans.map(p => (
        <div key={p._id} className="list-group-item">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h6 className="mb-1">{p.name}</h6>
              <small>{p.description}</small>
            </div>
            <div className="text-end">
              <div><strong>${p.price}</strong></div>
              <small>{p.durationDays} days</small>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}