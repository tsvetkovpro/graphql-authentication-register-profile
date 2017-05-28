import {
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLID
} from 'graphql'
import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    private_key: {
        type: String
    },
    public_key: {
        type: String
    }
})

export let UserModel = mongoose.model('User', schema)

const user = {
    _id: {
        type: GraphQLID
    },
    username: {
        type: GraphQLString
    },
    firstName: {
        type: GraphQLString
    },
    lastName: {
        type: GraphQLString
    }
}

export let UserType = new GraphQLObjectType({
    name: 'User',
    fields: user
})

export const UserInput = new GraphQLInputObjectType({
    name: "UserInput",
    fields: user
})

export const UserCreate = new GraphQLInputObjectType({
    name: "UserCreate",
    fields: {
        username: {
            type: new GraphQLNonNull(GraphQLString)
        },
        password: {
            type: new GraphQLNonNull(GraphQLString)
        },
        firstName: {
            type: new GraphQLNonNull(GraphQLString)
        },
        lastName: {
            type: new GraphQLNonNull(GraphQLString)
        }
    }
});


export const UserAuth = new GraphQLObjectType({
    name: "UserAuth",
    fields: {
        id: {
            type: GraphQLID
        },
        public_key: {
            type: GraphQLString
        }
    }
})