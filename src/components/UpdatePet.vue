<template>
  <div>
    <div class="container" style="padding-top: 80px">
      <h1>Update Pet Infomation</h1>
      <div class="col-sm-8 col-lg-6 offset-sm-2 offset-lg-3">
        <form @submit.prevent="onSubmit" action="">
          <div>
            <h2>Update</h2>
            <div class="form-group" v-if="updateById">
              <div class="col">
                <label for="name">Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  v-model="pet.name"
                />
              </div>
            </div>
            <div class="form-group">
              <label for="inputWeight">Weight</label>
              <input
                type="number"
                class="form-control"
                id="inputWeight"
                aria-describedby="weight"
                v-model="pet.weight"
                min="0"
              />
            </div>
            <div class="form-group col-md-4">
              <label for="inputSpecies">Species</label>
              <select
                id="inputSpecies"
                class="form-select"
                v-model="pet.species"
              >
                <option selected>Bird</option>
                <option>Fish</option>
                <option>Dog</option>
                <option>Cat</option>
              </select>
            </div>
            <div class="form-group">
              <label for="inputPrice">Price</label>
              <input
                type="number"
                class="form-control"
                id="inputPrice"
                v-model="pet.price"
                min="0"
              />
            </div>
            <div class="form-group col-md-4">
              <label for="inputState">State</label>
              <select id="inputState" class="form-select" v-model="pet.state">
                <option selected>Good</option>
                <option>Normal</option>
                <option>Weak</option>
              </select>
            </div>
            <div class="form-group">
              <label for="inputSale">Sale</label>
              <input
                type="number"
                class="form-control"
                id="inputSale"
                v-model="pet.sale"
                min="0"
              />
            </div>
            <div class="form-group col-md-4">
              <label for="inputStock">Stock</label>
              <select id="inputStock" class="form-select" v-model="pet.stock">
                <option value="0">Sold Out</option>
                <option value="1">Stocking</option>
              </select>
            </div>
            <small id="message2" style="color: red; font-weight: bold"></small>
            <br />
            <button type="submit" class="mt-3 mb-3 submit-button">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "UpdatePet",
  created() {
    if (this.$store.state.idToken === null) {
      this.$router.push("/login");
    }
  },
  data() {
    return {
      pet: {}
    };
  },
  async mounted() {
    this.pet.id = this.$route.params.id
    const response = await axios.get(`http://localhost:8080/pet/find-id/${this.pet.id}`)
    this.pet = response.data
  },
  methods: {
    onSubmit() {
      this.pet.stock = 1
      this.$store.dispatch("updatePet", this.pet);
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
  width: 50%;
  border: none;
  padding: 3%;
  text-transform: uppercase;
  font-weight: 700;
  box-sizing: border-box;
}
</style>
