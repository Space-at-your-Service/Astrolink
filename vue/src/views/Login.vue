<template>
    <div class="main-container" style="align-items: center">
        <img src="https://i.postimg.cc/2j29FCsF/Astrolink-logo-white.png" alt="a" style="width: 300px; margin: auto; margin-bottom: 100px; margin-top: 50px;"/>
        <div class="inner-block" v-if="!this.$store.state.auth.status.loggedIn" style="position: relative;">
            <h3 class="text-center">Login</h3>

            <div style="font-size: 2em;">
                <b-icon id="help" icon="question-circle" variant="dark" style="position: absolute; top:15px; right: 15px;"></b-icon>
                <b-tooltip target="help" triggers="hover" placement="top">
                    <strong style="font-size: larger;">Don't have an account yet ?</strong><br/>
                    Ask it to the current Asclepios member in charge of Astrolink administration.
                </b-tooltip>
            </div>

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

                <div></div>

                <b-button type="submit" size="lg" variant="dark" block>
                    <span v-if="!loading">Log in</span>
                    <b-spinner v-if="loading" type="grow" variant="light"></b-spinner>
                </b-button>
            </b-form>
        </div>

        <div v-else>
                <h3>WELCOME !</h3>
        </div>

        <div class="footer text-center" style="position: absolute; bottom: 0px; ">
            Astrolink by Asclepios @2021<br/>
            This web app has been developed by Julien Corsin & Valentin Vierge
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import {mapState} from 'vuex'
    import User from '../models/User'

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
            ...mapActions('auth', ['logout']),

            async handleLogin() {
                
                // this.$validator.validateAll().then(isValid => {
                //     if (!isValid) {
                //         this.loading = false
                //         return
                //     }
                // })

                if (this.user.username && this.user.password) {
                    this.loading = true
                    this.$store.dispatch('auth/login', this.user)
                    .then(() => {
                        this.loading = false
                        this.$router.push('/flightplan')
                    })
                    .catch((err) =>{
                        this.loading = false
                        alert(err.response.data.non_field_errors)
                    })
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