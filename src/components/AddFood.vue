<template>
  <div>
    <div class="container" style="padding-top: 80px">
      <h1>Add Food Page</h1>
      <div class="col-sm-8 col-lg-6 offset-sm-2 offset-lg-3">
        <form @submit.prevent="onSubmit" action="">
          <form id="image-form">
            <label for="images">Images:</label>
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
          </form>
          <div class="form-group">
            <div class="col">
              <label for="name">Name</label>
              <input
                type="text"
                class="form-control"
                id="name"
                placeholder="Golden"
                v-model="name"
                required
              />
            </div>
          </div>
          <div class="form-group">
            <label for="inputCalor">Calories</label>
            <input
              type="number"
              class="form-control"
              id="inputCalor"
              aria-describedby="calories"
              v-model="calories"
              min="0"
              required
            />
          </div>
          <div class="form-group">
            <label for="inputWeight">Weight</label>
            <input
              type="number"
              step="0.01"
              class="form-control"
              id="inputWeight"
              aria-describedby="weight"
              v-model="weight"
              min="0"
              required
            />
          </div>
          <div class="form-group">
            <label for="inputDescription">Description</label>
            <textarea
              class="form-control"
              name="description"
              id="inputDescription"
              cols="30"
              rows="10"
              placeholder="Description here..."
              v-model="description"
            ></textarea>
          </div>
          <div class="form-group">
            <label for="inputPrice">Price</label>
            <input
              type="number"
              step="0.01"
              class="form-control"
              id="inputPrice"
              v-model="price"
              min="0"
              required
            />
          </div>
          <div class="form-group">
            <label for="inputSale">Sale</label>
            <input
              type="number"
              step="0.01"
              class="form-control"
              id="inputSale"
              v-model="sale"
              min="0"
              required
            />
          </div>
          <small id="message" style="color: red; font-weight: bold"></small>
          <button type="submit" class="mt-3 mb-3 submit-button">Add</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AddPet",
  created() {
    if (localStorage.getItem("token") === null) {
      this.$router.push("/login");
    }
  },
  data() {
    return {
      name: "",
      calories: 0,
      weight: 0,
      description: "",
      price: 0,
      sale: 0,
      images: undefined,
      images_name: "",
    };
  },
  methods: {
    updateImage() {
      this.images = this.$refs.file.files;
    },
    async onSubmit() {
      const formData = new FormData(document.getElementById("image-form"));

      for (var image of this.images)
        this.images_name = this.images_name + image.name + ";";
      this.images_name = this.images_name.substring(
        0,
        this.images_name.length - 1
      );

      const data = await axios.post("http://localhost:8080/upload", formData);

      const formData2 = {
        name: this.name,
        calories: this.calories,
        weight: this.weight,
        description: this.description,
        price: this.price,
        sale: this.sale,
        images: this.images_name,
      };
      this.$store.dispatch("addFood", formData2);
    },
  },
};
</script>

<style scoped>
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
