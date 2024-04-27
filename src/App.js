import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppNavbar from './components/Navbar';
import LoanList from './components/LoanList';
import LoanForm from './components/LoanForm';
import About from './components/About';
import { Container } from 'react-bootstrap';

const App = () => {
  return (
    <Router>
      <AppNavbar />
      <Container style={{ marginTop: '20px' }}>
        <Routes>
          <Route path="/" element={<LoanList />} />
          <Route path="/loans" element={<LoanForm />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<h1>404: Page Not Found</h1>} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
