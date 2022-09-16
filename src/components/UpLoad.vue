<template>
  <div>
    <form
      id="form"
      style="padding-top: 80px"
      method="post"
      enctype="multipart/form-data"
    >
      <input
        type="file"
        name="filetoupload"
        ref="file"
        @change="handleFile()"
        accept="image/*"
        multiple
      /><br />
      <button @click.prevent="onSubmit" type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      files: undefined,
    };
  },
  methods: {
    // uploadFile (event) {
    // this.files = event.target.files
    // },
    // onSubmit() {
    //   for (const i of Object.keys(this.files)) {
    //       console.log(this.files[i])

    //   }
    // }
    async onSubmit() {
      try {
        const formData = new FormData(document.getElementById("form"));

        for (var file of this.files) {
          console.log(file.name);
        }

        const data = await axios.post("http://localhost:8080/upload", formData);
        console.log("data from backend is ", data);
      } catch (error) {
        console.log(error);
      }
    },
    handleFile() {
      this.files = this.$refs.file.files;
      console.log();
    },
  },
};
</script>

<style scoped>
</style>
