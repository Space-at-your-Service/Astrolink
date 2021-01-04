<template>
    <div class="main-container">
        <div class="inner-block">
            <h3 class="text-center">New account</h3>
               
            <form class="mt-3" @submit.prevent="handleRegister">
                <b-form-group label="First Name" label-for="firstName">
                    <b-form-input id="firstName" type="text"></b-form-input>
                </b-form-group>

                <b-form-group label="Last Name" label-for="lastName">
                    <b-form-input id="lastName" type="text"></b-form-input>
                </b-form-group>

                <b-form-group label="Role" label-for="role">
                    <b-form-input id="role" type="text"></b-form-input>
                </b-form-group>

                <b-form-group label="Password" label-for="password">
                    <b-form-input id="password" type="password"></b-form-input>
                </b-form-group>

                <b-form-group label="Repeat Password" label-for="passwordRepeat">
                    <b-form-input id="passwordRepeat" type="password"></b-form-input>
                </b-form-group>

                <b-button type="submit" size="lg" variant="dark" block>Register</b-button>
            </form>

            <p class="text-right">
                Back to 
                <router-link :to="{name: 'login'}">login</router-link>
            </p>
        </div>
    </div>
</template>

<script>
    import User from '../models/user'

    export default {
        data() {
            return {
                user: new User(),
                submitted: false,
                successful: false,
                message: ''

            }
        },
        computed: {
            loggedIn() {
                return this.$store.state.auth.status.loggedIn;
    }
        },
        methods: {
            handleRegister() {
                this.message = '';
                this.submitted = true;
                this.$validator.validate()
                .then(isValid => {
                    if (isValid) {
                        this.$store.dispatch('auth/register', this.user)
                        .then(data => {
                                this.message = data.message
                                this.successful = true
                            },
                            error => {
                                this.message =
                                (error.response && error.response.data) 
                                || error.message 
                                || error.toString()
                                this.successful = false
                            }
                        )
                    }
                })
            }
        }
    }
</script>