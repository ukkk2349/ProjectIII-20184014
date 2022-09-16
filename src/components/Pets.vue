<template>
  <div>
    <div class="container-fluid" style="padding-top: 80px">
      <div class="row">
        <h1>Our Pets</h1>
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
            <strong>Pets</strong>
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
        <!-- pets list -->
        <div
          style="transition: 0.3s"
          :class="{ 'col-sm-6': filtering, 'col-md-8': filtering }"
        >
          <div
            class="col-lg-4 col-md-4 col-sm-6 col-12 col-item"
            style="transition: 0.3s"
            v-for="pet in pets"
            :key="pet.id"
          >
            <div class="item" v-if="pet.visible">
              <div class="box-img">
                <router-link class="pet-image" :to="'/pet/info/' + pet.id">
                  <img
                    class="img-fluid lazy-loaded"
                    :src="require(`@/assets/${pet.images}`)"
                    :alt="pet.name"
                  />
                </router-link>
              </div>
              <div class="box-info">
                <router-link class="pet-name" :to="'/pet/info/' + pet.id">{{
                  pet.name
                }}</router-link>
                <br />
                <strike style="color: #88888f">${{ pet.price }}</strike>
                <p style="color: #ff7a00; font-weight: bold; margin-bottom: 0">${{ pet.sale }}</p>
                <span v-if="!pet.stock" style="color: red; font-weight: bold">Out of Stock</span>
              </div>
            </div>
          </div>
        </div>

        <!-- filter -->
        <div
          :class="{ 'col-md-4': filtering, 'col-sm-6': filtering }"
          style="position: relative; transition: 0.3s"
        >
          <div
            :class="[
              'filter-area',
              { active: filtering, 'hide-filter': !filtering },
            ]"
          >
            <div class="filter-content">
              <div class="filter-top">
                <h3 class="filter-title">Choose and Find</h3>
              </div>
              <div class="filter-form">
                <form action="">
                  <div class="">
                    <div class="filter-header">Species</div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="species"
                        id="dogRadio"
                        value="Dog"
                        checked
                        v-model="filter.species"
                      />
                      <label class="form-check-label" for="dogRadio">
                        Dogs
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="species"
                        id="catRadio"
                        value="Cat"
                        v-model="filter.species"
                      />
                      <label class="form-check-label" for="catRadio">
                        Cats
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="species"
                        id="fishRadio"
                        value="Fish"
                        v-model="filter.species"
                      />
                      <label class="form-check-label" for="fishRadio">
                        Fishes
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="species"
                        id="birdRadio"
                        value="Bird"
                        v-model="filter.species"
                      />
                      <label class="form-check-label" for="birdRadio">
                        Birds
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
                          v-model="filter.species"
                        />
                        <label class="form-check-label" for="allRadio">
                          All
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="">
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
      pets: null,
      filtering: 0,
      filter: {
        species: "All",
        max_price: 99999999,
        min_price: 0,
      },
    };
  },
  async mounted() {
    const response = await axios.get("http://localhost:8080/pets");
    this.pets = response.data;

    this.editImage();
  },
  methods: {
    editImage() {
      for (var pet of this.pets) {
        let image = pet.images.split(";");
        pet.images = image[0];
        pet.visible = 1;
      }
    },
    onFilter() {
      for (var pet of this.pets) {
        pet.visible = 1;
        if (this.filter.species != "All") {
          if (pet.species != this.filter.species) {
            pet.visible = 0;
            continue;
          }
        }

        if (
          pet.sale <= this.filter.min_price ||
          pet.sale >= this.filter.max_price
        )
          pet.visible = 0;
      }
    },
    onReset() {
      this.filter.species = "All";
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
  position: relative;
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
  transition: 0.3s;
}
.filter-button:hover {
  color: #ff7a00;
}
.filter-button .filter-icon {
  text-align: end;
  font-size: 20px;
}
.item {
  padding: 37px;
}
.box-img {
  /* border-radius: 50%; */
  clip-path: circle(31%);

  margin-bottom: 15px;
  overflow: hidden;
  position: relative;
  height: 250px;
}
.box-img img {
  transition: all 0.8s linear;
  object-fit: cover;
  max-block-size: -webkit-fill-available;
  height: 100%;
}
.box-img:hover img {
  transform: scale(1.04);
  transition: all 0.8s linear;
}
.box-info .pet-name {
  text-decoration: none;
  font-family: "Quicksand", sans-serif;
  font-weight: 500;
  font-size: 28px;
  display: inline-block;
  margin-bottom: 10px;
  color: black;
  transition: all 0.3s;
}
.box-info .pet-name:hover {
  color: #ff7a00;
}
.box-info p {
  color: #888;
}
.col-item {
  float: left;
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
