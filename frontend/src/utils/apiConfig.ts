
export const getApiBaseUrl = () => {
    // Always use the relative path '/api' so requests go through the Next.js proxy
    // This works for both local dev (via rewrites) and production (via rewrites)
    return '/api';
};
