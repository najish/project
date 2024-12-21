const asyncHandler = (fn) => {
    return async (setData, setError) => {
        try {
            const data = await fn();
            setData(data);
        } catch (err) {
            setError(err.message || 'Something went wrong!');
        }
    };
};

export default asyncHandler