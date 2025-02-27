import { FastifyInstance } from 'fastify'
import { authenticate } from './controllers/authenticate.controller'
import { verifyJwt } from './controllers/middlewares/verify-jwt'
import { profile } from './controllers/profile.controller'
import { register } from './controllers/register.controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)

  app.post('/sessions', authenticate)

  app.get('/me', { onRequest: [verifyJwt] }, profile)
}
