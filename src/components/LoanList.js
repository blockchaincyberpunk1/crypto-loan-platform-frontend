import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllLoans } from '../redux/loanSlice';
import LoanItem from './LoanItem';
import { Alert, ListGroup, Button, Spinner } from 'react-bootstrap';

/**
 * LoanList component displays a list of all loans.
 * It subscribes to the loan slice of the Redux store to receive updates about the loan state.
 * Each loan is displayed using the LoanItem component.
 */
const LoanList = () => {
  const dispatch = useDispatch();
  const { loans, error, status } = useSelector(state => state.loans);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllLoans());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <Spinner animation="border" />;
  }

  if (error) {
    return (
      <Alert variant="danger">
        Error: {error}
        <Button onClick={() => dispatch(fetchAllLoans())} variant="outline-secondary" size="sm" className="ml-2">Retry</Button>
      </Alert>
    );
  }

  return (
    <div>
      <h2>Loan List</h2>
      <ListGroup>
        {loans.length > 0 ? (
          loans.map((loan) => <LoanItem key={loan.id} loan={loan} />)
        ) : (
          <ListGroup.Item>No loans found</ListGroup.Item>
        )}
      </ListGroup>
    </div>
  );
};

export default LoanList;
