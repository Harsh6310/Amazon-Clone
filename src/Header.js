import React from 'react' ;
import './Header.css' ;
import SearchIcon from '@material-ui/icons/Search';
// import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { Link } from 'react-router-dom' ;
import { useStateValue } from './StateProvider'
import { auth } from './firebase';

function Header() {
    const [{basket,user}, dispatch] = useStateValue() ;

    const handleAuthentication = () => {
        if(user) {
            auth.signOut() ;
        } 
    }

    return (
    <div className='header'>
        <Link to='/'>
            <img 
            className='header-logo' 
            src='https://i.imgur.com/AyDSrRb.png'
            />  
        </Link>
        
        <div
        className='header-search'>
            <input 
            className='header-searchInput' 
            type='text'/>
            <Link to='/'>
            <SearchIcon
                className='header-searchIcon'/>
            </Link>
        </div>

        <div 
        className='header-nav'>
            
            <div 
            className='header-option'>
                <span className='header-option-line1'>
                Hello, {user ? user.email : 'Guest'}
                </span>
                <Link to={!user && '../login'}
                className='header-option-line2 sisoText'>
                <span onClick={handleAuthentication}>
                {user ? 'Sign Out' : 'Sign In'}
                </span>
                </Link>
            </div>
            
            <Link to='/orders'>
                <div className='header-option'>
                <span className='header-option-line1'>
                    Returns
                    </span>
                    <span className='header-option-line2'>
                    & Orders
                    </span>
                </div>
            </Link>
            <div className='header-option'>
                <span className='header-option-line1'>
                Your
                </span>
                <span className='header-option-line2'>
                Prime
                </span>
            </div>
            <Link to='/checkout'
            className='toCheckout'>
            <div className='header-option-basket'>
                <ShoppingCartCheckoutIcon 
                    className='cartIcon'
                />
                <span className='header-option-line2 header-basketCount'>
                    {basket?.length}
                </span>
            </div>
            </Link>

        </div>

    </div>
  )
}

export default Header