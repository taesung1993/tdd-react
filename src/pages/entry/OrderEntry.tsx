import { Button } from 'react-bootstrap';
import { useOrderDetails } from '../../contexts/OrderDetail';
import Options from './Options';

export default function OrderEntry({ setOrderPhase }: any) {
  const [orderDetails] = useOrderDetails();
  const hasScoops = orderDetails.totals.scoops === '$0.00';
  return (
    <div>
      <h1>Design Your Sundae! {hasScoops}</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {orderDetails.totals['grandTotal']}</h2>
      <Button onClick={() => setOrderPhase('review')} disabled={hasScoops}>
        Order Sundae!
      </Button>
    </div>
  );
}
