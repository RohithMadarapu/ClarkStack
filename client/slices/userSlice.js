import { createSlice } from '@reduxjs/toolkit';




const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.user = null;
            localStorage.removeItem('user');
        },
    },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;

export const autoLogin = () => async (dispatch) => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
        if (storedUser.rememberMe) {
            dispatch(login(storedUser));
        }
    }
};
