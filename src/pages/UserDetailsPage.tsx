import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../api/users";
import { getUserPosts } from "../api/posts";
import { getPostComments } from "../api/comments";
import type { IUser } from "../types/user";
import type { IPost } from "../types/post";
import type { IComment } from "../types/comment";
import { useLocation } from "react-router-dom";

function UserDetailsPage() {
  const location = useLocation();
  const id = useParams().id;

  const [user, setUser] = useState<IUser | null>(null);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [comments, setComments] = useState<{ [postId: number]: IComment[] }>(
    {},
  );

  useEffect(() => {
    async function getUser() {
      if (location.state) {
        const localUser = location.state;
        setUser(localUser);
      } else {
        const userById = await getUserById(Number(id));
        setUser(userById);
      }

      const userPosts = await getUserPosts(Number(id));
      setPosts(userPosts);
      const userComment = await Promise.all(
        userPosts.map(async (element) => {
          const res = await getPostComments(element.id);
          return res;
        }),
      );

      const commentsByPost: { [postId: number]: IComment[] } = {};

      userPosts.forEach((element, index) => {
        commentsByPost[element.id] = userComment[index];
      });

      setComments(commentsByPost);
    }

    getUser();
  }, [id, location]);

  if (user === null) {
    return <h1>Loading....</h1>;
  }
  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8">
      <div className="mx-auto max-w-4xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-3xl font-bold text-gray-900">{user.name}</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          <p className="text-gray-600">{user.username}</p>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-gray-600">{user.address.city}</p>
          <p className="text-gray-600">{user.address.street}</p>
          <p className="text-gray-600">{user.address.suite}</p>
          <p className="text-gray-600">{user.address.zipcode}</p>
          <p className="text-gray-600">{user.address.geo.lat}</p>
          <p className="text-gray-600">{user.address.geo.lng}</p>
          <p className="text-gray-600">{user.phone}</p>
          <p className="text-gray-600">{user.website}</p>
          <p className="text-gray-600">{user.company.name}</p>
          <p className="text-gray-600">{user.company.catchPhrase}</p>
          <p className="text-gray-600">{user.company.bs}</p>
        </div>
      </div>
      <div className="mx-auto max-w-4xl">
            <hr className="my-8 border-gray-200" />
            <h1 className="mb-5 text-2xl font-bold text-gray-900">Posts</h1>
        {posts.map((element) => {
          return (
            <div
              className="mb-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
              key={element.id}
            >
              <h2 className="mb-2 text-xl font-semibold text-gray-900">
                {element.title}
              </h2>
              <p className="text-gray-600">{element.body}</p>
              <h3 className="mt-5 mb-3 text-lg font-semibold text-gray-800">
                Comments
              </h3>
              {(comments[element.id] ?? []).map((coment) => {
                return (
                  <div key={coment.id}  className="mb-3 rounded-lg bg-gray-50 p-4">
                      <p className="font-medium text-gray-900">{coment.name}</p>
                      <p className="text-sm text-gray-500">{coment.email}</p>
                      <p className="mt-2 text-gray-700">{coment.body}</p>
                    </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UserDetailsPage;
