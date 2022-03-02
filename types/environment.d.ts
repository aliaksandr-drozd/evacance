declare namespace NodeJS {
  interface ProcessEnv {
      NODE_ENV: 'development' | 'production'
      ROUTING_SERVICE: string
      GUN_PEERS: string
      TILE_SERVER: string
    }
  }

