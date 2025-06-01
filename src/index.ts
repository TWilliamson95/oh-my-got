import got from "got";

interface MyGotParams {
  timeout?: number;
  retryLimit?: number;
  baseRetryDelay?: number;
}

/**
 * Creates a configured `got` instance for HTTP requests with customisable timeout, retries, and linear backoff.
 * @param config - Configuration options for the `got` instance. Defaults to an empty object, applying default values.
 * @param config.timeout - Request timeout in milliseconds (default: 5000).
 * @param config.retryLimit - Maximum number of retry attempts (default: 5).
 * @param config.baseRetryDelay - Base delay for linear backoff in milliseconds (default: 5000).
 * @returns A configured `got` instance.
 * @example
 * // Default configuration
 * await myGot().get('http://www.test.com/test');
 *
 * // Custom configuration
 * await myGot({ timeout: 2000, retryLimit: 3 }).get('http://www.test.com/test');
 */
const ohMyGot = ({
  timeout = 5000, // 5 seconds
  retryLimit = 5,
  baseRetryDelay = 5000, // 5 seconds
}: MyGotParams = {}) => {
  return got.extend({
    timeout: { request: timeout },
    hooks: {
      beforeRequest: [
        (options) =>
          console.log(`Requesting ${options.method} to ${options.url.href}`),
      ],
    },
    retry: {
      limit: retryLimit,
      calculateDelay: ({ attemptCount: retryAttemptCount, retryOptions }) => {
        // this code is only reached AFTER the initial attempt, aka from the first retry attempt
        // attemptCount refers to the retry attempt count (hence I've mapped to better name)
        if (retryAttemptCount <= retryOptions.limit) {
          const delay = baseRetryDelay * retryAttemptCount;
          console.log(
            `Retry attempt (${retryAttemptCount} of ${retryOptions.limit}), delay of ${delay} ms`
          );
          return delay;
        }
        return 0;
      },
    },
  });
};

export { ohMyGot };
