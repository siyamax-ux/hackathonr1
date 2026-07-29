import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import Badge from '../components/Badge';
import { FaFileAlt, FaBrain, FaUpload, FaSitemap } from 'react-icons/fa';

const AIInsights = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">AI Co-Pilot & Insights</h2>
        <p className="text-muted">Generate lecture summaries and visualize learning heatmaps.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <FaUpload /> Upload Lecture PPT/PDF
          </h3>
          <div className="border-2 border-dashed border-border rounded-2xl p-12 text-center hover:border-primary/50 transition-colors cursor-pointer bg-surface">
            <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-4 text-muted">
              <FaFileAlt className="text-2xl" />
            </div>
            <p className="font-semibold mb-1">Drag and drop your files here</p>
            <p className="text-sm text-muted mb-4">Supported files: PPTX, PDF, DOCX</p>
            <button className="px-6 py-2 rounded-xl bg-primary/20 text-primary font-semibold border border-primary/30 hover:bg-primary/30 transition-colors">
              Browse Files
            </button>
          </div>

          <div className="flex gap-2 border-b border-border pb-2">
            <button className="px-4 py-2 text-primary border-b-2 border-primary font-medium">Summary</button>
            <button className="px-4 py-2 text-muted font-medium">Flashcards</button>
            <button className="px-4 py-2 text-muted font-medium">Mind Map</button>
          </div>
          <div className="p-4 bg-surfaceLight/30 rounded-xl text-gray-600 text-sm leading-relaxed">
            Upload a document to let the AI automatically generate detailed summaries, flashcards, and conceptual mind maps.
          </div>
        </GlassCard>

        <GlassCard className="space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <FaSitemap /> Classroom Heatmap
          </h3>
          <div className="space-y-4">
            <HeatmapRow chapter="Chapter 1: Intro to CS" score={95} />
            <HeatmapRow chapter="Chapter 2: Arrays & Loops" score={85} />
            <HeatmapRow chapter="Chapter 3: Pointers" score={70} />
            <HeatmapRow chapter="Chapter 4: Recursion" score={45} />
            <HeatmapRow chapter="Chapter 5: Binary Trees" score={35} />
            <HeatmapRow chapter="Chapter 6: Graphs" score={20} />
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

const HeatmapRow = ({ chapter, score }) => {
  let color = 'bg-success';
  if (score < 75) color = 'bg-warning';
  if (score < 50) color = 'bg-danger';

  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="font-medium text-gray-600">{chapter}</span>
        <span className="font-bold">{score}%</span>
      </div>
      <div className="w-full h-3 bg-surfaceLight rounded-full overflow-hidden flex">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1 }}
          className={`h-full ${color}`}
        ></motion.div>
        <div className="flex-1 bg-surfaceLight opacity-50 patterned-bg"></div>
      </div>
    </div>
  );
};

export default AIInsights;
