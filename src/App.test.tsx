import React from "react";
import renderer from "react-test-renderer";
import axios from "axios";

import App from "./App";
import { render, waitFor } from "@testing-library/react";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

beforeEach(() => {
  mockedAxios.get.mockClear();
});

test("render on api response items", async () => {
  mockedAxios.get.mockResolvedValue({
    data: [
      {
        score: 0.9079871,
        show: {
          id: 139,
          url: "https://www.tvmaze.com/shows/139/girls",
          name: "Girls",
          type: "Scripted",
          language: "English",
          genres: ["Drama", "Romance"],
          status: "Ended",
          image: {
            medium:
              "https://static.tvmaze.com/uploads/images/medium_portrait/31/78286.jpg",
            original:
              "https://static.tvmaze.com/uploads/images/original_untouched/31/78286.jpg",
          },
          summary:
            "<p>This Emmy winning series is a comic look at the assorted humiliations and rare triumphs of a group of girls in their 20s.</p>",
        },
      },
    ],
  });
  const { getByTestId, asFragment } = render(<App />);
  const listNode = await waitFor(() => getByTestId("list"));
  expect(listNode.children).toHaveLength(1);
  expect(asFragment).toMatchSnapshot();
});

test("render on api dont response items", async () => {
  mockedAxios.get.mockResolvedValue({ data: [] });
  const { getByTestId, asFragment } = render(<App />);
  const listNode = await waitFor(() => getByTestId("list"));
  expect(listNode.children).toHaveLength(0);
  expect(asFragment).toMatchSnapshot();
});
