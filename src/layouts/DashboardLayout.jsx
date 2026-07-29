import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaGraduationCap, FaChartPie, FaChalkboardTeacher, 
  FaRobot, FaRegBell, FaBars, FaTimes 
} from 'react-icons/fa';
import Avatar from '../components/Avatar';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const links = [
    { name: 'Overview', path: '/dashboard', icon: FaChartPie },
    { name: 'Live Classroom', path: '/classroom/1', icon: FaChalkboardTeacher },
    { name: 'AI Insights', path: '/insights', icon: FaRobot },
    { name: 'Risk Analysis', path: '/risk-analysis', icon: FaChartPie },
    { name: 'Quizzes & Revision', path: '/quiz-revision', icon: FaGraduationCap },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex overflow-hidden">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 260, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="flex-shrink-0 bg-surface backdrop-blur-xl border-r border-border h-screen flex flex-col z-20"
          >
            <div className="p-6 flex items-center justify-between">
              <Link to="/dashboard" className="flex items-center gap-2 text-xl font-bold truncate">
                <FaGraduationCap className="text-primary text-2xl flex-shrink-0" />
                <span>Class<span className="text-secondary">Mind</span></span>
              </Link>
            </div>
            
            <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
              <p className="px-4 text-xs font-semibold text-muted uppercase tracking-wider mb-4">Menu</p>
              {links.map((link) => {
                const isActive = location.pathname.includes(link.path.split('/')[1]);
                return (
                  <Link 
                    key={link.name} 
                    to={link.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive 
                        ? 'bg-gradient-to-r from-primary/20 to-primary/5 text-primary border border-primary/20' 
                        : 'text-muted hover:text-foreground hover:bg-gray-50'
                    }`}
                  >
                    <link.icon className={isActive ? "text-primary" : ""} />
                    <span className="font-medium whitespace-nowrap">{link.name}</span>
                  </Link>
                );
              })}
            </div>

            <div className="p-4 border-t border-border">
              <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                <Avatar name="Teacher Pro" />
                <div className="truncate">
                  <p className="text-sm font-semibold truncate">Dr. Smith</p>
                  <p className="text-xs text-muted truncate">Computer Science</p>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-20 glass-panel rounded-none border-b border-border flex items-center justify-between px-6 z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg bg-surface hover:bg-surfaceLight transition-colors"
            >
              <FaBars />
            </button>
            <h2 className="text-xl font-semibold capitalize hidden sm:block">
              {location.pathname.split('/')[1] || 'Dashboard'}
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
              <FaRegBell className="text-xl" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-danger rounded-full border-2 border-background"></span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 relative">
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/5 blur-[150px] rounded-full pointer-events-none"></div>
          
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 max-w-7xl mx-auto h-full"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
