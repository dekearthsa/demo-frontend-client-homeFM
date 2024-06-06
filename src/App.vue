<script setup>
import {useStore} from "vuex"
// import { RouterLink, RouterView } from 'vue-router'
// import {onMounted } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
// import Loading from "./components/Loading.vue"
// import auth from "./utils/auth"


const store = useStore()

// onMounted( async () => {
//     const token = $cookies.get("js-token")
//     if(!token){
//         store.state.isLogin = false
//     }else{
//         const {statusExp, setEmail, setTenan, setType} = await auth(token)
//         if(!statusExp){
//             store.state.isLogin = true
//             store.state.isEmail = setEmail
//             store.state.isTenan = setTenan
//             store.state.isUserType = setType
//         }else{
//             store.state.isLogin = false
//             store.state.isEmail = setEmail
//             store.state.isTenan = setTenan
//             store.state.isUserType = setType
//         }
//     }
// })

</script>

<template>
  <header>
    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <!-- <RouterLink to="/about">About</RouterLink> -->
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/dashboard">Dashboard</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>


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
