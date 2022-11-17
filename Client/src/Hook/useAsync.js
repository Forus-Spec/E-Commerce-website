import * as React from "react";

function useSafeDispatch(dispatch) {
  const mountedRef = React.useRef(false);
  React.useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);
  return React.useCallback((...args) =>
    mountedRef.current ? dispatch(...args) : void 0
  );
}

function asyncReducer(state, action) {
  switch (action.type) {
    case "idle": {
      return {
        ...state,
        status: "idle",
        data: null,
        error: null
      };
    }
    case "pending": {
      return {
        ...state,
        status: "pending",
        data: null,
        error: null
      };
    }
    case "resolved": {
      return {
        ...state,
        status: "resolved",
        data: action.data,
        error: null
      };
    }
    case "rejected": {
      return {
        ...state,
        status: "rejected",
        data: null,
        error: action.error
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function useAsync(initialState) {
  const [{ data, error, status }, unsafeDispatch] = React.useReducer(
    asyncReducer,
    {
      status: "idle",
      data: null,
      error: null,
      ...initialState
    }
  );

  const dispatch = useSafeDispatch(unsafeDispatch);

  const setData = React.useCallback(
    data => {
      dispatch({ type: "resolved", data });
    },
    [data]
  );

  const setError = React.useCallback(
    error => {
      dispatch({ type: "rejected", error });
    },
    [error]
  );

  const setReset = React.useCallback(() => {
    dispatch({ type: "idle" });
  }, []);
  const setLoading = React.useCallback(() => {
    dispatch({ type: "pending" });
  }, []);

  const run = React.useCallback(
    promise => {
      dispatch({ type: "pending" });

      promise.then(
        data => {
          console.log(data);
          dispatch({
            type: "resolved",
            data: data.data
          });
        },
        err => {
          console.log("What's in the error", err);
          dispatch({
            type: "rejected",
            error: err.response.data
          });
        }
      );
    },
    [dispatch]
  );

  return {
    isIdle: status === "idle",
    isLoading: status === "pending",
    isError: status === "rejected",
    isSuccess: status === "resolved",
    setData,
    setError,
    setReset,
    setLoading,
    error,
    status,
    data,
    run
  };
}
export default useAsync;
