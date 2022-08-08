import { render, screen, fireEvent } from '@testing-library/react';
import SummaryForms from '../SummaryForm';

test('Initial Conditions', () => {
  render(<SummaryForms />);
  const checkbox = screen.getByRole('checkbox', {
    name: 'Terms and Conditions',
  });

  const button = screen.getByRole('button', {
    name: /confirm order/i,
  });

  expect(checkbox).not.toBeChecked();
  expect(button).toBeEnabled();
});

test('Button is disabled on first checked and Button is enabled on second checked', () => {
  render(<SummaryForms />);

  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  const button = screen.getByRole('button', {
    name: /confirm order/i,
  });

  fireEvent.click(checkbox);
  expect(button).toBeDisabled();

  fireEvent.click(checkbox);
  expect(button).toBeEnabled();
});
