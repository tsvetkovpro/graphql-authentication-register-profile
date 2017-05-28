<template>
    <div class="container grid-480">
        <div class="columns flex-center">
            <div class="column col-12">
                <div class="panel">
                    <div class="panel-body">
                        <form class="form-horizontal">
                            <div class="form-group">
                                <div class="col-3">
                                    <label class="form-label">First Name</label>
                                </div>
                                <div class="col-9">
                                    <input class="form-input" type="text" placeholder="First name" v-model="firstName">
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-3">
                                    <label class="form-label">Last Name</label>
                                </div>
                                <div class="col-9">
                                    <input class="form-input" type="text" placeholder="Last name" v-model="lastName">
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-3">
                                    <label class="form-label">Username</label>
                                </div>
                                <div class="col-9">
                                    <input class="form-input" type="text" placeholder="Username" v-model="username">
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="panel-footer form-horizontal">
                    <div class="form-group">
                        <div class="col-3"></div>
                        <div class="col-9">
                            <button class="btn btn-link" v-on:click="submit">Submit</button>
                            <button class="btn btn-link" v-on:click="cancel">Cancel</button>
                            <button class="btn btn-link" v-on:click="deleteUser">Delete user</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import gql from 'graphql-tag'
    import localStorage from 'localStorage'

    import auth from '../../auth'

    export default {
        data: () => ({
            username: null,
            firstName: null,
            lastName: null,

            id: null,
            user: {}
        }),
        methods: {
            submit(){
                this.$apollo.mutate({
                    mutation: gql`mutation a($id: ID!,$username: String!, $firstName:String, $lastName:String!) {
                    userUpdate(id: $id, data:{ username: $username, firstName: $firstName, lastName:$lastName})}`,
                    variables: {
                        id: this.id,
                        username: this.username,
                        firstName: this.firstName,
                        lastName: this.lastName,
                    }
                }).then((data) => {
                  //  alert("Success")
                }).catch((error) => {
                    alert(error.graphQLErrors[0].message)
                })
            },
            deleteUser(){
                this.$apollo.mutate({
                    mutation: gql`mutation a($id: ID!) { userDelete(id: $id)}`,
                    variables: {
                        id: this.id,
                    }
                }).then((data) => {
                    auth.logout()
                }).catch((error) => {
                    alert(error.graphQLErrors[0].message)
                })
            },
            cancel(){
                this.$router.push('/')
            }
        },
        apollo: {
            user: {
                query: gql`query a($id: ID!) { user(id: $id) { username, firstName, lastName}}`,
                variables() {
                    return {
                        id: this.id,
                    }
                },
                result(data){
                    this.username = data.user.username
                    this.firstName = data.user.firstName
                    this.lastName = data.user.lastName
                },
            }
        },
        created(){
            this.id = localStorage.getItem('id')
        }
    }
</script>