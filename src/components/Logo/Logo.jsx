import Tilt from 'react-parallax-tilt'
import './Logo.css'

const Logo = () => {
  return (
    <Tilt className="tilt">
      <div className="ma4 mt0" style={{ height: 250 }}>
        <h1>React Parallax Tilt 👀</h1>
      </div>
    </Tilt>
  )
}

export default Logo
