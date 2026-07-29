import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

// ⚠️ CHECK THIS LINE: If backend is running on another machine, 
// replace 'localhost' with your teammate's IP address (e.g. 'http://192.168.x.x:5000')
const socket = io('http://localhost:5000'); 

export default function StudentView() {
  const [currentTopic, setCurrentTopic] = useState("Recursion & Call Stack");

  useEffect(() => {
    // Listens for backend updates
    socket.on('state-update', (data) => {
      setCurrentTopic(data.currentTopic);
    });

    return () => socket.off('state-update');
  }, []);

  // Function called on button click
  const sendFeedback = (status) => {
    socket.emit('student-feedback', { status }); // Sends 'understood' | 'somewhat' | 'confused'
  };

  return (
    <div className="flex flex-col items-center p-6 text-gray-900 bg-white min-h-screen">
      <h2 className="text-xl font-bold mb-4">Topic: {currentTopic}</h2>
      <p className="mb-6 text-gray-600">How well do you understand right now?</p>
      <div className="flex gap-4">
        <button className="bg-green-100 hover:bg-green-200 p-4 rounded-xl font-bold" onClick={() => sendFeedback('understood')}>😊 Understood</button>
        <button className="bg-yellow-100 hover:bg-yellow-200 p-4 rounded-xl font-bold" onClick={() => sendFeedback('somewhat')}>😐 Somewhat</button>
        <button className="bg-red-100 hover:bg-red-200 p-4 rounded-xl font-bold" onClick={() => sendFeedback('confused')}>😕 Confused</button>
      </div>
    </div>
  );
}
