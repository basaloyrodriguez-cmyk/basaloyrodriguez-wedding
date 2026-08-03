import React, { createContext, useContext, useState, useEffect } from 'react';

const GuestContext = createContext();

export function GuestProvider({ children }) {
  const [guest, setGuest] = useState(() => {
    try {
      const saved = sessionStorage.getItem('wedding_guest');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [companions, setCompanions] = useState(() => {
    try {
      const saved = sessionStorage.getItem('wedding_companions');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [specialMessage, setSpecialMessage] = useState(() => {
    try {
      const saved = sessionStorage.getItem('wedding_special_message');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const loginGuest = (guestRecord, companionList = [], messageRecord = null) => {
    setGuest(guestRecord);
    setCompanions(companionList);
    setSpecialMessage(messageRecord);

    try {
      sessionStorage.setItem('wedding_guest', JSON.stringify(guestRecord));
      sessionStorage.setItem('wedding_companions', JSON.stringify(companionList));
      sessionStorage.setItem('wedding_special_message', JSON.stringify(messageRecord));
    } catch (e) {
      console.error('Error saving guest session', e);
    }
  };

  const logout = () => {
    setGuest(null);
    setCompanions([]);
    setSpecialMessage(null);
    try {
      sessionStorage.removeItem('wedding_guest');
      sessionStorage.removeItem('wedding_companions');
      sessionStorage.removeItem('wedding_special_message');
    } catch (e) {
      console.error('Error clearing guest session', e);
    }
  };

  return (
    <GuestContext.Provider value={{ guest, companions, specialMessage, loginGuest, logout, setSpecialMessage }}>
      {children}
    </GuestContext.Provider>
  );
}

export function useGuest() {
  const context = useContext(GuestContext);
  if (!context) {
    throw new Error('useGuest must be used within a GuestProvider');
  }
  return context;
}
