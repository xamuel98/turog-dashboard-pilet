import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../../../components/ui/Button";

describe("Button", () => {
  it("renders button with text", () => {
    render(<Button>Click me</Button>);

    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("applies primary variant by default", () => {
    render(<Button>Primary</Button>);

    const button = screen.getByText("Primary");
    expect(button).toHaveClass("c-button--primary");
  });

  it("applies correct variant classes", () => {
    const { rerender } = render(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByText("Secondary")).toHaveClass("c-button--secondary");

    rerender(<Button variant="tertiary">Tertiary</Button>);
    expect(screen.getByText("Tertiary")).toHaveClass("c-button--tertiary");

    rerender(<Button variant="outline">Outline</Button>);
    expect(screen.getByText("Outline")).toHaveClass("c-button--outline");

    rerender(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByText("Ghost")).toHaveClass("c-button--ghost");

    rerender(<Button variant="danger">Danger</Button>);
    expect(screen.getByText("Danger")).toHaveClass("c-button--danger");

    rerender(<Button variant="dangerSoft">Danger Soft</Button>);
    expect(screen.getByText("Danger Soft")).toHaveClass(
      "c-button--danger-soft"
    );
  });

  it("applies icon size class", () => {
    render(<Button size="icon">Icon</Button>);

    expect(screen.getByText("Icon")).toHaveClass("c-button--icon-only");
  });

  it("handles click events", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);

    fireEvent.click(screen.getByText("Click"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("can be disabled", () => {
    const handleClick = jest.fn();
    render(
      <Button onClick={handleClick} disabled>
        Disabled
      </Button>
    );

    const button = screen.getByText("Disabled");
    expect(button).toBeDisabled();

    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("sets data-pressed on mouse down", () => {
    render(<Button>Press</Button>);

    const button = screen.getByText("Press");
    expect(button).toHaveAttribute("data-pressed", "false");

    fireEvent.mouseDown(button);
    expect(button).toHaveAttribute("data-pressed", "true");

    fireEvent.mouseUp(button);
    expect(button).toHaveAttribute("data-pressed", "false");
  });

  it("accepts custom className", () => {
    render(<Button className="custom-class">Custom</Button>);

    expect(screen.getByText("Custom")).toHaveClass("custom-class");
  });

  it("renders as child component when asChild is true", () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    );

    const link = screen.getByText("Link Button");
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "/test");
  });

  it("passes through button props", () => {
    render(
      <Button type="submit" name="test-button">
        Submit
      </Button>
    );

    const button = screen.getByText("Submit");
    expect(button).toHaveAttribute("type", "submit");
    expect(button).toHaveAttribute("name", "test-button");
  });
});
