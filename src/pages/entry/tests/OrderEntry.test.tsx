import {
  render,
  screen,
  waitFor,
} from '../../../test-utils/test-library-utils';
import OrderEntry from '../OrderEntry';
import { rest } from 'msw';
import { server } from '../../../mocks/server';
import userEvent from '@testing-library/user-event';

test('handles error for scoops and topppings routes', async () => {
  server.resetHandlers(
    rest.get('http://localhost:3030/scoops', (req, res, ctx) => {
      return res(ctx.status(500));
    }),
    rest.get('http://localhost:3030/toppings', (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  render(<OrderEntry setOrderPhanse={jest.fn()} />);

  await waitFor(async () => {
    const alerts = await screen.findAllByRole('alert');
    expect(alerts).toHaveLength(2);
  });
});

test('disable order button if there are no scoops ordered', async () => {
  render(<OrderEntry />);

  const submitButton = screen.getByRole('button', {
    name: /order sundae/i,
  });
  expect(submitButton).toBeDisabled();

  const vanillaInput = await screen.findByRole('spinbutton', {
    name: /vanilla/i,
  });

  await userEvent.clear(vanillaInput);
  await userEvent.type(vanillaInput, '1');
  expect(submitButton).toBeEnabled();

  await userEvent.clear(vanillaInput);
  await userEvent.type(vanillaInput, '0');
  expect(submitButton).toBeDisabled();
});
