# Graphql authentication, register, profile
Full-stack example with authorization, registration, personal profile, editing and deleting data.

## Demo | click picture to watch full demo
[![](https://github.com/nikitamarcius/graphql-authentication-register-profile/blob/master/profile.png)](https://www.youtube.com/watch?v=2LDKGKItqgI)

## Under the hood
- **Client**: Apollo GraphQL + Vue Apollo+ Vue2+ Vue router + LocalStorage
- **Server**: Apollo GraphQL + Koa2 + Mongoose & MongoDB + JWT

## Installation

```
git clone https://github.com/nikitamarcius/graphql-authentication-register-profile
```
for each folder: **test-client** and **test-server** perform separate installation:

```
$ cd <folder-name>
$ npm i
$ npm run dev
```

Set up your connection to MongoDB in **test-server > src > db.js**:

```
mongoose.connect('mongodb://localhost:27017/test')
```

connection [docs](http://mongoosejs.com/docs/connections.html)

## Tutorials 
- <img src="https://cdn-static-1.medium.com/_/fp/icons/favicon-medium.TAS6uQ-Y7kcKgi0xjcYHXw.ico" alt="icon" width="15" height="15"/>  [Tutorial: GraphQL authentication, register, profile](https://medium.com/@nikita.marcius/tutorial-graphql-authentication-register-profile-16c9eac919a2)
