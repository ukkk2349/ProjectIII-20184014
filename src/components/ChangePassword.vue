<template>
  <div>
    <div class="container-fluid" style="padding-top: 80px">
      <div class="row title text-start">
        <div class="col-10 offset-1">
          <h1 class="title uppercase">My account</h1>
          <span class="dashboard uppercase">
            <strong class="">Dashboard</strong>
          </span>
        </div>
      </div>

      <div class="row mt-4 mb-4">
        <div class="title">
          <h1 class="title">Change Password</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4 col-sm-8 offset-lg-4 offset-sm-2">
          <form @submit.prevent="onSubmit" class="form">
            
              <div class="form-group text-start">
                <label for="old-password mt-4" class="form-label">Old Password <span class="red fw-bold">*</span></label>
                <input class="form-control" id="old-password" type="password" required v-model="oldPassword" autofocus>
              </div>
            
              <div class="form-group mt-4 text-start">
                <label for="new-password" class="form-label">New Password <span class="red fw-bold">*</span></label>
                <input class="form-control" id="new-password" type="password" v-model="newPassword" required>
              </div>
            
              <div class="form-group mt-4 text-start">
                <label for="confirm-password" class="form-label">Confirm Password <span class="red fw-bold">*</span></label>
                <input class="form-control" id="confirm-password" type="password" v-model="confirmPassword" required>
              </div>
              <small class="red fw-bold" v-if="!matchPassword">The password confirmation does not match</small>
              <small id="message" class="red fw-bold"></small>
            <button type="submit" class="submit-button mt-3 mb-3 uppercase">Update Password</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChangePassword',
  data() {
    return {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      matchPassword: 1
    }
  },
  methods: {
    onSubmit() {
      if(this.newPassword1 != this.newPassword2) {
        this.matchPassword = 0
      }
      else {
        this.matchPassword = 1
        var formData= {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword
        }
        this.$store.dispatch('changePassword', formData)
      }
    }
  }
}
</script>

<style scoped>
.row.title {
  background-color: #e1e5ea;
  padding: 13px 20px;
}
.row.title h1.title {
  font-size: 25px;
  font-weight: 600;
}
.row.title .dashboard {
  color: #a7bbc7;
}
.uppercase {
  text-transform: uppercase;
}
form.form {
  background-color: #faf5ef;
  padding: 5%;
  border-radius: 5%;
  font-family: "Quicksand", sans-serif;
}
button.submit-button {
  background-color: #171a1d;
  color: white;
  width: 100%;
  border: none;
  padding: 3%;
  text-transform: uppercase;
  font-weight: 700;
  box-sizing: border-box;
}
.red {
  color: red
}
</style>
