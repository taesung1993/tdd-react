import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('order pahses for happy path', async () => {
  // render app
  // Don't need to wrap in provider; already wrappered!;
  render(<App />);

  // add ice cream scoops and toppings
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });
  await userEvent.clear(vanillaInput);
  await userEvent.type(vanillaInput, '1');

  const chocolateInput = screen.getByRole('spinbutton', {
    name: 'Chocolate',
  });
  await userEvent.clear(chocolateInput);
  await userEvent.type(chocolateInput, '2');

  const peanutButterCupsCheck = await screen.findByRole('checkbox', {
    name: /peanut butter cups/i,
  });
  await userEvent.click(peanutButterCupsCheck);

  // find and click order summary button
  const orderSummaryButton = screen.getByRole('button', {
    name: /order sundae/i,
  });
  await userEvent.click(orderSummaryButton);

  const summaryHeading = screen.getByRole('heading', {
    name: 'Order Summary',
  });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsHeading = screen.getByRole('heading', {
    name: 'Scoops: $6.00',
  });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.getByRole('heading', {
    name: 'Toppings: $1.50',
  });
  expect(toppingsHeading).toBeInTheDocument();

  expect(screen.getByText('1 Vanilla')).toBeInTheDocument();
  expect(screen.getByText('2 Chocolate')).toBeInTheDocument();
  expect(screen.getByText('Peanut butter cups')).toBeInTheDocument();

  const tcCheckbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  await userEvent.click(tcCheckbox);

  const confirmOrderButton = screen.getByRole('button', {
    name: /confirm order/i,
  });
  await userEvent.click(confirmOrderButton);

  const thankYouHeader = await screen.findByRole('heading', {
    name: /thank you!/i,
  });
  expect(thankYouHeader).toBeInTheDocument();

  const orderNumber = await screen.findByText(/order number/);
  expect(orderNumber).toBeInTheDocument();

  const newOrderButton = screen.getByRole('button', {
    name: /new order/i,
  });
  await userEvent.click(newOrderButton);

  const scoopsTotal = screen.getByText('Scoops total: $0.00');
  expect(scoopsTotal).toBeInTheDocument();
  const toppingsTotal = screen.getByText('Scoops total: $0.00');
  expect(toppingsTotal).toBeInTheDocument();

  await screen.findByRole('spinbutton', { name: 'Vanilla' });
  await screen.findByRole('checkbox', { name: /peanut butter cups/i });
});
