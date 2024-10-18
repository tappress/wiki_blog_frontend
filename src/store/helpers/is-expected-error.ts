// Type predicate to narrow an unknown error to an object with a string 'data' property
const isExpectedError = (
  error: unknown
): error is { data: { code: string; detail: string } } => {
  return (
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    error.data !== null && 
    typeof error.data === "object" && 
    "code" in error.data &&
    "detail" in error.data &&
    typeof error.data.code === "string" &&
    typeof error.data.detail === "string"
  );
};

export { isExpectedError };
