<template>
  <div>
    <div class="container-fluid" style="padding-top: 80px">
      <!-- dashboard -->
      <div class="row title text-start">
        <div class="col-10 offset-1">
          <h1 class="title uppercase">My account</h1>
          <span class="dashboard uppercase">
            <strong class="">Dashboard</strong>
          </span>
        </div>
      </div>

      <!-- title -->
      <div class="row mt-4 mb-4">
        <div class="title">
          <h1 class="title">Edit Profile</h1>
        </div>
      </div>

      <div class="col-lg-6 col-sm-8 offset-lg-3 offset-sm-2">
        <form @submit.prevent="onSubmit" class="form">
          <div class="mb-3 row">
            <label for="username" class="col-sm-3 col-form-label gutter">Name</label>
            <div class="col-sm-9 gutter">
              <input type="text" class="form-control" id="username" v-model="user.name">
            </div>
          </div>
          <div class="mb-3 row">
            <label for="email" class="col-sm-3 col-form-label">Email</label>
            <div class="col-sm-9">
              <input type="text" class="form-control" id="email" v-model="user.email">
            </div>
          </div>
          <div class="mb-3 row">
            <label for="date-of-birth" class="col-sm-3 col-form-label">Birthday</label>
            <div class="col-sm-9">
              <input type="date" class="form-control" id="date-of-birth" v-model="user.date_of_birth">
            </div>
          </div>
          <div class="mb-3 row">
            <label for="address" class="col-sm-3 col-form-label">Address</label>
            <div class="col-sm-9">
              <input type="text" class="form-control" id="address" v-model="user.address">
            </div>
          </div>
          <div class="mb-3 row">
            <label for="phone" class="col-sm-3 col-form-label">Phone</label>
            <div class="col-sm-9">
              <input type="tel" class="form-control" id="phone" v-model="user.phone_number">
            </div>
          </div>
          <div class="mb-3 row">
            <label class="col-sm-3 col-form-label" for="gender">Gender</label>
            <div class="col-sm-3">
              <select
                id="gender"
                class="form-select"
                v-model="user.gender"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <small id="message" class="fw-bold" style="color: red"></small>
          <div class="row">
            <div class="col-6 offset-3">
              <button type="submit" class="submit-button mt-3 mb-3 uppercase">Update</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ChangeProfile',
  created() {
    if (this.$store.state.idToken === null) {
      this.$router.push("/login");
    }
  },
  data() {
    return {
      user: {}
    }
  },
  async mounted() {
    const response = await axios.get(`http://localhost:8080/user/${this.$store.state.userId}`)
    this.user = response.data
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('updateProfile', this.user)
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
</style>
