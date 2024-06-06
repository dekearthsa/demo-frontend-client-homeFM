import { jwtDecode } from "jwt-decode";
// import { useStore } from "vuex"
// import store from "../store"
// const store = useStore()

export default function auth(token) {
    if (!token) {
        return true;
    }

    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Current time in seconds
        // console.log(decodedToken)
        // console.log(decodedToken.exp < currentTime)
        if(!(decodedToken.exp < currentTime)){
            return {statusExp: false, setEmail: decodedToken.data.email, setTenan:  decodedToken.data.tenan, setType:  decodedToken.data.type };            
        }
    } catch (error) {
        console.error('Failed to decode token:', error);
        return {statusExp: true, setEmail: "", setTenan:  "", setType:"" };
    }
}