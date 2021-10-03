export const DEVELOPMENT = process.env.NODE_ENV == 'development'
export const ENDPOINT = DEVELOPMENT ? 
    'http://localhost:8000' 
    : window.location.origin + window.location.pathname.substr(0,window.location.pathname.length - 1)

console.log('[UTILS] Devlopment',DEVELOPMENT)