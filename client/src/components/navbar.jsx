import { Icon } from '@iconify/react';
import '../styles/navbar.css';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const NavBar = () => {
    let navigate = useNavigate()
    return (
        <div className="navbar">
            <div className="logo">
                <a href='/home'>Home</a>
            </div>
            <div className='list'>
                <a href="employee-list">Employee list</a>
            </div>
            <div className='link'>
               {/* <a href="" onClick={()=>navigate('/login')}>LOGIN</a>
               <a href="" onClick={()=>navigate('/signup')}>SIGN UP</a> */}
               <p>name</p>
               <a href="" onClick={()=>navigate('/')}>Logout</a>
            </div>
        </div>
    );
}

export default NavBar;