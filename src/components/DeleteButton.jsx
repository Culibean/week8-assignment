export default function DeleteButton({ postId, action }) {
  return (
    <>
      <form action={action}>
        <input type="hidden" name="post_id" value={postId}></input>
        <button type="submit">Delete Post</button>
      </form>
    </>
  );
}
