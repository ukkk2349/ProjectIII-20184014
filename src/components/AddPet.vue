<template>
  <div>
    <div class="container" style="padding-top: 80px">
      <h1>Add Pet</h1>
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
            <label for="inputWeight">Weight</label>
            <input
              type="number"
              step="0.01"
              class="form-control"
              id="inputWeight"
              aria-describedby="weight"
              v-model="weight"
              required
            />
          </div>
          <div class="form-group col-md-4">
            <label for="inputSpecies">Species</label>
            <select
              id="inputSpecies"
              class="form-select"
              v-model="species"
              required
            >
              <option selected>Bird</option>
              <option>Fish</option>
              <option>Dog</option>
              <option>Cat</option>
            </select>
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
          <div class="form-group col-md-4">
            <label for="inputState">State</label>
            <select
              id="inputState"
              class="form-select"
              v-model="state"
              required
            >
              <option selected>Good</option>
              <option>Normal</option>
              <option>Weak</option>
            </select>
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
      images: undefined,
      images_name: "",
      name: "",
      weight: 0,
      species: "Dog",
      description: "",
      price: 0,
      state: "Good",
      sale: 0
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

      const formData1 = {
        name: this.name,
        weight: this.weight,
        species: this.species,
        description: this.description,
        price: this.price,
        state: this.state,
        sale: this.sale,
        images: this.images_name
      };
      this.$store.dispatch("addPet", formData1);
      this.images_name = "";
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
