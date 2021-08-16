import React from "react";
import MutationObserver from "mutationobserver-shim";

import { render, screen } from "@testing-library/react";
import ColorList from "./ColorList";

const testEmptyColorList = [];

const testColorList = [
  {
    color: "aliceblue",
    code: {
      hex: "#f0f8ff",
    },
    id: 1,
  },
  {
    color: "limegreen",
    code: {
      hex: "#99ddbc",
    },
    id: 2,
  },
  {
    color: "aqua",
    code: {
      hex: "#00ffff",
    },
    id: 3,
  },
];

test("Renders an empty list of colors without errors", () => {
  render(<ColorList colors={testEmptyColorList} />);
});

test("Renders a list of colors without errors", () => {
  render(<ColorList colors={testColorList} />);
});

test("Renders the EditForm when editing = true and does not render EditForm when editing = false", () => {
  const { rerender } = render(
    <ColorList colors={testColorList} editing={true} />
  );
  const editMenu = screen.getByTestId("edit_menu");
  expect(editMenu).toBeInTheDocument();
  rerender(<ColorList colors={testColorList} editing={false} />);
  expect(editMenu).not.toBeInTheDocument();
});
