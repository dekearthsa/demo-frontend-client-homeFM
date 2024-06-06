<template>
    <Loading  v-if="isLoading" class="loading-c"/>
    <div class="loading" v-if="isLoading"></div>
    <div class="c-login">
        
        <div class="t-login">Login</div>
        
        <div class="s-login" v-if="store.state.isLogin === false"> 
            <div>   
                <div>Email</div>
                <input placeholder="xxx@gmail.com" v-model="email"/>
            </div>
            <div>   
                <div>Password</div>
                <input placeholder="xxxxxxxxx" v-model="password"/>
            </div>
            <div class="b-login">
                <button @click="funcLogin">Login</button>
            </div>
        </div>
        <div class="login-fin" v-if="store.state.isLogin === true">
            <div>       
                <div>Welcome {{store.state.isEmail}}</div>
            </div>
            <div class="b-login">
                <button @click="funcLogout">Logout</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from "axios"
import {useStore} from "vuex"
import {onMounted, ref } from 'vue'
import auth from "../utils/auth"
import Loading from "../components/Loading.vue"

const store = useStore()
const isAuthFail = ref("")
const email = ref("")
const password = ref("")

const isLoading = ref(false)

const funcLogin = async () => {
    isLoading.value = true
    const payload = {
        email: email.value,
        password: password.value
    }
    try{
        const reply = await axios.post("https://4mfyxc62pi.execute-api.ap-southeast-1.amazonaws.com/login", payload);
        // console.log(reply.data)
        if(reply.status === 200){
            store.state.debugData = reply.data.debugData
            store.state.isEmail = reply.data.debugData.email
            store.state.isTenan = reply.data.debugData.tenan
            $cookies.set("js-token", reply.data.token);
            store.state.isLogin = true
            store.state.isEmail = email.value
            isLoading.value = false
        }else{
            // console.log(reply.status)
            isAuthFail.value = "unauthorized"
            alert("invalid email or password.")
            store.state.isLogin = false
            store.state.isEmail = ""
            isLoading.value = false
        }

    }catch(err){
        console.log(err)
        alert(err)
        isAuthFail.value = err.message
        store.state.isLogin = false
        store.state.isEmail = ""
        isLoading.value = false
        }

}


const funcLogout = () => {
    $cookies.remove("js-token");
    store.state.isLogin = false;
    window.location.reload();
}

const funcCheckToken = async () => {
    const token = $cookies.get("js-token")
    // console.log("token => ",token)
    if(!token){
        store.state.isLogin = false
    }else{
        const {statusExp, setEmail, setTenan, setType} = await auth(token)
        // console.log(setEmail)
        if(!statusExp){
            store.state.isLogin = true
            store.state.isEmail = setEmail
            store.state.isTenan = setTenan
            store.state.isUserType = setType
        }else{
            store.state.isLogin = false
            store.state.isEmail = setEmail
            store.state.isTenan = setTenan
            store.state.isUserType = setType
        }
    }
}

onMounted( async () => {
    funcCheckToken()
})

</script>

<style scoped>

.loading-c{
    position: absolute;
    left: 45%;
}
.loading{
    position: absolute;
    top: 0%;
    right: 0%;
    width: 100%;  
    height: 100vh;
    background-color: rgb(221, 221, 221);
    opacity: 0.3;
  }


.c-login{
margin-left: 20px;
}


.t-login{
    font-size: 20px;
    font-weight: bold;
}

.s-login{
    margin-top: 20px;
    font-size: 18px;
    
}

.b-login{
    margin-top: 20px;
}
</style>