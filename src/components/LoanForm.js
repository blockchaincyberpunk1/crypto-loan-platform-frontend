import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createLoan } from '../redux/loanSlice';
import { Button, Form, Alert } from 'react-bootstrap';

/**
 * LoanForm provides a user interface for creating new loans.
 * It includes a form where users can input the amount of ETH they wish to borrow.
 * This component dispatches a createLoan action to the Redux store and the blockchain.
 */
const LoanForm = () => {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  /**
   * Handles form submission for creating a new loan.
   * Dispatches the createLoan action with the amount to the Redux store.
   * Ensures the amount is a valid decimal before dispatching.
   * @param {React.FormEvent<HTMLFormElement>} event - The form submission event.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Convert amount to a float and check if it is a positive number
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError("Please enter a valid amount greater than 0.");
      return;
    }

    try {
      // Dispatch the createLoan action with the parsed amount
      await dispatch(createLoan({ amount: parsedAmount.toString() }));
      setAmount(''); // Reset the input field after dispatch
      setError(''); // Clear any errors
    } catch (error) {
      console.error("Failed to create loan:", error);
      setError("Failed to create loan: " + error.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Amount (ETH)</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="0.01"
          step="0.01"
        />
      </Form.Group>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button variant="primary" type="submit">
        Create Loan
      </Button>
    </Form>
  );
};

export default LoanForm;
