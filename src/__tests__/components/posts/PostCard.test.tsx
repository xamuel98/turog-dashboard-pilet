import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PostCard from "../../../components/posts/PostCard";
import { Post } from "../../../types";

const mockPost: Post = {
  id: 1,
  userId: 1,
  title: "Test Post Title",
  body: "This is a test post body with some content",
  date: "2024-12-10T10:00:00.000Z",
};

describe("PostCard", () => {
  it("renders post title and body", () => {
    render(
      <MemoryRouter>
        <PostCard post={mockPost} />
      </MemoryRouter>
    );

    expect(screen.getByText("Test Post Title")).toBeInTheDocument();
    expect(screen.getByText(/This is a test post body/i)).toBeInTheDocument();
  });

  it("displays user badge", () => {
    render(
      <MemoryRouter>
        <PostCard post={mockPost} />
      </MemoryRouter>
    );

    expect(screen.getByText(/User 1/i)).toBeInTheDocument();
  });

  it("renders link to post detail", () => {
    render(
      <MemoryRouter>
        <PostCard post={mockPost} />
      </MemoryRouter>
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/dashboard/1");
  });

  it("displays date when provided", () => {
    render(
      <MemoryRouter>
        <PostCard post={mockPost} />
      </MemoryRouter>
    );

    // Check that a date element exists (actual format: "December 10 2024")
    const dateElement = screen.getByText(/\w+\s\d{1,2}\s\d{4}/);
    expect(dateElement).toBeInTheDocument();
  });
});
