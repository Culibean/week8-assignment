import { db } from "@/utils/dbConnection";
import Link from "next/link";
import Database from "@/components/Database";
import homepageStyles from "./homepage.module.css";

export default async function HomePage({ searchParams }) {
  const queryString = await searchParams;

  const { rows } = await db.query(`SELECT * FROM uncluttrfeed `);

  rows.forEach((item) => {
    item.created_at = new Date(item.created_at);
  });
  if (queryString.sort === "cat_desc") {
    rows.sort((a, b) => {
      return b.category.localeCompare(a.category);
    });
  } else if (queryString.sort === "cat_asc") {
    rows.sort((a, b) => {
      return a.category.localeCompare(a.category);
    });
  } else if (queryString.sort === "date_desc") {
    rows.sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at);
    });
  } else if (queryString.sort === "date_asc") {
    rows.sort((a, b) => {
      return new Date(a.created_at) - new Date(b.created_at);
    });
  }
  console.log(rows);

  return (
    <>
      <h1 className={homepageStyles.h1}>Uncluttr Community Feed</h1>
      <Database />
      {/* TODO: Add sorting buttons to page */}
      <section className={homepageStyles.sortingbuttoncontainer}>
        <Link className={homepageStyles.sortingbutton} href="/?sort=date_desc">
          Newest first{" "}
        </Link>
        <Link className={homepageStyles.sortingbutton} href="/?sort=date_asc">
          Oldes first
        </Link>
        <Link className={homepageStyles.sortingbutton} href="/?sort=cat_asc">
          Category A-Z{" "}
        </Link>
        <Link className={homepageStyles.sortingbutton} href="/?sort=cat_desc">
          Category Z-A
        </Link>
      </section>
      {rows.map((feed) => (
        <div className={homepageStyles.feedcard} key={feed.id}>
          <Link href={`/newsubmission/${feed.id}`}>
            <h2 className={homepageStyles.h2}>Category: {feed.category}</h2>
            <h2 className={homepageStyles.h2}>Message: {feed.message}</h2>
            <h2 className={homepageStyles.h2}>By {feed.username}</h2>
            <h2 className={homepageStyles.h2}>
              <small>On: {feed.created_at.toLocaleString()}</small>
            </h2>
          </Link>
        </div>
      ))}
    </>
  );
}
