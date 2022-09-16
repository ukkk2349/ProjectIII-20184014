<template>
  <div>
    <div class="container-fluid" style="padding-top: 80px">
      <div class="bread-crumb">
        <h1>Cart</h1>
      </div>
    </div>
    <div class="container">
      <div class="col-lg-10 offset-lg-1">
        <div class="content-cart-page">
          <form @submit.prevent="onSubmit" action="/cart">
            <div class="table-responsive">
              <table
                class="table table-responsive table-sm"
                v-if="!nothingInCart"
              >
                <thead>
                  <tr>
                    <th scope="col">Product Name</th>
                    <th scope="col">Type</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody v-for="(product, index) in products" :key="product">
                  <tr style="justify-content: center" :class="{ backgroundRed: !product.stock}">
                    <td class="product-content name">
                      <img 
                        style="max-width: 100px; max-height: 100px" 
                        :src="require(`@/assets/${product.image}`)"
                        alt="Product's Image"/>
                      <router-link
                        :to="'/' + product.type + '/info/' + product.product_id"
                        class="product-name"
                        >{{ product.product_infomation }}</router-link
                      >
                    </td>
                    <td class="product-content price" style="text-transform: uppercase">{{ product.type }}</td>
                    <td class="product-content price" style="vertical-align: center">${{ product.price }}</td>
                    <td class="product-content quantity">
                      <div class="buttons_added">
                        <input
                          :disabled="product.quantity == 1"
                          class="minus is-form"
                          @click="
                            minus(product.id);
                            product.quantity--;
                          "
                          type="button"
                          value="-"
                        />
                        <input
                          aria-label="quantity"
                          class="input-qty"
                          :max="product.stock"
                          min="1"
                          name=""
                          type="number"
                          v-model="product.quantity"
                          :readonly="product.type=='pet'"
                        />
                        <input
                          class="plus is-form"
                          @click="
                            plus(product.id);
                            product.quantity++;
                          "
                          type="button"
                          value="+"
                          :disabled="product.quantity==product.stock || product.type=='pet'"
                        />
                      </div>
                    </td>
                    <td class="product-content total">
                      ${{ product.quantity * product.price }}
                    </td>
                    <td
                      class="product-content remove"
                      style="margin-top: 25%"
                      type="button"
                      @click.prevent="remove(index, product.id, product.price)"
                    >
                      <i class="fas fa-times"></i>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="nothing-in-cart" v-if="nothingInCart">
                <h3 class="nothing-in-cart">You cart is currently empty!</h3>
                <router-link class="option" to="/">Buy Now!</router-link>
                <router-link
                  class="option"
                  :to="'/my-account/' + $store.state.userId"
                  >Account Settings</router-link
                >
              </div>
            </div>
            <div class="cart-check">
              <h2 class="cart-title text-start">Cart total</h2>
              <table class="total-checkout w-100 text-start">
                <tbody>
                  <tr>
                    <th class="total"><span>Total</span></th>
                    <td class="total">
                      <span>
                        <strong>$ {{ total }}</strong>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="submit-section text-start">
                <button
                  class="submit-button"
                  :disabled="nothingInCart && !canBuy"
                  type="submit"
                >
                  Proceed to checkout
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Cart",
  created() {
    if (this.$store.state.idToken === null) {
      this.$router.push("/login");
    }
  },
  data() {
    return {
      products: null,
      pets: null,
      foods: null,
      total: 0,
      nothingInCart: false,
      productIdList: "",
      canBuy: 0
    };
  },
  async mounted() {
    const response = await axios.get(
      `http://localhost:8080/cart/${this.$store.state.userId}`
    );
    this.products = response.data;
    const response2 = await axios.get("http://localhost:8080/pets");
    this.pets = response2.data;
    const response3 = await axios.get("http://localhost:8080/foods");
    this.foods = response3.data;

    for (var pet of this.pets) {
      let image = pet.images.split(";");
      pet.images = image[0];
    }

    for (var food of this.foods) {
      let image = food.images.split(";");
      food.images = image[0];
    }

    for (let i = 0; i < this.products.length; i++) {
      for (let j = 0; j < this.pets.length; j++) {
        if (this.products[i].product_id == this.pets[j].id) {
          this.products[i].price = this.pets[j].sale;
          this.products[i].type = "pet";
          this.products[i].image = this.pets[j].images;
          this.products[i].stock = this.pets[j].stock;
          this.total += this.products[i].price * this.products[i].quantity;
          if(this.pets[j].stock == 0) {
            this.canBuy ++
          }
          break;
        }
      }
      for (let k = 0; k < this.foods.length; k++) {
        if (this.products[i].product_id == this.foods[k].id) {
          this.products[i].price = this.foods[k].sale;
          this.products[i].type = "food";
          this.products[i].image = this.foods[k].images
          this.products[i].stock = this.foods[k].stock
          this.total += this.products[i].price * this.products[i].quantity;
          if(this.foods[k].stock == 0) {
            this.canBuy++
          }
          break;
        }
      }
    }
    if (this.products.length == 0) {
      this.nothingInCart = true;
    }
  },
  methods: {
    onSubmit() {
      for (let i = 0; i < this.products.length; i++) {
        this.productIdList +=
          this.products[i].product_id.toString() +
          "-" +
          this.products[i].quantity.toString() +
          ";";
      }
      this.productIdList = this.productIdList.substring(
        0,
        this.productIdList.length - 1
      );
      const formData = {
        list: this.productIdList,
        total: this.total,
      };
      for (let i=0; i<this.products.length; i++) {
        if(this.products[i].type =='pet') 
          this.$store.dispatch('buyPet', {id: this.products[i].id})
        else {
          this.$store.dispatch('buyFood', {id: this.products[i].id})
        }
      }
      this.$store.dispatch("buy", formData);
      this.$store.dispatch("deleteCart");
      
    },
    remove(index, id, price) {
      this.total -= price;
      axios.delete(`http://localhost:8080/cart/delete/${id}`);
      if (this.products[index].stock == 0) this.canBuy--;
      this.products.splice(index, 1);
      if (this.products.length == 0) this.nothingInCart = true;
    },
    minus(id) {
      const response = axios.put("http://localhost:8080/cart/product/minus/", {
        id: id,
      });
    },
    plus(id) {
      const response = axios.put("http://localhost:8080/cart/product/plus/", {
        id: id,
      });
    },
  },
};
</script>

<style scoped>
.backgroundRed {
  background-color: #FFC2C2;
}
.bread-crumb {
  background-image: url(//cdn.shopify.com/s/files/1/0506/6237/5600/files/qwqerwerq.jpg?v=1605775019);
  background-size: cover;
  background-position: center;
  padding: 120px 0 160px;
}
.content-cart-page .table {
  border: 1px solid #dee2e6;
}
.content-cart-page .table th {
  border-bottom: 0;
  font-weight: 500;
  font-size: 12px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #000;
  padding: 15px 20px;
  border: 1px solid #dee2e6;
}
.content-cart-page .table .product-content {
  font-size: 16px;
  color: #a8a8a8;
  line-height: 1.6;
  font-weight: 400;
  vertical-align: middle;
}
.content-cart-page .table .product-content .product-name {
  color: #000;
  text-decoration: none;
  transition: 0.3s;
}
.content-cart-page .table .product-content .product-name:hover {
  color: lightcoral;
  text-decoration: underline;
}
.content-cart-page .table .product-content.remove {
  border: none;
  color: #000;
}
.content-cart-page .table .product-content.remove:hover {
  color: lightcoral;
}
.content-cart-page .nothing-in-cart .option {
  text-decoration: none;
  color: #000;
  font-weight: 600;
  margin: 10px 20px;
  transition: 0.3s;
}
.content-cart-page .nothing-in-cart .option:hover {
  color: lightsalmon;
}
.content-cart-page .cart-check {
  border: 1px solid #e3e3e3;
  padding: 41px 40px 63px;
  overflow: hidden;
  margin: 30px 0;
}
.content-cart-page .cart-check h2.cart-title {
  font-weight: 600;
  font-size: 12px;
  line-height: 30px;
  color: #000;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: 0;
  padding: 17px 20px 17px 0;
}
.content-cart-page .cart-check table .total {
  border-top: 1px solid #e3e3e3;
  padding: 17px 0 !important;
  font-size: 16px;
  line-height: 30px;
  color: #000;
}
.content-cart-page .cart-check table th {
  width: 40%;
}
.content-cart-page .cart-check button.submit-button {
  margin-top: 15px;
  display: inline-block;
  color: #fff;
  text-transform: uppercase;
  padding: 18px 65px;
  border: none;
  background-color: #ff7a00;
  font-size: 14px;
  text-align: center;
  line-height: 24px;
  letter-spacing: 0.2em;
  font-weight: 500;
  border-radius: 0;
  transition: 0.3s;
}
.buttons_added {
  opacity: 1;
  display: inline-block;
  display: -ms-inline-flexbox;
  display: inline-flex;
  white-space: nowrap;
  vertical-align: top;
}
.is-form {
  overflow: hidden;
  position: relative;
  background-color: #f9f9f9;
  height: 2.2rem;
  width: 1.9rem;
  padding: 0;
  text-shadow: 1px 1px 1px #fff;
  border: 1px solid #ddd;
}
.is-form:focus,
.input-text:focus {
  outline: none;
}
.is-form.minus {
  border-radius: 4px 0 0 4px;
}
.is-form.plus {
  border-radius: 0 4px 4px 0;
}
.input-qty {
  background-color: #fff;
  height: 2.2rem;
  text-align: center;
  font-size: 1rem;
  display: inline-block;
  vertical-align: top;
  margin: 0;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  border-left: 0;
  border-right: 0;
  padding: 0;
}
.input-qty::-webkit-outer-spin-button,
.input-qty::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>

