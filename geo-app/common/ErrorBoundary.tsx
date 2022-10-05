import * as React from "react";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error): State {
    // Update state so the next render will show the fallback UI.
    console.error(error);
    return { hasError: true };
  }

  override componentDidCatch(error, errorInfo: React.ErrorInfo): void {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
  }

  override render(): React.ReactNode {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <p>Something went wrong!!!</p>;
    }
    return this.props.children;
  }
}
