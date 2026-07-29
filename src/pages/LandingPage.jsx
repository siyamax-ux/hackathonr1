import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { FaPlay, FaBrain, FaChartLine, FaRobot } from 'react-icons/fa';

const LandingPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="min-h-[80vh] flex items-center justify-center px-6 pt-20">
        <motion.div 
          className="max-w-4xl mx-auto text-center z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="inline-block mb-6 px-4 py-1.5 rounded-full border border-border bg-gray-50 backdrop-blur-md text-sm text-secondary font-medium tracking-wide">
            Introducing ClassMind AI v1.0
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight"
          >
            AI That Understands the Classroom <br />
            <span className="text-gradient">Before Exams Do.</span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-muted mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Real-time classroom intelligence helping teachers identify confusion, engagement, and learning gaps instantly without replacing the human touch.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/dashboard">
              <Button variant="primary" className="w-full sm:w-auto px-8 py-4 text-lg">
                Start Teaching
              </Button>
            </Link>
            <Link to="/classroom/demo">
              <Button variant="secondary" className="w-full sm:w-auto px-8 py-4 text-lg" icon={FaPlay}>
                Join Classroom Demo
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Supercharge your Teaching</h2>
            <p className="text-muted max-w-2xl mx-auto">Our AI Co-Pilot works silently in the background, analyzing interactions and providing actionable insights.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={FaBrain}
              title="Live Confusion Meter"
              desc="Instantly know when students are lost. Our AI analyzes anonymous feedback to gauge topic understanding in real-time."
            />
            <FeatureCard 
              icon={FaRobot}
              title="AI Question Generator"
              desc="Students type 'I don't understand this' and AI converts it into a specific, actionable question for the teacher."
            />
            <FeatureCard 
              icon={FaChartLine}
              title="Risk Analysis"
              desc="Predict which students might struggle in upcoming exams based on interaction data and quiz performances."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, desc }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="glass-card p-8 group cursor-pointer"
  >
    <div className="w-14 h-14 rounded-2xl bg-primary/20 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      <Icon className="text-2xl" />
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-muted leading-relaxed">{desc}</p>
  </motion.div>
);

export default LandingPage;
