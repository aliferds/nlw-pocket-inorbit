import fastify, {
  FastifyBaseLogger,
  FastifyInstance,
  FastifyPluginOptions,
  FastifyTypeProvider,
  RawServerDefault,
} from 'fastify'
import { createGoalsRoute } from './routes/createGoals'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { createPendingGoalsRoute } from './routes/pendingGoals'
import { createCompletionsRoute } from './routes/createCompletions'
import { getWeekSummaryRoute } from './routes/getWeekSummary'
import fastifyCors from '@fastify/cors'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*',
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createGoalsRoute)
app.register(createPendingGoalsRoute)
app.register(createCompletionsRoute)
app.register(getWeekSummaryRoute)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP server running!')
  })
