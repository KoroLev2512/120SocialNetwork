export type Posts = {
    post_id: number;
    user_id: number;
    control_id: boolean;
    balance_sheet_id: number;
    tag_id: number;
    link: string;
    time_creation: number;
    image: string;
}

export type PostsStore = {
    posts: [] | null | Posts[];
    getPosts: () => void;
    isLoading: boolean;
}