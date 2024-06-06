<template>
    <div>
        <div v-if="store.state.isLogin">
            <div>List user</div>
            <table>
                <tr>
                    <th>UserID</th>
                    <th>Email</th>
                    <th>FirstName</th>
                    <th>LastName</th>
                    <th>Tel</th>
                    <!-- <th>lineID</th> -->
                    <th>Product</th>
                    <th>Tenan</th>
                    <th>Type</th>
                </tr>
                <tr v-for="(el, idx) in listDataUser" :key="idx">
                    <td>{{el.userID}}</td>
                    <td>{{el.email}}</td>
                    <td>{{el.fristName}}</td>
                    <td>{{el.lastName}}</td>
                    <td>{{el.tel}}</td>
                    <!-- <td>{{el.lineUserId}}</td> -->
                    <td>{{el.isProduct}}</td>
                    <td>{{el.userTenan}}</td>
                    <td>{{el.userType}}</td>
                </tr>
            </table>
            <br/>
            <br/>
            <div>List customer</div>
            <table>
                <tr>
                    <th>customerID</th>
                    <th>email</th>
                    <th>customerTenan</th>
                    <th>customerType</th>
                    <th>createDate</th>
                </tr>
                <tr v-for="(el, idx) in listDataCustomer" :key="idx">
                    <td>{{el.customerID}}</td>
                    <td>{{el.email}}</td>
                    <td>{{el.customerTenan}}</td>
                    <td>{{el.customerType}}</td>
                    <td>{{el.createDate}}</td>
                </tr>
            </table>
        </div>
        <div v-if="!store.state.isLogin">unauthorized</div>
    </div>
</template>

<script setup>
import axios from "axios"
import { useStore } from "vuex"
import { onMounted, ref } from 'vue'
const store = useStore()

const listDataUser = ref([])
const listDataCustomer = ref([])

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

onMounted(async () => {
    funcCheckToken()
    const headersConf = {
        headers: {
            authorization: "Bearer" + " " + $cookies.get("js-token")
        }
    }
    try {
        const userData = await axios.get("https://4mfyxc62pi.execute-api.ap-southeast-1.amazonaws.com/fetch/user", headersConf)
        listDataUser.value = userData.data
    } catch (err) {
        console("err fetch user data => ", err)
    }

    try {
        const customerData = await axios.get("https://4mfyxc62pi.execute-api.ap-southeast-1.amazonaws.com/fetch/customer", headersConf)
        listDataCustomer.value = customerData.data
    } catch (err) {
        console("err fetch customer data => ", err)
    }
    // console.log("listDataUser.value => ", listDataUser.value)
    // console.log("listDataCustomer.value => ", listDataCustomer.value)
})

</script>

<style scoped>

table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }
  
  td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }
  
  tr:nth-child(even) {
    background-color: hsl(0, 0%, 29%);
  }
</style>