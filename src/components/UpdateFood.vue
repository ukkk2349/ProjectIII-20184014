<template>
  <div>
    <div class="container" style="padding-top: 80px">
      <h1>Update Food Infomation</h1>
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
                  placeholder="Golden"
                  v-model="food.name"
                />
              </div>
            </div>
            <div class="form-group">
              <label for="inputWeight">Calories</label>
              <input
                type="number"
                class="form-control"
                id="inputWeight"
                aria-describedby="weight"
                v-model="food.calories"
                min="0"
              />
            </div>
            <div class="form-group">
              <label for="inputWeight">Weight</label>
              <input
                type="number"
                class="form-control"
                id="inputWeight"
                aria-describedby="weight"
                v-model="food.weight"
                min="0"
                step="0.01"
              />
            </div>
            <div class="form-group">
              <label for="inputDescription">Description</label>
              <textarea
                class="form-control"
                name="description"
                id="inputDescription"
                cols="30"
                rows="8"
                placeholder="Description here..."
                v-model="food.description"
              ></textarea>
            </div>
            <div class="form-group">
              <label for="inputPrice">Price</label>
              <input
                type="number"
                class="form-control"
                id="inputPrice"
                v-model="food.price"
                min="0"
                step="0.01"
              />
            </div>
            <div class="form-group">
              <label for="inputSale">Sale</label>
              <input
                type="number"
                class="form-control"
                id="inputSale"
                v-model="food.sale"
                min="0"
                step="0.01"
              />
            </div>
            <div class="form-group col-md-4">
              <label for="inputStock">Stock</label>
              <input
              type="number"
              step="1"
              class="form-control"
              id="inputStock"
              v-model="food.stock"
              min="0"
              required
            />
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
  name: "updateFood",
  created() {
    if (this.$store.state.idToken === null) {
      this.$router.push("/login");
    }
  },
  data() {
    return {
      food: {}
    };
  },
  async mounted() {
    this.food.id = this.$route.params.id
    const response = await axios.get(`http://localhost:8080/food/find-id/${this.food.id}`)
    this.food = response.data
  },
  methods: {
    
    onSubmit() {
      this.$store.dispatch("updateFood", this.food);
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
