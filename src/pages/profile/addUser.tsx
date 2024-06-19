// import React, {useRef, useState} from 'react';
// import axios from 'axios';
// import {useRouter} from 'next/router';
// import {Button} from "@/shared/ui/button";
// import {DefaultInput} from "@/shared/ui/input";
//
// interface User {
//     id: number;
//     first_name: string;
//     second_name: string;
//     username: string;
//     telegram_id: string;
//     language: string;
//     wallet: string;
//     profile_photo: string;
//     time_registration: Date;
// }
//
// const AddUser: React.FC = () => {
//     const formRef = useRef<HTMLFormElement>(null);
//     const [error, setError] = useState<string | null>(null);
//     const [success, setSuccess] = useState<string | null>(null);
//     const router = useRouter();
//
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (formRef.current) {
//             const formData = new FormData(formRef.current);
//             const user: User = {
//                 id: parseInt(formData.get('id') as string),
//                 first_name: formData.get('first_name') as string,
//                 second_name: formData.get('second_name') as string,
//                 username: formData.get('username') as string,
//                 telegram_id: formData.get('telegram_id') as string,
//                 language: formData.get('language') as string,
//                 wallet: formData.get('wallet') as string,
//                 profile_photo: formData.get('profile_photo') as string,
//                 time_registration: new Date(formData.get('time_registration') as string),
//             };
//             try {
//                 const response = await axios.post(`${process.env.API_PATH}/user/add`, user);
//                 if (response.status === 200) {
//                     setSuccess('User added successfully');
//                     setError(null);
//                     await router.push(`/profile/${response.data.id}`);
//                 } else {
//                     setSuccess(null);
//                     setError('Failed to add user');
//                 }
//             } catch (error) {
//                 console.error(error);
//                 setSuccess(null);
//                 setError('Error adding user');
//             }
//         }
//     };
//
//     return (
//         <div className="relative w-full h-full mx-[28px] my-[20px]">
//             <form ref={formRef} onSubmit={handleSubmit}>
//                 <div className={"my-[8px]"}>
//                     <label>ID:</label>
//                     <DefaultInput className={"border-2"} placeholder="1" type="text" name="id" required/>
//                 </div>
//                 <div className={"my-[8px]"}>
//                     <label>First Name:</label>
//                     <DefaultInput className={"border-2"} placeholder="Ivan" type="text" name="first_name" required/>
//                 </div>
//                 <div>
//                     <label>Second Name:</label>
//                     <DefaultInput className={"border-2"} placeholder="Ivanov" type="text" name="second_name" required/>
//                 </div>
//                 <div>
//                     <label>Username:</label>
//                     <DefaultInput className={"border-2"} placeholder="ultrachel" type="text" name="username" required/>
//                 </div>
//                 <div>
//                     <label>Telegram ID:</label>
//                     <DefaultInput className={"border-2"} placeholder="fhuiqu34q" type="text" name="telegram_id"
//                                   required/>
//                 </div>
//                 <div>
//                     <label>Language:</label>
//                     <DefaultInput className={"border-2"} placeholder="Russian" type="text" name="language" required/>
//                 </div>
//                 <div>
//                     <label>Wallet:</label>
//                     <DefaultInput className={"border-2"} placeholder="213fewgr45yhbnrer35h4" type="text" name="wallet"
//                                   required/>
//                 </div>
//                 <div>
//                     <label>Profile Photo:</label>
//                     <DefaultInput className={"border-2"} placeholder="0" type="text" name="profile_photo" required/>
//                 </div>
//                 <div>
//                     <label>Time Registration:</label>
//                     <DefaultInput className={"border-2"} placeholder="01.06.2024, 16:34:07" type="text" name="time_registration" required/>
//                 </div>
//                 <div className={"flex justify-center"}>
//                     <Button className={"flex my-[20px]"}>
//                         Add User
//                     </Button>
//                 </div>
//             </form>
//             {error && <p style={{color: 'red'}}>{error}</p>}
//             {success && <p style={{color: 'green'}}>{success}</p>}
//         </div>
//     );
// };
//
// export default AddUser;

import axios from 'axios';

async function addUser() {
    const user = {
        user_id: 250,
        user_telegram_id: 123444444,
        username: 'Ivan Ivanov',
        user_first_name: 'Ivan',
        user_second_name: 'Ivanov',
        wallet: 'vfdvrsgbdfdtyntd',
        photo: 'https://raw.githubusercontent.com/120-block/120SocialNetwork/dataset/photo/Screenshot%202024-06-17%20at%2012.08.22.png',
        language: 'ru',
        time_registration: new Date('2024-06-01T13:34:07.460543').toISOString() // Преобразование в строку ISO 8601
    };

    try {
        const response = await axios.post(`${process.env.API_PATH}/user/add`, user);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

addUser()
    .then(response => {
        console.log('User added successfully', response);
    })
    .catch(error => {
        console.error('Error adding user', error);
    });
