import Tilt from 'react-parallax-tilt';
import './Logo.css';

const Logo = () => {
  return (
    <Tilt>
      <div className='ma4 mt0' style={{ height: '250px' }}>
        <h1>React Parallax Tilt 👀</h1>
      </div>
    </Tilt>
  );
};

export default Logo;