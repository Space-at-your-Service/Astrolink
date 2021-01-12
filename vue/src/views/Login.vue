<template>
    <div class="main-container">
        <div class="inner-block">
            <div v-if="!this.$store.state.auth.status.loggedIn">
                <h3 class="text-center">Login</h3>

                <b-form @submit.prevent="handleLogin">
                    <b-form-group label="Username" label-for="username">
                        <b-form-input 
                        id="username" 
                        v-model="user.username" 
                        type="text"
                        
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group label="Password" label-for="password">
                        <b-form-input 
                        id="password" 
                        v-model="user.password" 
                        type="password"
                        
                        ></b-form-input>
                    </b-form-group>

                    <b-button type="submit" size="lg" variant="dark" block>Log in</b-button>
                </b-form>
            </div>

            <div v-else>
                <h3>Welcome admin !</h3>
                <b-button variant="dark" size="lg" block @click="logout">Log out</b-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import {mapState} from 'vuex'
    import User from '../models/user'

    export default {
        data() {
            return {
                user: new User(),
                loading: false,
                message: ''           
            }
        },
        computed: {
            ...mapState('auth', [
                'loggedIn'
            ])
        },
        methods: {
            ...mapActions('auth', [
                'login', 
                'logout'
            ]),

            handleLogin() {
                this.loading = true
                // this.$validator.validateAll().then(isValid => {
                //     if (!isValid) {
                //         this.loading = false
                //         return
                //     }
                // })

                if (this.user.username && this.user.password) {
                    this.login(this.user)
                    .then(() => {
                            this.$router.push('/flightplan')
                        },
                        error => {
                            this.loading = false
                            this.message = (
                                error.response && error.response.data
                                || error.message
                                || error.toString()
                            )
                        }
                    )
                }
            }
        }
    }
</script>

<style>
    h3 {
        text-align: center;
        padding-bottom: 20px;
    }
</style>