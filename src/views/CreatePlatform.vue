<template>
    <div>
        <div v-if="permissionLoading">
            <SmallLoadingVue />
        </div>
        <div v-if="!permissionLoading">
            <div>
                <SmallLoadingVue v-if="isLoading"/>
            </div>
            <div v-if="!isPermissiom">
                <div>This user don't have permission to create platform </div>
                <div>please contact admin for create new platform</div>
            </div>
            <div v-if="isPermissiom">
                <div class="title">Create new platform</div>
                <div>
                    <div style="margin-bottom: 20px; margin-top: 10px">
                        <div>Create new tenancy</div>
                        <div>
                            <div>
                                <label style="margin-right: 10px">Platform</label>
                                <select id="options" v-model="selectPlatform">
                                    <option value="journalySolution">Journaly solution</option>
                                    <option value="solar">Solar</option>
                                </select>
                            </div>
                            <div>
                                <label style="margin-right: 10px">Tenancy</label>
                                <input  v-model="tenancySelected" />
                            </div>
                            <div>
                                <button @click="haddleCreateTenan">Create</button>
                            </div>
                        </div>
                    </div>
                    <div>Tenancy exist</div>
                    <div v-for="(el, idx) in setDataListDevice.listTenan.Items" :key="idx">
                        <div style="margin-left: 15px">- {{el.tenancyID.S}}</div>
                    </div>
                </div>
                <div>
                    <div>Platform tenancy table exist</div>
                    <div v-for="(el, idx) in setDataListDevice.listTable" :key="idx">
                        <div style="margin-left: 15px">- {{el}}</div>
                    </div>
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
import SmallLoadingVue from "@/components/SmallLoading.vue";

const store = useStore();
const router = useRouter();

const listTenan = ref([])
const isPermissiom = ref(false)
const setDataListDevice = ref([])
const selectPlatform = ref()
const tenancySelected = ref()
const isLoading = ref(false)
const permissionLoading = ref(false)

const haddleCreateTenan = async () => {
    const headersConf = {
        headers: {
            authorization: "Bearer" + " " + $cookies.get("js-token")
        }
    }
    const payload = {
        tenanSelector: tenancySelected.value,
        platform: selectPlatform.value
    }

    try{    
        const statusCreated = await axios.post("https://4mfyxc62pi.execute-api.ap-southeast-1.amazonaws.com/fetch/devices", payload, headersConf)
        if(statusCreated.status === 401){
            store.state.isLogin = false
            $cookies.remove("js-token")
            router.push("/login")
        }
    }catch(err){
        console.log(err)
    }
    
}

const funcFetchTenancyAndPlatformTable= async () => {
    const headersConf = {
        headers: {
            authorization: "Bearer" + " " + $cookies.get("js-token")
        }
    }
    isLoading.value = true

    try{
        const listDeviceData = await axios.get("https://4mfyxc62pi.execute-api.ap-southeast-1.amazonaws.com/fetch/tenantable",headersConf)
        // console.log(listDeviceData)
        if(listDeviceData.status === 401){
            store.state.isLogin = false
            $cookies.remove("js-token")
            router.push("/login")
            isLoading.value = false
        }else{
            setDataListDevice.value = listDeviceData.data
            isLoading.value = false
        }

    }catch(err){
        console.log(err)
        isLoading.value = false
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
        router.push("/login")
    }else{
        const {statusExp, setEmail, setTenan, setType} = await auth(token)
        if(!statusExp){
            store.state.isLogin = true
            store.state.isEmail = setEmail
            store.state.isTenan = setTenan
            store.state.isUserType = setType
            if(setType === "super_admin"){
                listTenan.value = ["Rangsit_01", "Rangsit_02"]
                
                isPermissiom.value = true
                permissionLoading.value = false
            }else if(setType === "admin"){
                if(setTenan === "Rangsit_01"){
                    listTenan.value = ["Rangsit_01"]
                    isPermissiom.value = true
                    permissionLoading.value = false
                }else if(setTenan === "Rangsit_02"){
                    listTenan.value = ["Rangsit_01"]
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
            store.state.isEmail = setEmail
            store.state.isTenan = setTenan
            store.state.isUserType = setType
            router.push("/login")
        }

    }
}


onMounted(() => {
    funcCheckToken()
    funcFetchTenancyAndPlatformTable()
})

</script>

<style scoped>
.title{
    margin-bottom: 20px;
}
</style>