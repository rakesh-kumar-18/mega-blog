import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    status: boolean;
    userData: null;
}

const initialState: AuthState = {
    status: false,
    userData: null
};

export const counterSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<null>) {
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