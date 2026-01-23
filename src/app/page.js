import { db } from "@/utils/dbConnection";
import Link from "next/link";

export default async function HomePage({ searchParams }) {
  const queryString = await searchParams;

  const { rows } = await db.query(
    `SELECT * FROM uncluttrfeed ORDER BY created_at `,
  );

  const feed = rows;

  if (queryString.sort === "cat_desc") {
    feed.sort((a, b) => {
      return b.category.localeCompare(a.category);
    });
  } else if (queryString.sort === "cat_asc") {
    feed.sort((a, b) => {
      return a.category.localeCompare(a.category);
    });
  } else if (queryString.sort === "date_desc") {
    feed.sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at);
    });
  } else if (queryString.sort === "date_asc") {
    feed.sort((a, b) => {
      return new Date(a.created_at) - new Date(b.created_at);
    });
  }
  console.log(rows);

  return (
    <>
      <h1>Uncluttr Community Feed</h1>
      {/* TODO: Add sorting buttons to page */}
      <section className="sorting-button">
        <Link href="/?sort=date_desc">Newest first </Link>
        <Link href="/?sort=date_asc">Oldes first</Link>
        <Link href="/?sort=cat_asc">Category A-Z </Link>
        <Link href="/?sort=cat">Category Z-A</Link>
      </section>
      {rows.map((feed) => (
        <div className="feed_card" key={feed.id}>
          <Link href={`/newsubmission/${feed.id}`}>
            <h2>Category: {feed.category}</h2>
            <h2>Message: {feed.message}</h2>
            <h2>By {feed.username}</h2>
            <h2>
              <small>On: {feed.created_at.toLocaleString()}</small>
            </h2>
          </Link>
        </div>
      ))}
    </>
  );
}
