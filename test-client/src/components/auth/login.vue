<template>
    <div class="flex-center">
        <form class="item">
            <div class="toast text-center" v-if="show">{{error}}</div>
            <div class="form-group input-group mt-10">
                <input type="text" class="form-input" placeholder="Username" v-model="username">
                <router-link class="btn btn-link input-group-btn sign" to="register" tabindex="-1">Sign up</router-link>
            </div>
            <div class="form-group input-group">
                <input type="password" class="form-input" placeholder="Password" v-model="password">
                <a type="submit" class="btn btn-link input-group-btn" v-on:click="submit">Sign in</a>
            </div>
        </form>
    </div>
</template>

<script>
    import gql from 'graphql-tag'
    import localStorage from 'localStorage'

    export default {
        data(){
            return {
                username: null,
                password: null,

                error: null,
                show: null
            }
        },
        methods: {
            submit(){
                this.$apollo.mutate({
                    mutation: gql`mutation a($username: String!,$password: String!) {
                    auth(username: $username, password:$password){id, public_key}}`,
                    variables: {
                        username: this.username,
                        password: this.password,
                    }
                }).then((data) => {
                    localStorage.setItem('id', data.data.auth.id)
                    localStorage.setItem('public_key', data.data.auth.public_key)
                    this.$router.go('/')
                }).catch((error) => {
                    this.error = error.graphQLErrors[0].message
                    this.show = true
                })
            }
        },

    }
</script>

<style>
    @import "../../static/main.css";
</style>