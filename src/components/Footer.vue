<template>
  <div class="container-fluid mt-4">
    <div class="row">
      <div class="col-sm-6 col-md-3">
        <h3 class="title" style="font-family: 'Pacifico', sans-serif">Pet</h3>
        <ul>
          <li>Hanoi, Vietnam</li>
          <li>+ (84) 777-777-777</li>
          <li>pet@example.com</li>
          <li>pet.com</li>
        </ul>
      </div>
      <div class="col-sm-6 col-md-3">
        <h3 class="title">Help & Infomation</h3>
        <ul>
          <li>Pagination</li>
          <li>Term & Conditions</li>
          <li>Contact</li>
          <li>Accessories</li>
          <li>Term Of Use</li>
        </ul>
      </div>
      <div class="col-sm-6 col-md-3">
        <h3 class="title">About Us</h3>
        <ul>
          <li>Help Center</li>
          <li>Address Store</li>
          <li>Privacy Polity</li>
          <li>Receivers & Amplifiers</li>
          <li>Pet</li>
        </ul>
      </div>
      <div class="col-sm-6 col-md-3">
        <h3 class="title">Profile</h3>
        <ul>
          <li>My Account</li>
          <li>Checkout</li>
          <li>Order Tracking</li>
          <li>Help & Support</li>
          <li>
            <router-link to="/request/" style="color: #000">
              Requestion for a Pet
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <hr />
    <div class="row">
      <div class="col-sm-6 text-start">
        <p>See you again!</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
div.container-fluid {
  background-color: #fffdf9;
  padding: 3% 2%;
}
div {
  font-family: "Quicksand", sans-serif;
}
ul {
  padding: 0;
}
h3 {
  text-align: left;
}
li {
  list-style-type: none;
  text-align: left;
}
</style>
