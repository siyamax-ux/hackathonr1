import React, { useState } from 'react';
import GlassCard from '../components/GlassCard';
import Badge from '../components/Badge';
import Button from '../components/Button';
import { FaBookOpen, FaCheckDouble, FaDumbbell, FaMagic, FaSpinner } from 'react-icons/fa';
import axios from 'axios';
import { getApiUrl } from '../config/api';

const QuizRevision = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQuiz, setGeneratedQuiz] = useState(null);
  const [topic, setTopic] = useState("Recursion & Call Stack");

  const handleGenerateQuiz = async () => {
    setIsGenerating(true);
    setGeneratedQuiz(null);
    try {
      const res = await axios.post(getApiUrl('/api/copilot/generate-quiz'), {
        topic: topic
      });
      if (res.data.success) {
        // The backend returns stringified JSON in `rawQuiz`
        const parsedQuiz = JSON.parse(res.data.rawQuiz);
        setGeneratedQuiz(parsedQuiz);
      }
    } catch (err) {
      console.error("Failed to generate quiz", err);
      alert("Error generating quiz. Is backend running?");
    } finally {
      setIsGenerating(false);
    }
  };

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
            
            <div className="flex justify-center gap-4 mb-4">
              <input 
                type="text" 
                value={topic}
                onChange={e => setTopic(e.target.value)}
                className="bg-surface border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary w-full max-w-xs"
                placeholder="Topic (e.g. Recursion)"
              />
            </div>
            
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

            <Button onClick={handleGenerateQuiz} disabled={isGenerating} variant="primary" className="mx-auto" icon={isGenerating ? FaSpinner : FaCheckDouble}>
              {isGenerating ? "Generating..." : "Generate Quiz"}
            </Button>
            
            {generatedQuiz && (
              <div className="mt-8 text-left bg-surface p-4 rounded-xl border border-border shadow-sm">
                <h4 className="font-bold text-lg mb-4 text-primary">AI Generated Quiz</h4>
                <div className="space-y-4">
                  {generatedQuiz.map((q, idx) => (
                    <div key={idx} className="border-b border-border pb-4 last:border-0">
                      <p className="font-semibold mb-2">{idx + 1}. {q.question}</p>
                      <ul className="list-disc pl-5 mb-2 text-sm text-gray-600">
                        {q.options.map((opt, i) => <li key={i}>{opt}</li>)}
                      </ul>
                      <Badge variant="success">Ans: {q.answer}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default QuizRevision;
