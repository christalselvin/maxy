import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  componentStack: string | null;
}

/**
 * Catches any uncaught error thrown while rendering the app (a bad prop,
 * a null reference, a broken third-party component, etc.) and shows a
 * recovery screen instead of leaving the page blank.
 *
 * Without this, an uncaught render error anywhere below it unmounts the
 * whole subtree with nothing shown in its place — this is the single
 * biggest cause of a "blank white page" that isn't a routing issue.
 *
 * The error message + component stack are shown directly on screen (not
 * just logged to the console) so a crash can be diagnosed immediately
 * from a screenshot, without needing separate DevTools access.
 */
class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null, componentStack: null };

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Unhandled error in the app:", error, info.componentStack);
    this.setState({ componentStack: info.componentStack ?? null });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, componentStack: null });
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
          <h1 className="text-6xl font-bold text-red-500">Oops!</h1>
          <p className="mt-4 text-xl font-semibold text-gray-800">
            Something went wrong
          </p>
          <p className="mt-2 max-w-md text-gray-500">
            This page ran into an unexpected error. You can try reloading,
            or head back to the homepage.
          </p>

          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center rounded-full border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Reload
            </button>
            <button
              onClick={this.handleReset}
              className="inline-flex items-center rounded-full bg-black px-6 py-3 font-medium text-white transition hover:bg-gray-900"
            >
              Back to Home
            </button>
          </div>

          {this.state.error && (
            <div className="mt-8 max-w-2xl rounded-xl border border-red-200 bg-red-50 p-4 text-left">
              <p className="text-xs font-semibold uppercase tracking-wide text-red-600">
                Error details (for debugging)
              </p>
              <pre className="mt-2 max-h-56 overflow-auto whitespace-pre-wrap break-words text-xs text-red-800">
                {this.state.error.name}: {this.state.error.message}
                {this.state.error.stack ? "\n\n" + this.state.error.stack : ""}
                {this.state.componentStack
                  ? "\n\nComponent stack:" + this.state.componentStack
                  : ""}
              </pre>
            </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

