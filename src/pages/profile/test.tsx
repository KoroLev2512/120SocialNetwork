import PostCard from "@/widgets/PostCard/ui/postCard";
import axios from "axios";
import React, { useState, useEffect, useRef, useCallback } from "react";


export default function TestPostFunction() {
    const [data, setData] = useState<datafromAPI[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const observer = useRef<IntersectionObserver | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${process.env.API_PATH}/user/get/1`);
            setData((prevData) => [...prevData, ...response.data.results]);
        } finally {
            setLoading(false);
        }
    }, [setLoading, setData]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

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
            {data.map(({ id, name, image, origin }: datafromAPI) => {
                return <div key={id}>{name}</div>;
            })}
        </>
    );
}
