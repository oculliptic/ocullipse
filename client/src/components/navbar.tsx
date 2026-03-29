


import { NavLink } from 'react-router';
import './nav.css'; 


function Navi() {
    // let e:string = "The Ancient String"
    return (<>
        <nav className='navi'>
            <div className='logo'>
                <NavLink to="/" end className=  {({ isActive }) => `link ${isActive ? 'active' : ''}`}>Left</NavLink>
            </div>
            
            <div className='r flexcontainer'>
                <NavLink to="/art" className={({ isActive }) => `link ${isActive ? 'active' : ''}`}><h3>Art</h3></NavLink>
                <NavLink to="/code" className={({ isActive }) => `link ${isActive ? 'active' : ''}`}><h3>Code</h3></NavLink>
                <NavLink to="/about" className={({ isActive }) => `link ${isActive ? 'active' : ''}`}><h3>About</h3></NavLink>
                <NavLink to="/contact" className={({ isActive }) => `link ${isActive ? 'active' : ''}`}><h3>Contacts</h3></NavLink>
            </div>
        </nav>
    </>)
}


export default Navi 











