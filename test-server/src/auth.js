import jwt from 'jsonwebtoken'

import mongoose from './db'

const UserModel = mongoose.model('User')

export const validateToken = async (authToken) => {
    const auth = await UserModel.findOne({public_key: authToken})
    if (!auth) throw  new Error('Error token')

    const decode = await jwt.verify(authToken, auth.private_key)
    if (!decode) throw  new Error('Error decode')
}