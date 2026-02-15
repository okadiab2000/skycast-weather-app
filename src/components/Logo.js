import logo from "../assets/images/logo.svg";

export function Logo() {
  return (
    <a href="http://localhost:3000/">
      <img src={logo} alt="logo" className="logo" />
    </a>
  );
}
