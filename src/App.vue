<template>
  <header class="entete">
    <img src="./assets/logo.png" alt="" class="logo" />
  </header>
  <!-- <router-link to="/usercomite"> USER </router-link> -->
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.entete {
  min-height: 85px;
  border-bottom: 4px solid black;
}

.logo {
  margin-top: 5px;
  height: 7vh;
}
</style>
