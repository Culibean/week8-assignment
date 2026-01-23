import Comments from "@/components/Comments";
import DeleteButton from "@/components/DeleteButton";
import Reactions from "@/components/Reactions";
import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import idStyles from "./newsubmissionid.module.css";

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

//=========delete Button
async function deletePost(formData) {
  "use server";

  const postId = formData.get("post_id");
  await db.query(`DELETE FROM uncluttrfeedcomments WHERE post_id=$1`, [postId]);
  await db.query(`DELETE FROM uncluttrfeedreactions WHERE post_id=$1`, [
    postId,
  ]);
  await db.query(`DELETE FROM uncluttrfeed WHERE id =$1`, [postId]);

  redirect("/");
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
    `SELECT reaction, COUNT(*) from uncluttrfeedreactions WHERE post_id=$1 GROUP BY reaction`,
    [newsubmissionid],
  );
  // change array into object

  const reactions = Object.fromEntries(
    reactiondata.rows.map((r) => [r.reaction, r.count]),
  );
  console.log(reactions);

  return (
    <>
      <h1 className={idStyles.h1}>More info</h1>
      <section className={idStyles.feedcard}>
        <h2>Name: {data.username}</h2>
        <h3>Contact: {data.email}</h3>
        <h3>Category: {data.category}</h3>
        <p>Message: {data.message}</p>
        <p>Created at: {data.created_at.toLocaleString()}</p>
        <DeleteButton postId={data.id} action={deletePost} />
      </section>

      <Reactions postId={data.id} action={handleReaction} counts={reactions} />
      <section className={idStyles.comment}>
        {comments.length === 0 && <p>No comments yet</p>}

        {comments.map((comment) => (
          <div key={comment.id} className={idStyles.feedcard2}>
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
