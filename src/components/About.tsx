import { Button } from "@mui/material"

const VERSION = (import.meta.env.VITE_APP_VERSION as string).trim()

const About = () => {
  const reload = () => {
    window.location.reload()
  }

  return (
    <div>
      <div>About this Application ({VERSION})</div>
      <div>
        <Button onClick={reload}>Reload</Button>
      </div>
    </div>
  )
}
export default About
