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
          <h1 class="title">Change Avatar</h1>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-4 col-sm-8 offset-lg-4 offset-sm-2">
          <form action="" class="form" id="avatar-form" @submit.prevent="onSubmit">
            <label for="images" class="fw-bold">New Avatar</label>
            <input
              id="images"
              class="form-control mt-3"
              type="file"
              name="filetoupload"
              ref="file"
              multiple
              @change="updateImage"
              required
            />
            <small id="message" class="fw-bold" style="color: red"></small>
            <div class="col-6 offset-3">
              <button type="submit" class="submit-button mt-3 mb-3 uppercase">Update Avatar</button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ChangeAvatar',
  data() {
    return {
      user: {},
      avatar: ''
    }
  },
  async mounted() {
    const response = await axios.get(`http://localhost:8080/user/${this.$store.state.userId}`)
    this.user = response.data
  },
  methods: {
    updateImage() {
      this.avatar = this.$refs.file.files;
    },
    async onSubmit() {
      const formData = new FormData(document.getElementById("avatar-form"));
      const data = await axios.post("http://localhost:8080/upload", formData);

      this.user.avatar = this.avatar.name;
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
.red {
  color: red
}
</style>
