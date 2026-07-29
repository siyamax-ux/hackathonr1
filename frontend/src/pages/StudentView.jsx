import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import GlassCard from '../components/GlassCard';

// Initialize socket outside component to avoid reconnects on re-render
const socket = io('http://localhost:5000');

export default function StudentView() {
  const [currentTopic, setCurrentTopic] = useState("Recursion & Call Stack");

  const sendFeedback = (status) => {
    // status = 'understood' | 'somewhat' | 'confused'
    socket.emit('student-feedback', { status });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 text-foreground">
      <GlassCard className="w-full max-w-md text-center p-10">
        <h2 className="text-2xl font-bold mb-4">Topic: <span className="text-primary">{currentTopic}</span></h2>
        <p className="mb-8 text-muted">How well do you understand right now?</p>
        
        <div className="flex justify-center gap-6">
          <button 
            onClick={() => sendFeedback('understood')} 
            className="bg-success/20 hover:bg-success/40 border border-success/30 transition-all p-6 rounded-2xl text-4xl hover:scale-110 active:scale-95"
            title="Understood"
          >
            😊
          </button>
          <button 
            onClick={() => sendFeedback('somewhat')} 
            className="bg-warning/20 hover:bg-warning/40 border border-warning/30 transition-all p-6 rounded-2xl text-4xl hover:scale-110 active:scale-95"
            title="Somewhat"
          >
            😐
          </button>
          <button 
            onClick={() => sendFeedback('confused')} 
            className="bg-danger/20 hover:bg-danger/40 border border-danger/30 transition-all p-6 rounded-2xl text-4xl hover:scale-110 active:scale-95"
            title="Confused"
          >
            😵
          </button>
        </div>
      </GlassCard>
    </div>
  );
}
