<script setup>
import {useStore} from "vuex"
import HelloWorld from './components/HelloWorld.vue'



const store = useStore()


</script>

<template>
  <header>
    
    <div>
      <div class="info-d">
        <HelloWorld/>
      </div>
      <div>
        <div class="btn-change">
          <RouterLink to="/">Home</RouterLink>
        </div>
        <div  class="btn-change">
          <RouterLink to="/login">Login</RouterLink>
        </div>
        <div  class="btn-change">
          <RouterLink to="/dashboard">Dashboard</RouterLink>
        </div>
        <div  class="btn-change">
          <RouterLink to="/createPlatform">CreatePlatform</RouterLink>
        </div>
        <div  class="btn-change">
          <RouterLink to="/addDevice">Add device</RouterLink>
        </div>
        <div  class="btn-change">
          <RouterLink to="/listDevice">List device</RouterLink>
        </div>
      </div>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>

.info-d{
  margin-bottom: 20px;
}

.btn-change{
  margin-bottom: 5px;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
