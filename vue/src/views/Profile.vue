<template>
  <div class="main-container" style="position: relative;">
    <h3 class="section-title">{{ username }}'s Profile </h3>

    <div class="inner-block" style="position: relative;">
          <div style="letter-spacing: 2px">   
            <h2>Personal information</h2>
            <ul>
              <li><strong>First name: </strong>{{ firstName }}</li>
              <li><strong>Last name: </strong>{{ lastName }}</li>
              <li><strong>Age: </strong>{{ lastName }}</li>
              <li><strong>Nationality: </strong>{{ lastName }}</li>
            </ul>
          </div>

          <div style="letter-spacing: 2px">
            <h2>Role</h2>
            <ul>
              <li v-for="group in groups" :key="group.role">
                <strong>{{group.unit}}</strong> {{ group.role }} 
              </li>
            </ul>
          </div>

          <div style="letter-spacing: 2px">
            <h2>Permissions</h2>

            <ul>
              <li v-for="permission in permissionsReadable" :key="permission">
                {{ permission }}
              </li>
            </ul>
          </div>

          <b-avatar id="avatar" size="10rem" class="float-right hover-pointer hover-transparent" style="position: absolute; top: 20px; right: 20px">
            <img src="https://placekitten.com/300/300" alt="Profile pic"/>
            <b-icon id="avatarEdit" icon="zoom-in"></b-icon>
          </b-avatar>
    </div>

    <div style="font-size: x-large; position: absolute; top: 30px; right: 100px;">
      <b-dropdown variant="link" no-caret>
        <template #button-content>
          <span style="color: white"><b-icon icon='gear-fill' class="float-right"></b-icon></span>
        </template>

        <b-dropdown-item v-b-modal.passwordModal>Change password</b-dropdown-item>
      </b-dropdown>
    </div>

    <b-modal 
      id="passwordModal"
      ref="passwordModal"
      title="Change your password"
      @hidden="resetPasswordModal"
      @ok="okPassword"
      centered
      header-bg-variant="warning"
      ok-variant="warning"
      size="sm">

      <form @submit.stop.prevent="okPassword">
        <b-form-group
          label="Current password"
          label-for="currentPasswordInput"
        >
          <b-form-input
            id="currentPasswordInput"
            v-model="passwordForm.currentPassword"
            type="password"
            required>
          </b-form-input>
        </b-form-group>

        <b-form-group
          label="New password"
          label-for="newPasswordInput"
        >
          <b-form-input
            id="newPasswordInput"
            v-model="passwordForm.newPassword"
            type="password"
            required>
          </b-form-input>
        </b-form-group>

        <b-form-group
          label="Confirm new password"
          label-for="confirmPasswordInput"
        >
          <b-form-input
            id="confirmPasswordInput"
            v-model="passwordForm.confirmPassword"
            type="password"
            required>
          </b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { mapGetters } from 'vuex'

  export default {
    data() {
      return {
        passwordForm: {currentPassword: '', newPassword: '', confirmPassword: ''}
      }
    },

    computed: {
      ...mapState('user', ['permissions', 'username', 'firstName', 'lastName', 'groups']),
      ...mapGetters('user', ['permissionsReadable'])
    },

    methods: {
      checkPassword() {
        return true
      },
      okPassword() {
        if (!this.checkPassword()) return
        else this.changePassword({oldPassword: this.passwordForm.currentPassword, newPassword: this.passwordForm.newPassword})
      },
      changePassword(payload) {
        this.$store.dispatch('user/changePassword', payload)
      },
      resetPasswordModal() {
        
      }
    },

    mounted() {
    }
  }
</script>

<style scoped>
  h2 {
    color: navy;
  }

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