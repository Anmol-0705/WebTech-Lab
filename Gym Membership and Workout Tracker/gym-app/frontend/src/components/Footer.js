import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-5 text-center mb-3">
      <small>&copy; {new Date().getFullYear()} GymApp. All rights reserved.</small>
    </footer>
  );
}
