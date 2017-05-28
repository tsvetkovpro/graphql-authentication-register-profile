import Vue from 'vue'

import {SubscriptionClient, addGraphQLSubscriptions} from 'subscriptions-transport-ws'
import ApolloClient, {createNetworkInterface} from 'apollo-client'
import VueApollo from 'vue-apollo'
import localStorage from 'localStorage'

import router from './router'
import auth from './auth'

// Create a normal network interface:
const networkInterface = createNetworkInterface({
    uri: 'http://localhost:3000/graphql',
    transportBatching: true,
})
const id = localStorage.getItem('id')
const token = localStorage.getItem('public_key')
const wss = new SubscriptionClient('ws://localhost:3000/subscriptions', {
    reconnect: (token),
    connectionParams: {
        authToken: token ? token : null,
    },
    connectionCallback: (error) => {
        if (error && id !== null) auth.logout()
    }
})


// Extend the network interface with the WebSocket
const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
    networkInterface,
    wss
)
// Finally, create your ApolloClient instance with the modified network interface
const apolloClient = new ApolloClient({
    networkInterface: networkInterfaceWithSubscriptions,
    //connectToDevTools: false,
})


Vue.use(VueApollo, {apolloClient})

const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
})

new Vue({
    el: '#app',
    apolloProvider,
    router: router
})




