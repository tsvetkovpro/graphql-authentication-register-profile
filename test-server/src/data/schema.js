import {
    GraphQLObjectType,
    GraphQLSchema
} from 'graphql';


import UserQueries from './user/queries'
import UserMutations from './user/mutations'
import UserSubscriptions from './user/subscriptions'

const queries = {
    ...UserQueries
}
const mutations = {
    ...UserMutations
}

const subscriptions = {
    ...UserSubscriptions
}


export default new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: queries
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: mutations
    }),
    subscription: new GraphQLObjectType({
        name: 'Subscriptions',
        fields: subscriptions
    })
});
