import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaGoogle, FaEnvelope } from 'react-icons/fa';
import Button from '../components/Button';
import GlassCard from '../components/GlassCard';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    // Mock Firebase login
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 relative">
      <GlassCard className="w-full max-w-md p-8 relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
          <p className="text-muted">Sign in to your ClassMind AI Dashboard</p>
        </div>

        <div className="space-y-4">
          <Button variant="secondary" className="w-full bg-gray-50 border-border" icon={FaGoogle} onClick={handleLogin}>
            Continue with Google
          </Button>
          
          <div className="relative flex items-center py-4">
            <div className="flex-grow border-t border-border"></div>
            <span className="flex-shrink-0 mx-4 text-muted text-sm">or</span>
            <div className="flex-grow border-t border-border"></div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted mb-1">Email Address</label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <input 
                  type="email" 
                  placeholder="teacher@school.edu" 
                  className="w-full bg-surface border border-border rounded-xl py-3 pl-10 pr-4 text-foreground focus:outline-none focus:border-primary transition-colors"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-muted mb-1">Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full bg-surface border border-border rounded-xl py-3 px-4 text-foreground focus:outline-none focus:border-primary transition-colors"
                required
              />
            </div>
            
            <Button type="submit" variant="primary" className="w-full mt-4">
              {loading ? 'Authenticating...' : 'Sign In'}
            </Button>
          </form>
        </div>
      </GlassCard>
    </div>
  );
};

export default Login;
