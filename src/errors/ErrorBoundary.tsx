import React, { Component, ErrorInfo, ReactNode } from "react";
import { TriangleWarning } from "../components/Icons";
import { Button } from "../components/ui";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error | null;
  errorInfo?: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: undefined,
      errorInfo: undefined,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="c-error-boundary">
          <div className="c-error-boundary__container">
            <div className="c-error-boundary__icon">
              <TriangleWarning />
            </div>
            <div className="c-error-boundary__content">
              <div className="">
                <h2 className="c-error-boundary__title">
                  Something went wrong.
                </h2>
                <p className="c-error-boundary__subtitle">
                  An unexpected error occurred. Please try again.
                </p>
              </div>
              {process.env.NODE_ENV === "development" && this.state.error && (
                <div className="c-error-boundary__details">
                  <details>
                    <summary className="cursor-pointer">
                      <span className="text-sm font-medium text-gray-700">
                        Error Details
                      </span>
                    </summary>
                    <pre className="c-error-boundary__details__pre">
                      {this.state.error.toString()}
                      {this.state.errorInfo?.componentStack}
                    </pre>
                  </details>
                </div>
              )}

              <Button onClick={this.handleRetry} variant="primary">
                Try again
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
