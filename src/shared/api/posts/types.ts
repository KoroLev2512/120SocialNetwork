export interface Post {
    id: number;
    user_id: number;
    control_id: string;
    balance_sheet_id: string;
    tag_id: string;
    link: string;
    time_creation: string;
    image: string;
}

export interface PostsProps {
    posts: Post[] | null;
    error: string | null;
}
