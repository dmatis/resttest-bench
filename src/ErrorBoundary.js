// source: reactjs.org/docs/error-boundaries.html
import React, { Component } from "react";
import "./styles/ErrorBoundary.scss";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="img-container">
          <img
            src="https://i.pinimg.com/originals/e1/04/2e/e1042e5d99353437bc15aa0731b2eaba.png"
            alt="500 Error"
          />
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
