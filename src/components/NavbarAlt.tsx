import Navbar from "./Navbar";
import bgImg from "../assets/images/dashboard.png";

export default function NavbarAlt() {
  return (
    <div
      className=" flex-1 px-[2.5rem] py-[1.5rem] pb-[1.8rem] relative bg-cover"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <Navbar />
    </div>
  );
}
