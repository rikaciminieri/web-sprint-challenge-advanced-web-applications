import React from "react";
import MutationObserver from "mutationobserver-shim";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Color from "./Color";

const testEmptyColor = {
  color: "",
  code: { hex: "" },
};

const testColor = {
  color: "blue",
  code: { hex: "6093ca" },
};

test("Renders without errors with blank color passed into component", () => {
  render(<Color color={testEmptyColor} />);
});

test("Renders the color passed into component", () => {
  render(<Color color={testColor} />);
  const blue = screen.getByText("blue");
  expect(blue).toBeInTheDocument();
});

test("Executes handleDelete and toggleEdit property when the 'x' icon is clicked", () => {
  const mockToggleEdit = jest.fn();
  const mockDeleteColor = jest.fn();
  render(
    <Color
      color={testColor}
      toggleEdit={mockToggleEdit}
      deleteColor={mockDeleteColor}
    />
  );
  const deleteButton = screen.getByTestId("delete");
  fireEvent.click(deleteButton);
  expect(mockDeleteColor).toHaveBeenCalledTimes(1);
  expect(mockToggleEdit).toHaveBeenCalledTimes(1);
});

test("Executes setEditColor and toggleEdit property when color div is clicked", () => {
  const mockToggleEdit = jest.fn();
  const mockSetEditColor = jest.fn();
  render(
    <Color
      color={testColor}
      toggleEdit={mockToggleEdit}
      setEditColor={mockSetEditColor}
    />
  );
  const blue = screen.getByText("blue")
  fireEvent.click(blue)
  expect(mockToggleEdit).toHaveBeenCalledTimes(1)
  expect(mockSetEditColor).toHaveBeenCalledTimes(1)
});
