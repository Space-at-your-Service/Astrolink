<template>
  <div class="main-container">
    <h3 class="section-title">{{ username }}'s Profile</h3>
    
    <div class="inner-block">
      <b-row>
        <b-col>
          <div style="letter-spacing: 2px">   
            <h2>Personal information</h2>
            <ul>
              <li><strong>First name: </strong>{{ firstName }}</li>
              <li><strong>Last name: </strong>{{ lastName }}</li>
            </ul>
          </div>

          <div style="letter-spacing: 2px">
            <h2>Group</h2>
            <ul>
              <li v-for="role in groups" :key="role">
                {{ role }}
              </li>
            </ul>
          </div>

          <div style="letter-spacing: 2px">
            <h2>Permissions</h2>
            <ul>
              <li v-for="permission in permissions" :key="permission">
                {{ permission }}
              </li>
            </ul>
          </div>
        </b-col>

        <b-col >
          <b-avatar id="avatar" size="10rem" class="float-right hover-pointer hover-transparent">
            <img src="https://placekitten.com/300/300" alt="Profile Image"/>
            <b-icon id="avatarEdit" icon="zoom-in"></b-icon>
          </b-avatar>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    data() {
      return {
      }
    },

    computed: {
      ...mapState('user', ['permissions', 'username', 'firstName', 'lastName', 'groups'])
    },

    methods: {
    },

    mounted() {
    }
  }
</script>

<style scoped>
  ul {
    list-style: none;
  }

  #avatarEdit {
    position: absolute; 
    height: 30px; 
    width: 30px; 
    visibility: hidden;
  }

  #avatar:hover #avatarEdit {
    visibility: visible;
  }
</style>