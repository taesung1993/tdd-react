import { Button } from 'react-bootstrap';
import { useOrderDetails } from '../../contexts/OrderDetail';
import Options from './Options';

export default function OrderEntry({ setOrderPhase }: any) {
  const [orderDetails] = useOrderDetails();
  return (
    <div>
      <h1>Design Your Sundae!</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {orderDetails.totals['grandTotal']}</h2>
      <Button onClick={() => setOrderPhase('review')}>Order Sundae!</Button>
    </div>
  );
}
