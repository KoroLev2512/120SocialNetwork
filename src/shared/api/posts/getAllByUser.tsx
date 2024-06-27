import axios from "axios";

export async function GetAllPostsByUser(id: number) {
    try {
        const response = await axios.get(`https://120-server.vercel.app/api/post/get_all_by_user/${id}`);
        return {
            posts: response.data.data,
            error: null
        };
    } catch (error) {
        console.error(error);
        return {
            posts: null,
            error: 'Caught an error while trying to fetch users posts'
        };
    }
}