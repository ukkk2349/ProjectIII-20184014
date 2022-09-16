<template>
<div class="container-fluid">
  <div class="big-banner">
    <div class="picture">
      <img src="../assets/big-banner.jpg" alt="" class="w-100">
    </div>
    <div class="banner-text">
      <h1>Pet Shop</h1>
      <div class=" mt-2 ke mb-2"></div>
      <p>Shop Petoria for the best pet food , toys  and treats <br> and pet supplements plus so much more!</p>
      <a href="#mainContent" class="button btn btn-info mt-2">View now</a>
    </div> <!-- end banner-text -->
  </div>
  <!-- end big-banner  -->

  <div class="pets container-fluid mt-4" id="mainContent">
    <h1>Our Pets</h1>
    <div class="row">
      <div class="col-lg-4 col-md-4 col-sm-6 col-12 col-item" v-for="(pet, index) in pets" :key="pet.id">
        <div class="item" v-if="index<3">
          <div class="box-img">
            <router-link class="pet-image" :to="'/pet/info/' + pet.id">
              <img class="img-fluid lazy-loaded" :src="require(`@/assets/${pet.images}`)" :alt="pet.name">
            </router-link>
          </div>
          <div class="box-info">
            <router-link class="pet-name" :to="'/pet/info/' + pet.id">{{ pet.name }}</router-link>
            <br>
            <strike style="color: #88888F">${{ pet.price }}</strike>
            <p style="color: #FF7A00; font-weight: bold; margin-bottom: 0">${{ pet.sale }}</p>
            <span v-if="!pet.stock" style="color: red; font-weight: bold">Out of Stock</span>
          </div>
        </div>
      </div>
      <span class="view-all text-end">
        <router-link to="/pets">View all >></router-link>
      </span>
    </div>
  </div>

  <div class="food container-fluid" style="padding-top: 80px">
    <h1>Our Food</h1>
    <div class="row">
      <div class="col-lg-3 col-md-4 col-sm-6 col-12 col-item gutter" style="padding: 0" v-for="(food, index) in foods" :key="food.id">
        <div class="item" v-if="index<4">
          <div class="box-img">
            <router-link :to="'/food/info/' + food.id">
              <img class="img-responsive w-100 lazy-loaded" :src="require(`@/assets/${food.images}`)" :alt="food.name">
            </router-link>
          </div>
          <div class="box-info">
            <router-link class="food-name" :to="'/food/info/' + food.id" style="padding: 20px 0 4px 0">{{ food.name }}</router-link>
            <br>
            <strike style="color: #88888F">${{ food.price }}</strike>
            <p style="color: #FF7A00; font-weight: bold; margin-bottom: 0">${{ food.sale }}</p>
            <span v-if="!food.stock" style="color: red; font-weight: bold">Out of Stock</span>
          </div>
        </div>
      </div>
      <span class="view-all text-end">
        <router-link to="/food">View all >></router-link>
      </span>
    </div>
  </div>

  <div class="find-pet">
    <h4 class="title">If you are looking for a pet, let us help you at <a href="/request">here</a></h4>
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      pets: null,
      foods: null
    }
  },
  components: {
  },
  async mounted() {
    const response = await axios.get("http://localhost:8080/pets");
    this.pets = response.data;

    for(var pet of this.pets) {
      let image = pet.images.split(';')
      pet.images = image[0]
    }

    const response2 = await axios.get("http://localhost:8080/foods");
    this.foods = response2.data;

    for (var food of this.foods) {
      let image = food.images.split(';')
      food.images = image[0]
    }
  }
}
</script>

<style scoped>
  .big-banner {position: relative};
  .picture {position: absolute;}
  .banner-text {
    width: 40%;
    text-align: left;
    position: absolute;
    top: 33%;
    left: 10%;
    z-index: 2;
    opacity: 1;
    color: white;
    font-family: 'Quicksand', sans-serif;
  }
  .banner-text h1 {
    font-size: 60px;
    font-weight: bold;
  }
  .banner-text p {
    font-size: 20px;
    font-weight: 400;
    line-height: 1.5;
  }
  .banner-text .button {
    color: white;
    font-size: 15px;
    background: transparent;
    border: 1px solid white;
    font-weight: bold;
    text-transform: uppercase;
    padding: 2% 4%;
  }
  .banner-text .button:hover {background: white; color: black}
  .banner-text {
    animation:   1s text-comein forwards;
    animation-delay: 0.3s;
  }
  @media screen and (max-width: 480px) {
    .big-banner {
      padding-top: 27px
    }
    .banner-text h1 {
      font-size: 20px;
    }
    .banner-text p {
      font-size: 10px;
    }
    .banner-text .button {
      font-size: 10px;
      position: absolute;
      top: 90px
    }
  }
  @keyframes text-comein {
    from {transform: translateX(-100px); opacity: 0}
    to {transform: translateX(0px); opacity: 1}
  }
  .container {
    font-family: 'Quicksand', sans-serif;
  }
  .item {
    padding: 0px 15px
  }
  .food .box-img {
    overflow: hidden;
    height: 300px;
  }
  .box-img img {
    transition: all .8s linear; 
    height: 100%;
    object-fit: cover;
  }
  @media screen and (max-width: 480px) {
    .box-img {
      height: 150px
    }
  }
  .pets .box-img {
    /* border-radius: 50%; */
    clip-path: circle(31%);
    height: 250px;
    margin-bottom: 15px;
    overflow: hidden;
  }
  .box-img img {
    transition: all .8s linear; 
    object-fit: cover;
    height: 100%;
  }
  .box-img:hover img {
    transform: scale(1.04);
    transition: all .8s linear; 
  }
  .box-info .food-name {
    text-decoration: none;
    font-family: 'Quicksand', sans-serif;
    font-size: 16px;
    font-weight: 500;
    color: #000;
    line-height: 28px;
  }
  .box-info .food-name:hover {
    color: #ff7a00;
  }
  .box-info .pet-name {
    text-decoration: none;
    font-family: 'Quicksand', sans-serif;
    font-weight: 500;
    font-size: 28px;
    display: inline-block;
    margin-bottom: 10px;
    color: black;
    transition: all .3s;
  }
  .box-info .pet-name:hover {
    color: #ff7a00;
  }
  .box-info p {
      color: #888;
  }
  .find-pet h4 {
    font-size: 20px;
    margin: 30px 0;
  }
</style>
