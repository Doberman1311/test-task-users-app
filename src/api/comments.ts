import type { IComment } from "../types/comment";

// Import interface Icomment and declarete function getPostComments she give comments for url and if so error return error or return cussec json data
export async function getPostComments(postId: number):Promise<IComment []> {
    const responese = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);

    if(!responese.ok){
        throw new Error("Failed to get post commets");
    }

    const resultGetComment = await responese.json();
    return resultGetComment;
}