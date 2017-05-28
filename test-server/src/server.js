import koa from 'koa'
import koaRouter from 'koa-router'
import cors from 'kcors'
import koaBody from 'koa-bodyparser'
import {graphqlKoa, graphiqlKoa} from 'graphql-server-koa'
import {SubscriptionServer} from 'subscriptions-transport-ws'

import {subscriptionManager} from  './data/subscriptions'
import schema from './data/schema'
import './db'
import {validateToken}from './auth'

const app = new koa()
const router = new koaRouter()
const PORT = 3000

app.use(cors())
app.use(koaBody()) // koaBody is needed just for POST.

router.post('/graphql', graphqlKoa({schema: schema}))

app.use(router.routes())
app.use(router.allowedMethods())

const server = app.listen(PORT, () => {
    console.log('Server is running on', 'localhost:' + PORT)
})

const subscriptionsServer = new SubscriptionServer({
        subscriptionManager: subscriptionManager,
        onConnect: async (connectionParams) => {
            if (connectionParams.authToken) {
                return await validateToken(connectionParams.authToken)
            }
            throw new Error('Missing auth token!')
        }
    }, {
        path: '/subscriptions',
        server: server
    }
)