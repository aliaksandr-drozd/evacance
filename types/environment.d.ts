declare namespace NodeJS {
  interface ProcessEnv {
      NODE_ENV: 'development' | 'production'
      ROUTING_SERVICE: string
      API_SERVER: string
      TILE_SERVER: string
    }
  }

