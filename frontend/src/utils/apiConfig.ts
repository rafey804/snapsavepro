
export const getApiBaseUrl = () => {
    // Check if running in browser
    if (typeof window !== 'undefined') {
        // For local development
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            return 'http://localhost:5002/api';
        }
        // For production - use relative path through proxy
        return `${window.location.protocol}//${window.location.host}/api`;
    }
    // Server-side: use environment variable or default
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002/api';
};
