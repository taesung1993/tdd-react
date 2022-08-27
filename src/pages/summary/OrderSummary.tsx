import { useOrderDetails } from '../../contexts/OrderDetail';
import SummaryForms from './SummaryForm';

export default function OrderSummary({ setOrderPhase }: any) {
  const [orderDetails] = useOrderDetails();
  const scoopArray = Array.from(orderDetails.scoops.entries());
  const scoopList = scoopArray.map(([key, value]: any) => (
    <li key={key}>
      {value} {key}
    </li>
  ));

  const hasToppings = orderDetails.toppings.size > 0;
  let toppingsDisplay = null;

  if (hasToppings) {
    const toppingsArray = Array.from(orderDetails.toppings.keys());
    const toppingList = toppingsArray.map((key: any) => (
      <li key={key}>{key}</li>
    ));
    toppingsDisplay = (
      <>
        <h2>Toppings: {orderDetails.totals.toppings}</h2>
        <ul>{toppingList}</ul>
      </>
    );
  }

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {orderDetails.totals.scoops}</h2>
      <ul>{scoopList}</ul>
      {toppingsDisplay}
      <SummaryForms setOrderPhase={setOrderPhase} />
    </div>
  );
}
