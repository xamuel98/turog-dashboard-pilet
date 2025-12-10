import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PostList from "../../../components/posts/PostList";
import { Post } from "../../../types";

const mockPosts: Post[] = [
  {
    id: 1,
    userId: 1,
    title: "Test Post 1",
    body: "Body 1",
    date: "2024-12-10T10:00:00.000Z",
  },
  {
    id: 2,
    userId: 1,
    title: "Test Post 2",
    body: "Body 2",
    date: "2024-12-10T11:00:00.000Z",
  },
];

describe("PostList", () => {
  it("renders loading skeletons when isLoading is true", () => {
    const { container } = render(<PostList posts={[]} isLoading={true} />);

    const skeletonContainer = container.querySelector('[data-skeleton="true"]');
    expect(skeletonContainer).toBeInTheDocument();
  });

  it("renders posts when provided", () => {
    render(
      <MemoryRouter>
        <PostList posts={mockPosts} isLoading={false} />
      </MemoryRouter>
    );

    expect(screen.getByText("Test Post 1")).toBeInTheDocument();
    expect(screen.getByText("Test Post 2")).toBeInTheDocument();
  });

  it('renders "no results" empty state when hasResults is false and search query exists', () => {
    render(
      <PostList
        posts={[]}
        isLoading={false}
        searchQuery="test"
        hasResults={false}
      />
    );

    expect(screen.getByText("No posts found")).toBeInTheDocument();
    expect(
      screen.getByText(/We couldn't find any posts matching "test"/)
    ).toBeInTheDocument();
  });

  it("renders default empty state when no posts and no search", () => {
    render(<PostList posts={[]} isLoading={false} />);

    expect(
      screen.getByText("Nothing to read here… for now")
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Refresh later to discover trending posts/)
    ).toBeInTheDocument();
  });

  it("does not render empty state when posts are present", () => {
    render(
      <MemoryRouter>
        <PostList posts={mockPosts} isLoading={false} />
      </MemoryRouter>
    );

    expect(
      screen.queryByText("Nothing to read here… for now")
    ).not.toBeInTheDocument();
  });

  it("shows search-specific empty state with correct query", () => {
    render(
      <PostList
        posts={[]}
        isLoading={false}
        searchQuery="React Testing"
        hasResults={false}
      />
    );

    expect(
      screen.getByText(/We couldn't find any posts matching "React Testing"/)
    ).toBeInTheDocument();
  });
});
