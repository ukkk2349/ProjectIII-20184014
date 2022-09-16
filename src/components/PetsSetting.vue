<template>
  <div>
    <div class="container-fluid" style="padding-top: 80px">
      <div class="row">
        <h1>Pets List</h1>
      </div>
      <hr />

      <div class="row mt-4">
        <div class="col-md-1 offset-md-2 col-2 gutter add-pet-area">
          <router-link to="/admin/add-pet" class="add-pet-button">
            <svg id="catadd" style="enable-background:new 0 0 300 300;" version="1.1" viewBox="0 0 300 300" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="   M203.152,50.384C187.131,42.456,169.086,38,150,38C83.726,38,30,91.726,30,158s53.726,120,120,120s120-53.726,120-120   c0-18.284-4.089-35.612-11.403-51.121" style="fill-rule:evenodd;clip-rule:evenodd;fill:none;stroke:#000000;stroke-width:12;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;"/><path d="   M163.126,119.763C159.015,118.621,154.598,118,150,118c-5.108,0-9.994,0.766-14.485,2.162c-2.326-4.88-8.688-17.237-15.633-22.162   c0,0-7.278,19.104-5.643,37.648C111.527,139.964,110,144.839,110,150c0,14.728,12.437,27.132,29.367,30.857   C122.437,190.17,110,221.18,110,258c0,4.554,0.19,9.02,0.556,13.367C122.91,275.664,136.182,278,150,278s27.09-2.336,39.444-6.633   C189.81,267.02,190,262.554,190,258c0-36.82-12.437-67.83-29.368-77.143C177.563,177.132,190,164.728,190,150   c0-5.994-2.06-11.603-5.644-16.398C185.32,115.725,178.568,98,178.568,98C171.805,102.796,165.595,114.638,163.126,119.763z" style="fill-rule:evenodd;clip-rule:evenodd;fill:none;stroke:#000000;stroke-width:12;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;"/><circle cx="238" cy="70" r="40" style="fill-rule:evenodd;clip-rule:evenodd;fill:none;stroke:#000000;stroke-width:12;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;"/><line style="fill:none;stroke:#000000;stroke-width:12;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="238" x2="238" y1="94" y2="46"/><line style="fill:none;stroke:#000000;stroke-width:12;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="214" x2="262" y1="70" y2="70"/></g><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/></svg>
            <span>Add</span>
          </router-link>
        </div>
        <div class="col-md-7 col-10">
          <div class="searchbar">
            <input type="text" class="search-input float-left" v-model="search" v-on:keyup="searching" placeholder="Name...">
            <button class="btn-search" @click="searching"><i class="fas fa-search"></i></button>
          </div>
        </div>
      </div>

      <!-- pets list -->
      <div class="row">
        <div
          class="col-lg-4 col-md-4 col-sm-6 col-12 col-item"
          style="transition: 0.3s"
          v-for="pet in pets"
          :key="pet.id"
          :style="{'display': pet.visible}"
        >
          <div class="item">
            <div class="box-img">
              <router-link class="pet-image" :to="'/pet/info/' + pet.id">
                <img
                  class="img-fluid lazy-loaded"
                  :src="require(`@/assets/${pet.images}`)"
                  :alt="pet.name"
                />
              </router-link>
              <div class="pet-options">
                <ul>
                  <li>
                    <router-link class="pet-option view" :to="'/pet/info/' + pet.id">
                      <i class="fas fa-info-circle"></i>
                      <span>Detail</span>
                    </router-link>
                  </li>
                  <li>
                    <router-link class="pet-option update" :to="'/admin/update-pet/' + pet.id">
                      <i class="fas fa-edit"></i>
                      <span>Edit</span>
                    </router-link>
                  </li>
                  <li>
                    <button class="pet-option delete" @click="deletePet(pet.id)">
                      <i class="fas fa-trash-alt"></i>
                      <span>Delete</span>
                    </button>
                  </li>
                </ul>
              </div>
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

    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'PetsSetting',
  data(){
    return {
      pets: null,
      search: ''
    }
  },
  async mounted() {
    const response = await axios.get("http://localhost:8080/pets");
    this.pets = response.data;

    for (var pet of this.pets) {
      let image = pet.images.split(";");
      pet.images = image[0];
      pet.visible = 'block';
    }
  },
  methods: {
    deletePet(id) {
      if(confirm("Do you want to delete this pet?")==true) {
        this.$store.dispatch("deletePet", { id: id });
        this.$router.go(0)
      }
    },
    searching() {
      console.log(this.search)
      for(let i=0; i<this.pets.length; i++) {
        if(this.pets[i].name.toUpperCase().indexOf(this.search.toUpperCase()) > -1) {
          this.pets[i].visible = 'block'
        }
        else {
          this.pets[i].visible = 'none'
        }
      }
    }
  }
}
</script>

<style scoped>
.add-pet-area {
  background-color: transparent;
  height: 100%;
  padding: 5px 10px;
  border-radius: 30px;
  border: 2px solid #888;
  transition: .3s
}
.add-pet-area:hover {
  background-color: bisque;
}
.add-pet-area .add-pet-button {
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-decoration: none;
  color: #000;
}
.add-pet-button #catadd {
  float: left;
  height: 40px;
}
.add-pet-button span{
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
  padding: 37px;
}
.box-img {
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
  filter: blur(4px)
}
.box-img .pet-options {
  position: absolute;
  top: 0;
  z-index: -2;
  opacity: 0;
  transition: opacity .5s;
  width: 100%;
  height: 100%;
  
}
.box-img .pet-options ul {
  list-style-type: none;
  padding: 0;
  margin-top: 12%
}
.box-img .pet-options ul li {
  margin-top: 7%;
}
.box-img .pet-options .pet-option {
  opacity: 0;
  transition: .5s;
  padding: 7px 13px;
  background-color: #FFF;
  border: none;
  border-radius: 20px;
  text-decoration: none;
  color: #000

}
.box-img .pet-options .pet-option:hover {
  color: #ff7a00
}
.box-img:hover .pet-options {
  z-index: 4;
  opacity: 1;
}
.box-img:hover .pet-options .pet-option {
  opacity: 1;
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
</style>
