import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FaUsers, FaLightbulb, FaBrain, FaExclamationTriangle } from 'react-icons/fa';
import GlassCard from '../components/GlassCard';
import mockData from '../data/mock.json';

const TeacherDashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simulate fetching data
    setData(mockData);
  }, []);

  if (!data) return <div className="p-8 text-center text-muted">Loading AI Insights...</div>;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={FaUsers} title="Active Classes" value={data.activeClasses} color="text-secondary" />
        <StatCard icon={FaBrain} title="Students Online" value={data.studentsOnline} color="text-primary" />
        <StatCard icon={FaLightbulb} title="Avg Understanding" value={`${data.avgUnderstanding}%`} color="text-success" />
        <StatCard icon={FaExclamationTriangle} title="AI Insights" value={data.aiInsights} color="text-warning" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <GlassCard className="h-96 flex flex-col">
            <h3 className="text-lg font-bold mb-4">Class Performance & Engagement</h3>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.classPerformance}>
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#06B6D4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                  <XAxis dataKey="time" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E5E7EB', borderRadius: '12px', color: '#111827' }} />
                  <Area type="monotone" dataKey="understanding" stroke="#4F46E5" fillOpacity={1} fill="url(#colorUv)" name="Understanding %" />
                  <Area type="monotone" dataKey="engagement" stroke="#06B6D4" fillOpacity={1} fill="url(#colorPv)" name="Engagement %" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>

        <div className="space-y-6">
          <GlassCard className="h-full flex flex-col relative overflow-hidden border border-primary/20">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <FaRobot className="text-primary" /> AI Recommendations
            </h3>
            
            <div className="space-y-4 overflow-y-auto pr-2">
              <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                <p className="text-sm font-semibold text-primary mb-1">Critical Insight</p>
                <p className="text-sm text-gray-600">20% of students are struggling with the concept of Recursion base cases.</p>
              </div>
              <div className="p-4 rounded-xl bg-warning/10 border border-warning/20">
                <p className="text-sm font-semibold text-warning mb-1">Attention Drop</p>
                <p className="text-sm text-gray-600">Engagement has dropped by 15% in the last 10 minutes. Consider an interactive poll.</p>
              </div>
              <div className="p-4 rounded-xl bg-success/10 border border-success/20">
                <p className="text-sm font-semibold text-success mb-1">Success Prediction</p>
                <p className="text-sm text-gray-600">Class average is predicted to be 85% for the upcoming quiz based on current metrics.</p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, title, value, color }) => (
  <GlassCard delay={0.1} className="flex items-center gap-4">
    <div className={`p-4 rounded-2xl bg-gray-50 border border-border ${color}`}>
      <Icon className="text-2xl" />
    </div>
    <div>
      <p className="text-sm text-muted font-medium">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </GlassCard>
);

export default TeacherDashboard;
