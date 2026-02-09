import { Button } from "@mui/material"
import classes from "./About.module.css"

const VERSION = (import.meta.env.VITE_APP_VERSION as string).trim()

const About = () => {
  const reload = () => {
    window.location.reload()
  }

  return (
    <div className={classes.container}>
      <div className={classes.version}>About this Application ({VERSION})</div>
      <div>
        <Button
          onClick={reload}
          sx={{ color: "var(--color-accent)", textTransform: "none", fontWeight: 500 }}
        >
          Reload
        </Button>
      </div>
    </div>
  )
}
export default About
