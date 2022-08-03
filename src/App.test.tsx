import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('Checkbox disables button on first click and enables on second click', () => {
  render(<App />);

  /* Element 있는지 여부 체크 */
  const button = screen.getByRole("button", { name: "Button" });
  const checkbox = screen.getByRole("checkbox", {name: 'Disable button'});

  /* 버튼 및 초기상태 체크 */
  expect(button).toBeEnabled();
  expect(checkbox).not.toBeChecked();

  /* 체크박스 클릭 */
  fireEvent.click(checkbox);

  /* 체크박스 클릭 후 버튼 상태 변화 */
  expect(button).toBeDisabled();
  expect(checkbox).toBeChecked();

  /* 한번 더 체크박스 클릭 */
  fireEvent.click(checkbox);

  /* 원래 상태로 돌아옴 */
  expect(button).toBeEnabled();
  expect(checkbox).not.toBeChecked();
});