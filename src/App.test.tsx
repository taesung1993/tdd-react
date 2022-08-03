import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import {replaceCamelWithSpaces} from './App';

test('Button color test', () => {
  render(<App/>);

  const colorButton = screen.getByRole('button', {name: 'Change to blue'});

  expect(colorButton).toHaveStyle({'background-color': 'red'});

  fireEvent.click(colorButton);

    expect(colorButton).toHaveStyle({ "background-color": "blue" });
});

test('Checkbox disables button on first click and enables on second click', () => {
  render(<App />);

  /* Element 있는지 여부 체크 */
  const button = screen.getByRole("button", { name: "Change to blue" });
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

test('Button\'s color is blue when clicked, but its is grey on first check, also its is blue on second check', () => {
  render(<App/>);

  const colorButton = screen.getByRole('button', {name: 'Change to blue'});
  const checkbox = screen.getByRole('checkbox', {name: 'Disable button'});

  /* 체크박스를 한 번 눌렀을 경우, 버튼의 색은 gray */
  fireEvent.click(checkbox);
  expect(colorButton).toBeDisabled();
  expect(colorButton).toHaveStyle({'background-color': 'gray'});

  /* 두 번째 체크 박스를 눌렀을 경우, 원래 색으로 돌아온다. */
  fireEvent.click(checkbox);
  expect(colorButton).toBeEnabled();
  expect(colorButton).toHaveStyle({'background-color': 'red'});

  /* 
    1. 버튼 클릭(버튼 색: 파란색)
    2. 체크박스 클릭(버튼 색: 회색)
    3. 체크박스 다시 클릭(버튼 색: 파란 색)
  */

    fireEvent.click(colorButton);
    expect(colorButton).toHaveStyle({'background-color': 'blue'});

    fireEvent.click(checkbox);
    expect(colorButton).toHaveStyle({'background-color': 'gray'});

    fireEvent.click(checkbox);
    expect(colorButton).toHaveStyle({'background-color': 'blue'});
});

// Medium Violet Red
// MidnightBlue

/* Describe 문장을 사용하면 테스트를 그룹화할 수 있다. */
describe('spaces before camel-case capital leters', () => {
  test('Works for no inner capital letters', () => {
    expect(replaceCamelWithSpaces('Red')).toBe('Red');
  });

  test('Works for one inner capital letter', () => {
    expect(replaceCamelWithSpaces("MidnightBlue")).toBe("Midnight Blue");
  });

  test('Work for muliple inner capital letters', () => {
    expect(replaceCamelWithSpaces("MediumVioletRed")).toBe(
      "Medium Violet Red"
    );
  });
});