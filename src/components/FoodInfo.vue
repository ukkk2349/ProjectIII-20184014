<template>
  <div>
    <div class="container-fluid" style="padding-top: 80px">
      <div class="row">
        <div class="col-sm-6 text-start">
          <div class="bread-crumb">
            <router-link
              class="back-to-home"
              to="/"
              title="Back to the frontpage"
              >Home</router-link
            >
            <i class="fas fa-angle-right"></i>
            <strong>{{ food.name }}</strong>
          </div>
        </div>
      </div>

      <div class="content">
        <div class="row">
          <div class="col-lg-5 col-md-7 col-sm-12 col-12">
            <div class="row">
              <div class="col-sm-2 gutter pt-4">
                <div class="image-track w-100">
                  <div
                    class="mini-image mb-3"
                    v-for="(image, index) in food.images_arr"
                    :key="image"
                  >
                    <img
                      @click="selectedImg = index"
                      class="img-responsive w-100 lazy-loaded"
                      :src="require(`@/assets/${image}`)"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div class="col-sm-10 gutter">
                <div
                  class="product-img"
                  v-for="(image, index) in food.images_arr"
                  :key="image"
                >
                  <img
                    class="img-fluid"
                    :src="require(`@/assets/${image}`)"
                    v-if="selectedImg == index"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-5 col-sm-12 col-12">
            <div class="detail text-start">
              <h2 class="product-title">{{ food.name }}</h2>
              <div class="product-">
                <strike style="color: #88888f">${{ food.price }}</strike>
                <h4 style="color: #ff7a00; font-weight: bold">
                  ${{ food.sale }}
                </h4>
                <hr />
              </div>
              <div class="product-summary mb-3">
                <span class="weight"> Net Weight: {{ food.weight }} kg </span>
                <br />
                <span class="calories mb-1">
                  Calories: {{ food.calories }}
                </span>
                <p class="mb-0 pb-0" style="white-space: pre-line">
                  {{ food.description }}
                </p>
                <span class="stock mb-1">
                  Stock: {{ food.stock }}
                </span>
              </div>
              <form @submit.prevent="addToCart" action="">
                <small
                  id="message"
                  style="color: red; font-weight: bold"
                ></small>
                <span v-if="!food.stock" style="color: red; font-weight: bold">Out of Stock</span>
                <br />
                <button class="btn-action" type="submit" :disabled="!food.stock">Add To Cart</button>
              </form>
            </div>
          </div>
          <div class="col-lg-3 col-md-12 col-12"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Pet Infomation",
  created() {},
  data() {
    return {
      food: {
        id: this.$route.params.id,
        name: "",
        calories: 0,
        weight: "",
        description: "",
        price: 0,
        sale: 0,
        images: "",
        images_arr: null,
      },
      selectedImg: 0,
    };
  },
  async mounted() {
    const response = await axios.get(
      `http://localhost:8080/food/find-id/${this.food.id}`
    );
    this.food = response.data;

    this.food.images_arr = this.food.images.split(";");
  },
  methods: {
    addToCart() {
      if (this.$store.state.idToken === null) {
        this.$router.push("/login");
      }
      const formData = {
        productId: this.food.id,
        infomation: this.food.name,
        quantity: 1,
      };
      this.$store.dispatch("addToCart", formData);
    },
  },
};
</script> 

<style scoped>
.row {
  font-family: "Quicksand", sans-serif;
}
.bread-crumb {
  font-family: "Quicksand", sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #878787;
}
.bread-crumb .back-to-home {
  color: #000;
  text-decoration: none;
}
.bread-crumb .back-to-home:hover {
  text-decoration: underline;
}
.bread-crumb i {
  padding: 0 10px;
  color: #878787;
}
.content .detail p {
  font-size: 14px;
  color: #a8a8a8;
  line-height: 28px;
  font-weight: 400;
  padding-bottom: 30px;
}

.content .detail .btn-action {
  border: none;
  padding: 0 39px;
  height: 55px;
  font-size: 14px;
  background: #ff7a00;
  letter-spacing: 0.2em;
  justify-content: center;
  text-transform: uppercase;
  font-weight: 600;
  color: #fff;
  transition: 0.3s;
  text-align: center;
}
.mini-image:hover {
  cursor: pointer;
}
</style>
