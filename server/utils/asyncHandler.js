const asyncHandler = (fn) => {
    return async (...args) => {
      try {
        await fn(...args);
      } catch (err) {
        console.error('Error in async function:', err.message, err);
      }
    };
  };
  
  module.exports = asyncHandler;
  