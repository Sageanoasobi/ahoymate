import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Welcome } from './components/Welcome';
import { CreateAccount } from './components/auth/CreateAccount';
import { Login } from './components/auth/Login';
import { BoatSetup } from './components/boat/BoatSetup';
import { Dashboard } from './components/dashboard/Dashboard';
import { Maintenance } from './components/maintenance/Maintenance';
import { AIAssistant } from './components/assistant/AIAssistant';
import { useBoatStore } from './stores/boatStore';
import { useAuthStore } from './stores/authStore';

export function App() {
  const { boat } = useBoatStore();
  const { isAuthenticated } = useAuthStore();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/setup" 
          element={
            isAuthenticated ? <BoatSetup /> : <Navigate to="/login" replace />
          } 
        />
        <Route 
          element={
            isAuthenticated ? <Layout /> : <Navigate to="/login" replace />
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/assistant" element={<AIAssistant />} />
        </Route>
        <Route path="*" element={
          <Navigate to={isAuthenticated ? (boat ? "/dashboard" : "/setup") : "/"} replace />
        } />
      </Routes>
    </Router>
  );
}