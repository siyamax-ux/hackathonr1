import React from 'react';
import GlassCard from '../components/GlassCard';
import Badge from '../components/Badge';
import mockData from '../data/mock.json';
import { FaExclamationTriangle, FaCheckCircle, FaSearch, FaFilter } from 'react-icons/fa';

const StudentRiskAnalysis = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Student Risk Analysis</h2>
          <p className="text-muted">AI predictions based on recent classroom performance</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input 
              type="text" 
              placeholder="Search students..." 
              className="bg-surface border border-border rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <button className="p-2 bg-surface border border-border rounded-xl hover:bg-gray-100 transition-colors">
            <FaFilter />
          </button>
        </div>
      </div>

      <GlassCard className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border text-muted text-sm">
              <th className="py-4 px-6 font-semibold">Student Name</th>
              <th className="py-4 px-6 font-semibold">Confidence Score</th>
              <th className="py-4 px-6 font-semibold">Weak Topics</th>
              <th className="py-4 px-6 font-semibold">Predicted Attention</th>
              <th className="py-4 px-6 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockData.students.map((student) => (
              <tr key={student.id} className="border-b border-border hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6 font-medium">{student.name}</td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-surfaceLight rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${student.confidence > 70 ? 'bg-success' : student.confidence > 40 ? 'bg-warning' : 'bg-danger'}`}
                        style={{ width: `${student.confidence}%` }}
                      ></div>
                    </div>
                    <span className="text-sm">{student.confidence}%</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-sm">
                  {student.weakTopic !== 'None' ? (
                    <Badge variant="danger">{student.weakTopic}</Badge>
                  ) : (
                    <span className="text-muted">-</span>
                  )}
                </td>
                <td className="py-4 px-6 text-sm">{student.attention}</td>
                <td className="py-4 px-6">
                  {student.status === 'Good' && <Badge variant="success" className="flex items-center gap-1 w-fit"><FaCheckCircle/> Good</Badge>}
                  {student.status === 'Needs Attention' && <Badge variant="warning" className="flex items-center gap-1 w-fit"><FaExclamationTriangle/> Attention</Badge>}
                  {student.status === 'Critical' && <Badge variant="danger" className="flex items-center gap-1 w-fit"><FaExclamationTriangle/> Critical</Badge>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>
    </div>
  );
};

export default StudentRiskAnalysis;
