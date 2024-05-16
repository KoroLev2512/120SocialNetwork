import PostCard from "@/src/entities/post/postCard/ui/postCard";
import axios from "axios";
import React, { useState, useEffect, useRef, useCallback } from "react";

const API_URL = "https://rickandmortyapi.com/api/character";

export default function TestFunction() {
    const [data, setData] = useState([]);
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

    const lastElementRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setPage(prevPage => prevPage + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [loading]);

    return (
        <>
            {data.map((i, index) => (
                <PostCard
                    key={i.id}
                    user={i.name}
                    usersAvatar={i.image}
                    postsAwardInBP={5341}
                    postsDescription={i.origin.name}
                    postsImage={i.image}
                />
            ))}
            <div ref={lastElementRef} />
            {loading && <p>загрузка</p>}
        </>
    );
}