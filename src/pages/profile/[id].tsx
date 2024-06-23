import React from 'react';
import axios from 'axios';
import {GetServerSideProps} from 'next';
import {UserStore} from "@/entities/User/types/userState";

const UserProfile: React.FC<UserStore> = ({ user, error }) => {
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
            <p><strong>First Name:</strong> {user.first_name}</p>
            <p><strong>Second Name:</strong> {user.second_name}</p>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Telegram ID:</strong> {user.telegram_id}</p>
            <p><strong>Language:</strong> {user.language}</p>
            <p><strong>Wallet:</strong> {user.wallet}</p>
            <p><strong>Profile Photo:</strong> {user.profile_photo}</p>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {id} = context.params as { id: string };
    try {
        const telegram_id = window.Telegram.WebApp.initDataUnsafe?.user.id;
        const response = await axios.get(`${process.env.API_PATH}/user/get/${telegram_id}`);
        return {
            props: {
                user: response.data,
                error: null
            }
        };
    } catch (error) {
        console.error(error);
        return {
            props: {
                user: null,
                error: 'Error fetching user data'
            }
        };
    }
};

export default UserProfile;

