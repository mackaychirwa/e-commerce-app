import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    user: null,  
    token: null, 
};

export const userSlice = createSlice({
    name: 'auth',
    initialState, 
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user;   
            state.token = action.payload.token; 
        },
        // Reducer to handle logout action. This clears the user, token, and domain from the state.
        setLogout: (state) => {
            state.user = null;   
            state.token = null;  
        
        }
    }
});

export const { setLogin, setLogout } = userSlice.actions;

// Export the reducer, which will be used by the store to manage the auth state
export default userSlice.reducer;
