<template>
  <div>
    <div class="container" style="padding-top: 80px; padding-bottom: 60px">
      <div class="row mb-4 mt-4 pb-4">
        <h1 class="text-center">Admin Settings</h1>
      </div>
      <div class="row">
        <div class="col-sm-6 col-md-4 col-lg-3 gutter">
          <a href="/admin/pet/setting" style="text-decoration: none">
            <div class="card option pet mb-3" style="max-width: 18rem;">
              <div class="card-body">
                <h2 class="card-title">
                  <svg id="footstep" style="enable-background:new 0 0 300 300;" version="1.1" viewBox="0 0 300 300" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="   M70,222c0,24.3,19.7,44,44,44c17.748,0,23.996-11.874,40-11.874S176.252,266,194,266c24.3,0,44-19.7,44-44   c0-20.156-13.552-37.146-32.044-42.356C205.984,179.099,206,178.55,206,178c0-24.3-19.772-44-52-44s-52,19.7-52,44   c0,0.55,0.016,1.099,0.044,1.644C83.552,184.854,70,201.844,70,222z" style="fill-rule:evenodd;clip-rule:evenodd;fill:none;stroke:#000000;stroke-width:8;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;"/><path d="   M129.777,113.978c25.827-11.579,22.258-26.188,14.647-44.627c-7.611-18.439-27.727-32.036-43.425-25.828   c-9.757,3.859-12.296,10.849-13.428,22.748c-1.132,11.899-2.882,18.583,0,25.561C95.182,110.271,103.955,125.556,129.777,113.978z" style="fill-rule:evenodd;clip-rule:evenodd;fill:none;stroke:#000000;stroke-width:8;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;"/><path d="   M182.222,113.978c-25.827-11.579-22.258-26.188-14.647-44.627c7.612-18.439,27.728-32.036,43.425-25.828   c9.757,3.859,12.296,10.849,13.428,22.748c1.132,11.899,2.882,18.583,0,25.561C216.817,110.271,208.045,125.556,182.222,113.978z" style="fill-rule:evenodd;clip-rule:evenodd;fill:none;stroke:#000000;stroke-width:8;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;"/><ellipse cx="68" cy="140" rx="24.466" ry="34.657" style="fill-rule:evenodd;clip-rule:evenodd;fill:none;stroke:#000000;stroke-width:8;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -79.076 89.0817)"/><path d="   M214.683,164.035c8.889,9.54,27.425,7.409,41.407-4.76c13.983-12.17,18.111-29.769,9.226-39.309   c-8.885-9.54-27.425-7.409-41.407,4.761C209.93,136.895,205.798,154.494,214.683,164.035z" style="fill-rule:evenodd;clip-rule:evenodd;fill:none;stroke:#000000;stroke-width:8;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;"/></g><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/></svg>
                </h2>
                <h3 class="card-title">Pet</h3>
                <p class="card-text">Add, Update, Delete</p>
              </div>
            </div>
          </a>
        </div>
        <div class="col-sm-6 col-md-4 col-lg-3 gutter">
          <a href="/admin/food/setting" style="text-decoration: none">
            <div class="card option food mb-3" style="max-width: 18rem;">
              <div class="card-body">
                <h2 class="card-title">
                  <svg enable-background="new 0 0 64 64" height="64px" id="Layer_1" version="1.1" viewBox="0 0 64 64" width="64px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path fill="#316B83" d="M13,52.8c0.1,2.6,1.1,4.9,3,6.7c1.7,1.6,4,2.5,6.4,2.5c0,0,0,0,0,0c2.6,0,5.2-1.1,7-3.1c3.2-3.5,3.3-9,0.2-12.5l16.5-18.1   c1.6,1.2,3.5,1.8,5.5,1.8c2.6,0,5.2-1.1,6.9-3.1c3.5-3.8,3.2-9.8-0.6-13.3c-1.9-1.7-4.4-2.6-6.9-2.4c-0.1-2.6-1.1-4.9-3-6.7   c-1.7-1.6-4-2.5-6.4-2.5c-2.6,0-5.2,1.1-7,3.1c-1.7,1.9-2.6,4.3-2.5,6.8c0.1,2.2,0.9,4.3,2.4,5.9l-16.5,18   c-1.6-1.2-3.6-1.9-5.7-1.9c-2.6,0-5.2,1.1-7,3.1C2,40.8,2.2,46.8,6.1,50.3C7.9,52,10.4,52.9,13,52.8z M7,38.3   c1.4-1.5,3.4-2.4,5.5-2.4c1.8,0,3.6,0.7,5,1.9c0,0,0.1,0.1,0.1,0.1c0.4,0.4,1,0.3,1.4-0.1l17.8-19.4c0.2-0.2,0.3-0.5,0.3-0.7   c0-0.3-0.1-0.5-0.3-0.7c0,0-0.1-0.1-0.1-0.1c-1.5-1.3-2.3-3.2-2.4-5.2c-0.1-2,0.6-3.9,1.9-5.4c1.4-1.5,3.4-2.4,5.5-2.4   c1.9,0,3.6,0.7,5,2c1.7,1.6,2.6,3.9,2.3,6.2c0,0.3,0.1,0.6,0.3,0.8c0.2,0.2,0.6,0.3,0.9,0.2c2.3-0.4,4.7,0.2,6.4,1.8   c3,2.8,3.2,7.5,0.5,10.5c-1.4,1.5-3.4,2.4-5.5,2.4c-1.8,0-3.6-0.7-5-1.9c-0.4-0.4-1-0.3-1.4,0.1L27.4,45.7c-0.4,0.4-0.3,1,0.1,1.4   c2.9,2.8,3.1,7.5,0.4,10.4c-1.4,1.5-3.4,2.4-5.5,2.4h0c-1.9,0-3.6-0.7-5-2c-1.7-1.6-2.6-3.9-2.3-6.2c0-0.3-0.1-0.6-0.3-0.8   c-0.2-0.2-0.4-0.3-0.7-0.3c-0.1,0-0.1,0-0.2,0c-2.3,0.4-4.7-0.2-6.4-1.8C4.4,46.1,4.2,41.4,7,38.3z"/></g></svg>
                </h2>
                <h3 class="card-title">Food</h3>
                <p class="card-text">Add, Update, Delete</p>
              </div>
            </div>
          </a>
        </div>
        <div class="col-sm-6 col-md-4 col-lg-3 gutter">
          <a href="/admin/users-manager" style="text-decoration: none">
            <div class="card option user mb-3" style="max-width: 18rem;">
              <div class="card-body">
                <h2 class="card-title">
                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g data-name="79-users"><circle cx="16" cy="13" r="5" fill="none" stroke="#316b83" stroke-linecap="round" stroke-linejoin="round" stroke-width="1px" class="stroke-000000"></circle><path d="M23 28a7 7 0 0 0-14 0ZM24 14a5 5 0 1 0-4-8M25 24h6a7 7 0 0 0-7-7M12 6a5 5 0 1 0-4 8M8 17a7 7 0 0 0-7 7h6" fill="none" stroke="#316b83" stroke-linecap="round" stroke-linejoin="round" stroke-width="1px" class="stroke-000000"></path></g></svg>
                </h2>
                <h3 class="card-title">Users</h3>
                <p class="card-text">Users List</p>
              </div>
            </div>
          </a>
        </div>
        <div class="col-sm-6 col-md-4 col-lg-3 gutter">
          <a href="/admin/requests" style="text-decoration: none">
            <div class="card option sale mb-3" style="max-width: 18rem;">
              <div class="card-body">
                <h2 class="card-title">
                  <svg viewBox="0 0 500 500" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="#316b83" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="2.613" stroke-width="10" class="stroke-130b7a"><path d="M410.719 446.73c0 15.502-12.757 28.273-28.26 28.273M382.459 475.004H73.834M73.834 475.004c-15.489 0-28.274-12.703-28.274-28.273M45.561 446.73V138.202L167.932 24.997h214.527M382.459 24.997c15.572 0 28.26 12.785 28.26 28.26M410.719 53.256V240.37M173.548 24.997v104.372"></path><path d="M173.548 129.369c0 8.278-6.822 15.128-15.114 15.128M158.434 144.497H45.561M245.653 72.974h108.533M354.186 72.974c3.675 0 6.726 3.328 6.726 7.335M360.911 80.31v61.996M360.911 142.306c0 4.049-3.051 7.335-6.726 7.335M354.186 149.642H245.653M245.653 149.642c-3.717 0-6.739-3.286-6.739-7.335M238.914 142.306V80.31M238.914 80.31c0-4.007 3.022-7.335 6.739-7.335M90.21 221.178h271.325M90.21 315.234h186.587M90.21 409.318h199.927M454.439 341.691c0 36.316-29.438 65.783-65.754 65.783-36.344 0-65.797-29.467-65.797-65.783 0-36.344 29.453-65.768 65.797-65.768a65.58 65.58 0 0 1 33.071 8.902M359.802 335.146l33.418 30.631M454.439 298.914l-61.219 66.863"></path></g></svg>
                </h2>
                <h3 class="card-title">Requests</h3>
                <p class="card-text">Received, Refuse, Accept</p>
              </div>
            </div>
          </a>
        </div>
        <div class="col-sm-6 col-md-4 col-lg-3 gutter">
          <a href="/admin/sales" style="text-decoration: none">
            <div class="card option request mb-3" style="max-width: 18rem;">
              <div class="card-body">
                <h2 class="card-title">
                  <svg id="Layer_1" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#316B83"><g><path class="st0" d="M93.5,329.2c-38.7,0-67.9,14.3-67.9,33.3v52.6c0,19,29.2,33.3,67.9,33.3s67.9-14.3,67.9-33.3v-52.6   C161.4,343.6,132.2,329.2,93.5,329.2z M39.6,379.1c11.4,8.1,31.1,13.3,53.9,13.3s42.5-5.2,53.9-13.3v17.2   c-7.7,8.2-27.7,15.4-53.9,15.4s-46.1-7.2-53.9-15.4V379.1z M93.5,343.2c32.9,0,53.9,11.4,53.9,19.3v7.4   c-7.7,8.2-27.7,15.4-53.9,15.4s-46.1-7.2-53.9-15.4v-7.4C39.6,354.7,60.6,343.2,93.5,343.2z M93.5,434.5   c-32.9,0-53.9-11.4-53.9-19.3v-9.8c11.4,8.1,31.1,13.3,53.9,13.3s42.5-5.2,53.9-13.3v9.8C147.4,423,126.4,434.5,93.5,434.5z"/><path class="st0" d="M256,276.6c-38.7,0-67.9,14.3-67.9,33.3v105.2c0,19,29.2,33.3,67.9,33.3s67.9-14.3,67.9-33.3V309.9   C323.9,290.9,294.7,276.6,256,276.6z M309.9,369.9c-7.7,8.2-27.7,15.4-53.9,15.4s-46.1-7.2-53.9-15.4v-17.2   c11.4,8.1,31.1,13.3,53.9,13.3s42.5-5.2,53.9-13.3V369.9z M309.9,343.6c-7.7,8.2-27.7,15.4-53.9,15.4s-46.1-7.2-53.9-15.4v-17.2   c11.4,8.1,31.1,13.3,53.9,13.3s42.5-5.2,53.9-13.3V343.6z M202.1,379.1c11.4,8.1,31.1,13.3,53.9,13.3s42.5-5.2,53.9-13.3v17.2   c-7.7,8.2-27.7,15.4-53.9,15.4s-46.1-7.2-53.9-15.4V379.1z M256,290.6c32.9,0,53.9,11.4,53.9,19.3v7.4   c-7.7,8.2-27.7,15.4-53.9,15.4s-46.1-7.2-53.9-15.4v-7.4C202.1,302.1,223.1,290.6,256,290.6z M256,434.5   c-32.9,0-53.9-11.4-53.9-19.3v-9.8c11.4,8.1,31.1,13.3,53.9,13.3s42.5-5.2,53.9-13.3v9.8C309.9,423,288.9,434.5,256,434.5z"/><path class="st0" d="M418.5,224c-38.7,0-67.9,14.3-67.9,33.3v157.8c0,19,29.2,33.3,67.9,33.3s67.9-14.3,67.9-33.3V257.3   C486.4,238.3,457.2,224,418.5,224z M472.4,369.9c-7.7,8.2-27.7,15.4-53.9,15.4s-46.1-7.2-53.9-15.4v-17.2   c11.4,8.1,31.1,13.3,53.9,13.3s42.5-5.2,53.9-13.3V369.9z M472.4,343.6c-7.7,8.2-27.7,15.4-53.9,15.4s-46.1-7.2-53.9-15.4v-17.2   c11.4,8.1,31.1,13.3,53.9,13.3s42.5-5.2,53.9-13.3V343.6z M472.4,317.3c-7.7,8.2-27.7,15.4-53.9,15.4s-46.1-7.2-53.9-15.4v-17.2   c11.4,8.1,31.1,13.3,53.9,13.3s42.5-5.2,53.9-13.3V317.3z M472.4,291c-7.7,8.2-27.7,15.4-53.9,15.4s-46.1-7.2-53.9-15.4v-17.2   c11.4,8.1,31.1,13.3,53.9,13.3s42.5-5.2,53.9-13.3V291z M364.6,379.1c11.4,8.1,31.1,13.3,53.9,13.3s42.5-5.2,53.9-13.3v17.2   c-7.7,8.2-27.7,15.4-53.9,15.4s-46.1-7.2-53.9-15.4V379.1z M418.5,238c32.9,0,53.9,11.4,53.9,19.3v7.4   c-7.7,8.2-27.7,15.4-53.9,15.4s-46.1-7.2-53.9-15.4v-7.4C364.6,249.5,385.6,238,418.5,238z M418.5,434.5   c-32.9,0-53.9-11.4-53.9-19.3v-9.8c11.4,8.1,31.1,13.3,53.9,13.3s42.5-5.2,53.9-13.3v9.8C472.4,423,451.4,434.5,418.5,434.5z"/><path class="st0" d="M93.5,283.1c14.2,0,25.8-11.6,25.8-25.8c0-0.7,0-1.4-0.1-2l115.9-42.8c4.7,6.4,12.3,10.6,20.9,10.6   c14.2,0,25.8-11.6,25.8-25.8c0-2.8-0.4-5.4-1.2-7.9l121.1-80.5c4.5,3.9,10.4,6.2,16.8,6.2c14.2,0,25.8-11.6,25.8-25.8   s-11.6-25.8-25.8-25.8s-25.8,11.6-25.8,25.8c0,2.8,0.4,5.4,1.2,7.9l-121.1,80.5c-4.5-3.9-10.4-6.2-16.8-6.2   c-14.2,0-25.8,11.6-25.8,25.8c0,0.7,0,1.4,0.1,2l-115.9,42.8c-4.7-6.4-12.3-10.6-20.9-10.6c-14.2,0-25.8,11.6-25.8,25.8   S79.3,283.1,93.5,283.1z M418.5,77.5c6.5,0,11.8,5.3,11.8,11.8s-5.3,11.8-11.8,11.8s-11.8-5.3-11.8-11.8S412,77.5,418.5,77.5z    M256,185.6c6.5,0,11.8,5.3,11.8,11.8s-5.3,11.8-11.8,11.8c-5,0-9.3-3.2-11-7.6c0,0,0-0.1,0-0.1c0,0,0,0,0-0.1   c-0.5-1.3-0.7-2.6-0.7-4C244.2,190.9,249.5,185.6,256,185.6z M93.5,245.5c6.5,0,11.8,5.3,11.8,11.8s-5.3,11.8-11.8,11.8   s-11.8-5.3-11.8-11.8S87,245.5,93.5,245.5z"/></g></svg>                
                </h2>
                <h3 class="card-title">Proceeds</h3>
                <p class="card-text">Orders List</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.card.option {
  border-top: 3px solid #C8C6C6;
  border-bottom: 2px solid #C8C6C6;
  transition: transform .3s
}
.card.option .card-body .card-title svg{
  height: 100px
}
.card.option .card-body h3.card-title {
  color: #000;
}
.card.option .card-body .card-title path, .card.option .card-body .card-title circle, .card.option .card-body .card-title line, .card.option .card-body .card-title ellipse {
  stroke: #316B83!important
}
.card.option .card-body .card-text {
  color: #7E7E7E
}
.card.option:hover {
  transform: scale(1.05);
}
</style>
