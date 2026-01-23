import Image from "next/image";
import logo from "@/../public/assets/logo.png";
import HeaderStyles from "./Header.module.css";

export default function Header() {
  return (
    <>
      <header className={HeaderStyles.header}>
        <Image
          className={HeaderStyles.image}
          src={logo}
          alt={"logo of Uncluttr"}
          width={200}
          height={200}
        />
        <h1 className={HeaderStyles.h1}>UNCLUTTR COMMUNITY</h1>
      </header>
    </>
  );
}
