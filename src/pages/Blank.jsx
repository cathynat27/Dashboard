import React from "react";
import Navbar from "../components/Navbar/Index";
import { useOutletContext } from "react-router-dom";
import Profile from "./Profile";

function Blank() {
  const [sidebarToggle] = useOutletContext();
  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    description:'TLorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus aliquam odio repellat praesentium dolor, dignissimos, amet corrupti eum esse earum obcaecati eos ea vero eveniet blanditiis minima reiciendis commodi?'
  };
  return (
    <>
      <main className="h-full">
        <Navbar toggle={sidebarToggle} />

        <div className="mainCard">
          <Profile user={user} />
        </div>
      </main>
    </>
  );
}

export default Blank;
