import React from "react";
import { render, screen } from "@testing-library/react";
import EmptyState from "../../../components/posts/EmptyState";

const MockIcon = () => <svg data-testid="mock-icon">Icon</svg>;

describe("EmptyState", () => {
  it("renders title", () => {
    render(<EmptyState title="No Results" />);

    expect(screen.getByText("No Results")).toBeInTheDocument();
  });

  it("renders subtitle when provided", () => {
    render(<EmptyState title="No Results" subtitle="Try again later" />);

    expect(screen.getByText("Try again later")).toBeInTheDocument();
  });

  it("does not render subtitle when not provided", () => {
    render(<EmptyState title="No Results" />);

    expect(screen.queryByRole("paragraph")).not.toBeInTheDocument();
  });

  it("renders icon when provided", () => {
    render(<EmptyState title="No Results" icon={MockIcon} />);

    expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
  });

  it("does not render icon when not provided", () => {
    render(<EmptyState title="No Results" />);

    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
  });

  it("renders with all props", () => {
    render(
      <EmptyState
        title="Nothing here"
        subtitle="Come back later"
        icon={MockIcon}
      />
    );

    expect(screen.getByText("Nothing here")).toBeInTheDocument();
    expect(screen.getByText("Come back later")).toBeInTheDocument();
    expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
  });
});
