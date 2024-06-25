import axios from "axios";

const wallet = '';

export async function addUser(props: {user_telegram_id: string, username: string, user_first_name: string, user_second_name: string, wallet: string, photo: string,  language: string}) {
    const userProps = {
        user_telegram_id: props.user_telegram_id.id,
        username: props.user.username,
        user_first_name: props.user.first_name || null,
        user_second_name: props.user.last_name || null,
        wallet: wallet,
        photo: props.user.photo_url || null,
        language: props.user.language_code || null,
    }
    try {
        const user_response = await axios.post(`https://120-server.vercel.app/api/user/add_not_exists`, userData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return user_response.data;
    } catch (error) {
        alert(error);
    }
}