<template>
  <div>
    <div class="container-fluid" style="padding-top: 80px">
      <div class="row title text-start">
        <div class="col-10 offset-1">
          <h1 class="title uppercase">User account</h1>
          <span class="dashboard uppercase">
            <strong class="">Dashboard</strong>
          </span>
        </div>
      </div>
      <!-- end row1 -->

      <div class="row">
        <div class="col-md-10 offset-md-1 col-12">
          <div class="row mt-4">
            <div class="col-3 sidebar pt-2 gutter">
              <div class="avatar-area pt-3">
                <div class="box-img">
                  <img
                    class="img-fluid lazy-loaded"
                    :src="require(`@/assets/${user.avatar}`)"
                    :alt="user.name"
                  />
                </div>
                <h3 class="username">{{ user.name }}</h3>
              </div>
              
              <ul class="sidebar-option text-start">
                <li
                  type="button"
                  class="option"
                  :class="{ isChoosed: profile }"
                  @click="select(1)"
                >
                  <i class="far fa-user-circle"></i>
                  <span class="option-content uppercase">Profile</span>
                </li>
                <li
                  type="button"
                  class="option"
                  :class="{ isChoosed: history }"
                  @click="select(2)"
                >
                  <i class="fas fa-history"></i>
                  <span class="option-content uppercase">Order History</span>
                </li>
                <li
                  type="button"
                  class="option"
                  :class="{ isChoosed: request_list }"
                  @click="select(3)"
                >
                  <i class="fas fa-clipboard-list"></i>
                  <span class="option-content uppercase">Requests</span>
                </li>
                <li class="option"></li>
              </ul>
            </div>
            <!-- profile -->
            <div class="col-9 profile gutter" v-if="profile">
              <div class="content">
                <table class="table table-borderless table-hover">
                  <thead>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">ID</th>
                      <td>{{ user.id }}</td>
                    </tr>
                    <tr>
                      <th scope="row">Name</th>
                      <td>{{ user.name }}</td>
                    </tr>
                    <tr>
                      <th scope="row">Email</th>
                      <td>{{ user.email }}</td>
                    </tr>
                    <tr>
                      <th scope="row">Gender</th>
                      <td>{{ user.gender }}</td>
                    </tr>
                    <tr>
                      <th scope="row">Date of Birth</th>
                      <td>{{ user.date_of_birth }}</td>
                    </tr>
                    <tr>
                      <th scope="row">Phone Number</th>
                      <td>{{ user.phone_number }}</td>
                    </tr>
                    <tr>
                      <th scope="row">Address</th>
                      <td>{{ user.address }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
            </div>
            <!-- end Profile -->

            <!-- shopping history -->
            <div class="col-9 gutter history" v-if="history">
              <div class="content">
                <table class="table table-responsive table-sm" v-if="!noOrder">
                  <thead>
                    <tr>
                      <th scope="col">Index</th>
                      <th scope="col">Order ID</th>
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
                      <td class="order-content list">
                        <ul v-for="product in order.products" :key="product" class="list-name p-0">
                          <li>
                            <router-link :to="'/' + product.type + '/info/' + product.id"
                            class="product-name">{{ product.name }}</router-link>
                          </li>
                        </ul>
                      </td>
                      <td class="order-content quantity">
                        <ul v-for="quantity in order.quantities" :key="quantity" class="list-quantity p-0">
                          <li>{{ quantity }}</li>
                        </ul>
                      </td>
                      <td class="order-content total">${{ order.total }}</td>
                      <td class="order-content time">{{ order.date }}</td>
                    </tr>
                  </tbody>
                </table>
                <div class="no-order-message" v-if="noOrder">
                  <p class="message">{{ user.name }} have not made any orders yet!</p>
                </div>
              </div>
            </div>
            <!-- end History -->

            <!-- Request -->
            <div class="col-9 gutter request" v-if="request_list">
              <div class="content">
                <table class="table table-responsive table-sm">
                  <thead>
                    <tr>
                      <th scope="col">Index</th>
                      <th scope="col">Customer's ID</th>
                      <th scope="col">Kind of Pet</th>
                      <th scope="col">Description</th>
                      <th scope="col">Payment Range</th>
                      <th scope="col">State</th>
                    </tr>
                  </thead>
                  <tbody v-for="(request, index) in requests" :key="request.id">
                    <tr>
                      <td class="request-content index">{{ index + 1 }}</td>
                      <td class="request-content index">{{ request.id }}</td>
                      <td class="request-content kind">{{ request.type }}</td>
                      <td class="request-content description">
                        {{ request.detail }}
                      </td>
                      <td class="request-content range">
                        $0 - ${{ request.range }}
                      </td>
                      <td
                        class="request-content eeceived"
                        style="color: #316B83; font-weight: bold"
                        v-if="request.state == 0"
                      >
                        Received
                      </td>
                      <td
                        class="request-content refused"
                        style="color: #787a91; font-weight: bold"
                        v-if="request.state == -1"
                      >
                        Refused
                      </td>
                      <td
                        class="request-content done"
                        style="color: #53b8bb; font-weight: bold"
                        v-if="request.state == 1"
                      >
                        Done
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="no-order-message" v-if="noRequest">
                  <p class="message">{{ user.name }} have not made any request yet!</p>
                </div>
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
  name: "MyAccount",
  async created() {
    if (this.$store.state.idToken === null) {
      this.$router.push("/login");
    }
    const response = await axios.get(
      `http://localhost:8080/user/${this.$route.params.id}`
    );
    this.user = response.data;
    if (this.user.avatar == null) {
      this.user.avatar = 'default-avatar.jpg'
    }

  },
  data() {
    return {
      user: {
        id: 0,
        name: '',
        avatar: 'default-avatar.jpg',
        address: '',
        phone_number: '',
        gender: '',
        date_of_birth: ''
      },
      orders: null,
      requests: null,
      noOrder: false,
      noRequest: false,
      profile: true,
      history: false,
      request_list: false,
    };
  },
  async mounted() {
    const response = await axios.get(
      `http://localhost:8080/sale/${this.$store.state.userId}`
    );
    this.orders = response.data;
    if (this.orders.length == 0) this.noOrder = true;
    
    const response2 = await axios.get("http://localhost:8080/pets");
    const pets = response2.data;
    const response3 = await axios.get("http://localhost:8080/foods");
    const foods = response3.data;
    
    const response4 = await axios.get("http://localhost:8080/requests");
    this.requests = response4.data;
    if (this.requests.length == 0) this.noRequest = true;

    for (var order of this.orders) {
      order.products = []
      order.quantities = []
      var items = order.list.split(";")
      for(var item of items) {
        let id_quantity = item.split("-")
        for (let j = 0; j < pets.length; j++) {
          if (id_quantity[0] == pets[j].id) {
            order.products.push(pets[j])
            order.products[order.products.length - 1].type = "pet"
            break;
          }
        }
        for (let k = 0; k < foods.length; k++) {
          if (id_quantity[0] == foods[k].id) {
            order.products.push(foods[k])
            order.products[order.products.length - 1].type = "food"
            break;
          }
        }
        order.quantities.push(id_quantity[1])
      }
    }
  },
  methods: {
    select(a) {
      if (a == 1) {
        this.profile = true;
        this.history = false;
        this.request_list = false;
      } else if (a == 2) {
        this.profile = false;
        this.history = true;
        this.request_list = false;
      } else if (a == 3) {
        this.profile = false;
        this.history = false;
        this.request_list = true;
      }
    },
    deleteAccount() {
      this.$store.dispatch("deleteAccount");
    },
  },
};
</script>

<style scoped>
.row.title {
  background-color: #e1e5ea;
  padding: 13px 20px;
}
.row.title h1.title {
  font-size: 25px;
  font-weight: 600;
}
.row.title .dashboard {
  color: #a7bbc7;
}
.uppercase {
  text-transform: uppercase;
}

/* Sidebar CSS */
.sidebar {
  background: #d5dadd;
  border-radius: 5px;
  max-height: 400px;
}
.sidebar .avatar-area .box-img {
  position: relative;
  box-sizing: content-box;
}
.sidebar .avatar-area .box-img img {
  object-fit: cover;
  border-radius:50%;
  width: 150px;
  height: 150px;
  border: 3px solid black;
  background-clip: content;
}
.sidebar .username {
  padding-top: 10px;
}
.sidebar-option {
  list-style-type: none;
  width: 100%;
  padding-left: 0px;
}
.sidebar-option .option {
  margin-top: 10px;
  padding: 10px 20px;
}
.sidebar-option .option:hover {
  background-color: #b5cfd8;
}
.sidebar-option .option i {
  padding-right: 10px;
}
.isChoosed {
  background-color: #7393a7;
}

.content {
  background-color: #f8f5f1;
  padding: 20px 10px;
  border-radius: 5px;
  min-height: 330px;
}
@media screen and (max-width: 600px) {
  .sidebar {
    max-height: 200px;
  }
  .content {
    min-height: 200px
  }
}

/* History CSS*/

.order-content.list .list-name {
  list-style-type: none;
}
.order-content.list .list-name .product-name {
  text-decoration: none;
  color: #000;
  transition: .2s;
  font-weight: bold;
}
.order-content.list .list-name .product-name:hover {
  text-decoration: underline;
  color: #FF8F27

}
.order-content.quantity .list-quantity {
  list-style-type: none;
}

.no-order-message {
  font-size: 30px;
}
</style>
