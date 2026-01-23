"use client";

import NavBarStyles from "./NavBar.module.css";
import reactStyles from "./Reactions.module.css";

export default function Reactions({ postId, action, counts = {} }) {
  return (
    <>
      <form className={reactStyles.form} action={action}>
        <input type="hidden" name="post_id" value={postId} />

        <button
          className={NavBarStyles.a}
          type="submit"
          name="reaction"
          value="celebrate"
        >
          🥳 {counts.celebrate || 0}
        </button>
        <button
          className={NavBarStyles.a}
          type="submit"
          name="reaction"
          value="love"
        >
          ❤️ {counts.love || 0}
        </button>
      </form>
    </>
  );
}
