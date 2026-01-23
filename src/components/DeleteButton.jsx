import NavBarStyles from "./NavBar.module.css";

export default function DeleteButton({ postId, action }) {
  return (
    <>
      <form action={action}>
        <input type="hidden" name="post_id" value={postId}></input>
        <button className={NavBarStyles.a} type="submit">
          Delete Post
        </button>
      </form>
    </>
  );
}
