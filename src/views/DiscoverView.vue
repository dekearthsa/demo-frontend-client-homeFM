<template>
    <div v-if="!permissionLoading">
        <div class="c-title">
            <div> 
                <button @click="funcHome">Discover data</button>
                <div>{{isTitleData}}</div>
            </div>
        </div>
        <div>
            <div class="c-tenant-hold">
                <table v-if="isSession === 'list-tenan'">
                    <tr>
                        <th>List platform</th>
                    </tr>
                    <tr v-for="(el, idx) in listTenant" :key="idx">
                        <td @click="funcHaddleDetailTenanDevice(el)" class="t-id">{{el}}</td>
                    </tr>
                </table>
            </div>
            <div v-if="isSession === 'list-device-tenant'" class="c-tenant-hold">
                <table>
                    <tr>
                        <th>DeviceID</th>
                        <th>DeviceType</th>
                        <th>Solution</th>
                        <th>Platform</th>
                        <th>Device Create</th>
                    </tr>
                    <tr v-for="(el, idx) in listDeviceTenant" :key="idx" @click="funcFetchDeviceData(el.deviceID, el.solution, el.tenantID)">
                        <td class="d-id">{{el.deviceID}}</td>
                        <td class="d-ty">{{el.deviceType}}</td>
                        <td class="sl">{{el.solution}}</td>
                        <td class="t-id">{{el.tenantID}}</td>
                        <td class="c-d">{{el.createDate}}</td>
                    </tr>
                </table>
            </div>
            <div v-if="isSession === 'list-device-tenant-device-data'" class="c-tenant-hold">
                <table>
                    <tr>
                        <th>DeviceID</th>
                        <th>DeviceType</th>
                        <th>DataDevice</th>
                        <th>TimeStamp</th>
                    </tr>
                    <tr v-for="(el, idx) in arrayDeviceData" :key="idx">
                        <td class="d-id">{{el.deviceID}}</td>
                        <td class="d-ty">{{el.deviceType}}</td>
                        <td class="sl">{{el.dataDevice}}</td>
                        <td class="c-d">{{el.createDate}}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from "axios"
import { useStore } from "vuex"
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router';
import auth from "../utils/auth"

const store = useStore();
const router = useRouter();

const isPermissiom = ref(false)
const permissionLoading = ref(false)
const arrayTenantData = ref([])
const listTenant = ref([])
const listDeviceTenant = ref([])
const arrayDeviceData = ref([])
const isTitleData = ref("")
const isLoadingData = ref(false)
const isSession = ref("list-tenan")

const funcHome = async () => {
    listDeviceTenant.value = []
    arrayDeviceData.value = []
    isTitleData.value = ""
    await funcFetchTenanDevice();
}

const funcCreateListTenant = async (arrayData) => {
    for(let i = 0; i < arrayData.length; i++){
        if(!listTenant.value.includes(arrayData[i].tenantID)){
            listTenant.value.push(arrayData[i].tenantID)
        }
    }
}

const funcHaddleDetailTenanDevice = async (evt) => {
    // console.log(evt)
    isTitleData.value = evt
    isSession.value = "list-device-tenant"
    for(let i = 0; i < arrayTenantData.value.length; i++){
        if(evt === arrayTenantData.value[i].tenantID){
            // console.log(arrayTenantData.value[i])
            listDeviceTenant.value.push(arrayTenantData.value[i])
        }
    }
    
}

const funcFetchTenanDevice = async () => {
    isSession.value = "list-tenan"
    isLoadingData.value = true
    const headerConf = {
        headers: {
            Authorization: `Bearer ${$cookies.get("js-token")}`
        }
    }

    try{    
        const isTeantData = await axios.get("https://4mfyxc62pi.execute-api.ap-southeast-1.amazonaws.com/fetch/devicetenant", headerConf);
        arrayTenantData.value = isTeantData.data
        await funcCreateListTenant(isTeantData.data)
        isLoadingData.value = false
    }catch(err){
        console.log("isTeantData err => ",err)
        isLoadingData.value = false
    }
  
}

const funcFetchDeviceData = async (deviceID, platform, tenan) => {
    isSession.value = "list-device-tenant-device-data"
    isTitleData.value = deviceID
    isLoadingData.value = true
    const headerConf = {
        headers: {
            Authorization: `Bearer ${$cookies.get("js-token")}`
        }
    }

    const payload = {
        tenanSelector: tenan,
        platform: platform,
    }
    // console.log(payload)
    try{
        const isDeviceData = await axios.post("https://4mfyxc62pi.execute-api.ap-southeast-1.amazonaws.com/fetch/devices", payload, headerConf);
        // console.log("isDeviceData => ", isDeviceData.data)
        for(let i = 0; i < isDeviceData.data.length; i++){
            if(deviceID === isDeviceData.data[i].deviceID){
                arrayDeviceData.value.push(isDeviceData.data[i])
            }
        }
        isLoadingData.value = false
    }catch(err){
        console.log("isDeviceData => ",err)
        isLoadingData.value = false
    }
    
}

const funcCheckToken = async () => {
    const token = $cookies.get("js-token")
    permissionLoading.value = true
    if(!token){
        alert("token expire!")
        store.state.isLogin = false
        permissionLoading.value = false
        $cookies.remove("s-token")
        router.push("/login")
    }else{
        const {statusExp, setEmail, setTenan, setType} = await auth(token)
        if(!statusExp){
            store.state.isLogin = true
            store.state.isEmail = setEmail
            store.state.isTenan = setTenan
            store.state.isUserType = setType
            if(setType === "super_admin"){
                isPermissiom.value = true
                permissionLoading.value = false
            }else if(setType === "admin"){
                if(setTenan === "Rangsit_01"){

                    isPermissiom.value = true
                    permissionLoading.value = false
                }else if(setTenan === "Rangsit_02"){

                    isPermissiom.value = true
                    permissionLoading.value = false
                }
            }else{
                permissionLoading.value = false
                isPermissiom.value = false
            }
        }else{
            isPermissiom.value = false
            permissionLoading.value = false
            store.state.isLogin = false
            $cookies.remove("s-token")
            router.push("/login")
        }

    }
}

onMounted( async () => {
    await funcCheckToken();
    await funcFetchTenanDevice();
})

</script>

<style scoped>
.c-title{
    text-align: center;
    margin-bottom: 30px;
}

table {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }
  
  table td, table th {
    border: 1px solid #ddd;
    padding: 8px;
  }
  
  table tr:nth-child(even){background-color: #4f4f4f;}
  
  table tr:hover {background-color: #212121;}
  
  table th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #3966e4;
    color: white;
  }

</style>