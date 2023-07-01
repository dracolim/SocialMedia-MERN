import { createSlice } from "@reduxjs/toolkit";

/** state that is going to be stored in our gloabl state, can be used in our application anywhere we want */
const initialState = {
    mode: "light", 
    user: null,
    token: null,
    posts: [],
}
// instead of directly modifying the state, you have to replace the object then modify it

export const authSlice  = createSlice ({
    // basically functions
    name: "auth",
    initialState, 
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light"
            // state.mode => previous mode
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        // when u logout, we set all these to null (nothing)
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setFriends: (state, action) => {
            // check if state.user (user already exists)
            if (state.user){
                state.user.friends = action.payload.friends;
            }else{
                console.log("user friends does not exists")
            }
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setPost: (state , action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post_id) {
                    return action.payload.post;
                } 
                return post;
            });
            state.posts = updatedPosts;
        }
    }
})

export const { setMode , setLogin , setLogout , setFriends , setPosts , setPost} = authSlice.actions;
export default authSlice.reducer;
// reducer is like an event listener which handles events based on received action (event) type