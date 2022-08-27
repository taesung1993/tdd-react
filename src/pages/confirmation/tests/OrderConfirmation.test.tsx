import { rest } from 'msw';
import { server } from '../../../mocks/server';
import { render, screen } from '../../../test-utils/test-library-utils';
import OrderConfirmation from '../OrderConfirmation';

test('Loading Test', async () => {
  render(<OrderConfirmation setOrderPhase={jest.fn()} />);

  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();

  const thankYouHeader = await screen.findByRole('heading', {
    name: /thank you/i,
  });
  expect(thankYouHeader).toBeInTheDocument();
});

test('error response from server for submitting order', async () => {
  server.resetHandlers(
    rest.post('http://localhost:3030/order', (req, res, ctx) => {
      res(ctx.status(500));
    })
  );

  render(<OrderConfirmation setOrderPhase={jest.fn()} />);

  const alert = await screen.findByRole('alert');
  expect(alert).toHaveTextContent(
    'An unexpected error occurred. Please try again later'
  );
});
