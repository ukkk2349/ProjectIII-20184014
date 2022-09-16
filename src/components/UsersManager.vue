<template>
  <div>
    <div class="container" style="padding-top: 100px; padding-bottom: 80px">
      <div class="col-sm-8 col-lg-8 offset-sm-2 offset-lg-2">
        <h1>Customer List</h1>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Address</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody v-for="user in users" :key="user.id">
            <tr v-if="user.id > 1">
              <td>{{ user.name }}</td>
              <td>{{ user.address }}</td>
              <td>{{ user.phone_number }}</td>
              <td>{{ user.email }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "UserManager",
  created() {
    if (this.$store.state.idToken === null) {
      this.$router.push("/login");
    }
  },
  data() {
    return {
      users: null,
    };
  },
  async mounted() {
    const response = await axios.get("http://localhost:8080/users");
    this.users = response.data;
  },
};
</script>

<style scoped>
h1 {
  margin-bottom: 40px;
}
</style>
