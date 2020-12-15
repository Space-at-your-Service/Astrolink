<template>
  <div class="main-container">
    <h3 class="section-title">{{user.username}} Profile</h3>
{{user}}
    <b-container style="letter-spacing: 2px">
      <h2>Personal information</h2>
      <ul>
        <li><strong>First name:</strong> {{user.first_name}}</li>
        <li><strong>Last name:</strong> {{user.last_name}}</li>
      </ul>
    </b-container>

    <b-container style="letter-spacing: 2px">
      <h2>Group</h2>
      <ul>
        <li v-for="role in user.groups" :key="role">
          {{ role }}
        </li>
      </ul>
    </b-container>

    <b-container style="letter-spacing: 2px">
      <h2>Permissions</h2>
      <ul>
        <li v-for="permission in user.permissions" :key="permission">
          {{ permission }}
        </li>
      </ul>
    </b-container>
  </div>
</template>

<script>
  import ProfileService from '../services/ProfileService'

  export default {
    data() {
      return {
        user: undefined
      }
    },
    computed: {

    },
    methods: {
      getUserProfile() {
        ProfileService.getUserProfile()
        .then(response => {
          this.user = response.data
        })
      }
    },
    mounted() {
      this.getUserProfile()
    }
  };
</script>

<style scoped>
  ul {
    list-style: none;
  }
</style>