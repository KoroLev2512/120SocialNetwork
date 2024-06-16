import PostCard from "@/widgets/PostCard/ui/postCard";
import axios from "axios";
import React, {useState, useEffect, useRef, useCallback} from "react";

const API_URL = "https://rickandmortyapi.com/api/character";
// const API_URL = "http://95.163.231.244:3000/api/post/get_all";

export default function TestPostFunction() {
    const [data, setData] = useState<Post[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const observer = useRef<IntersectionObserver | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            // const response = await axios.get(`${process.env.API_PATH}/post/get_all`);
            const response = await axios.get(`${API_URL}/`);
            setData((prevData) => [...prevData, ...response.data.results]);
        } finally {
            setLoading(false);
        }
    }, [setLoading, setData]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const lastElementRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    setPage((prevPage) => prevPage + 1);
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading],
    );

    type Post = {
        id: number;
        user_id: number;
        control_id: string;
        balance_sheet_id: string;
        tag_id: string;
        link: string;
        time_creation: string;
        image: string;
    };

    type datafromAPI = {
        id: number;
        name: string;
        image: string;
        origin: {
            name: string;
        };
    };

    return (
        <>
            {/*{data.map((post: Post) => (*/}
            {/*    <PostCard*/}
            {/*        key={post.id}*/}
            {/*        user={`User ID: ${post.user_id}`}*/}
            {/*        usersAvatar={post.image}*/}
            {/*        postsAwardInBP={5341}*/}
            {/*        postsDescription={post.control_id}*/}
            {/*        postsImage={post.image}*/}
            {/*    />*/}
            {data.map(({id, user_id, image, control_id}: Post) => (
                <PostCard
                    key={id}
                    user={`User ID: ${user_id}`}
                    usersAvatar={image}
                    postsAwardInBP={5341}
                    postsDescription={control_id}
                    postsImage={image}
                />
            ))}
            <div ref={lastElementRef}/>
            {loading && <p>загрузка</p>}
        </>
    );
}
