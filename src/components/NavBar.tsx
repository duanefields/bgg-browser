import { Link } from "@tanstack/react-router"
import classes from "./NavBar.module.css"

const NavBar = () => {
  return (
    <div>
      <Link to="/" activeProps={{ className: classes.active }}>
        Home
      </Link>
      {" | "}
      <Link to="/about" activeProps={{ className: classes.active }}>
        About
      </Link>
    </div>
  )
}

export default NavBar
