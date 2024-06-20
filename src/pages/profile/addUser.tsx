// import React, {useState} from 'react';
// import axios from 'axios';
// import {useRouter} from 'next/router';
// import {Button} from "@/shared/ui/button";
//
// interface User {
//     user_id: number;
//     user_first_name: string;
//     user_second_name: string;
//     username: string;
//     user_telegram_id: string;
//     language: string;
//     wallet: string;
//     photo: string;
//     time_registration: string;
// }
//
// const AddUser: React.FC = () => {
//     const [error, setError] = useState<string | null>(null);
//     const [success, setSuccess] = useState<string | null>(null);
//     const router = useRouter();
//
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         const user: User = {
//             user_id: 3,
//             user_first_name: 'Блюдце',
//             user_second_name: 'Хуюдце',
//             username: 'Лошок',
//             user_telegram_id: '83489274',
//             language: 'ru',
//             wallet: '',
//             photo: '',
//             time_registration: new Date('2024-06-01T13:34:07.460543').toISOString(),
//         };
//         try {
//             const response = await axios.post(`${process.env.API_PATH}/user/add`, user);
//             if (response.status === 200) {
//                 setSuccess('User added successfully');
//                 setError(null);
//                 await router.push(`/profile/${response.data.id}`);
//             } else {
//                 setSuccess(null);
//                 setError('Failed to add user');
//             }
//         } catch (error) {
//             console.error(error);
//             setSuccess(null);
//             setError('Error adding user');
//         }
//     };
//
//     return (
//         <div className="relative w-full h-full mx-[28px] my-[20px]">
//             <Button onClick={handleSubmit} className={"flex my-[20px]"}>Add User</Button>
//             {error && <p style={{color: 'red'}}>{error}</p>}
//             {success && <p style={{color: 'green'}}>{success}</p>}
//         </div>
//     );
// };
//
// export default AddUser;

// import axios from 'axios';
//
// async function addUser() {
//     const user = {
//         user_id: 3,
//         user_telegram_id: 83489274,
//         username: 'Лошок',
//         user_first_name: 'Блюдце',
//         user_second_name: 'Хуюдце',
//         wallet: '',
//         photo: '',
//         language: 'ru',
//         time_registration: new Date('2024-06-01T13:34:07.460543').toISOString() // Преобразование в строку ISO 8601
//     };
//
//     try {
//         const response = await axios.post(`${process.env.API_PATH}/user/add`, user);
//         console.log(response.data);
//     } catch (error) {
//         console.error(error);
//     }
// }
//
// addUser()
//     .then(response => {
//         console.log('User added successfully', response);
//     })
//     .catch(error => {
//         console.error('Error adding user', error);
//     });

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddUserPage: React.FC = () => {
    const [result, setResult] = useState<string | null>(null);

    async function addUser() {
        const user = {
            user_id: 5,
            user_telegram_id: 9999999,
            username: 'AlexBug',
            user_first_name: 'Alex',
            user_second_name: 'Buggies',
            wallet: '1qwoa2045kasd10koaskd12ekf4',
            photo: '',
            language: 'en',
            time_registration: new Date('2024-06-01T13:34:07.999999').toISOString() // Преобразование в строку ISO 8601
        };

        try {
            const response = await axios.post(`${process.env.API_PATH}/user/add`, user);
            setResult(JSON.stringify(response.data));
            setResult('User added successfully');
        } catch (error) {
            console.error(error);
            setResult('Error adding user');
        }
    }

    useEffect(() => {
        addUser();
    }, []);

    return (
        <div>
            {result && <p>{result}</p>}
        </div>
    );
};

export default AddUserPage;