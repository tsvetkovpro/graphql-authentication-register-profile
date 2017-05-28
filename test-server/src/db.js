import mongoose from 'mongoose'

mongoose.Promise = global.Promise
mongoose.connection.on('open', function (ref) {
    console.log('Connected to mongo server.')
})
mongoose.connection.on('error', function (err) {
    console.log('Could not connect to mongo server!')
    console.log(err)
})
mongoose.connect('mongodb://127.0.0.1:8088/graphqlauth')

export default mongoose




