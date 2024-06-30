<template>
    <div>
        <div class="set-c">
            <div class="title">
                <div>Adding device</div>
            </div>
            <div>
                <div>
                    <div>DeviceID</div>
                    <input v-model="deviceID"/>
                </div>
                <div>
                    <div>DeviceType</div>
                    <input v-model="deviceType"/>
                </div>
                <div class="platform">
                    <div>Solution</div>
                    <select id="platform-s" v-model="platform">
                        <option value="SOLAR">Solar</option>
                        <option value="JOURNEY_SOLUTION">Journaly solution</option>
                    </select>
                </div>
                <div class="tenan">
                    <div>Tenancy</div>
                    <select id="Tenancy-s" v-if="store.state.isUserType === 'admin'" v-model="tenancy">
                        <option v-for="(el, idx) in listTenan" :key="idx" :value="el">{{el}}</option>
                    </select>
                    <select id="Tenancy-s" v-if="store.state.isUserType === 'super_admin'"  v-model="tenancy">
                        <option v-for="(el, idx) in listTenan" :key="idx" :value="el">{{el}}</option>
                    </select>
                </div>
                <!-- <div v-if="isPages === 0">
                    <h3>Device detail</h3>
                    <div class="system">
                        <div>System</div>
                        <input v-model="system"/>
                    </div>
                    <div class="device-id">
                        <div>DeviceID</div>
                        <input v-model="deviceID"/>
                    </div>
                    <div class="device-name">
                        <div>Device name</div>
                        <input v-model="deviceName"/>
                    </div>
                    <div class="device-add">
                        <div>Device Address</div>
                        <input v-model="deviceAddress"/>
                    </div>
                    <div class="description">
                        <div>Description</div>
                        <div>
                            <textarea v-model="description"></textarea>
                        </div>
                    </div>
                    <div class="platform">
                        <div>Platform</div>
                        <select id="platform-s" v-model="platform">
                            <option value="solar">Solar</option>
                            <option value="journalySolution">Journaly solution</option>
                        </select>
                    </div>
                    <div class="tenan">
                        <div>Tenancy</div>
                        <select id="Tenancy-s" v-if="store.state.isUserType === 'admin'" v-model="tenancy">
                            <option v-for="(el, idx) in listTenan" :key="idx" :value="el">{{el}}</option>
                        </select>
                        <select id="Tenancy-s" v-if="store.state.isUserType === 'super_admin'"  v-model="tenancy">
                            <option v-for="(el, idx) in listTenan" :key="idx" :value="el">{{el}}</option>
                        </select>
                    </div>
                    <div style="margin-top: 30px; ">
                        <button style=" margin-left:10px" @click="NextPage">Next</button>
                    </div>
                </div>
                <div  v-if="isPages === 1">
                    <div class="user-contact">
                        <h3>User contact</h3>
                        <div>
                            <div>Firstname</div>
                            <input v-model="userFirstName"/>
                        </div>
                        <div>
                            <div>Lastname</div>
                            <input v-model="userLastName"/>
                        </div>
                        <div>
                            <div>Email</div>
                            <input v-model="userEmail"/>
                        </div>
                        <div>
                            <div>Tel</div>
                            <input v-model="userTel"/>
                        </div>
                        <div>
                            <div>Address</div>
                            <input v-model="userAdress"/>
                        </div>
                        <div style="margin-top: 30px; ">
                            <button style="margin-right: 10px;" @click="BackPage">Back</button>
                            <button style=" margin-left:10px" @click="NextPage">Next</button>
                        </div>
                    </div>
                </div>
                <div  v-if="isPages === 2">
                    <div class="admin-contact">
                        <h3>Admin contact</h3>
                        <div>
                            <div>Firstname</div>
                            <input v-model="adminFirstName"/>
                        </div>
                        <div>
                            <div>Fastname</div>
                            <input v-model="adminLastName"/>
                        </div>
                        <div>
                            <div>Email</div>
                            <input v-model="adminEmail"/>
                        </div>
                        <div>
                            <div>Tel</div>
                            <input v-model="adminTel"/>
                        </div>
                        <div>
                            <div>Address</div>
                            <input v-model="adminAdress"/>
                        </div>
                    </div>
                    <div  style="margin-top: 30px; ">
                        <button style="margin-right: 10px;" @click="BackPage">Back</button>
                        <button style=" margin-left:10px" v-if="!isCreateing"  @click="btnCreateDevice">Submit</button>
                        <button style=" margin-left:10px"  v-if="isCreateing">Creating...</button>
                    </div>
                </div> -->
                <div  style="margin-top: 30px; ">
                    <!-- <button style="margin-right: 10px;" @click="BackPage">Back</button> -->
                    <button style=" margin-left:10px" v-if="!isCreateing"  @click="btnCreateDevice">Submit</button>
                    <button style=" margin-left:10px"  v-if="isCreateing">Creating...</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from "axios"
import {useStore} from "vuex"
import {onMounted, ref } from 'vue'
import auth from "../utils/auth"
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const listTenan = ref([])
const isPermissiom = ref(false)
// const isPages = ref(0)
const isCreateing = ref(false)

// const system = ref("")
const deviceID = ref("")
const deviceType = ref("")

// const deviceName = ref("")
// const deviceAddress = ref("")
// const description = ref("")
const platform = ref("")
const tenancy = ref("")
// const userFirstName =ref("")
// const userLastName = ref("")
// const userTel = ref("")
// const userAdress = ref("")
// const userEmail = ref("")
// const adminFirstName =ref("")
// const adminLastName = ref("")
// const adminTel = ref("")
// const adminAdress = ref("")
// const adminEmail = ref("")

// const NextPage = () => {
//     if(isPages.NextPage > 2){
//         isPages.value = 2
//     }else{
//         isPages.value += 1
//     }
// }

// const BackPage = () => {
//     if(isPages.NextPage < 0){
//         isPages.value = 0
//     }else{
//         isPages.value -=1
//     }
// }

const btnCreateDevice = async () => {
    isCreateing.value = true
    const date = new Date();
    const dformat = [
        date.getMonth()+1,
        date.getDate(),
        date.getFullYear()].join('/')+' '+
        [
            date.getHours(),
            date.getMinutes(),
            date.getSeconds()
        ].join(':');

    const headersConf = {
        headers: {
            authorization: "Bearer" + " " + $cookies.get("js-token")
        }
    }

    const payload = {
        deviceID: deviceID.value,
        tenantID: tenancy.value,
        deviceType: deviceType.value,
        createDate: String(dformat),
        solution: platform.value,
    }
    // const payload = {
    //     system:system.value,
    //     deviceID: deviceID.value,
    //     deviceName:deviceName.value,
    //     deviceInstallAddress: deviceAddress.value,
    //     description: description.value,
    //     platform: platform.value,
    //     tenan: tenancy.value,
    //     createTime: ms,
    //     userContact: {
    //         firstName: userFirstName.value,
    //         lastName: userLastName.value,
    //         tel: userTel.value,
    //         email: userEmail.value,
    //         address: userAdress.value,
    //     },
    //     AdminContact:{
    //         firstName: adminFirstName.value,
    //         lastName: adminLastName.value,
    //         tel: adminTel.value,
    //         email: adminEmail.value,
    //         address: adminAdress.value,
    //     }
    // }
    try{
        const statusCreated = await axios.post("https://4mfyxc62pi.execute-api.ap-southeast-1.amazonaws.com/insert/devices",payload, headersConf)
        if (statusCreated.status === 200 ){
            alert("Adding device sucess!")
            isCreateing.value = false
            window.location.reload();
        }else{
            isCreateing.value = false
            console.log(statusCreated)
            console.log(statusCreated.status)
        }
    }catch(err){
        isCreateing.value = false
        alert(err.message)
        console.log(err)
    }
}

const funcInitAddingDevicePage = async () => {
    if(isPermissiom.value === true){
        if( store.state.isUserType === "super_admin"){
            listTenan.value.push("Rangsit_01")
            listTenan.value.push("Rangsit_02")
        }else if(store.state.isUserType === "admin"){
            listTenan.value.push(store.state.isTenan)
        }
    }

}

const funcCheckToken = async () => {
    const token = $cookies.get("js-token")
    if(!token){
        alert("token expire!")
        store.state.isLogin = false
        router.push("/login")
    }else{
        const {statusExp, setEmail, setTenan, setType} = await auth(token)
        // console.log(statusExp, setType)
        if(!statusExp){
            store.state.isLogin = true
            store.state.isEmail = setEmail
            store.state.isTenan = setTenan
            store.state.isUserType = setType
            if(setType === "super_admin"){
                // listTenan.value = ["Rangsit_01", "Rangsit_02"]
                isPermissiom.value = true
            }else if(setType === "admin"){
                if(setTenan === "Rangsit_01"){
                    // listTenan.value = ["Rangsit_01"]
                    isPermissiom.value = true
                }else if(setTenan === "Rangsit_02"){
                    // listTenan.value = ["Rangsit_01"]
                    isPermissiom.value = true
                }
            }else{
                isPermissiom.value = false
            }
        }else{
            isPermissiom.value = false
            store.state.isLogin = false
            store.state.isEmail = setEmail
            store.state.isTenan = setTenan
            store.state.isUserType = setType
            router.push("/login")
        }

    }
}

onMounted( async() => {
    await funcCheckToken()
    await funcInitAddingDevicePage()
})
</script>

<style scoped>
.set-c{
    display: flex;
    justify-content: space-around;
}
.title{
    margin-top: 40%;
    margin-right: 60px;
}

select{
    width: 150px;
}
</style>