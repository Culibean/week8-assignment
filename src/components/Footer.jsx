import FooterStyle from "./Footer.module.css";
import NavBarStyles from "./NavBar.module.css";

export default function Footer() {
  return (
    <>
      <h4 className={FooterStyle.tag}>Additional ADHD resources:</h4>
      <nav className={FooterStyle.footer}>
        <a
          className={NavBarStyles.a}
          href="https://www.nhs.uk/conditions/adhd-adults/"
        >
          NHS - ADHD in adults
        </a>
        <a className={NavBarStyles.a} href="https://finchcare.com/">
          Finch - Your self-care best friend
        </a>

        <a
          className={NavBarStyles.a}
          href="https://adhduk.co.uk/adhd-useful-resources/"
        >
          ADHD UK
        </a>

        <a
          className={NavBarStyles.a}
          href="https://www.mind.org.uk/information-support/tips-for-everyday-living/adhd-and-mental-health/"
        >
          Mind UK
        </a>
      </nav>
    </>
  );
}
