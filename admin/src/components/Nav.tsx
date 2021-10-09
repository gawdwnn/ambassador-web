import React from "react";
import { Link } from "react-router-dom";
import { User } from "../models/users";
import axios from "axios";
interface Props {
  user?: User | null;
}

const Nav: React.FC<Props> = ({ user }) => {
  return (
    <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <div className="navbar-brand col-md-3 col-lg-2 me-0 px-3">Company name</div>

      <ul className="my-2 my-md-0 mr-md-3">
        <Link to={"/profile"} className="p-2 text-white text-decoration-none">
          {user?.first_name} {user?.last_name}
        </Link>
        <Link
          to={"/login"}
          className="p-2 text-white text-decoration-none"
          onClick={async () => await axios.post("logout")}
        >
          Sign out
        </Link>
      </ul>
    </header>
  );
};

export default Nav;
