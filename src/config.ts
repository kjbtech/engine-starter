import type { Config } from '@latechforce/engine'
import env from '/env'
import { hello } from '/automations/hello'

const config: Config = {
  name: 'Engine Starter Kit',
  version: '1.0.0',
  automations: [hello],
  monitors: [{ driver: 'Console' }],
  loggers: [],
}

switch (env.NODE_ENV) {
  case 'development':
    config.loggers?.push({ driver: 'Console', level: 'info' })
    config.database = {
      driver: 'SQLite',
      url: env.DATABASE_URL,
    }
    config.server = {
      port: env.PORT,
    }
    break
  case 'production':
    if (!process.env.CI) {
      config.loggers?.push({ driver: 'Console', level: 'http' })
      config.database = {
        driver: 'PostgreSQL',
        url: env.DATABASE_URL,
      }
      config.server = {
        port: env.PORT,
      }
    }
    break
}

export default config
