import { renderHook, act, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import {
  useLoadingState,
  useMultipleLoadingStates,
  useProgressiveLoading,
} from "../use-loading-state";

describe("useLoadingState", () => {
  it("initializes with correct default state", () => {
    const { result } = renderHook(() => useLoadingState());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.data).toBe(null);
  });

  it("initializes with custom loading state", () => {
    const { result } = renderHook(() =>
      useLoadingState({ initialLoading: true })
    );

    expect(result.current.isLoading).toBe(true);
  });

  it("handles successful async operation", async () => {
    const onSuccess = vi.fn();
    const { result } = renderHook(() => useLoadingState({ onSuccess }));

    const mockData = { message: "Success!" };
    const asyncFn = vi.fn().mockResolvedValue(mockData);

    act(() => {
      result.current.execute(asyncFn);
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBe(null);
    expect(onSuccess).toHaveBeenCalledWith(mockData);
    expect(asyncFn).toHaveBeenCalledTimes(1);
  });

  it("handles failed async operation", async () => {
    const onError = vi.fn();
    const { result } = renderHook(() => useLoadingState({ onError }));

    const mockError = new Error("Operation failed");
    const asyncFn = vi.fn().mockRejectedValue(mockError);

    act(() => {
      result.current.execute(asyncFn);
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toBe(null);
    expect(result.current.error).toEqual(mockError);
    expect(onError).toHaveBeenCalledWith(mockError);
  });

  it("handles abort signal correctly", async () => {
    const { result } = renderHook(() => useLoadingState());

    const asyncFn = vi.fn().mockImplementation(async (signal) => {
      await new Promise((resolve) => setTimeout(resolve, 100));
      if (signal?.aborted) {
        throw new Error("Aborted");
      }
      return "Success";
    });

    // Start first operation
    act(() => {
      result.current.execute(asyncFn);
    });

    // Start second operation (should abort first)
    act(() => {
      result.current.execute(asyncFn);
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(asyncFn).toHaveBeenCalledTimes(2);
  });

  it("resets state correctly", () => {
    const { result } = renderHook(() => useLoadingState());

    act(() => {
      result.current.setData("test data");
      result.current.setError(new Error("test error"));
    });

    expect(result.current.data).toBe("test data");
    expect(result.current.error).toBeInstanceOf(Error);

    act(() => {
      result.current.reset();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.data).toBe(null);
  });

  it("sets loading state manually", () => {
    const { result } = renderHook(() => useLoadingState());

    act(() => {
      result.current.setLoading(true);
    });

    expect(result.current.isLoading).toBe(true);

    act(() => {
      result.current.setLoading(false);
    });

    expect(result.current.isLoading).toBe(false);
  });
});

describe("useMultipleLoadingStates", () => {
  it("initializes with empty states", () => {
    const { result } = renderHook(() => useMultipleLoadingStates());

    expect(result.current.states).toEqual({});
    expect(result.current.isAnyLoading()).toBe(false);
    expect(result.current.hasAnyError()).toBe(false);
  });

  it("manages multiple loading states independently", () => {
    const { result } = renderHook(() => useMultipleLoadingStates());

    act(() => {
      result.current.setLoading("operation1", true);
      result.current.setLoading("operation2", false);
    });

    expect(result.current.getState("operation1").isLoading).toBe(true);
    expect(result.current.getState("operation2").isLoading).toBe(false);
    expect(result.current.isAnyLoading()).toBe(true);
  });

  it("tracks errors across multiple states", () => {
    const { result } = renderHook(() => useMultipleLoadingStates());

    const error1 = new Error("Error 1");
    const error2 = new Error("Error 2");

    act(() => {
      result.current.setError("operation1", error1);
      result.current.setError("operation2", error2);
    });

    expect(result.current.getState("operation1").error).toBe(error1);
    expect(result.current.getState("operation2").error).toBe(error2);
    expect(result.current.hasAnyError()).toBe(true);
  });

  it("resets specific state", () => {
    const { result } = renderHook(() => useMultipleLoadingStates());

    act(() => {
      result.current.setData("operation1", "data1");
      result.current.setData("operation2", "data2");
    });

    act(() => {
      result.current.reset("operation1");
    });

    expect(result.current.getState("operation1").data).toBe(null);
    expect(result.current.getState("operation2").data).toBe("data2");
  });

  it("resets all states", () => {
    const { result } = renderHook(() => useMultipleLoadingStates());

    act(() => {
      result.current.setData("operation1", "data1");
      result.current.setData("operation2", "data2");
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current.states).toEqual({});
  });
});

describe("useProgressiveLoading", () => {
  const stages = ["Stage 1", "Stage 2", "Stage 3"];

  it("initializes with correct default state", () => {
    const { result } = renderHook(() => useProgressiveLoading(stages));

    expect(result.current.currentStage).toBe(0);
    expect(result.current.currentStageName).toBe("Stage 1");
    expect(result.current.completedStages.size).toBe(0);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.progress).toBe(0);
  });

  it("starts loading correctly", () => {
    const { result } = renderHook(() => useProgressiveLoading(stages));

    act(() => {
      result.current.startLoading();
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.currentStage).toBe(0);
    expect(result.current.completedStages.size).toBe(0);
    expect(result.current.error).toBe(null);
  });

  it("completes stages and updates progress", () => {
    const { result } = renderHook(() => useProgressiveLoading(stages));

    act(() => {
      result.current.startLoading();
    });

    act(() => {
      result.current.completeStage(0);
    });

    expect(result.current.completedStages.has(0)).toBe(true);
    expect(result.current.currentStage).toBe(1);
    expect(result.current.progress).toBeCloseTo(33.33, 1);
    expect(result.current.isLoading).toBe(true);

    act(() => {
      result.current.completeStage(1);
    });

    expect(result.current.completedStages.has(1)).toBe(true);
    expect(result.current.currentStage).toBe(2);
    expect(result.current.progress).toBeCloseTo(66.67, 1);

    act(() => {
      result.current.completeStage(2);
    });

    expect(result.current.completedStages.has(2)).toBe(true);
    expect(result.current.progress).toBe(100);
    expect(result.current.isLoading).toBe(false);
  });

  it("handles stage failure", () => {
    const { result } = renderHook(() => useProgressiveLoading(stages));

    const error = new Error("Stage failed");

    act(() => {
      result.current.startLoading();
    });

    act(() => {
      result.current.failStage(error);
    });

    expect(result.current.error).toBe(error);
    expect(result.current.isLoading).toBe(false);
  });

  it("resets state correctly", () => {
    const { result } = renderHook(() => useProgressiveLoading(stages));

    act(() => {
      result.current.startLoading();
      result.current.completeStage(0);
      result.current.failStage(new Error("Test error"));
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current.currentStage).toBe(0);
    expect(result.current.completedStages.size).toBe(0);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.progress).toBe(0);
  });
});
