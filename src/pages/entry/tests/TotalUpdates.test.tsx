import { render, screen } from '../../../test-utils/test-library-utils';
import userEvent from '@testing-library/user-event';
import Options from '../Options';
import { renderIntoDocument } from 'react-dom/test-utils';
import OrderEntry from '../OrderEntry';

test('update scoop subtotal when scoops change', async () => {
  render(<Options optionType="scoops" />);

  // make sure total starts out $0.00
  const scoopsSubtotal = screen.getByText('Scoops total: $', {
    exact: false,
  });
  expect(scoopsSubtotal).toHaveTextContent('0.00');
  // update vanilla scoops to 1 check the subtotal
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });
  await userEvent.clear(vanillaInput);
  await userEvent.type(vanillaInput, '1');
  expect(scoopsSubtotal).toHaveTextContent('2.00');

  // // update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  });
  await userEvent.clear(chocolateInput);
  await userEvent.type(chocolateInput, '2');
  expect(scoopsSubtotal).toHaveTextContent('6.00');
});

test('update topping subtotal when toppings change', async () => {
  render(<Options optionType="toppings" />);

  // make sure total starts out $0.00
  const toppingsSubTotal = screen.getByText('Toppings total: $', {
    exact: false,
  });
  expect(toppingsSubTotal).toHaveTextContent('0.00');

  // add 'Hot fudge' and check the subtotal
  const hotFudgeCheck = await screen.findByRole('checkbox', {
    name: 'Hot fudge',
  });
  await userEvent.click(hotFudgeCheck);
  expect(toppingsSubTotal).toHaveTextContent('1.50');

  // add 'Peanut butter cups' and check the subtotal
  const peanutButterCupsCheck = await screen.findByRole('checkbox', {
    name: 'Peanut butter cups',
  });
  await userEvent.click(peanutButterCupsCheck);
  expect(toppingsSubTotal).toHaveTextContent('3.00');

  // add 'Hot fudge' and check the subtotal
  await userEvent.click(hotFudgeCheck);
  expect(toppingsSubTotal).toHaveTextContent('1.50');

  // add 'Peanut butter cups' and check the subtotal
  await userEvent.click(peanutButterCupsCheck);
  expect(toppingsSubTotal).toHaveTextContent('0.00');
});

describe('grand total', () => {
  // test.only('grand total starts at $0.00', () => {
  //   render(<OrderEntry />);

  //   const grandTotal = screen.getByRole('heading', {
  //     level: 2,
  //     name: /grand total: \$/gi,
  //   });

  //   // check that the grand total starts out at 0
  //   expect(grandTotal).toHaveTextContent('0.00');
  // });

  test('grand total updates properly if scoop is added first', async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole('heading', {
      level: 2,
      name: /grand total: \$/i,
    });
    expect(grandTotal).toHaveTextContent('0.00');

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    await userEvent.clear(vanillaInput);
    await userEvent.type(vanillaInput, '2');
    expect(grandTotal).toHaveTextContent('4.00');

    const hotFudgeCheck = await screen.findByRole('checkbox', {
      name: /hot fudge/i,
    });
    await userEvent.click(hotFudgeCheck);
    expect(grandTotal).toHaveTextContent('5.50');
  });
  test('grand total updates properly if topping is added first', async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole('heading', {
      level: 2,
      name: /grand total: \$/i,
    });
    expect(grandTotal).toHaveTextContent('0.00');

    const peanutButterCupsCheck = await screen.findByRole('checkbox', {
      name: /peanut butter cups/i,
    });
    await userEvent.click(peanutButterCupsCheck);
    expect(grandTotal).toHaveTextContent('1.50');

    const chocolateInput = await screen.findByRole('spinbutton', {
      name: 'Chocolate',
    });
    await userEvent.clear(chocolateInput);
    await userEvent.type(chocolateInput, '2');
    expect(grandTotal).toHaveTextContent('5.50');
  });
  test('grand total updates properly if item is removed', async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole('heading', {
      level: 2,
      name: /grand total: \$/i,
    });
    expect(grandTotal).toHaveTextContent('0.00');

    const scoopsSubTotal = screen.getByText('Scoops total:', {
      exact: false,
    });
    expect(scoopsSubTotal).toHaveTextContent('0.00');

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    await userEvent.clear(vanillaInput);
    await userEvent.type(vanillaInput, '1');
    expect(scoopsSubTotal).toHaveTextContent('2.00');
    expect(grandTotal).toHaveTextContent('2.00');

    const chocolateInput = await screen.findByRole('spinbutton', {
      name: 'Chocolate',
    });
    await userEvent.clear(chocolateInput);
    await userEvent.type(chocolateInput, '2');
    expect(scoopsSubTotal).toHaveTextContent('6.00');
    expect(grandTotal).toHaveTextContent('6.00');
  });

  test('grand total updates properly if topping is added first', async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole('heading', {
      level: 2,
      name: /grand total: \$/i,
    });
    expect(grandTotal).toHaveTextContent('0.00');
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    await userEvent.clear(vanillaInput);
    await userEvent.type(vanillaInput, '1');
    expect(grandTotal).toHaveTextContent('2.00');

    const chocolateInput = await screen.findByRole('spinbutton', {
      name: 'Chocolate',
    });
    await userEvent.clear(chocolateInput);
    await userEvent.type(chocolateInput, '2');
    expect(grandTotal).toHaveTextContent('6.00');

    const peanutButterCupsCheck = await screen.findByRole('checkbox', {
      name: /peanut butter cups/i,
    });
    await userEvent.click(peanutButterCupsCheck);
    expect(grandTotal).toHaveTextContent('7.50');

    await userEvent.clear(chocolateInput);
    await userEvent.type(chocolateInput, '1');

    expect(grandTotal).toHaveTextContent('5.50');
  });
});
