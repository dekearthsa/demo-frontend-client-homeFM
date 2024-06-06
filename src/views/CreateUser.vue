<template>
    <div>
        <div v-if="(store.state.isLogin) && store.state.isUserType === 'super_admin' || store.state.isUserType === 'admin'">
            <div class="l-t">
                <label>userID</label>
                <input v-model="userID" required/>
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
                <label>fristName</label>
                <input v-model="fristName" required/>
            </div>
            <div class="l-t">
                <label>lastName</label>
                <input v-model="lastName" required/>
            </div>
            <div class="l-t">
                <label>plantName</label>
                <input v-model="plantName" required/>
            </div>
            <div class="l-t">
                <label>lineUserId</label>
                <input v-model="lineUserID" required/>
            </div>
            <div class="l-t">
                <label>userTenan</label>
                <select v-model="userTenan" required>
                    <option disabled value="">Please select user tenan</option>
                    <option v-for="(el, idx) in arrayTenan" :key="idx">{{el}}</option>
                </select>
            </div>
            <div class="l-t">
                <label>userType</label>
                <select v-model="userType" required>
                    <option disabled value="">Please select user type</option>
                    <option v-for="(el, idx) in arrayType" :key="idx">{{el}}</option>
                </select>
            </div>
            <div class="l-t">
                <label>tel</label>
                <input v-model="tel" required/>
            </div>
            <div class="l-t">
                <label>isProduct</label>
                <div>
                    <div class="set-product-list" v-for="(el, idx) in addingProductList" :key="idx">
                        <div>
                            <span>
                                <button class="rm-x" @click="funcRemoveProduct(idx)">x</button>
                            </span>
                            <span style="margin-left: 15px">{{el}}</span>
                            
                        </div>
                    </div>
                    <div>
                        <select v-model="isProduct" required>
                            <option disabled value="">Please select user type</option>
                            <option v-for="(el, idx) in arrayOfProduct" :key="idx">{{el}}</option>
                        </select>
                        <button @click="addingProduct(isProduct)">add</button>
                    </div>

                </div>

            </div>
            <div class="set-btn">
                <button @click="funcCreateUser">Submit</button>
            </div>
        </div>
        <div v-if="!store.state.isLogin && store.state.isUserType !== 'super_admin' && store.state.isUserType !== 'admin'">unauthorized</div>
    </div>
</template>

<script setup>
import axios from "axios"
import {useStore} from "vuex"
import {onMounted, ref } from 'vue'
import auth from "../utils/auth"
const store = useStore()

const userID = ref("");
const email = ref("");
const password =ref("");
const fristName = ref("");
const lastName = ref("");
const plantName = ref("");
const lineUserID =ref("");
const userTenan=  ref("");
const userType = ref("");
const tel = ref("");
const isProduct = ref("")
const addingProductList = ref([])
const arrayOfProduct = ref(["air_factory", "solar_roof"]);

const arrayTenan = ref([]);
const arrayType = ref([]);


const addingProduct = (evt) => {
    console.log(evt)
        if(!addingProductList.value.includes(evt)){
            addingProductList.value.push(isProduct.value)
        }else{
            alert(`this product ${evt} is already add.`)
        }
 }
   

const funcRemoveProduct = (evt) => {
    addingProductList.value.splice(evt)
}

const funcCreateUser = async () => {
    // const date = new Date.now()
    // const ms = date.getTime();
    const headersConf = {
        headers: {
            authorization: "Bearer" + " " + $cookies.get("js-token")
        }
    }
    const payload = {
        userID: userID.value,
        email: email.value,
        password: password.value,
        fristName: fristName.value,
        lastName: lastName.value,
        plantName: plantName.value,
        lineUserId: lineUserID.value,
        userTenan: userTenan.value,
        userType: userType.value,
        tel: tel.value,
        isProduct: addingProductList.value
    }
    console.log("token => ", headersConf)
    console.log(payload)
    try{
        const statusCreateUser = await axios.post("https://4mfyxc62pi.execute-api.ap-southeast-1.amazonaws.com/create/user", payload,headersConf)
        if(statusCreateUser.status === 200){
            alert("create user success!")
        }else{  
            alert("Fail to create user!")
        }
    }catch(err){
        console.log(err)
        alert(err.message)
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
                arrayTenan.value = ["Rangsit_01", "Rangsit_02"]
                arrayType.value = ["super_admin", "admin", "user"]
            }else if(setType === "admin"){
                arrayTenan.value = [setTenan]
                arrayType.value = ["admin", "user"]
            }
        }else{
            store.state.isLogin = false
            store.state.isEmail = setEmail
            store.state.isTenan = setTenan
            store.state.isUserType = setType
        }
    }
}

onMounted(() => {
    funcCheckToken()
})

</script>

<style scoped>
.l-t{
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.set-btn{
    margin-top: 20px;
}
.set-product-list{
    display:flex;
    padding-left: 3px;
}

.rm-x{
    all: unset;
}
</style>