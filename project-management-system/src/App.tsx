import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './features/dashboard/Dashboard';

import './App.css';

function App() {
  return (
    <div className="app-container">

      <Sidebar />

      <div className="main-container">

        <Header title="Project Management System" />

        <Dashboard />

      </div>

    </div>
  );
}

export default App;