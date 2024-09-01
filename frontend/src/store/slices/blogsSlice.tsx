import { CreatePost as BlogInterface }  from "@daksh931/project-medium";
import { createSlice,PayloadAction } from "@reduxjs/toolkit";

// export interface BlogInterface{
//     id: string;
//     authorId: number;
//     title: string;
//     content: string;
//     published: boolean;
//     author: {
//         name: string;
//     }
// }
export interface BlogsStateInterface {
    blogs: BlogInterface[];
  }

const initialState:BlogsStateInterface = {
    blogs:[]
}

const BlogsSlice = createSlice({
    name:"blogs",
    initialState:initialState,
    reducers:{
        setBlogs(state, action:PayloadAction<BlogInterface[]>){
            state.blogs = action.payload
        }
    }
})

export const{setBlogs} = BlogsSlice.actions;
export default BlogsSlice.reducer;