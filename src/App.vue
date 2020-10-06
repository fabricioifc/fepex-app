<template>
  <div id="app">
    <NavBar class="mb-3" />
    <b-container id="main" class="bg-light">
      <router-view></router-view>
    </b-container>
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
export default {
  name: "app",
  components: {
    NavBar,
  },
};
</script>

<style>
body {
  height: 100%;
  background: url("./assets/bg.jpg") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
  -o-background-size: cover;
  padding-top: 4.5rem;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
