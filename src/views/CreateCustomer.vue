<template>
    <div>
        <div v-if="store.state.isLogin">
            <div class="l-t">
                <label>customerID</label>
                <input v-model="customerID" required/>
            </div>
            <div class="l-t">
                <label>email</label>
                <input v-model="email" required/>
            </div>
            <div class="l-t">
                <label>password</label>
                <input v-model="password" required/>
            </div>
            <div class="l-t">
                <label>Type</label>
                <select v-model="customerType" required>
                    <option disabled value="">Please select customer type</option>
                    <option value="A">A</option>
                    <option  value="B">B</option>
                    <option  value="C">C</option>
                </select>
            </div>
            <div class="l-t">
                <label>customerTenan</label>
                <select v-model="customerTenan" required>
                    <option disabled value="">Please select customer tenan</option>
                    <option v-for="(el, idx) in listTenan" :key="idx" :value="el">{{el}}</option>
                </select>
            </div>
            <div class="btn-submit">
                <button @click="funcCreateCustomer">Submit</button>
            </div>
        </div>
        <div v-if="!store.state.isLogin">unauthorized</div>
    </div>
</template>

<script setup>
import axios from "axios"
import {useStore} from "vuex"
import {onMounted, ref } from 'vue'
import auth from "../utils/auth"
const store = useStore()

const customerID = ref("");
const email = ref("");
const password = ref("");
const customerTenan = ref("");
const customerType = ref("C")
const listTenan = ref([])

const funcCreateCustomer = async () => {
    const date = new Date();
    const ms = date.getTime();
    const headersConf = {
        headers: {
            authorization: "Bearer" + " " + $cookies.get("js-token")
        }
    }
    if(customerID.value !== "" && email.value !== "" && password.value !== "" && customerTenan.value !== ""){
        const payload = {
        customerID: customerID.value,
        createDate: parseInt(ms),
        email: email.value, 
        password: password.value,
        customerType: customerType.value,
        customerTenan: customerTenan.value

    }
    try{
        const statusCreateCustomer = await axios.post("https://4mfyxc62pi.execute-api.ap-southeast-1.amazonaws.com/create/customer",payload ,headersConf );
        if(statusCreateCustomer.status === 200){
            alert("create customer success!")
        }else{
            alert("Fail to create customer")
        }
    }catch(err){
        console.log(err)
        alert(err.message)
    }
    }
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
            if(setType === "super_admin"){
                listTenan.value = ["Rangsit_01", "Rangsit_02"]
            }else if(setType === "admin"){
                if(setTenan === "Rangsit_01"){
                    listTenan.value = ["Rangsit_01"]
                }else if(setTenan === "Rangsit_02"){
                    listTenan.value = ["Rangsit_01"]
                }
            }else if(setType === "user"){
                if(setTenan === "Rangsit_01"){
                    listTenan.value = ["Rangsit_01"]
                }else if(setTenan === "Rangsit_02"){
                    listTenan.value = ["Rangsit_01"]
                }
            }
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
.btn-submit{
    margin-top: 20px;
}
.l-t{
    display: grid;
    grid-template-columns: 1fr 1fr;
}

</style>