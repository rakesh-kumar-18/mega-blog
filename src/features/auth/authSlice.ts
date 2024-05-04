import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Models } from 'appwrite';

interface AuthState {
    status: boolean;
    userData: Models.User<Models.Preferences> | null;
}

const initialState: AuthState = {
    status: false,
    userData: null
};

export const counterSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<Models.User<Models.Preferences>>) {
            state.status = true;
            state.userData = action.payload;
        },
        logout(state) {
            state.status = false;
            state.userData = null;
        },
    },
});

export const { login, logout } = counterSlice.actions;

export default counterSlice.reducer;