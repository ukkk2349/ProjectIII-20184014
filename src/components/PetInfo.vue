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
            <strong>{{ pet.name }}</strong>
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
                    v-for="(image, index) in pet.images_arr"
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
                  v-for="(image, index) in pet.images_arr"
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
              <h2 class="product-title">{{ pet.name }}</h2>
              <div class="product-">
                <strike style="color: #88888f">${{ pet.price }}</strike>
                <h4 style="color: #ff7a00; font-weight: bold">
                  ${{ pet.sale }}
                </h4>
                <hr />
              </div>
              <div class="product-summary">
                <span class="weight">
                  Weight: <span style="color: black">{{ pet.weight }} kg</span>
                </span>
                <br />
                <span class="state">
                  State: <span style="color: black">{{ pet.state }}</span>
                </span>
                <p class="mb-0" style="white-space: pre-line">
                  {{ pet.description }}
                </p>
              </div>
              <form @submit.prevent="addToCart" action="">
                <small
                  id="PetInfoMessage"
                  style="color: red; font-weight: bold"
                ></small>
                <span v-if="!pet.stock" style="color: red; font-weight: bold">Out of Stock</span>
                <br />
                <button class="btn-action" type="submit" :disabled="!pet.stock">Add To Cart</button>
              </form>
            </div>
          </div>
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
      pet: {
        id: this.$route.params.id,
        name: "",
        weight: "",
        price: 0,
        species: "",
        description: "",
        state: "",
        sale: 0,
        images: "",
        images_arr: null,
        stock: 0
      },
      selectedImg: 0,
    };
  },
  async mounted() {
    const response = await axios.get(
      `http://localhost:8080/pet/find-id/${this.pet.id}`
    );
    this.pet = response.data;

    this.pet.images_arr = this.pet.images.split(";");
  },
  methods: {
    addToCart() {
      if (this.$store.state.idToken === null) {
        this.$router.push("/login");
      }
      const formData = {
        productId: this.pet.id,
        infomation: this.pet.name,
        quantity: 1,
      };
      this.$store.dispatch("addToCart", formData);
      this.$emit('change', 1)
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
.product-img img{
  max-height: 400px;
}
.product-summary span {
  font-weight: 700;
}
</style>
