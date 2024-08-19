const About = () => {
  const VERSION = (import.meta.env.VITE_APP_VERSION as string).trim()

  return <div>About this Application ({VERSION})</div>
}
export default About
