<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-8 col-lg-6 offset-sm-2 offset-lg-3">
        <form @submit.prevent="onSubmit" action="">
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              v-model="email"
            />
            <small id="emailHelp" class="form-text text-muted"
              >We'll never share your email with anyone else.</small
            >
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              v-model="password"
            />
          </div>
          <small id="wrong-login" style="color: red; font-weight: bold"></small>
          <div class="forgot-password">
            <router-link to="/resetpassword">Forgot your password?</router-link>
          </div>
          <button type="submit" class="mt-3 mb-3 submit-button">Submit</button>
          <div class="box-register">
            <span class="or-register mr-2"> Don't have an account? </span>
            <router-link to="/register">Sign Up!</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      users: null,
    };
  },
  async mounted() {
    const response = await axios.get("http://localhost:8080/users");
    this.users = response.data;
  },
  methods: {
    onSubmit() {
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password,
        users: this.users,
      });
    },
  },
};
</script>

<style scoped>
.row {
  padding-top: 80px;
}
form {
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
