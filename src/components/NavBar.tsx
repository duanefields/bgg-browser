import { Link } from "@tanstack/react-router"
import classes from "./NavBar.module.css"
import bggLogo from "../assets/bgg.png"

const NavBar = () => {
  return (
    <div className={classes.navbar}>
      <div className={classes.links}>
        <Link className={classes.link} to="/" activeProps={{ className: classes.active }}>
          Home
        </Link>
        <Link className={classes.link} to="/about" activeProps={{ className: classes.active }}>
          About
        </Link>
      </div>
      <div>
        <a href="https://boardgamegeek.com" target="_blank" rel="noreferrer">
          <img height="36" src={bggLogo} />
        </a>
      </div>
    </div>
  )
}

export default NavBar
