import NavBarStyles from "./NavBar.module.css";

export default function NavBar() {
  return (
    <>
      <nav className={NavBarStyles.navbar}>
        <a
          className={NavBarStyles.a}
          href="https://uncluttr-community.vercel.app/"
        >
          Uncluttr Feed
        </a>
        <a
          className={NavBarStyles.a}
          href="https://uncluttr-community.vercel.app/newsubmission"
        >
          Submit a message
        </a>
        <a className={NavBarStyles.a} href="https://uncluttr.onrender.com/">
          Uncluttr App
        </a>
      </nav>
    </>
  );
}
