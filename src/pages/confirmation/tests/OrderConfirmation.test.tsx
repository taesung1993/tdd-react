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
