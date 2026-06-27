import React, { useEffect } from 'react';

function NotificationPopup({ message, onClose }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: '#d4edda',
      color: '#155724',
      padding: '15px 30px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      fontWeight: '600',
      zIndex: 10000,
      minWidth: '300px',
      textAlign: 'center',
    }}>
      {message}
    </div>
  );
}

export default NotificationPopup;
