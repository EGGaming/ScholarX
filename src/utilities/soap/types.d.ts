export interface SoapResponse<T> {
  error: string | null;
  data: T;
}

export interface SoapError {
  RT_ERROR: {
    $: {
      ERROR_MESSAGE: string;
    };
    STACK_TRACE: string[];
  };
}
