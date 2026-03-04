import { fetchComments } from "./api";
import "./PostDetail.css";
import { useQuery } from "@tanstack/react-query";

export function PostDetail({ post, deleteMutation, updateMutation }) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["comments", post.id],
    queryFn: () => fetchComments(post.id),
  });

  if (isLoading) {
    return <div>Loading comments...</div>;
  }

  if (isError) {
    return (
      <h3>
        Oops, something went wrong loading comments.
        <p> {error.toString()}</p>
      </h3>
    );
  }

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button onClick={() => deleteMutation.mutate(post.id)}>
        Delete
      </button>{" "}
      {deleteMutation.isPending && (
        <p className="loading"> Deleting the post.</p>
      )}
      {deleteMutation.isError && (
        <p className="error">
          {" "}
          Error deleting the post: {deleteMutation.error.message}{" "}
        </p>
      )}
      {deleteMutation.isSuccess && (
        <p className="success"> Post was (not) deleted!</p>
      )}
      <button onClick={() => updateMutation.mutate(post.id)}>
        Update title
      </button>
      {updateMutation.isPending && (
        <p className="loading"> Updating the post.</p>
      )}
      {updateMutation.isError && (
        <p className="error">
          {" "}
          Error updating the post: {updateMutation.error.message}{" "}
        </p>
      )}
      {updateMutation.isSuccess && (
        <p className="success"> Post title was (not) updated!</p>
      )}
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
