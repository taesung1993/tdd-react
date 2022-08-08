import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("button has correct initial color", () => {
  render(<App />);

  // find and element with a role of button and text of 'Change to blue'
  const colorButton = screen.getByRole("button", { name: "Change to blue" });

  // expect the background color to be red
  expect(colorButton).toHaveStyle({
    backgroundColor: "red",
  });

  // click Button
  fireEvent.click(colorButton);

  // expect the background color to be blue

  expect(colorButton).toHaveStyle({
    backgroundColor: "blue",
  });

  // expect to button text to be 'Change to 'red'
  expect(colorButton.textContent).toBe("Change to red");
});

test("initial conditions", () => {
  render(<App />);

  // check that the button starts out enalbed
  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  expect(colorButton).toBeEnabled();

  // check that the checkbox start s out unchecke
  const checkbox = screen.getByRole("checkbox");
  expect(checkbox).not.toBeChecked();
});
