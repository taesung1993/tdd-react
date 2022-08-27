import { Container } from 'react-bootstrap';
import OrderEntry from './pages/entry/OrderEntry';
import { OrderDetailsProvider } from './contexts/OrderDetail';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import OrderSummary from './pages/summary/OrderSummary';
import OrderConfirmation from './pages/confirmation/OrderConfirmation';

function App() {
  const [orderPhase, setOrderPhase] = useState('inProgress');

  let Component = <OrderEntry setOrderPhase={setOrderPhase} />;
  switch (orderPhase) {
    case 'inProgress':
      Component = <OrderEntry setOrderPhase={setOrderPhase} />;
      break;
    case 'review':
      Component = <OrderSummary setOrderPhase={setOrderPhase} />;
      break;
    case 'completed':
      Component = <OrderConfirmation setOrderPhase={setOrderPhase} />;
      break;
  }

  return (
    <OrderDetailsProvider>
      <Container>{Component}</Container>
    </OrderDetailsProvider>
  );
}

export default App;
