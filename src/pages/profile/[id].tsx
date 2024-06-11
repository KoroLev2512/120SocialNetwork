import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface User {
    first_name: string;
    id: string;
    language: string,
    profile_photo: string,
    second_name: string,
    telegram_id: string,
    username: string,
    wallet: string,
}

const UserProfile: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            const fetchUserData = async () => {
                try {
                    const response = await axios.get(`http://95.163.231.244:3000/api/user/get/1`);
                    setUser(response.data);
                } catch (err) {
                    setError('Error fetching user data');
                    console.error(err);
                }
            };
            fetchUserData();
        }
    }, [id]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>User Profile</h1>
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Name:</strong> {user.first_name}</p>
        </div>
    );
};

export default UserProfile;

