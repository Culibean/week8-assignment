import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";

export default function NewSubmission() {
  async function handleSubmit(formData) {
    "use server";

    const formValues = {
      user_id: formData.get("user_id"),
      username: formData.get("username"),
      email: formData.get("email"),
      category: formData.get("category"),
      message: formData.get("message"),
    };

    //TODO: insert values into database
    //TODO: make sure that user id is being selected from the uncluttr user tabel

    await db.query(
      `INSERT INTO uncluttrfeed (user_id, username, email, category, message) VALUES ($1, $2, $3, $4, $5)`,
      [
        formValues.user_id,
        formValues.username,
        formValues.email,
        formValues.category,
        formValues.message,
      ],
    );

    revalidatePath("/");
    redirect("/"); //redirects users to homepage/message board once submitted
  }

  return (
    <>
      <h1>New Uncluttr Message Submission</h1>
      <form action={handleSubmit}>
        <input type="hidden" name="user_id" value="1" />{" "}
        <label htmlFor="username">
          Uername
          <input type="text" name="username" max={255} required></input>
        </label>
        <label htmlFor="email">
          Email
          <input type="email" name="email" required></input>
        </label>
        <label htmlFor="category" name="category" required>
          Category
          <select name="category">
            <option value="">Select a Category</option>
            <option value="sale">For Sale</option>
            <option value="free">Free</option>
            <option value="help_needed">I need help</option>
            <option value="help_offered">I can help</option>
            <option value="tips">Tips and Advice</option>
            <option value="success">Celebrations</option>
            <option value="other">Other</option>
          </select>
        </label>
        <label htmlFor="message">
          Message:
          <input
            type="text"
            name="message"
            required
            placeholder="write your message in here"
          ></input>
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
