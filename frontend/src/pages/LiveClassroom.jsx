import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSmile, FaMeh, FaFrown, FaUserSecret, FaMagic, FaSync } from 'react-icons/fa';
import GlassCard from '../components/GlassCard';
import Badge from '../components/Badge';
import Button from '../components/Button';
import mockData from '../data/mock.json';
import { io } from 'socket.io-client';
import axios from 'axios';
import { getApiUrl, getSocketUrl } from '../config/api';

const socket = io(getSocketUrl());

const LiveClassroom = () => {
  const [data, setData] = useState(null);
  const [liveState, setLiveState] = useState({
    currentTopic: "Recursion & Call Stack",
    feedbackCounts: { understood: 0, somewhat: 0, confused: 0 },
    totalStudents: 0
  });
  const [aiAdvice, setAiAdvice] = useState("");
  const [isFetchingAdvice, setIsFetchingAdvice] = useState(false);
  const [newTopicInput, setNewTopicInput] = useState("");

  useEffect(() => {
    setData(mockData);

    socket.on('state-update', (state) => {
      setLiveState(state);
    });

    return () => {
      socket.off('state-update');
    };
  }, []);

  const handleResetTopic = () => {
    if (newTopicInput.trim()) {
      socket.emit('reset-topic', newTopicInput);
      setNewTopicInput("");
      setAiAdvice("");
    }
  };

  const fetchAiAdvice = async () => {
    setIsFetchingAdvice(true);
    try {
      const res = await axios.post(getApiUrl('/api/copilot/analyze'), {
        topic: liveState.currentTopic,
        counts: liveState.feedbackCounts
      });
      if (res.data.success) {
        setAiAdvice(res.data.aiAdvice);
      }
    } catch (err) {
      console.error("Failed to fetch AI advice:", err);
      setAiAdvice("AI Service temporarily unavailable.");
    } finally {
      setIsFetchingAdvice(false);
    }
  };

  if (!data) return null;

  // Calculate percentages safely
  const total = liveState.totalStudents || 1; 
  const pUnderstood = Math.round((liveState.feedbackCounts.understood / total) * 100) || 0;
  const pSomewhat = Math.round((liveState.feedbackCounts.somewhat / total) * 100) || 0;
  const pConfused = Math.round((liveState.feedbackCounts.confused / total) * 100) || 0;


  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <GlassCard className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-surface to-primary/10 border-primary/30">
        <div>
          <Badge variant="primary" className="mb-2">LIVE CLASS</Badge>
          <h2 className="text-2xl font-bold">Data Structures & Algorithms</h2>
          <p className="text-muted">Current Topic: <span className="text-foreground font-semibold">{liveState.currentTopic}</span></p>
        </div>
        <div className="flex gap-2 mb-2 md:mb-0">
          <input 
            type="text" 
            placeholder="New Topic..." 
            value={newTopicInput}
            onChange={(e) => setNewTopicInput(e.target.value)}
            className="bg-surface border border-border rounded-lg px-3 py-1 text-sm focus:outline-none focus:border-primary"
          />
          <button onClick={handleResetTopic} className="bg-primary/10 text-primary p-2 rounded-lg hover:bg-primary/20 transition-colors">
            <FaSync />
          </button>
        </div>
        <div className="flex gap-4">
          <div className="text-center">
            <p className="text-sm text-muted">Feedback Given</p>
            <p className="text-xl font-bold">{liveState.totalStudents}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted">Time Elapsed</p>
            <p className="text-xl font-bold text-secondary">45:20</p>
          </div>
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Confusion Meter */}
        <GlassCard className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Live Confusion Meter</h3>
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-danger opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-danger"></span>
            </span>
          </div>

          <div className="space-y-4">
            <MeterBar icon={FaSmile} color="bg-success" label={`Understood (${liveState.feedbackCounts.understood})`} percentage={pUnderstood} />
            <MeterBar icon={FaMeh} color="bg-warning" label={`Somewhat (${liveState.feedbackCounts.somewhat})`} percentage={pSomewhat} />
            <MeterBar icon={FaFrown} color="bg-danger" label={`Confused (${liveState.feedbackCounts.confused})`} percentage={pConfused} />
          </div>

          <div className="p-4 bg-surfaceLight/50 rounded-xl border border-border flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <p className="font-semibold text-primary">Live AI Co-Pilot Advice</p>
              </div>
              <Button onClick={fetchAiAdvice} disabled={isFetchingAdvice} variant="outline" className="py-1 px-3 text-xs bg-white">
                <FaMagic className="mr-1"/> {isFetchingAdvice ? "Analyzing..." : "Get Advice"}
              </Button>
            </div>
            <p className="text-sm text-gray-600">
              {aiAdvice || "Click 'Get Advice' to analyze the current confusion levels and get real-time recommendations on how to adjust your lecture."}
            </p>
          </div>
        </GlassCard>

        {/* AI Anonymous Question Generator */}
        <GlassCard className="flex flex-col h-[500px]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <FaUserSecret /> Anonymous Questions
            </h3>
            <Badge variant="primary">{data.anonymousQuestions.length} New</Badge>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {data.anonymousQuestions.map(q => (
              <div key={q.id} className="p-4 rounded-xl bg-surface border border-border space-y-3">
                <div className="flex justify-between">
                  <Badge variant="neutral">Student Entry</Badge>
                  {q.replied && <Badge variant="success">Replied</Badge>}
                </div>
                <p className="text-sm text-muted italic">"{q.original}"</p>
                
                <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
                  <p className="text-xs font-semibold text-primary mb-1">AI Translated Question:</p>
                  <p className="text-sm font-medium">{q.aiRewrite}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

const MeterBar = ({ icon: Icon, color, label, percentage }) => (
  <div>
    <div className="flex justify-between mb-1 text-sm font-medium">
      <span className="flex items-center gap-2"><Icon /> {label}</span>
      <span>{percentage}%</span>
    </div>
    <div className="w-full bg-surfaceLight rounded-full h-2.5 overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1, type: "spring" }}
        className={`h-2.5 rounded-full ${color}`}
      ></motion.div>
    </div>
  </div>
);

export default LiveClassroom;
