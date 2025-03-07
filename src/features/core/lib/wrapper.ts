const wrapper =
  <T, A extends unknown[]>(fn: (...args: A) => Promise<T> | T) =>
  async (...args: A): Promise<T | { error: true; message: string }> => {
    try {
      return await fn(...args);
    } catch (error) {
      console.error(error);

      return {
        error: true,
        message: error instanceof Error ? error.message : 'An error occurred',
      };
    }
  };

export { wrapper };
