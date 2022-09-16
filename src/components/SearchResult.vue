<template>
  <div>
    <div class="container-fluid" style="padding-top: 80px">
      <div class="row text-center">
        <h3 class="text-uppercase">
          Your search for
          <span style="font-weight: bold">"{{ search_request }}"</span> revealed
          the following:
        </h3>
      </div>
      <hr />

      <!-- bread crumb -->
      <div class="row">
        <div class="col-sm-6 text-start">
          <div class="bread-crumb">
            <router-link
              class="back-to-home"
              to="/"
              title="Back to the frontpage"
              >Home</router-link
            >
            <i type="button" class="fas fa-angle-right"></i>
            <strong>Search: {{ search_request }}</strong>
          </div>
        </div>
        <div class="col-sm-5 text-end">
          <div class="filter">
            <button class="filter-button" @click="filtering = !filtering">
              <i class="fas fa-filter filter-icon"></i>
              <span class="ms-2">FILTER</span>
            </button>
          </div>
        </div>
        <div class="col-sm-1"></div>
      </div>
      <hr />

      <!-- content -->
      <div class="row">
        <div
          style="transition: 0.2s"
          :class="{ 'col-sm-6': filtering, 'col-md-8': filtering }"
        >
          <!-- pets -->
          <div class="row">
            <h3 class="text-start fw-bold">
              <i class="far fa-list-alt me-1"></i>Pets
            </h3>
            <div class="no-pet" v-if="no_pet">
              <h4 style="text-transform: uppercase">
                YOUR SEARCH FOR "{{ search_request }}" DID NOT YIELD ANY PETS
              </h4>
            </div>
            <div
              class="col-md-3 col-sm-6 col-6 gutter"
              v-for="pet in pets"
              :key="pet.id"
            >
              <div class="product-item" v-if="pet.visible">
                <div class="product-img pet">
                  <router-link :to="'/pet/info/' + pet.id">
                    <img
                      class="img-responsive lazy-loaded"
                      :src="require(`@/assets/${pet.images}`)"
                      alt=""
                    />
                  </router-link>
                </div>
                <div class="product-info">
                  <router-link
                    class="product-name"
                    :to="'/pet/info/' + pet.id"
                    >{{ pet.name }}</router-link
                  >
                  <br />
                  <span
                    ><strike style="color: #88888f"
                      >${{ pet.price }}</strike
                    ></span
                  >
                  <p style="color: #ff7a00; font-weight: bold">
                    ${{ pet.sale }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- food -->
          <div class="row">
            <h3 class="text-start fw-bold">
              <i class="far fa-list-alt me-1"></i>Food
            </h3>
            <div class="no-food" v-if="no_food">
              <h4 style="text-transform: uppercase">
                YOUR SEARCH FOR "{{ search_request }}" DID NOT YIELD ANY FOOD
              </h4>
            </div>
            <div
              class="col-md-3 col-sm-6 col-6 gutter"
              v-for="food in foods"
              :key="food.id"
            >
              <div class="product-item" v-if="food.visible">
                <div class="product-img">
                  <router-link :to="'/food/info/' + food.id">
                    <img :src="require(`@/assets/${food.images}`)" alt="" />
                  </router-link>
                </div>
                <div class="product-info">
                  <router-link
                    class="product-name"
                    :to="'/food/info/' + food.id"
                    >{{ food.name }}</router-link
                  >
                  <br />
                  <strike style="color: #88888f">${{ food.price }}</strike>
                  <p style="color: #ff7a00; font-weight: bold">
                    ${{ food.sale }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- filter -->
        <div
          :class="{ 'col-md-4': filtering, 'col-sm-6': filtering }"
          style="position: relative"
        >
          <div :class="['filter-area', { active: filtering }]">
            <div class="filter-top">
              <h3 class="filter-title">Choose and Find</h3>
            </div>
            <div class="filter-form">
              <form action="">
                <div class="filter-group">
                  <div class="filter-header">Type</div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="species"
                      id="petRadio"
                      value="Pet"
                      checked
                      v-model="filter.type"
                    />
                    <label class="form-check-label" for="petRadio">
                      Pets
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="species"
                      id="foodRadio"
                      value="Food"
                      v-model="filter.type"
                    />
                    <label class="form-check-label" for="foodRadio">
                      Food
                    </label>
                  </div>
                  <div class="row justify-content-center">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="species"
                        id="allRadio"
                        value="All"
                        v-model="filter.type"
                      />
                      <label class="form-check-label" for="allRadio">
                        All
                      </label>
                    </div>
                  </div>
                </div>
                <div class="filter-group">
                  <div class="filter-header">Range</div>
                  <div class="range-filter d-flex justify-content-evenly">
                    <input
                      type="number"
                      class="range-price"
                      step="0.01"
                      v-model="filter.min_price"
                    />
                    <div class="range-line"></div>
                    <input
                      type="number"
                      class="range-price"
                      step="0.01"
                      v-model="filter.max_price"
                    />
                  </div>
                </div>

                <button
                  class="filter-apply-button mt-3 me-3"
                  type="button"
                  @click="onFilter"
                >
                  Apply
                </button>
                <button
                  class="filter-apply-button mt-3"
                  type="button"
                  @click="onReset"
                >
                  Reset
                </button>
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
  data() {
    return {
      search_request: this.$route.params.search_request,

      pets: null,
      foods: null,
      no_pet: 0,
      no_food: 0,
      filtering: 0,
      filter: {
        type: "All",
        min_price: 0,
        max_price: 99999999,
      },
    };
  },
  async mounted() {
    console.log(this.search_request);
    const response1 = await axios.get(
      `http://localhost:8080/pet/search/${this.search_request}`
    );
    this.pets = response1.data;

    if (!this.pets.length) this.no_pet = 1;

    for (var pet of this.pets) {
      pet.visible = 0;
      let image = pet.images.split(";");
      pet.images = image[0];
    }

    const response2 = await axios.get(
      `http://localhost:8080/food/search/${this.search_request}`
    );
    this.foods = response2.data;

    if (!this.foods.length) this.no_food = 1;

    for (var food of this.foods) {
      food.visible = 0;
      let image = food.images.split(";");
      food.images = image[0];
    }
    this.onFilter();
  },
  methods: {
    onFilter() {
      if (
        this.filter.type.toLowerCase() == "all" ||
        this.filter.type.toLowerCase() == "pet"
      ) {
        for (var pet of this.pets) {
          pet.visible = 1;
          if (
            pet.sale < this.filter.min_price ||
            pet.sale > this.filter.max_price
          )
            pet.visible = 0;
        }
      }
      if (
        this.filter.type.toLowerCase() == "all" ||
        this.filter.type.toLowerCase == "food"
      ) {
        for (var food of this.foods) {
          food.visible = 1;
          if (
            food.sale < this.filter.min_price ||
            food.sale > this.filter.max_price
          )
            food.visible = 0;
        }
      }
    },
    onReset() {
      this.filter.min_price = 0;
      this.filter.max_price = 99999999;
      this.filter.type = "All";

      this.onFilter();
    },
  },
};
</script>

<style scoped>
.container-fluid {
  overflow: hidden;
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
.filter-button {
  border: none;
  border-radius: 3px;
  background-color: transparent;
  transition: all 0.3s;
}
.filter-button:hover {
  color: #ff7a00;
}
.filter-button .filter-icon {
  text-align: end;
  font-size: 20px;
}
.product-item {
  overflow: hidden;
}
.product-item .product-img {
  position: relative;
  overflow: hidden;
  height: 200px;
}
.product-item .product-img.pet {
  clip-path: circle(31%);
}
.product-item .product-img img {
  object-fit: contain;
  max-block-size: -webkit-fill-available;
}
.product-item .product-info .product-name {
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  color: #000;
  line-height: 28px;
  transition: 0.3s;
}

.product-img:hover + .product-info .product-name {
  color: #ff7a00;
}
.product-item .product-info .product-name:hover {
  color: #ff7a00;
}

.filter-area {
  background-color: #fff;
  border: 2px solid gray;
  border-radius: 5px;
  padding: 5%;
  visibility: hidden;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  right: -50%;
  transition: all 3s linear, opacity 0.3s ease-out;
  z-index: 2;
}
.filter-content {
  opacity: 0;
  visibility: hidden;
  transition: all 0.6s linear;
}
.filter-area .filter-title {
  transform: translateX(-30px);
}
.filter-area .filter-form {
  position: relative;
  transition: opacity 0.3s;
  transition-delay: 0.3s;
  transform: translateX(-100%);
  visibility: hidden;
  margin-top: 10%;
}
.filter-area .filter-form .filter-header {
  font-weight: 900;
  text-align: start;
  margin-bottom: 10px;
  text-decoration: underline;
}
.filter-area .filter-form .form-check {
  text-align: start;
  width: 40%;
  float: left;
  margin-left: 10%;
}
.filter-area .filter-form .form-check .form-check-input {
  text-align: center;
}
.filter-area .filter-form .range-price {
  width: 6rem;
}
.filter-area .filter-form .range-filter .range-line {
  width: 1rem !important;
  height: 1px;
  background-color: #bdbdbd;
  margin: auto 0.625rem;
}
.filter-area .filter-form .filter-apply-button {
  border: none;
  background-color: #000;
  color: #fff;
  padding: 3% 10%;
}

@keyframes showFilter {
  from {
    right: -100%;
  }
  to {
    right: 0;
  }
}
.filter-area.active {
  width: 100%;
  opacity: 1;
  display: block;
  visibility: visible;
  z-index: 100;
  right: 0;
  animation: showFilter 0.5s ease forwards;
}
.filter-area.active .filter-content {
  opacity: 1;
  visibility: visible;
}
.filter-area.active .filter-title {
  transform: translateX(0);
}
.filter-area.active .filter-form {
  transform: translateX(0);
  transition-delay: 1s;
  opacity: 1;
  visibility: visible;
}
</style>
