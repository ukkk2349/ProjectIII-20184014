<template>
  <div>
    <div class="container-fluid" style="padding-top: 80px">
      <div class="row">
        <h1>Food List</h1>
      </div>
      <hr />

      <div class="row">
        <div class="col-md-1 offset-md-2 col-2 gutter add-food-area">
          <router-link to="/admin/add-food" class="add-food-button">
            <i id="addfood" class="fas fa-plus"></i>
            <span>Add</span>
          </router-link>
        </div>
        <div class="col-md-7 col-10">
          <div class="searchbar">
            <input type="text" class="search-input float-left" v-model="search" @keyup="searching" placeholder="Name...">
            <button class="btn-search" @click="searching"><i class="fas fa-search"></i></button>
          </div>
        </div>
      </div>

      <!-- food list -->
      <div class="row mt-4">
        <div
          class="col-lg-3 col-md-4 col-sm-6 col-12 col-item gutter"
          style="padding: 0"
          v-for="food in foods"
          :key="food.id"
          :style="{'display': food.visible}"
        >
          <div class="item">
            <div class="box-img">
              <router-link :to="'/food/info/' + food.id">
                <img
                  class="img-responsive w-100 lazy-loaded"
                  :src="require(`@/assets/${food.images}`)"
                  :alt="food.name"
                />
              </router-link>
              <div class="food-options">
                <ul>
                  <li>
                    <router-link class="food-option view" :to="'/food/info/' + food.id">
                      <i class="fas fa-info-circle"></i>
                      <span>Detail</span>
                    </router-link>
                  </li>
                  <li>
                    <router-link class="food-option update" :to="'/admin/update-food/' + food.id">
                      <i class="fas fa-edit"></i>
                      <span>Edit</span>
                    </router-link>
                  </li>
                  <li>
                    <button class="food-option delete" @click="deletePet(food.id)">
                      <i class="fas fa-trash-alt"></i>
                      <span>Delete</span>
                    </button>
                  </li>
                </ul>
              </div>
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

    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'FoodSetting',
  data() {
    return {
      foods: null,
      search: ''
    }
  },
  async mounted() {
    const response = await axios.get("http://localhost:8080/foods");
    this.foods = response.data;

    for (var food of this.foods) {
      let image = food.images.split(";");
      food.images = image[0];
      food.visible = 'block';
    }
  },
  methods: {
    deleteFood(id) {
      if(confirm("Do you want to delete this product?")==true) {
        this.$store.dispatch("deleteFood", { id: id });
        this.$router.go(0)
      }
    },
    searching() {
      console.log(this.search)
      for(let i=0; i<this.foods.length; i++) {
        if(this.foods[i].name.toUpperCase().indexOf(this.search.toUpperCase()) > -1) {
          this.foods[i].visible = 'block'
        }
        else {
          this.foods[i].visible = 'none'
        }
      }
    }
  }
}
</script>

<style scoped>
.add-food-area {
  background-color: transparent;
  height: 100%;
  padding: 5px 10px;
  border-radius: 30px;
  border: 2px solid #888;
  transition: .3s
}
.add-food-area:hover {
  background-color: bisque;
}
.add-food-area .add-food-button {
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-decoration: none;
  color: #000;
}
.add-food-button #addfood {
  float: left;
  font-size: 20px;
}
.add-food-button span{
  font-weight: bold;
  font-size: 20px
}
/* seach-input */
.searchbar {
  width: 100%;
  height: 50px;
}
.searchbar .search-input {
  width: 80%;
  height: 100%;
  font-size: 20px;
  border-bottom-left-radius: 25px;
  border-top-left-radius: 25px;
  border: 2px solid #E8EAE6;
  padding-left: 2%;
}
.searchbar .search-input:focus {
  outline: none;
}

.searchbar .btn-search {
  width: 20%;
  height: 50px;
  border: 2px solid #E8EAE6;
  border-left: none;
  background-color: transparent;
  margin-top: 0;
  position: relative;
  top: -1px;
  border-bottom-right-radius: 25px;
  border-top-right-radius: 25px;
}

/* item */
.item {
  padding: 0px 15px;
}
.box-img {
  overflow: hidden;
  position: relative;
  height: 300px;
}
.box-img .food-options {
  position: absolute;
  top: 0;
  z-index: -2;
  opacity: 0;
  transition: opacity .5s;
  width: 100%;
  height: 100%;
  
}
.box-img .food-options ul {
  list-style-type: none;
  padding: 0;
  margin-top: 20%
}
.box-img .food-options ul li {
  margin-top: 7%;
}
.box-img .food-options .food-option {
  opacity: 0;
  transition: opacity 1s;
  padding: 7px 13px;
  background-color: #FFF;
  border: none;
  border-radius: 20px;
  text-decoration: none;
  color: #000

}
.box-img .food-options .food-option:hover {
  color: #ff7a00
}
.box-img:hover .food-options {
  z-index: 4;
  opacity: 1;
}
.box-img:hover .food-options .food-option {
  opacity: 1;
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
  filter: blur(4px)
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
</style>
