import React from 'react';
import GlassCard from '../components/GlassCard';
import Badge from '../components/Badge';
import Button from '../components/Button';
import { FaBookOpen, FaCheckDouble, FaDumbbell, FaMagic } from 'react-icons/fa';

const QuizRevision = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Personalized Revision & Quizzes</h2>
        <p className="text-muted">AI-generated materials based on classroom weak points.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <FaBookOpen className="text-secondary" /> Revision Paths
            </h3>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-surfaceLight/30 border border-border hover:border-secondary/30 transition-colors cursor-pointer">
              <div className="flex justify-between mb-2">
                <h4 className="font-semibold">Binary Trees Mastery</h4>
                <Badge variant="danger">High Priority</Badge>
              </div>
              <p className="text-sm text-muted mb-4">Focuses on traversals, insertions, and recursion.</p>
              <div className="flex gap-2">
                <Badge variant="neutral">Flashcards</Badge>
                <Badge variant="neutral">Visual Notes</Badge>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-surfaceLight/30 border border-border hover:border-secondary/30 transition-colors cursor-pointer">
              <div className="flex justify-between mb-2">
                <h4 className="font-semibold">Sorting Algorithms</h4>
                <Badge variant="warning">Medium Priority</Badge>
              </div>
              <p className="text-sm text-muted mb-4">QuickSort and MergeSort deep dive.</p>
              <div className="flex gap-2">
                <Badge variant="neutral">Practice Code</Badge>
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <FaDumbbell className="text-primary" /> Quiz Generator
            </h3>
          </div>
          
          <div className="p-6 text-center border-2 border-dashed border-primary/20 rounded-xl bg-primary/5">
            <div className="w-16 h-16 rounded-full bg-primary/20 text-primary flex items-center justify-center mx-auto mb-4">
              <FaMagic className="text-2xl" />
            </div>
            <h4 className="font-bold text-lg mb-2">Generate Smart Quiz</h4>
            <p className="text-sm text-muted mb-6">AI will instantly create MCQs and Coding questions targeting current class weaknesses.</p>
            
            <div className="flex justify-center gap-4 mb-6">
              <select className="bg-surface border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary">
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
                <option>Adaptive</option>
              </select>
              <select className="bg-surface border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary">
                <option>10 Questions</option>
                <option>20 Questions</option>
              </select>
            </div>

            <Button variant="primary" className="mx-auto" icon={FaCheckDouble}>
              Generate Quiz
            </Button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default QuizRevision;
