<template>
  <div>
    <div class="container" style="padding-top: 80px">
      <h1 class="title">Sales</h1>
      <div class="col-lg-10 offset-lg-1 col-12">
        <div class="table-responsive">
          <table class="table table-responsive table-sm">
            <thead>
              <tr>
                <th scope="col">Index</th>
                <th scope="col">Order ID</th>
                <th scope="col">Customer's name</th>
                <th scope="col">Item List</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total</th>
                <th scope="col">Time</th>
              </tr>
            </thead>
            <tbody v-for="(order, index) in orders" :key="order.id">
              <tr>
                <td class="order-content index">{{ index + 1 }}</td>
                <td class="order-content index">{{ order.order_id }}</td>
                <td class="order-content username">
                  <router-link to="" class="username">{{
                    order.username
                  }}</router-link>
                </td>
                <td class="order-content list">
                  <ul v-for="product in order.products" :key="product">
                    <li>{{ product.name }}</li>
                  </ul>
                </td>
                <td class="order-content quantity">
                  <ul v-for="quantity in order.quantities" :key="quantity">
                    <li>{{ quantity }}</li>
                  </ul>
                </td>
                <td class="order-content total">${{ order.total }}</td>
                <td class="order-content time">{{ order.date }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="row">
          <div class="sale-check">
            <h2 class="box-title text-start">Sales total</h2>
            <strong class="sale-total">${{ total }}</strong>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Sales",
  created() {
    if (this.$store.state.idToken === null) {
      this.$router.push("/login");
    }
  },
  data() {
    return {
      orders: null,
      products: null,
      //  {
      //      user_id
      //      username
      //      list
      //      product_list
      //      quantity
      //      total
      //      time
      //  }
      pets: null,
      foods: null,
      total: 0,
    };
  },
  async mounted() {
    const response1 = await axios.get("http://localhost:8080/sales");
    this.orders = response1.data;
    const response2 = await axios.get("http://localhost:8080/pets");
    this.pets = response2.data;
    const response3 = await axios.get("http://localhost:8080/foods");
    this.foods = response3.data;

    for (let i = 0; i < this.orders.length; i++) {
      this.orders[i].products = [];
      this.orders[i].quantities = [];
      let list = this.orders[i].list.split(";");
      for (let j = 0; j < list.length; j++) {
        let id_quantity = list[j].split("-");
        let id = id_quantity[0];
        let product;
        if (id <= 100) {
          product = this.foods.find((f) => f.id == id);
        } else {
          product = this.pets.find((p) => p.id == id);
        }
        this.orders[i].products.push(product);

        this.orders[i].quantities.push(id_quantity[1]);
      }
      this.total += this.orders[i].total;
    }
  },
  methods: {},
};
</script>

<style scoped>
.container h1.title {
  margin: 20px auto;
  font-weight: 600;
}
table td .username {
  text-decoration: none;
  color: #000;
}
table td .username:hover {
  text-decoration: underline;
  color: lightcoral;
}
ul {
  padding-left: 0;
}
li {
  list-style-type: none;
}
.sale-check {
  border: 1px solid #e3e3e3;
  padding: 41px 40px 63px;
  overflow: hidden;
  margin: 30px 0;
  text-align: start;
  padding-left: 15%;
  font-size: 25px;
}
.sale-check h2.box-title {
  font-weight: 600;
  line-height: 30px;
  color: #000;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: 0;
  padding: 17px 20px 17px 0;
}
.sale-check strong.sale-total {
  color: lightcoral;
}
</style>
