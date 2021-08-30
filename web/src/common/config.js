export const DEVELOPMENT = process.env.NODE_ENV == 'development'
export const ENDPOINT = DEVELOPMENT ? 'http://localhost:8000' : window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '')

console.log('[UTILS] Devlopment',DEVELOPMENT)