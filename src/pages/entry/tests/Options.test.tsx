import userEvent from '@testing-library/user-event';
import { render, screen } from '../../../test-utils/test-library-utils';
import Options from '../Options';

test('displays image for each scoop option from server', async () => {
  render(<Options optionType="scoops" />);

  // find Images
  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images
  const altText = scoopImages.map((element: any) => element.alt);
  expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('displays images for each topping option from server', async () => {
  render(<Options optionType="toppings" />);

  // find images
  const toppingImages = await screen.findAllByRole('img', {
    name: /topping$/i,
  });
  expect(toppingImages).toHaveLength(2);

  // confirm alt text of images
  const altText = toppingImages.map((element: any) => element.alt);
  expect(altText).toEqual(['Hot fudge topping', 'Peanut butter cups topping']);
});

test('do not update total if scoops input is invalid', async () => {
  render(<Options optionType="scoops" />);

  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });
  await userEvent.clear(vanillaInput);
  await userEvent.type(vanillaInput, '-1');

  const scoopsSubtotal = screen.getByText('Scoops total: $0.00');
  expect(scoopsSubtotal).toBeInTheDocument();
});
