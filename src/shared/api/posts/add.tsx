import axios from "axios";

export async function addPost(props: { image: string, description: string[], link: string; }) {
    const postProps = {
        user_id: 1,
        control_id: 1,
        balance_sheet_id: 1,
        tag_id: 1,
        link: props.link,
        description: props.description.join(", "),
        image: props.image,
        check: null
    };

    try {
        const response = await axios.post(`https://120block.ru/api/post/add`, postProps, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
        return response.data;
    } catch (error) {
        alert(error);
    }
}
