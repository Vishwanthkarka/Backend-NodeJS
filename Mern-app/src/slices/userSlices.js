import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios  from "axios";

export const userLogin = createAsyncThunk('loginuser',async(userCredentialObject,thunkApi)=> {
let  response = await axios.post('/user-api/login',userCredentialObject)
let data = response.data
console.log(data.message)
if(data.message==='success'){
    //store token in local storage
    localStorage.setItem("token",data.payload);
    console.log("successful")
    return data.userObj;

  }
  if(data.message==='Invalid user' || data.message==='Invalid password'){
    return thunkApi.rejectWithValue(data)
  }
})

let userSlice = createSlice({
    // this are action function
    name:"user",
    initialState:{
    userObj:{},
    isError:false, 
    isSuccess:false,
    isLoading:false,
    errMsg:'', 
    },
    reducers: {
        clearLoginStatus:(state)=> {
            state.userObj=null
            state.isError=false
            state.isSuccess=false
            state.isLoading=false
            state.errMsg=''
            return state
        }
    }  ,// reducers is used to change the state  // the things in the reducers is called action reducer
    extraReducers:{
        [userLogin.pending]:(state,action)=> {
            state. isLoading = true
        },
        [userLogin.fulfilled]:(state,action)=> {
            state.userObj = action.payload
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.errMsg=' '
        },
        [userLogin.rejected]:(state,action)=> {
            state.isError = true;
            state.isLoading = false;
            state.errMsg = action.payload.message
        },
        
    } // used for the handling async api with redux

})
//action creator
//export action creators
export const {clearLoginStatus} = userSlice.actions; 
export default userSlice.reducer 