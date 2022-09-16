<template>
  <div id="app" class="mt-0">
    <app-header style="position: fixed; width: 100%; z-index: 999; transition: .4s; margin: 0" :class="['menu', {'white-menu': scrolled}]" :status="componentKey" :key="componentKey"></app-header>
    <router-view class="main" @change="getData"/>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
export default {
  name: 'App',
  components: {
    appHeader: Header,
    appFooter: Footer
  },
  data() {
    return {
      componentKey: 0,
      white: 0,
      scrolled: false
    }
  },
  computed: {
    getFullPath () {
      return this.$route.path
    }
  },
  watch: {
    getFullPath () {
      this.getData()
    }
  },
  methods: {
    getData () {
      this.componentKey ++;
    },
    scrollFunction() {
      this.white = 1
    },
    handleScroll () {
      this.scrolled = window.scrollY > 80;
    }
  },
  created () {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Quicksand&display=swap');
#app {
  font-family: 'Quicksand', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.white-menu {
  background-color: rgba(255, 255, 255, 0.9);
}
</style>
<style lang="scss">
  $fa-font-path: "~@fortawesome/fontawesome-free/webfonts";
@import "~@fortawesome/fontawesome-free/scss/fontawesome";
@import "~@fortawesome/fontawesome-free/scss/solid"; // fas
@import "~@fortawesome/fontawesome-free/scss/regular"; // far
@import "~@fortawesome/fontawesome-free/scss/brands"; // fab
.main {
  min-height: 650px
}
</style>
