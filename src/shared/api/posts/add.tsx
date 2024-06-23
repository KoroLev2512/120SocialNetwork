import axios from "axios";

export async function addPost(props: { image: string, description: string[], link: string; }) {
    const postProps = {
        image: "https://raw.githubusercontent.com/120-block/120SocialNetwork/dataset/photo/IMG_4026.JPG",
        description: props.description.join(", "),
        link: props.link,
        balance_sheet_id: 1,
        control_id: true,
        id: 10,
        tag_id: 1,
        time_creation: "2014-04-05T16:55:26",
        user_id: 1,
        post_id: 100
    };

    try {
        const response = await axios.post(`http://localhost:3001/api/post/add`, postProps, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
        return response.data;
    } catch (error) {
        alert(error);
    }
}