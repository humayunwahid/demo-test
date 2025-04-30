import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service here
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  componentDidUpdate(_, prevState) {
    if (this.state.hasError && !prevState.hasError) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  handleReload = () => {
    this.setState({ hasError: false }); // Reset error state
    window.location.reload(); // Reload the page
  };

  render() {
    if (this.state.hasError) {
      const fallback = this.props.fallback || (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#000",
            color: "#f1f1f1",
            textAlign: "center",
            padding: "20px",
            boxSizing: "border-box",
            animation: "fadeIn 1s ease-in-out",
          }}
        >
          <style>
            {`@keyframes fadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }

            button:hover {
              background-color: #e50914;
            }`}
          </style>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>
            Oops! Something went wrong.
          </h1>
          <p style={{ fontSize: "1.2rem", marginBottom: "30px" }}>
            Please try reloading the page or contact support if the issue persists.
          </p>
          <button
            onClick={this.handleReload}
            style={{
              padding: "12px 24px",
              fontSize: "1rem",
              color: "#fff",
              backgroundColor: "#e50914",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
          >
            Reload Page
          </button>
        </div>
      );

      return fallback;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
