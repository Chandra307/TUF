import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FormPage from './components/FormPage';
import TablePage from './components/TablePage';

function App() {
  return (
    <Router>
      <div style={{ textAlign: 'start', padding: '0px 20px' }}>
        <h1 style={{ fontFamily: 'Arial, sans-serif' }}>TakeMeForward</h1>
        <nav>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li style={{ display: 'inline', marginRight: '10px' }}>
              <Link to="/">Code</Link>
            </li>
            <li style={{ display: 'inline' }}>
              <Link to="/table">Submissions</Link>
            </li>
          </ul>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<FormPage />} />
        <Route path="/table" element={<TablePage />} />
      </Routes>
    </Router>
  );
}

export default App;
