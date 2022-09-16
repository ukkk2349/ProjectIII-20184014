<template>
  <div>
    <div class="container" style="padding-top: 80px">
      <h1 class="title">Requests</h1>
      <div class="col-lg-10 offset-lg-1 col-12">
        <div class="table-responsive" v-if="!noRequest">
          <table class="table table-responsive table-sm">
            <thead>
              <tr>
                <th scope="col">Index</th>
                <th scope="col">Request ID</th>
                <th scope="col">Customer's ID</th>
                <th scope="col">Kind of Pet</th>
                <th scope="col">Description</th>
                <th scope="col">Payment Range</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody v-for="(request, index) in requests" :key="request.id">
              <tr>
                <td class="request-content index">{{ index + 1 }}</td>
                <td class="request-content index">{{ request.id }}</td>
                <td class="request-content user-id">
                  <router-link :to="'/admin/user-detail/' + request.user_id" class="user-id">{{
                    request.user_id
                  }}</router-link>
                </td>
                <td class="request-content kind">{{ request.type }}</td>
                <td class="request-content description">
                  {{ request.detail }}
                </td>
                <td class="request-content range">
                  $0 - ${{ request.range }}
                </td>
                <td v-if="request.state == 0" class="request-content remove">
                  <span
                    class="request-content option"
                    type="button"
                    @click.prevent="
                      refuse(request);
                      request.state = -1;
                    "
                    style="color: #f8485e; margin-right: 20px"
                    title="Refuse"
                    ><i class="fas fa-times"></i
                  ></span>
                  <span
                    class="request-content option"
                    type="button"
                    @click.prevent="
                      done(request);
                      request.state = 1;
                    "
                    style="color: #50cb93"
                    ><i class="fas fa-check" title="Done"></i
                  ></span>
                </td>
                <td
                  class="request-content refuse"
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Requests",
  created() {
    if (localStorage.getItem("token") === null) {
      this.$router.push("/login");
    }
  },
  data() {
    return {
      requests: null,
      noRequest: false,
    };
  },
  async mounted() {
    const response = await axios.get("http://localhost:8080/requests");
    this.requests = response.data;

    if (this.requests.length == 0) this.noRequest = true;
  },
  methods: {
    refuse(request) {
      const response1 = axios.put("http://localhost:8080/request/update", {
        id: request.id,
        userId: request.user_id,
        type: request.type,
        detail: request.detail,
        state: -1,
      });
      console.log(response1);
    },
    done(request) {
      const response2 = axios.put("http://localhost:8080/request/update", {
        id: request.id,
        userId: request.user_id,
        type: request.type,
        detail: request.detail,
        state: 1,
      });
      console.log(response2);
    },
  },
};
</script>

<style scoped>
.container h1.title {
  margin: 20px auto;
  font-weight: 600;
}
table td .user-id {
  text-decoration: none;
  color: #000;
}
table td .user-id:hover {
  text-decoration: underline;
  color: lightcoral;
}
</style>
