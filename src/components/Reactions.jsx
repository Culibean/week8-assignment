"use client";

export default function Reactions({ postId, action }) {
  return (
    <>
      <form action={action}>
        <input type="hidden" name="post_id" value={postId} />

        <button type="submit" name="reaction" value="celebrate">
          🥳
        </button>
        <button type="submit" name="reaction" value="love">
          ❤️
        </button>
      </form>
      ;
    </>
  );
}
