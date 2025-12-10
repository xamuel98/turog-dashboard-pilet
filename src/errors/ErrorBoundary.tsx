import React, { Component, ErrorInfo, ReactNode } from "react";

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
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
          <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-center size-12 rounded-full bg-red-100">
              <svg
                className="w-6 h-6 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <div className="flex flex-column mt-4 gap-4 text-center">
              <h2 className="text-lg font-medium text-gray-900">
                Something went wrong.
              </h2>
              <p className="text-sm text-gray-500">
                An unexpected error occurred. Please try again.
              </p>
              {process.env.NODE_ENV === "development" && this.state.error && (
                <div className="w-full mt-4 text-left">
                  <details>
                    <summary className="cursor-pointer">
                      <span className="text-sm font-medium text-gray-700">
                        Error Details
                      </span>
                    </summary>
                    <pre className="mt-2 p-2 bg-red-500 text-xs text-red-600 rounded-md overflow-auto">
                      {this.state.error.toString()}
                      {this.state.errorInfo?.componentStack}
                    </pre>
                  </details>
                </div>
              )}

              <button
                onClick={this.handleRetry}
                className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
