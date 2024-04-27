import React from 'react';
import { Card } from 'react-bootstrap';

/**
 * The About component provides information about the crypto loan platform.
 * It includes a brief description of what the platform is and how it can be used.
 */
const About = () => {
  return (
    <Card>
      <Card.Header as="h5">About Crypto Loan Platform</Card.Header>
      <Card.Body>
        <Card.Title>Welcome to the Crypto Loan Platform!</Card.Title>
        <Card.Text>
          This platform allows users to take out and repay loans in cryptocurrency. Using blockchain technology,
          we ensure that all transactions are secure and transparent. Users can request loans by providing a
          collateral amount in ETH, and loans must be repaid within the set duration to avoid penalties.
        </Card.Text>
        <Card.Text>
          Our platform utilizes smart contracts to manage all loan operations automatically without the need
          for intermediaries. This approach enhances the efficiency, security, and trustworthiness of financial
          transactions in the digital age.
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default About;
