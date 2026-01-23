"use client";

export default function Comments({ postId, action }) {
  return (
    <>
      <h3>Add a comment</h3>
      <form action={action}>
        <input type="hidden" name="post_id" value={postId} />

        <label>
          Your name:
          <input
            type="text"
            name="username"
            required
            placeholder="Add your name"
          ></input>
        </label>

        <label>
          Add a Comment
          <input
            type="text"
            name="comment"
            required
            placeholder="Add your comment here..."
          ></input>
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
