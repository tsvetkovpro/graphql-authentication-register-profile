<template>
    <div class="flex-center">
        <form class="item">
            <div class="toast text-center" v-if="show">{{error}}</div>
            <div class="form-group input-group mt-10">
                <input type="text" class="form-input" placeholder="First Name" v-model="firstName">
                <router-link class="btn btn-link input-group-btn" to="auth" tabindex="-1">Sign in</router-link>
            </div>
            <div class="form-group">
                <input type="text" class="form-input" placeholder="Last name" v-model="lastName">
            </div>
            <div class="form-group">
                <input type="text" class="form-input" placeholder="Username" v-model="username">
            </div>
            <div class="form-group input-group">
                <input type="password" class="form-input" placeholder="Password" v-model="password">
                <a type="submit" class="btn btn-link input-group-btn sign" v-on:click="submit">Sign up</a>
            </div>
        </form>
    </div>
</template>

<script>
    import gql from 'graphql-tag'

    export default {
        data:() => ({
            username: null,
            password: null,
            firstName: null,
            lastName: null,

            error: '',
            show: ''
        }),
        methods: {
            submit(){
                this.$apollo.mutate({
                    mutation: gql`mutation a($username:String!, $password:String!, $firstName:String!, $lastName:String!) {
                    userCreate(data:{username:$username, password:$password, firstName:$firstName, lastName:$lastName})}`,
                    variables: {
                        username: this.username,
                        password: this.password,
                        firstName: this.firstName,
                        lastName: this.lastName,
                    }
                }).then((data) => {
                    this.$router.push('/auth')
                }).catch((error) => {
                    this.error = error.graphQLErrors[0].message
                    this.show = true
                })
            }
        }
    }
</script>