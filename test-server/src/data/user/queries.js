import {
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt
} from 'graphql'

import {UserModel, UserType, UserInput} from './models'

export const user = {
    type: UserType,
    args: {
        id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve (root, args, options) {
        return UserModel.findById(args.id).exec();
    }
}

export const users = {
    type: new GraphQLList(UserType),
    args: {
        count: {
            type: GraphQLInt
        }
    },
    resolve (root, args, options) {
        return UserModel.find().limit(args.count).exec()
    }
}

export default {
    user: user,
    users: users,
}

