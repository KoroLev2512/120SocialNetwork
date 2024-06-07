import axios from "../api/axios";
import {PostsStore} from "../types/dto/posts.dto";
import {FETCH_POSTS} from "../api/requests/posts.requests";
import {create} from "zustand";
import {devtools} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";

export const useNewsStore = create<PostsStore>()(devtools(immer((set) => ({
    posts: null,
    isLoading: false,
    getPosts: async () => {
        try {
            const response = await axios.get(FETCH_POSTS);
            const {data} = await response;
            set({posts: data});
        } catch (error) {
            set({posts: null});
        }
    },
}))));