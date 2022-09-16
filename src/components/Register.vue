<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-8 col-lg-6 offset-sm-2 offset-lg-3">
        <form @submit.prevent="onRegister" action="">
          <div class="form-group">
            <div class="col">
              <label for="name">Your Name</label>
              <input
                type="text"
                class="form-control"
                id="name"
                placeholder="Nguyễn Văn A"
                v-model="name"
                required
              />
            </div>
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              v-model="email"
              required
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
              required
            />
          </div>
          <div class="form-group">
            <label for="date-of-birth">Date of Birth</label>
            <input
              type="date"
              class="form-control"
              id="date-of-birth"
              v-model="dateOfBirth"
              required
            />
          </div>
          <div class="form-group">
            <label for="inputAddress">Address</label>
            <input
              type="text"
              class="form-control"
              id="inputAddress"
              placeholder="1234 Main St"
              v-model="address"
              required
            />
          </div>
          <div class="form-group">
            <label for="phone-number">Phone Number</label>
            <input
              type="text"
              class="form-control"
              id="phone-number"
              v-model="phoneNumber"
              required
            />
          </div>
          <div class="form-group col-md-4">
            <label for="inputState">Gender</label>
            <select
              id="inputState"
              class="form-select"
              v-model="gender"
              required
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <small id="message" style="color: red; font-weight: bold"></small>
          <button type="submit" class="mt-3 mb-3 submit-button">
            Register
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      dateOfBirth: "",
      address: "",
      phoneNumber: "",
      gender: "Male",
    };
  },
  methods: {
    //async onRegister() {
    // const response = await axios.post("register", {
    //     name: this.name,
    //     email: this.email,
    //     password: this.password,
    //     dateOfBirth: this.dateOfBirth,
    //     address: this.address,
    //     phoneNumber: this.phoneNumber,
    //     gender: this.gender
    // });
    // console.log(response)
    //this.$router.push("/")
    //}
    onRegister() {
      const formData = {
        name: this.name,
        email: this.email,
        password: this.password,
        dateOfBirth: this.dateOfBirth,
        address: this.address,
        phoneNumber: this.phoneNumber,
        gender: this.gender,
      };
      this.$store.dispatch("register", formData);
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

label {
  font-weight: bold;
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
