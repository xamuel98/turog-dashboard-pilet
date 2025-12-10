import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PostForm from "../../../components/posts/PostForm";
import { useStore } from "../../../hooks/useStore";

// Mock the store
jest.mock("../../../hooks/useStore");

const mockAddPost = jest.fn();
const mockOnSuccess = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  (useStore as unknown as jest.Mock).mockImplementation((selector) =>
    selector({ addPost: mockAddPost })
  );
});

describe("PostForm", () => {
  it("renders form with title and body fields", () => {
    render(<PostForm />);

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/body/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add post/i })
    ).toBeInTheDocument();
  });

  it("shows validation errors when fields are invalid", async () => {
    const user = userEvent.setup();
    render(<PostForm />);

    const titleInput = screen.getByLabelText(/title/i);
    const bodyInput = screen.getByLabelText(/body/i);

    // Type and blur to trigger validation
    await user.type(titleInput, "ab");
    await user.click(bodyInput);

    await waitFor(() => {
      expect(
        screen.getByText(/title must be at least 3 characters/i)
      ).toBeInTheDocument();
    });
  });

  it("enables submit button when form is valid", async () => {
    const user = userEvent.setup();
    render(<PostForm />);

    const titleInput = screen.getByLabelText(/title/i);
    const bodyInput = screen.getByLabelText(/body/i);
    const submitButton = screen.getByRole("button", { name: /add post/i });

    await user.type(titleInput, "Valid Title Here");
    await user.type(bodyInput, "This is a valid body with enough characters");

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });

  it("calls addPost and onSuccess when form is submitted", async () => {
    const user = userEvent.setup();
    render(<PostForm onSuccess={mockOnSuccess} />);

    const titleInput = screen.getByLabelText(/title/i);
    const bodyInput = screen.getByLabelText(/body/i);

    await user.type(titleInput, "New Post Title");
    await user.type(bodyInput, "This is the body of the new post");

    const submitButton = screen.getByRole("button", { name: /add post/i });
    await waitFor(() => expect(submitButton).not.toBeDisabled());

    await user.click(submitButton);

    await waitFor(() => {
      expect(mockAddPost).toHaveBeenCalledWith({
        title: "New Post Title",
        body: "This is the body of the new post",
      });
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  it("resets form after successful submission", async () => {
    const user = userEvent.setup();
    render(<PostForm onSuccess={mockOnSuccess} />);

    const titleInput = screen.getByLabelText(/title/i) as HTMLInputElement;
    const bodyInput = screen.getByLabelText(/body/i) as HTMLTextAreaElement;

    await user.type(titleInput, "Test Title");
    await user.type(bodyInput, "Test body content here");

    const submitButton = screen.getByRole("button", { name: /add post/i });
    await waitFor(() => expect(submitButton).not.toBeDisabled());

    await user.click(submitButton);

    await waitFor(() => {
      expect(titleInput.value).toBe("");
      expect(bodyInput.value).toBe("");
    });
  });
});
