import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

/**
 * Represents a navigation bar for the application.
 * It renders links for navigating different parts of the application.
 * Utilizes Bootstrap's Navbar and Nav components for styling and responsiveness.
 */
const AppNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/">Crypto Loan Platform</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/loans">Loans</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavbar;
