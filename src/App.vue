<template>
  <header class="entete">
    <img src="./assets/logo.png" alt="" class="logo" />
  </header>
  <nav><router-link to="/">Home</router-link></nav>
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
  min-height: 80px;
  border-bottom: 4px solid black;
  padding-bottom: 10px;
}

.logo {
  height: 9vh;
}
</style>
