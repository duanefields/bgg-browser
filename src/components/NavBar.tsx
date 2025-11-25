import { Link } from "@tanstack/react-router"
import classes from "./NavBar.module.css"
import bggLogo from "../assets/bgg.png"

const NavBar = () => {
  return (
    <div className={classes.navbar}>
      <div>
        <Link to="/" activeProps={{ className: classes.active }}>
          Home
        </Link>
        {" | "}
        <Link to="/about" activeProps={{ className: classes.active }}>
          About
        </Link>
      </div>
      <div>
        <a href="https://boardgamegeek.com" target="_blank" rel="noreferrer">
          <img height="50" src={bggLogo} />
        </a>
      </div>
      <div className={classes.title}>BGG Collection Browser</div>
    </div>
  )
}

export default NavBar
