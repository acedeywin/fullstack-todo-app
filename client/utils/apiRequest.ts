export const apiRequest = async <T>(
  /**
   * The URL of the API endpoint to request.
   * @param {string} url - The endpoint URL.
   */
  url: string,

  /**
   * Options for the fetch request, such as method, headers, and body.
   * Defaults to an empty object.
   * @param {RequestInit} [options={}] - Configuration for the fetch request.
   */
  options: RequestInit = {},

  /**
   * Function to set the error state. Receives an error message or null.
   * @param {React.Dispatch<React.SetStateAction<string | null>>} setError - State updater for error messages.
   */
  setError: React.Dispatch<React.SetStateAction<string | null>>,

  /**
   * Function to set the loading state. Receives a boolean value.
   * @param {React.Dispatch<React.SetStateAction<boolean>>} setLoading - State updater for the loading indicator.
   */
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<T | null> => {
  setLoading(true);
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorMessage = await response.json();
      setError(
        errorMessage.message || errorMessage.errors?.[0]?.msg || 'An error occurred.',
      );
      return null;
    }

    const data: T = await response.json();
    setError(null);
    return data;
  } catch (error) {
    console.error('API Request Error:', error);
    setError('Something went wrong. Please try again later.');
    return null;
  } finally {
    setLoading(false);
  }
};
