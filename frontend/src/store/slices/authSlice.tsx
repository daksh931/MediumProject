import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  userData:string|null;
  token:string|null;
}
const initialState:UserState= {
  userData:localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")!):null,
  token:localStorage.getItem("token")?(localStorage.getItem("token")!):null,
}

const authSlice = createSlice({
  name:"auth",
  initialState:initialState,
  reducers:{
    setUserData(state,action){
      state.userData = action.payload
    },
    setToken(state,action){
      state.token = action.payload
    },
    logoutUser(state){
      state.token = null,
      state.userData = null,
      localStorage.removeItem("user"),
      localStorage.removeItem("token")
    }
  }
})


export const {setUserData, setToken, logoutUser} = authSlice.actions; 
export default authSlice.reducer;