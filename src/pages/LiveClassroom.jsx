import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSmile, FaMeh, FaFrown, FaUserSecret } from 'react-icons/fa';
import GlassCard from '../components/GlassCard';
import Badge from '../components/Badge';
import mockData from '../data/mock.json';

const LiveClassroom = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(mockData);
  }, []);

  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <GlassCard className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-surface to-primary/10 border-primary/30">
        <div>
          <Badge variant="primary" className="mb-2">LIVE CLASS</Badge>
          <h2 className="text-2xl font-bold">Data Structures & Algorithms</h2>
          <p className="text-muted">Current Topic: <span className="text-foreground font-semibold">{data.activeClasses > 0 ? "Binary Trees" : "Waiting for class to start"}</span></p>
        </div>
        <div className="flex gap-4">
          <div className="text-center">
            <p className="text-sm text-muted">Attendance</p>
            <p className="text-xl font-bold">{data.studentsOnline}/50</p>
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
            <MeterBar icon={FaSmile} color="bg-success" label="Understood" percentage={data.mood.engaged} />
            <MeterBar icon={FaMeh} color="bg-warning" label="Somewhat" percentage={data.mood.neutral} />
            <MeterBar icon={FaFrown} color="bg-danger" label="Confused" percentage={data.mood.distracted} />
          </div>

          <div className="p-4 bg-surfaceLight/50 rounded-xl border border-border flex gap-4">
            <div className="w-2 h-auto bg-primary rounded-full"></div>
            <div>
              <p className="font-semibold text-primary">AI Insight</p>
              <p className="text-sm text-gray-600">A significant portion of students are indicating confusion. Consider revisiting the definition of leaf nodes.</p>
            </div>
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
