import React from 'react';
import { RotateCcwIcon } from 'lucide-react';
import { Button } from '../ui/Button';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  message?: string;
}

/** Route-level error UI: catches render failures and offers a recovery path*/
export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message };
  }

  handleReset = () => {
    this.setState({ hasError: false, message: undefined });
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main className="flex min-h-screen w-full items-center justify-center bg-canvas px-6 py-32">
        <div className="w-full max-w-lg rounded-5xl border border-ink/8 bg-white p-10 text-center shadow-soft">
          <p className="text-[11px] uppercase tracking-widest2 text-forest-500">Something went wrong</p>
          <h1 className="mt-5 font-display text-3xl leading-tight">The road is blocked here</h1>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            An unexpected error interrupted this page. Reloading usually clears it. If it happens
            again, our team would like to hear about it.
          </p>
          {this.state.message &&
            <p className="mt-5 rounded-2xl bg-parchment px-4 py-3 text-left font-mono text-xs text-ink-muted">
              {this.state.message}
            </p>
          }
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button onClick={this.handleReset}>
              <RotateCcwIcon className="h-4 w-4" />
              Reload the page
            </Button>
            <Button to="/" variant="outline">
              Back to home
            </Button>
          </div>
        </div>
      </main>);

  }
}