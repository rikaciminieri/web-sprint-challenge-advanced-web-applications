import React from "react";
import MutationObserver from "mutationobserver-shim";

import { render, screen, waitFor } from "@testing-library/react";
import BubblePage from "./BubblePage";
import routeData from "react-router";
import { fetchColorService as mockFetchColorService } from "../services/fetchColorService";

jest.mock("../services/fetchColorService");

const mockId = { id: 1 };
beforeEach(() => {
  jest.spyOn(routeData, "useParams").mockReturnValue(mockId);
});

const testColors = {
  data: [
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
  ],
};
test("Renders without errors", () => {
  mockFetchColorService.mockResolvedValueOnce();
  render(<BubblePage />);
});

test("Renders appropriate number of colors passed in through mock", async () => {
  //Keep in mind that our service is called on mount for this component.
  mockFetchColorService.mockResolvedValueOnce(testColors);
  render(<BubblePage />);
  await waitFor(() => {});
  const deleteButton = screen.getAllByTestId("delete");
  expect(deleteButton).toHaveLength(3);
});
