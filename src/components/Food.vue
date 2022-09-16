<template>
  <div>
    <div class="container-fluid" style="padding-top: 80px">
      <h1>Our Food</h1>
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
            <strong>Foods</strong>
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

      <div class="row">
        <!-- food list -->
        <div
          style="transition: 0.3s"
          :class="{ 'col-sm-6': filtering, 'col-md-8': filtering }"
        >
          <div
            class="col-lg-3 col-md-4 col-sm-6 col-12 col-item gutter"
            style="padding: 0"
            v-for="food in foods"
            :key="food.id"
          >
            <div class="item" v-if="food.visible">
              <div class="box-img">
                <router-link :to="'/food/info/' + food.id">
                  <img
                    class="img-responsive w-100 lazy-loaded"
                    :src="require(`@/assets/${food.images}`)"
                    :alt="food.name"
                  />
                </router-link>
              </div>
              <div class="box-info">
                <router-link
                  class="food-name"
                  :to="'/food/info/' + food.id"
                  style="padding: 20px 0 4px 0"
                  >{{ food.name }}</router-link
                >
                <br />
                <strike style="color: #88888f">${{ food.price }}</strike>
                <p style="color: #ff7a00; font-weight: bold; margin-bottom: 0">
                  ${{ food.sale }}
                </p>
                <span v-if="!food.stock" style="color: red; font-weight: bold">Out of Stock</span>
              </div>
            </div>
          </div>
        </div>

        <!-- filter -->
        <div
          :class="{ 'col-md-4': filtering, 'col-sm-6': filtering }"
          style="position: relative"
        >
          <div
            :class="[
              'filter-area',
              { active: filtering, hideFilter: !filtering },
            ]"
          >
            <div class="filter-content">
              <div class="filter-top">
                <h3 class="filter-title">Choose and Find</h3>
              </div>
              <div class="filter-form">
                <form action="">
                  <div class="filter-group">
                    <div class="filter-header">Calories</div>
                    <div class="range-filter d-flex justify-content-evenly">
                      <input
                        type="number"
                        class="range-calories"
                        step="0.01"
                        v-model="filter.min_calories"
                      />
                      <div class="range-line"></div>
                      <input
                        type="number"
                        class="range-calories"
                        step="0.01"
                        v-model="filter.max_calories"
                      />
                    </div>
                  </div>
                  <div class="filter-group">
                    <div class="filter-header">Price</div>
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
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Pets",
  data() {
    return {
      foods: null,
      filtering: 0,
      filter: {
        min_calories: 0,
        max_calories: 999999,
        min_price: 0,
        max_price: 99999999,
      },
    };
  },
  async mounted() {
    const response = await axios.get("http://localhost:8080/foods");
    this.foods = response.data;

    for (var food of this.foods) {
      let image = food.images.split(";");
      food.images = image[0];
      food.visible = 1;
    }
  },
  methods: {
    onFilter() {
      for (var food of this.foods) {
        food.visible = 1;

        if (
          food.calories <= this.filter.min_calories ||
          food.calories >= this.filter.max_calories
        )
          food.visible = 0;
        console.log(food.price);
        if (
          food.sale <= this.filter.min_price ||
          food.sale >= this.filter.max_price
        )
          food.visible = 0;
      }
    },
    onReset() {
      this.filter.min_calories = 0;
      this.filter.max_calories = 999999;
      this.filter.min_price = 0;
      this.filter.max_price = 99999999;

      this.onFilter();
    },
  },
};
</script>

<style scoped>
.container-fluid {
  font-family: "Quicksand", sans-serif;
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
.item {
  padding: 0px 15px;
}
.box-img {
  overflow: hidden;
  height: 300px;
}
.box-img img {
  transition: all 0.8s linear;
  height: 100%;
  object-fit: cover;
}
@media screen and (max-width: 480px) {
  .box-img {
    height: 150px;
  }
}
.box-img:hover img {
  transform: scale(1.04);
  transition: all 0.8s linear;
}
.box-info .food-name {
  text-decoration: none;
  font-family: "Quicksand", sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #000;
  line-height: 28px;
}
.box-info .food-name:hover {
  color: #ff7a00;
}
.box-info p {
  color: #888;
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
  transition: opacity 0.3s ease-out;
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
.filter-area .filter-form .range-calories,
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
@keyframes hideFilter {
  from {
    right: 0;
  }
  to {
    right: -100%;
  }
}
.filter-area.hide-filter {
  animation: hideFilter 3s linear;
}
</style>
