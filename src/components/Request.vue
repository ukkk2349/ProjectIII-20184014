<template>
  <div>
    <div class="container" style="padding-top: 80px">
      <h1>Looking for a Pet?</h1>
      <div class="col-sm-8 col-lg-6 offset-sm-2 offset-lg-3">
        <form @submit.prevent="onSubmit" action="">
          <div class="mb-3 row text-start">
            <label class="col-sm-1 col-form-label" for="type">Type</label>
            <div class="col-sm-3">
              <select
                id="type"
                class="form-select"
                v-model="type"
              >
                <option value="Dog" selected>Dog</option>
                <option value="Cat">Cat</option>
                <option value="Fish">Fish</option>
                <option value="Bird">Bird</option>
              </select>
            </div>
          </div>
          <div class="form-group text-start">
            <div class="col">
              <label for="description">Description</label>
              <textarea
                class="form-control w-100 mt-2"
                name=""
                id="description"
                cols="30"
                rows="5"
                v-model="description"
                placeholder="Species, Weight, Feather color,..."
              ></textarea>
            </div>
          </div>
          <div class="form-group mt-3 text-start">
            <label for="inputPrice">How much could you pay for this pet?</label>
            <div class="input-group mt-2">
              <span class="input-group-text" id="inputPrice">$</span>
              <input
                class="form-control"
                id="inputPrice"
                v-model="price"
                min="0"
              />
            </div>
            
          </div>
          <small id="message" style="color: red; font-weight: bold"></small>
          <div class="form-check text-start mt-4">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckChecked"
              required
            />
            <label class="form-check-label" for="flexCheckChecked">
              I agree with the terms and conditions of your organization
            </label>
          </div>
          <button
            type="submit"
            class="mt-3 mb-3 submit-button"
            
          >
            Request
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Request",
  created() {
    if (this.$store.state.idToken === null) {
      this.$router.push("/login");
    }
  },
  data() {
    return {
      type: "Dog",
      description: "",
      price: 0,
    };
  },
  methods: {
    onSubmit() {
      const formData = {
        type: this.type,
        detail: this.description,
        range: this.price
      };
      this.$store.dispatch("request", formData);
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
