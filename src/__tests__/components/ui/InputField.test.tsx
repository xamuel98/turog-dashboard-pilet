import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InputField from "../../../components/ui/InputField";

describe("InputField", () => {
  it("renders input by default", () => {
    render(<InputField name="test" />);

    const input = screen.getByRole("textbox");
    expect(input.tagName).toBe("INPUT");
  });

  it('renders textarea when as="textarea"', () => {
    render(<InputField as="textarea" name="test" />);

    const textarea = screen.getByRole("textbox");
    expect(textarea.tagName).toBe("TEXTAREA");
  });

  it("renders label when provided", () => {
    render(<InputField label="Username" name="username" />);

    expect(screen.getByLabelText("Username")).toBeInTheDocument();
  });

  it("does not render label when not provided", () => {
    render(<InputField name="test" />);

    expect(screen.queryByRole("label")).not.toBeInTheDocument();
  });

  it("displays error message when provided", () => {
    render(<InputField name="test" error="This field is required" />);

    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  it("sets data-invalid attribute when error exists", () => {
    const { container } = render(<InputField name="test" error="Error" />);

    const wrapper = container.querySelector(".text-field");
    expect(wrapper).toHaveAttribute("data-invalid", "true");
  });

  it("applies default variant background class", () => {
    render(<InputField name="test" variant="default" />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("c-input--default");
  });

  it("applies filled variant background class", () => {
    render(<InputField name="test" variant="filled" />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("c-input--filled");
  });

  it("renders prepend element", () => {
    render(
      <InputField
        name="test"
        prepend={<span data-testid="prepend-icon">📧</span>}
      />
    );

    expect(screen.getByTestId("prepend-icon")).toBeInTheDocument();
  });

  it("renders append element", () => {
    render(
      <InputField
        name="test"
        append={<button data-testid="clear-btn">×</button>}
      />
    );

    expect(screen.getByTestId("clear-btn")).toBeInTheDocument();
  });

  it("adds has-icons class when prepend or append exists", () => {
    const { container, rerender } = render(
      <InputField name="test" prepend={<span>Icon</span>} />
    );

    let wrapper = container.querySelector(".c-input-wrapper");
    expect(wrapper).toHaveClass("has-icons");

    rerender(<InputField name="test" append={<span>Icon</span>} />);
    wrapper = container.querySelector(".c-input-wrapper");
    expect(wrapper).toHaveClass("has-icons");
  });

  it("handles user input", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(<InputField name="test" onChange={handleChange} />);

    const input = screen.getByRole("textbox");
    await user.type(input, "Hello");

    expect(handleChange).toHaveBeenCalled();
  });

  it("sets input value", () => {
    render(<InputField name="test" value="Test Value" readOnly />);

    expect(screen.getByRole("textbox")).toHaveValue("Test Value");
  });

  it("applies custom className", () => {
    const { container } = render(<InputField name="test" className="custom" />);

    expect(container.querySelector(".text-field")).toHaveClass("custom");
  });

  it("passes through input props", () => {
    render(
      <InputField
        name="email"
        type="email"
        placeholder="Enter email"
        required
      />
    );

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("type", "email");
    expect(input).toHaveAttribute("placeholder", "Enter email");
    expect(input).toBeRequired();
  });

  it("links label to input via htmlFor and id", () => {
    render(<InputField label="Email" name="email" />);

    const label = screen.getByText("Email");
    const input = screen.getByLabelText("Email");

    expect(label).toHaveAttribute("for", "email");
    expect(input).toHaveAttribute("id", "email");
  });
});
