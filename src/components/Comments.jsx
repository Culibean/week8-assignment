"use client";
import CommentStyles from "./Comments.module.css";

export default function Comments({ postId, action }) {
  return (
    <>
      <h3 className={CommentStyles.h3}>Add a comment</h3>
      <form action={action}>
        <input type="hidden" name="post_id" value={postId} />

        <label className={CommentStyles.label}>
          Your name:
          <input
            className={CommentStyles.input}
            type="text"
            name="username"
            required
            placeholder="Add your name"
          ></input>
        </label>

        <label className={CommentStyles.label}>
          Add a Comment
          <input
            className={CommentStyles.input}
            type="text"
            name="comment"
            required
            placeholder="Add your comment here..."
          ></input>
        </label>
        <button className={CommentStyles.button} type="submit">
          Submit
        </button>
      </form>
    </>
  );
}
