<template>
    <div>
        <div class="t-dasd">Dashboard / {{selectMenu}}</div>
        <div class="b-home" v-if="selectMenu !== 'home'">
            <button class="btn" @click="funcSelectMenu('home')">
                <div >Home</div>
            </button>
            
        </div>
        <div class="c-dasd">
            <div>
                <button class="btn" @click="funcSelectMenu('createUser')">
                    <div>Create user</div>
                </button>
                
            </div>
            <div>
                <button class="btn"  @click="funcSelectMenu('createCustomer')">
                    <div>Create customer</div>
                </button>
                
            </div>
            <div>
                <button class="btn" @click="funcSelectMenu('listDetail')">
                    <div>List detail</div>
                </button>
            </div>
        </div>
        <div class="set-create-user">
            <div  v-if="selectMenu === 'createUser'">
                <CreateUser/>
            </div>
            <div v-if="selectMenu === 'createCustomer'">
                <CreateCustomer/>
            </div>
            <div v-if="selectMenu === 'listDetail'">
                <ListDataView/>
            </div>
        </div>
        
    </div>

</template>

<script setup>
import {onMounted, ref} from 'vue'
import CreateCustomer from './CreateCustomer.vue'
import CreateUser from './CreateUser.vue'
import ListDataView from './ListDataView.vue'


const selectMenu = ref("home");

const funcSelectMenu = (evt) => {
    console.log(evt)
    if(evt === "home"){
        selectMenu.value = "home"
    }else if(evt === "createUser"){
        selectMenu.value = "createUser"
    }else if(evt === "createCustomer"){
        selectMenu.value = "createCustomer"
    }else if(evt === "listDetail"){
        selectMenu.value = "listDetail"
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
button > div{
   color: hsla(160, 100%, 37%, 1);
}

button > div:hover{
    background-color: rgb(1, 60, 41);

 }


.btn{
    all: unset;
}

.b-home{
    margin-left: 55px;
    margin-bottom: 30px;
}

.t-dasd{
    text-align: center;
    margin-bottom: 30px;
}
.c-dasd{
    display: flex;
    justify-content: space-around;
}
.set-create-user{
    margin-top: 20px;
}
</style>