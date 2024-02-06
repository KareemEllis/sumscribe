/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 */
export const publicRoutes = [
    '/',
    '/new-verification'
]

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /dashboard
 */
export const authRoutes = [
    '/login',
    '/signup'
]

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 */
export const apiAuthPrefix = '/api/auth'

/**
 * The prefix for API routes
 * Routes that start with this prefix are used for API purposes
 */
export const apiRoutesPrefix = '/api'

/**
 * The default redirect path after loggin in
 */
export const DEFAULT_LOGIN_REDIRECT = '/dashboard'