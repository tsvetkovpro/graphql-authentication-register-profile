<template>
    <div class="container grid-960">
        <div class="columns flex-center">
            <div class="profile item">
                <div class="panel">
                    <div class="panel-image">
                        <div class="square">
                            <div class="avatar" v-bind:data-initial="initials"></div>
                        </div>
                    </div>
                    <div class="panel-body">
                        <div class="panel-title">{{user.firstName}} {{user.lastName}}</div>
                        <div class="panel-meta">@{{user.username}}</div>
                    </div>
                </div>
                <div class="panel">
                    <div class="panel-body">
                        <div class="btn-group btn-group-block">
                            <router-link :to="{name:'settings'}" class="btn btn-sm">Settings</router-link>
                            <button class="btn btn-sm" v-on:click="logout">Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import gql from 'graphql-tag'
    import auth from '../../auth'

    export default {
        data: () => ({
            id: null,
            initials: null,

            user: {}
        }),
        apollo: {
            user: {
                query: gql`query a($id: ID!){ user(id: $id){ username, firstName, lastName }}`,
                variables() {
                    return {
                        id: this.id,
                    }
                },
                result(data){
                    this.initials = data.user.firstName[0] + data.user.lastName[0]
                },
                // http://dev.apollodata.com/core/apollo-client-api.html#ApolloClient.watchQuery
                fetchPolicy: 'network-only',
            },
            $subscribe: {
                users: {
                    query: gql`subscription a($id: ID!){user(id: $id){ username, firstName, lastName }}`,
                    variables() {
                        return {
                            id: this.id,
                        }
                    },
                    result(data) {
                        this.user = data.user
                        this.initials = data.user.firstName[0] + data.user.lastName[0]
                    },
                },
            }
        },
        methods: {
            logout(){
                auth.logout()
            }
        },
        created(){
            this.id = this.$route.params.id
        },
    }
</script>

<style>
    @import "../../static/main.css";
</style>

