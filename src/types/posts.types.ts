
export type postsState = {
    posts: null | Post[],
    PostDetails:null | Post

}





// Root Interface
export interface AptResponse {
    message: string;
    paginationInfo: PaginationInfo;
    posts: Post[];
}

// Pagination Info Interface
export interface PaginationInfo {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    nextPage: number | null; // Nullable if there's no next page
    total: number;
}

// Post Interface
export interface Post {
    _id: string;
    body: string;
    image: string;
    user: User;
    createMat: string; // ISO 8601 string
    comments: Comment[];
    id: string;
}

// User Interface
export interface User {
    __id: string;
    name: string;
    photo: string;
}

// Comment Interface
export interface Comment {
    __id: string;
    content: string;
    commentCreator: User;
    post: string; // Refers to Post _id
    createdAt: string; // ISO 8601 string
}