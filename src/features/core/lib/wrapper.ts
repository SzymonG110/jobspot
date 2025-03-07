const wrapper =
  <T, A extends unknown[]>(fn: (...args: A) => T) =>
  (...args: A): T | { error: true; message: string } => {
    try {
      return fn(...args);
    } catch (error) {
      console.log('error', error);

      return {
        error: true,
        message: error instanceof Error ? error.message : 'An error occurred',
      };
    }
  };

export { wrapper };
