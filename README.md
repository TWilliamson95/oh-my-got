# ohMyGot

A lightweight, TypeScript-based HTTP client package built on top of [got](https://www.npmjs.com/package/got/v/10.0.1) for standardised, resilient HTTP requests.

This is essentially a wrapper for `got`, allowing the caller to provide basic configuration parameters, while hiding the more complex logic. This massively simplifies the use of `got`, and provides a standard across your application.

## Why Use ohMyGot?

- Consistency: Centralises configuration for got instances, ensuring uniform timeout, retry, and logging behaviour across your application.
- Resilience: Implements linear backoff to handle network failures and server errors gracefully.
- Simplicity: Provides an apiCall wrapper for easy async requests with built-in error handling, reducing boilerplate code.
- Type Safety: Leverages TypeScript for strong typing and JSDoc for clear documentation, improving developer experience and maintainability.
- Flexibility: Allows customisation of request parameters (timeout, retryLimit, baseRetryDelay) while hiding complex retry logic.

### Usage

```
// Default configuration
const response = await ohMyGot().get('https://api.example.com/data');

// Custom configuration
const response = await ohMyGot({ timeout: 2000, retryLimit: 3, baseRetryDelay: 500 }).get('https://api.example.com/data');
```
