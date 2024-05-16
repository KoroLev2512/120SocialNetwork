import PostCard from "@/entities/post/postCard/ui/postCard";
import axios from "axios";
import React, { useState, useEffect, useRef, useCallback } from "react";

const API_URL = "https://rickandmortyapi.com/api/character";

export default function TestFunction() {
    const [data, setData] = useState<datafromAPI[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const observer = useRef<IntersectionObserver | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}?page=${page}`);
            setData(prevData => [...prevData, ...response.data.results]);
        } finally {
            setLoading(false);
        }
    }, [page]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const lastElementRef = useCallback((node: HTMLDivElement | null) => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setPage(prevPage => prevPage + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [loading]);

    type datafromAPI = {
        id: number,
        name: string,
        image: string,
        origin: {
            name: string,
        }
    }

    return (
        <>
            {data.map(({ id, name, image, origin }: datafromAPI) => (
                <PostCard
                    key={id}
                    user={name}
                    usersAvatar={image}
                    postsAwardInBP={5341}
                    postsDescription={origin.name}
                    postsImage={image}
                />
            ))}
            <div ref={lastElementRef} />
            {loading && <p>загрузка</p>}
        </>
    );
}