import type { IPost } from "../types/post";

// Import interface IPost and declarate function getUserPost return array IPost and if response possesses error return error
export async function getUserPosts(userId: number): Promise<IPost []> {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);

    if(!response.ok){
        throw new Error("Failed to get user posts");
    }

    const userPosts = await response.json();
    return userPosts;
}