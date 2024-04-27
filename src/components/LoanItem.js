import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { repayLoan } from '../redux/loanSlice';
import { Button, ListGroupItem, Spinner, Alert } from 'react-bootstrap';

/**
 * LoanItem component displays details of a single loan and provides an interface for loan repayment.
 * @param {object} props - The props containing loan details.
 */
const LoanItem = ({ loan }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /**
   * Initiates the repayment of a loan.
   * Dispatches the repayLoan action with the loan's ID and amount.
   */
  const handleRepayment = async () => {
    setLoading(true);
    setError('');
    try {
      await dispatch(repayLoan({ loanId: loan.id, amount: loan.amount }));
    } catch (error) {
      console.error("Repayment failed:", error);
      setError("Failed to repay loan: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ListGroupItem>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h5>Loan ID: {loan.id}</h5>
          <p>Borrower: {loan.borrower}</p>
          <p>Amount: {loan.amount} ETH</p>
          <p>Due Date: {new Date(loan.dueDate).toLocaleDateString()}</p>
          <p>{loan.isRepaid ? "Repaid" : "Not Repaid"}</p>
        </div>
        {!loan.isRepaid && (
          <Button variant="primary" onClick={handleRepayment} disabled={loading}>
            {loading ? <Spinner as="span" animation="border" size="sm" /> : "Repay Loan"}
          </Button>
        )}
      </div>
      {error && <Alert variant="danger">{error}</Alert>}
    </ListGroupItem>
  );
};

export default LoanItem;
