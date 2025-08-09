import { useState, useCallback, useRef } from "react";

interface LoadingState {
  isLoading: boolean;
  error: Error | null;
  data: any;
}

interface UseLoadingStateOptions {
  initialLoading?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

export function useLoadingState(options: UseLoadingStateOptions = {}) {
  const { initialLoading = false, onSuccess, onError } = options;

  const [state, setState] = useState<LoadingState>({
    isLoading: initialLoading,
    error: null,
    data: null,
  });

  const abortControllerRef = useRef<AbortController | null>(null);

  const execute = useCallback(
    async <T>(
      asyncFunction: (signal?: AbortSignal) => Promise<T>
    ): Promise<T | null> => {
      // Cancel previous request if still pending
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create new abort controller
      abortControllerRef.current = new AbortController();
      const signal = abortControllerRef.current.signal;

      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const result = await asyncFunction(signal);

        if (!signal.aborted) {
          setState({ isLoading: false, error: null, data: result });
          onSuccess?.(result);
          return result;
        }
        return null;
      } catch (error) {
        if (!signal.aborted) {
          const errorObj =
            error instanceof Error ? error : new Error(String(error));
          setState({ isLoading: false, error: errorObj, data: null });
          onError?.(errorObj);
        }
        return null;
      }
    },
    [onSuccess, onError]
  );

  const reset = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setState({ isLoading: false, error: null, data: null });
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    setState((prev) => ({ ...prev, isLoading: loading }));
  }, []);

  const setError = useCallback((error: Error | null) => {
    setState((prev) => ({ ...prev, error, isLoading: false }));
  }, []);

  const setData = useCallback((data: any) => {
    setState((prev) => ({ ...prev, data, isLoading: false, error: null }));
  }, []);

  return {
    ...state,
    execute,
    reset,
    setLoading,
    setError,
    setData,
  };
}

// Specialized hook for multiple loading states
export function useMultipleLoadingStates() {
  const [states, setStates] = useState<Record<string, LoadingState>>({});

  const getState = useCallback(
    (key: string): LoadingState => {
      return states[key] || { isLoading: false, error: null, data: null };
    },
    [states]
  );

  const setLoading = useCallback(
    (key: string, loading: boolean) => {
      setStates((prev) => ({
        ...prev,
        [key]: { ...getState(key), isLoading: loading },
      }));
    },
    [getState]
  );

  const setError = useCallback(
    (key: string, error: Error | null) => {
      setStates((prev) => ({
        ...prev,
        [key]: { ...getState(key), error, isLoading: false },
      }));
    },
    [getState]
  );

  const setData = useCallback(
    (key: string, data: any) => {
      setStates((prev) => ({
        ...prev,
        [key]: { ...getState(key), data, isLoading: false, error: null },
      }));
    },
    [getState]
  );

  const reset = useCallback((key?: string) => {
    if (key) {
      setStates((prev) => ({
        ...prev,
        [key]: { isLoading: false, error: null, data: null },
      }));
    } else {
      setStates({});
    }
  }, []);

  const isAnyLoading = useCallback(() => {
    return Object.values(states).some((state) => state.isLoading);
  }, [states]);

  const hasAnyError = useCallback(() => {
    return Object.values(states).some((state) => state.error);
  }, [states]);

  return {
    states,
    getState,
    setLoading,
    setError,
    setData,
    reset,
    isAnyLoading,
    hasAnyError,
  };
}

// Hook for progressive loading with stages
export function useProgressiveLoading(stages: string[]) {
  const [currentStage, setCurrentStage] = useState(0);
  const [completedStages, setCompletedStages] = useState<Set<number>>(
    new Set()
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const progress = (completedStages.size / stages.length) * 100;

  const startLoading = useCallback(() => {
    setIsLoading(true);
    setCurrentStage(0);
    setCompletedStages(new Set());
    setError(null);
  }, []);

  const completeStage = useCallback(
    (stageIndex: number) => {
      setCompletedStages((prev) => new Set([...prev, stageIndex]));
      if (stageIndex === stages.length - 1) {
        setIsLoading(false);
      } else {
        setCurrentStage(stageIndex + 1);
      }
    },
    [stages.length]
  );

  const failStage = useCallback((error: Error) => {
    setError(error);
    setIsLoading(false);
  }, []);

  const reset = useCallback(() => {
    setCurrentStage(0);
    setCompletedStages(new Set());
    setIsLoading(false);
    setError(null);
  }, []);

  return {
    currentStage,
    currentStageName: stages[currentStage],
    completedStages,
    isLoading,
    error,
    progress,
    startLoading,
    completeStage,
    failStage,
    reset,
  };
}
