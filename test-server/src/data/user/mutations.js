import {
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLID,
    GraphQLString
} from 'graphql';
import SHA3 from 'js-sha3'
import jwt from 'jsonwebtoken'
import {UserModel, UserType, UserInput, UserCreate, UserAuth} from './models'
import {pubsub} from '../subscriptions'

const sha3_256 = SHA3.sha3_256
const sha3_512 = SHA3.sha3_512

const userCreate = {
    description: "Create new user",
    type: GraphQLBoolean,
    args: {
        data: {
            name: "data",
            type: new GraphQLNonNull(UserCreate)
        }
    },
    async resolve (root, args, options) {
        const user = await UserModel.findOne({username: args.data.username})
        if (user) throw new Error('User exist')

        args.data.password = sha3_512(args.data.password)
        return new UserModel(args.data).save()
    }
}

const userUpdate = {
    description: "Update user",
    type: GraphQLBoolean,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        data: {
            type: UserInput
        }
    },
    async resolve(root, args, options){
        const entry = await UserModel.findById(args.id).update(args.data)
        pubsub.publish('user', entry);
        return entry
    }
}

const userDelete = {
    description: "Delete user",
    type: GraphQLBoolean,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    async resolve (root, args, options) {
        return await UserModel.findById(args.id).deleteOne()
    }
}

const auth = {
    description: "Auth user",
    type: UserAuth,
    args: {
        username: {
            type: new GraphQLNonNull(GraphQLString)
        },
        password: {
            type: new GraphQLNonNull(GraphQLString)
        },
    },
    async resolve(root, args, options){
        const pass = sha3_512(args.password)
        return await UserModel.findOne({username: args.username, password: pass}).then(data => {
            if (data !== null) {
                const private_key = sha3_256(Math.random().toString(36).substr(2, 36))
                const public_key = jwt.sign({
                    sub: data._id,
                }, private_key)
                data.private_key = private_key
                data.public_key = public_key
                return data.save()
            }
            throw  new Error('Input error')
        })
    }
}

export default {
    userCreate: userCreate,
    userUpdate: userUpdate,
    userDelete: userDelete,
    auth: auth,
}
