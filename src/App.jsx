import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import TeacherDashboard from './pages/TeacherDashboard'
import LiveClassroom from './pages/LiveClassroom'
import AIInsights from './pages/AIInsights'
import StudentRiskAnalysis from './pages/StudentRiskAnalysis'
import QuizRevision from './pages/QuizRevision'
import StudentView from './pages/StudentView'
import DashboardLayout from './layouts/DashboardLayout'
import PublicLayout from './layouts/PublicLayout'

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/student" element={<StudentView />} />
        </Route>
        
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<TeacherDashboard />} />
          <Route path="/classroom/:id" element={<LiveClassroom />} />
          <Route path="/insights" element={<AIInsights />} />
          <Route path="/risk-analysis" element={<StudentRiskAnalysis />} />
          <Route path="/quiz-revision" element={<QuizRevision />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
