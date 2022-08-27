import axios from 'axios';
import { useEffect, useState } from 'react';
import { useOrderDetails } from '../../contexts/OrderDetail';
import { Button, Alert } from 'react-bootstrap';

export default function OrderConfirmation({ setOrderPhase }: any) {
  const [, , resetOrder] = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .post('http://localhost:3030/order')
      .then((response) => {
        setOrderNumber(response.data.orderNumber);
      })
      .catch((error) => {
        // TODO: handle error here
        setError(true);
      });
  }, []);

  function handleClick() {
    resetOrder();

    setOrderPhase('inProgress');
  }

  if (error) {
    return (
      <Alert variant={'danger'}>
        <p>An unexpected error occurred. Please try again later</p>
      </Alert>
    );
  }

  if (orderNumber) {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>Thank You!</h1>
        <p>Your order number is {orderNumber}</p>
        <p style={{ fontSize: '25%' }}>
          as per our terms and conditions, nothing will happen now
        </p>
        <Button onClick={handleClick}>Create new order</Button>
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
}
