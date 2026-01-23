import Comments from "@/components/Comments";
import Reactions from "@/components/Reactions";
import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";

//==================comment submission

async function handleComment(formData) {
  "use server";

  await db.query(
    `INSERT INTO uncluttrfeedcomments (post_id, username, comment) VALUES ($1, $2, $3)`,
    [
      formData.get("post_id"),
      formData.get("username"),
      formData.get("comment"),
    ],
  );
  revalidatePath(`/newsubmission/${formData.get("post_id")}`);
}

//=============reactions

async function handleReaction(formData) {
  "use server";

  await db.query(
    `INSERT INTO uncluttrfeedreactions (post_id, reaction) VALUES ($1, $2)`,
    [formData.get("post_id"), formData.get("reaction")],
  );
  revalidatePath(`/newsubmission/${formData.get("post_id")}`);
}

export default async function SubmissionId({ params }) {
  const { newsubmissionid } = await params;

  const query = await db.query(`SELECT * FROM uncluttrfeed WHERE id =$1`, [
    newsubmissionid,
  ]);
  console.log(query);

  const data = query.rows[0];

  console.log(data);

  //TODO: add the comment below the individual post

  const commentsdata = await db.query(
    `SELECT * FROM uncluttrfeedcomments WHERE post_id = $1 ORDER BY commented_at`,
    [newsubmissionid],
  );

  const comments = commentsdata.rows;

  console.log(comments);

  //TODO: add reactions to individual post

  const reactiondata = await db.query(
    `SELECT * from uncluttrfeedreactions WHERE post_id = $1 ORDER BY reacted_at`,
    [newsubmissionid],
  );

  const reactions = reactiondata.rows;
  console.log(reactions);

  return (
    <>
      <h1>More info</h1>
      <section className="feed_card">
        <h2>Name: {data.username}</h2>
        <h3>Contact: {data.email}</h3>
        <h3>Category: {data.category}</h3>
        <p>Message: {data.message}</p>
        <p>Created at: {data.created_at.toLocaleString()}</p>
      </section>

      <section className="reaction_container">
        <h2>Reactions</h2>
        {reactions.length === 0 && <p>0 Likes and 0 celebrations</p>}
        {reactions.map((reaction) => (
          <div key={reaction.id} className="reaction">
            <p>{reaction.reaction}</p>
          </div>
        ))}
      </section>
      <Reactions postId={data.id} action={handleReaction} />
      <section className="comments_container">
        <h2>Comments</h2>

        {comments.length === 0 && <p>No comments yet</p>}

        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <p>{comment.comment}</p>
            <p>by {comment.username}</p>
            <p>
              <small className="small">
                at {new Date(comment.commented_at).toLocaleString()}
              </small>
            </p>
          </div>
        ))}
      </section>

      <Comments postId={data.id} action={handleComment} />
    </>
  );
}
