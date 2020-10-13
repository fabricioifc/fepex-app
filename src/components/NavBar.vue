<template>
  <b-navbar
    toggleable="lg"
    type="dark"
    fixed="top"
    :class="{ sticky: active }"
    class="shadow"
    id="navbar"
  >
    <b-navbar-brand to="/" class="p-0">
      <img
        src="../assets/fepex-logo.jpg"
        width="50"
        class="d-inline-block align-middle"
      />
      Fepex App
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/trabalhos">
          <b-button variant="light" class="font-weight-bold">
            <b-icon icon="list" aria-hidden="true"></b-icon>
            Confira os Trabalhos dos nossos Alunos
          </b-button>
        </b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <!-- <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input
            size="sm"
            class="mr-sm-2"
            placeholder="Search"
          ></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit"
            >Search</b-button
          >
        </b-nav-form>

        <b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">ES</b-dropdown-item>
          <b-dropdown-item href="#">RU</b-dropdown-item>
          <b-dropdown-item href="#">FA</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown right>
          <template v-slot:button-content>
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav> -->
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return { active: false };
  },
  mounted() {
    window.document.onscroll = () => {
      let navBar = document.getElementById("navbar");
      if (window.scrollY > navBar.offsetTop) {
        this.active = true;
      } else {
        this.active = false;
      }
    };
  },
};
</script>

<style scoped>
#navbar {
  background-color: #498e6c;
}
</style>
