/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: 'joykumar',    
        mongodb_password: 'Googletest',
        mongodb_clustername: 'cluster1',
        mongodb_database: 'event-management-auth-data-dev', 
        NEXTAUTH_SECRET:'anything'
      },
    }
  }
  return {
    env: {
      mongodb_username: 'joykumar',    
      mongodb_password: 'Googletest',
      mongodb_clustername: 'cluster1',
      mongodb_database: 'event-management-auth-data-dev', 
      NEXTAUTH_SECRET:'anything'
    },
  }
}
