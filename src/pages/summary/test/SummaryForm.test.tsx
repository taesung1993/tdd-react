import { render, screen } from '@testing-library/react';
import SummaryForms from '../SummaryForm';
import userEvent from '@testing-library/user-event';

test('Initial Conditions', () => {
  render(<SummaryForms />);
  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });

  const button = screen.getByRole('button', {
    name: /confirm order/i,
  });

  expect(checkbox).not.toBeChecked();
  expect(button).toBeDisabled();
});

test('Button is disabled on first checked and Button is enabled on second checked', async () => {
  render(<SummaryForms />);

  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  const button = screen.getByRole('button', {
    name: /confirm order/i,
  });

  await userEvent.click(checkbox);
  expect(button).toBeEnabled();

  await userEvent.click(checkbox);
  expect(button).toBeDisabled();
});

test('popover responds to hover', async () => {
  render(<SummaryForms />);
  // popover
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();
  // popover appears upon mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);

  await userEvent.hover(termsAndConditions);
  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  // popover disappears when we mouse out
  await userEvent.unhover(termsAndConditions);
  const nullPopoverAgain = screen.queryByText(
    /no ice cream wil l actually be delivered/i
  );
  expect(nullPopoverAgain).not.toBeInTheDocument();
});
