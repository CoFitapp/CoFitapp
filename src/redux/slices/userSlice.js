import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: {},
    status: null,
    location:'',
    profileImage:''
};

const userSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, payload) => {
            console.log('111111dsadsqdsdqdqassdas111111',payload);
            (state.status = true);
            (state.userInfo = payload.payload);
        },
        logout: (state) => {
            state.status = null;
            state.userInfo = {};
            // state.profileImage='';
        },
        location: (state, payload) => {
            console.log('111111dadsasasasfsdsa111111',payload);
            (state.location = payload.payload);
        },
        profileImage:(state,payload)=>{
            console.log('dhsjgjagsjgjgajhdas',payload.payload);
           (state.profileImage=payload.payload)
        },
        updateUser: (state, payload) => {
            console.log('dwh8y23d823y89dy89y92y98',payload.payload);
        (state.userInfo=payload.payload)
        },
    },
});

export const { login, logout,profileImage, updateUser,updateSensor,location } = userSlice.actions;
export default userSlice.reducer;
