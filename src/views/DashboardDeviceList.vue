<template>
    <div>
        <div v-if="isPopUp" class="pop-up">
            <div>
                <div class="title-p">Warning you have been to edit data!</div>
                <div class="con-edit">
                    <button class="btn-n" @click="funcDisagreeEditing">NO</button>
                    <button class=btn-y @click="funcConfirmEditing">YES</button>
                </div>
            </div>
        </div>
        <div class="title" >List devices</div>
        <div v-if="!permissionLoading">
            <div class="admin-per" v-if="isPermissiom">
                <div style="margin-bottom: 15px; margin-top: 15px;">
                    <label style="margin-left: 15px; margin-right: 15px;">Platform</label>
                    <select id="platform-selector" v-model="platformSelected">
                        <option value="JOURNEY_SOLUTION">Journaly solution</option>
                        <option value="SOLAR">Solar</option>
                    </select>
                    <label style="margin-left: 15px; margin-right: 15px;">Tenancy</label>
                    <select id="tenan-selector" v-model="tenancySelected">
                        <option v-for="(el, idx) in tenancyList" :key="idx">{{el}}</option>
                    </select>
                    <button style="margin-left: 15px;" @click="funcFindingDevice">Find Device</button>
                </div>
                <div v-if="isLoadingData">
                    <SmallLoadingVue/>
                </div>
                <div v-if="!isLoadingData" class="set-c-table">
                    <table>
                        <tr>
                            <th>DeviceID</th>
                            <th>DeviceType</th>
                            <th>CreateDate</th>
                            <th>EventType</th>
                            <th>Action</th>
                        </tr>
                        <tr v-for="(el, idx) in deviceListData" :key="idx">
                            <td @click="funcEditingData(`deviceID_${idx}`)">
                                <span v-if="editingFiled !== `deviceID_${idx}`">{{el.deviceID}}</span>
                                <span v-if="editingFiled === `deviceID_${idx}`">
                                    <input v-model="deviceListData[idx].deviceID" />
                                </span>
                            </td>
                            <td @click="funcEditingData(`deviceType_${idx}`)"> 
                                <span v-if="editingFiled !== `deviceType_${idx}`">{{el.deviceType}}</span>
                                <span v-if="editingFiled === `deviceType_${idx}`">
                                    <input v-model="deviceListData[idx].deviceType" />
                                </span>
                            </td>
                            <td @click="funcEditingData(`data${idx}`)"> 
                                <span v-if="editingFiled !== `data${idx}`">{{el.data}}</span>
                                <span v-if="editingFiled === `data${idx}`">
                                    <input v-model="deviceListData[idx].data" />
                                </span>
                            </td>
                            <td> 
                                <span v-if="editingFiled !== `createDate${idx}`">{{el.createDate}}</span>
                                <span v-if="editingFiled === `createDate${idx}`">
                                    <input v-model="deviceListData[idx].createDate" disabled />
                                </span>
                            </td>
                            <td @click="funcEditingData(`eventType${idx}`)"> 
                                <span v-if="editingFiled !== `eventType${idx}`">{{el.eventType}}</span>
                                <span v-if="editingFiled === `eventType${idx}`">
                                    <input v-model="deviceListData[idx].eventType" />
                                </span>
                            </td>
                            <!-- <td @click="funcEditingData(`platform${idx}`)"> 
                                <span v-if="editingFiled !== `platform${idx}`">{{el.platform}}</span>
                                <span v-if="editingFiled === `platform${idx}`">
                                    <input v-model="deviceListData[idx].platform" />
                                </span>
                            </td>
                            <td @click="funcEditingData(`tenan${idx}`)"> 
                                <span v-if="editingFiled !== `tenan${idx}`">{{el.tenan}}</span>
                                <span v-if="editingFiled === `tenan${idx}`">
                                    <input v-model="deviceListData[idx].tenan" />
                                </span>
                            </td>
                            <td>{{el.createTime}} *</td>
                            <td @click="funcEditingData(`description${idx}`)"> 
                                <span v-if="editingFiled !== `description${idx}`">{{el.description}}</span>
                                <span v-if="editingFiled === `description${idx}`">
                                    <input v-model="deviceListData[idx].description" />
                                </span>
                            </td>
                            <td @click="funcEditingData(`userContact.firstName${idx}`)"> 
                                <span v-if="editingFiled !== `userContact.firstName${idx}`">{{el.userContact.firstName}}</span>
                                <span v-if="editingFiled === `userContact.firstName${idx}`">
                                    <input v-model="deviceListData[idx].userContact.firstName" />
                                </span>
                            </td>
                            <td @click="funcEditingData(`userContact.lastName${idx}`)"> 
                                <span v-if="editingFiled !== `userContact.lastName${idx}`">{{el.userContact.lastName}}</span>
                                <span v-if="editingFiled === `userContact.lastName${idx}`">
                                    <input v-model="deviceListData[idx].userContact.lastName" />
                                </span>
                            </td>
                            <td @click="funcEditingData(`userContact.email${idx}`)"> 
                                <span v-if="editingFiled !== `userContact.email${idx}`">{{el.userContact.email}}</span>
                                <span v-if="editingFiled === `userContact.email${idx}`">
                                    <input v-model="deviceListData[idx].userContact.email" />
                                </span>
                            </td>
                            <td @click="funcEditingData(`userContact.tel${idx}`)"> 
                                <span v-if="editingFiled !== `userContact.tel${idx}`">{{el.userContact.tel}}</span>
                                <span v-if="editingFiled === `userContact.tel${idx}`">
                                    <input v-model="deviceListData[idx].userContact.tel" />
                                </span>
                            </td>
                            <td @click="funcEditingData(`userContact.address${idx}`)"> 
                                <span v-if="editingFiled !== `userContact.address${idx}`">{{el.userContact.address}}</span>
                                <span v-if="editingFiled === `userContact.address${idx}`">
                                    <input v-model="deviceListData[idx].userContact.address" />
                                </span>
                            </td>
                            <td @click="funcEditingData(`adminContact.firstName${idx}`)"> 
                                <span v-if="editingFiled !== `adminContact.firstName${idx}`">{{el.adminContact.firstName}}</span>
                                <span v-if="editingFiled === `adminContact.firstName${idx}`">
                                    <input v-model="deviceListData[idx].adminContact.firstName" />
                                </span>
                            </td>
                            <td @click="funcEditingData(`adminContact.lastName${idx}`)"> 
                                <span v-if="editingFiled !== `adminContact.lastName${idx}`">{{el.adminContact.lastName}}</span>
                                <span v-if="editingFiled === `adminContact.lastName${idx}`">
                                    <input v-model="deviceListData[idx].adminContact.lastName" />
                                </span>
                            </td>
                            <td @click="funcEditingData(`adminContact.email${idx}`)"> 
                                <span v-if="editingFiled !== `adminContact.email${idx}`">{{el.adminContact.email}}</span>
                                <span v-if="editingFiled === `adminContact.email${idx}`">
                                    <input v-model="deviceListData[idx].adminContact.email" />
                                </span>
                            </td>
                            <td @click="funcEditingData(`adminContact.tel${idx}`)"> 
                                <span v-if="editingFiled !== `adminContact.tel${idx}`">{{el.adminContact.tel}}</span>
                                <span v-if="editingFiled === `adminContact.tel${idx}`">
                                    <input v-model="deviceListData[idx].adminContact.tel" />
                                </span>
                            </td>
                            <td @click="funcEditingData(`adminContact.address${idx}`)"> 
                                <span v-if="editingFiled !== `adminContact.address${idx}`">{{el.adminContact.address}}</span>
                                <span v-if="editingFiled === `adminContact.address${idx}`">
                                    <input v-model="deviceListData[idx].userContact.address" />
                                </span>
                            </td> -->
                            <td >
                                <button @click="funcConfirmStatus('update', el.deviceUniqueID, idx)">Update</button>
                                <button @click="funcConfirmStatus('delete', el.deviceUniqueID, idx)">Delete</button>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="user-per" v-if="!isPermissiom">
                <table>
                    <tr>
                        <th>DeviceID</th>
                        <th>DeviceType</th>
                        <th>CreateDate</th>
                        <th>EventType</th>
                    </tr>
                    <tr v-for="(el, idx) in deviceListData" :key="idx">
                        <td>{{el.deviceID}}</td>
                        <td>{{el.deviceType}}</td>
                        <td>{{el.data}}</td>
                        <td>{{el.createDate}}</td>
                        <td>{{el.eventType}}</td>
                        <!-- <td>{{el.platform}}</td>
                        <td>{{el.tenan}}</td>
                        <td>{{el.createTime}}</td>
                        <td>{{el.description}}</td>
                        <td>{{el.userContact.firstName}}</td>
                        <td>{{el.userContact.lastName}}</td>
                        <td>{{el.userContact.email}}</td>
                        <td>{{el.userContact.tel}}</td>
                        <td>{{el.userContact.address}}</td>
                        <td>{{el.adminContact.firstName}}</td>
                        <td>{{el.adminContact.lastName}}</td>
                        <td>{{el.adminContact.email}}</td>
                        <td>{{el.adminContact.tel}}</td>
                        <td>{{el.adminContact.address}}</td> -->
                    </tr>
                </table>
            </div>
        </div>
        <div v-if="permissionLoading">
            checking permission ....
        </div>
        
    </div>
</template>

<script setup>
import axios from "axios"
import { useStore } from "vuex"
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router';
import auth from "../utils/auth"
import SmallLoadingVue from "../components/SmallLoading.vue"
const store = useStore()
const router = useRouter()


const isPermissiom = ref(false)
const permissionLoading = ref(false)
const isLoadingData = ref(false)
// const confirmEditDataPopUp = ref(false)

const platformSelected = ref("JOURNEY_SOLUTION")
const tenancySelected = ref("")
const tenancyList = ref([])
const deviceListData = ref([])
const editingFiled = ref("")
const deviceUqID = ref("")
const idxNumber = ref()
const commandType = ref("")
const isPopUp = ref(false)



const funcEditingData = async (evt) => {
    editingFiled.value = evt
}

const funcGenerateTenancy = async () => {
    if(store.state.isUserType === "super_admin"){
        tenancyList.value.push("Rangsit_01")
        tenancyList.value.push("Rangsit_02")
        tenancySelected.value = "Rangsit_01"
    }else{
        tenancyList.value.push(store.state.isTenan)
        tenancySelected.value = store.state.isTenan
    }
}   

const funcFindingDevice = async () => {
    isLoadingData.value = true
    const headersConf = {
        headers: {
            authorization: "Bearer" + " " + $cookies.get("js-token")
        }
    }

    const payload = {
        tenanSelector: tenancySelected.value, 
        platform: platformSelected.value 
    }

    try{
        if(tenancySelected.value === ""  && platformSelected.value === ""){
            alert("Platform and Tenancy can't be empty to finding!")
            isLoadingData.value = false
        }else{
            const deviceData = await axios.post("https://4mfyxc62pi.execute-api.ap-southeast-1.amazonaws.com/fetch/devices", payload, headersConf)
            if (deviceData.status === 200){
                deviceListData.value = deviceData.data
                isLoadingData.value = false
            }else{
                alert(deviceData.status)
                isLoadingData.value = false
            }
        }
    }catch(err){
        alert(err.message)
        console.log(err)
        isLoadingData.value = false
    }
}
const funcConfirmStatus = async (command, deviceID, idx)=> {
    isPopUp.value = true
    commandType.value = command
    deviceUqID.value = deviceID
    idxNumber.value = idx
}


const funcDisagreeEditing = async () => {
    isPopUp.value = false
    commandType.value = ""
    deviceUqID.value = ""
}

const funcConfirmEditing = async () => {
    isLoadingData.value = true
    isPopUp.value = false
    const headersConf = {
        headers: {
            authorization: "Bearer" + " " + $cookies.get("js-token")
        }
    }
    if (commandType.value === "update"){
        try{
            const payload = {
                deviceKeyID: deviceListData.value[idxNumber.value].deviceKeyID,
                createDate: deviceListData.value[idxNumber.value].createDate,
                deviceID: deviceListData.value[idxNumber.value].deviceID,
                data:  deviceListData.value[idxNumber.value].data,
                deviceType:deviceListData.value[idxNumber.value].deviceType,
                eventType: deviceListData.value[idxNumber.value].eventType,
                platform: platformSelected.value,
                tenan: tenancySelected.value,
            }
            const statusUpdate = await axios.post("https://4mfyxc62pi.execute-api.ap-southeast-1.amazonaws.com/update/devices", payload, headersConf)
            if (statusUpdate.status === 200){
                alert("updated!")
                isPopUp.value = false
                isLoadingData.value = false
                window.location.reload();
            }else{
                alert(statusUpdate)
                isPopUp.value = false
                isLoadingData.value = false
            }
        }catch(err){
            console.log(err)
            alert(err.message)
            isPopUp.value = false
            isLoadingData.value = false
        }
    }else if (commandType.value === "delete"){
        try{
            if (deviceUqID.value !== "" && platformSelected.value !== "" && tenancySelected.value !== ""){
                // const splitString = platformSelected.value.split("ListDevice");
                const payload = {
                    deviceID:  deviceUqID.value,
                    platform: platformSelected.value,
                    tenan:  tenancySelected.value
                }
                // console.log("payload => ",payload)
                const statusDelete = await axios.post("https://4mfyxc62pi.execute-api.ap-southeast-1.amazonaws.com/delete/devices", payload, headersConf)
                if (statusDelete.status === 200){
                    alert("delete success!")
                    isLoadingData.value = false
                    window.location.reload();
                }
            }else{
                alert("DeviceID, Platform, Tenancy can't be empty")
                isLoadingData.value = false
            }
        }catch(err){
            alert(err.message)
            console.log(err)
            isLoadingData.value = false
        }
    }else{
        alert("worng format command!")
        isPopUp.value = false
        isLoadingData.value = false
        commandType.value = ""
    }
}

const FetchListDevices = async () => {
    isLoadingData.value = true
    const headersConf = {
        headers: {
            authorization: "Bearer" + " " + $cookies.get("js-token")
        }
    }

    try{
        if(store.state.isUserType === "super_admin"){

            const payload = {
                tenanSelector: "Rangsit_01", // this defaut value for superadmin start fetch data first time
                platform: platformSelected.value // this defaut value for start
            }

            const deviceData = await axios.post("https://4mfyxc62pi.execute-api.ap-southeast-1.amazonaws.com/fetch/devices", payload, headersConf)
            if (deviceData.status === 200){
                deviceListData.value = deviceData.data
                isLoadingData.value = false
            }else{
                alert(deviceData.status)
                isLoadingData.value = false
            }
        }else{
            const payload = {
                tenanSelector: store.state.isTenan, 
                platform: platformSelected.value // this defaut value for start
            }
            const deviceData = await axios.post("https://4mfyxc62pi.execute-api.ap-southeast-1.amazonaws.com/fetch/devices", payload, headersConf)
            if (deviceData.status === 200){
                deviceListData.value = deviceData.data
                isLoadingData.value = false
            }else{
                alert(deviceData.status)
                isLoadingData.value = false
            }
        }
    }catch(err){
        alert(err.message)
        console.log(err)
        isLoadingData.value = false
    }
}

const funcCheckToken = async () => {
    const token = $cookies.get("js-token")
    // console.log("token => ",token)
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
                // listTenan.value = ["Rangsit_01", "Rangsit_02"]
                
                isPermissiom.value = true
                permissionLoading.value = false
            }else if(setType === "admin"){
                if(setTenan === "Rangsit_01"){
                    // listTenan.value = ["Rangsit_01"]
                    isPermissiom.value = true
                    permissionLoading.value = false
                }else if(setTenan === "Rangsit_02"){
                    // listTenan.value = ["Rangsit_01"]
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
            // store.state.isEmail = setEmail
            // store.state.isTenan = setTenan
            // store.state.isUserType = setType
            router.push("/login")
        }

    }
}

onMounted( async() => {
    await funcCheckToken();
    await funcGenerateTenancy();
    await FetchListDevices();
})

</script>

<style scoped>
.set-c-table{
    background-color: rgb(77, 77, 77);
    border-radius: 10px;
    width: 650px;
    height: 600px;
    overflow-x: scroll;
    overflow-y: scroll;
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

  .pop-up{
    border-radius: 10px;
    color: black;
    position: absolute;
    background: white;
    width: 500px;
    height: 100px;
    transform: translateY(250px);
  }
  .title-p{
    margin-top: 20px;
    margin-left: 120px;
    font-weight: bold;
  }

  .con-edit{
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
  }

  .btn-n{
    background: rgb(255, 110, 110);
    color: white;
    border-radius: 5px;
    width: 150px;
    height: 30px;
    font-weight: bold;
    border: none;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  }
  .btn-y{
    background: rgb(67, 223, 247);
    color: white;
    border-radius: 5px;
    width: 150px;
    height: 30px;
    font-weight: bold;
    border: none;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  }
</style>