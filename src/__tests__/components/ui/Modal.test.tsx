import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Modal from "../../../components/ui/Modal";

describe("Modal", () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset body overflow
    document.body.style.overflow = "unset";
  });

  it("renders when isOpen is true", () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <p>Modal content</p>
      </Modal>
    );

    expect(screen.getByText("Modal content")).toBeInTheDocument();
  });

  it("does not render when isOpen is false", () => {
    render(
      <Modal isOpen={false} onClose={mockOnClose}>
        <p>Modal content</p>
      </Modal>
    );

    expect(screen.queryByText("Modal content")).not.toBeInTheDocument();
  });

  it("renders title when provided", () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Custom Title">
        <p>Content</p>
      </Modal>
    );

    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("renders default title when not provided", () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <p>Content</p>
      </Modal>
    );

    expect(screen.getByText("Modal")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <p>Content</p>
      </Modal>
    );

    const closeButton = screen.getByRole("button");
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when backdrop is clicked", () => {
    const { container } = render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <p>Content</p>
      </Modal>
    );

    const backdrop = container.querySelector(".c-modal__backdrop");
    fireEvent.click(backdrop!);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when Escape key is pressed", () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <p>Content</p>
      </Modal>
    );

    fireEvent.keyDown(document, { key: "Escape" });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose when other keys are pressed", () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <p>Content</p>
      </Modal>
    );

    fireEvent.keyDown(document, { key: "Enter" });
    fireEvent.keyDown(document, { key: "A" });

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it("sets body overflow to hidden when opened", () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <p>Content</p>
      </Modal>
    );

    expect(document.body.style.overflow).toBe("hidden");
  });

  it("resets body overflow when closed", async () => {
    const { rerender } = render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <p>Content</p>
      </Modal>
    );

    expect(document.body.style.overflow).toBe("hidden");

    rerender(
      <Modal isOpen={false} onClose={mockOnClose}>
        <p>Content</p>
      </Modal>
    );

    await waitFor(() => {
      expect(document.body.style.overflow).toBe("unset");
    });
  });

  it("cleans up event listeners on unmount", () => {
    const removeEventListenerSpy = jest.spyOn(document, "removeEventListener");

    const { unmount } = render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <p>Content</p>
      </Modal>
    );

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "keydown",
      expect.any(Function)
    );
    expect(document.body.style.overflow).toBe("unset");

    removeEventListenerSpy.mockRestore();
  });

  it("renders children content", () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <div>
          <h2>Child Title</h2>
          <p>Child paragraph</p>
        </div>
      </Modal>
    );

    expect(screen.getByText("Child Title")).toBeInTheDocument();
    expect(screen.getByText("Child paragraph")).toBeInTheDocument();
  });
});
