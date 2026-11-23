import { render, screen, within } from "@testing-library/react-native";
import { RepositoryListContainer } from "../components/RepositoryList";

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", async () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor: "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
        },
        edges: [
          {
            node: {
              id: "jaredpalmer.formik",
              fullName: "jaredpalmer/formik",
              description: "Build forms in React, without the tears",
              language: "TypeScript",
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl: "https://avatars2.githubusercontent.com/u/4060187?v=4",
            },
            cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
          },
          {
            node: {
              id: "async-library.react-async",
              fullName: "async-library/react-async",
              description: "Flexible promise-based React data loader",
              language: "JavaScript",
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl: "https://avatars1.githubusercontent.com/u/54310907?v=4",
            },
            cursor: "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          },
        ],
      };

      await render(<RepositoryListContainer repositories={repositories} />);

      const repositoryItems = screen.getAllByTestId("repositoryItem");
      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;

      const firstItem = within(firstRepositoryItem);
      expect(firstItem.getByText("jaredpalmer/formik")).toBeOnTheScreen();
      expect(firstItem.getByText("Build forms in React, without the tears")).toBeOnTheScreen();
      expect(firstItem.getByText("TypeScript")).toBeOnTheScreen();
      expect(firstItem.getByText("21.9k")).toBeOnTheScreen();
      expect(firstItem.getByText("1.6k")).toBeOnTheScreen();
      expect(firstItem.getByText("3")).toBeOnTheScreen();
      expect(firstItem.getByText("88")).toBeOnTheScreen();

      const secondItem = within(secondRepositoryItem);
      expect(secondItem.getByText("async-library/react-async")).toBeOnTheScreen();
      expect(secondItem.getByText("Flexible promise-based React data loader")).toBeOnTheScreen();
      expect(secondItem.getByText("JavaScript")).toBeOnTheScreen();
      expect(secondItem.getByText("1.8k")).toBeOnTheScreen();
      expect(secondItem.getByText("69")).toBeOnTheScreen();
      expect(secondItem.getByText("3")).toBeOnTheScreen();
      expect(secondItem.getByText("72")).toBeOnTheScreen();
    });
  });
});
