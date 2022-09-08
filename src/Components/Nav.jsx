import { Link, useLocation } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AssessmentIcon from "@mui/icons-material/Assessment";
// import LocationOnIcon from '@material-ui/icons/LocationOn';
import { useStateValue } from "../StateProvider";
import { auth } from "../firebase";
import { useEffect, useState } from "react";

const Nav = ({ noDisplay, signIn, show }) => {
  const [{ basket, user, userDetails }, dispatch] = useStateValue();
  const [showNav, setShowNav] = useState();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/login') {
      setShowNav(false)
    } else if (
      location.pathname === '/' ||
      location.pathname === '/cart' ||
      location.pathname === '/orders' ||
      location.pathname === '/payment'
    ) {
      setShowNav(true)
    }
  }, [location])

  const signOut = e => {
    if (user) {
      auth.signOut();
      dispatch({
        type: "SET_USER_DETAILS",
        userDetails: {}
      })
    }
  }

  return (
  <>
    {showNav && <nav>
      <div className="logo">
        <Link to="/">
          <img className="logo1" src="/Images/logo2.png" alt="" />
          {/* <img className='logo2' src="/Images/ll.png" alt="" /> */}
        </Link>
      </div>
      {/* <div className='location'>
        <LocationOnIcon /> <span>Deliver to</span>
        <p>Nigeria</p>
      </div> */}
      <div className="search">
        <button className="all">
          All <ArrowDropDownIcon className="all_dropDown" />
        </button>
        <input type="text" />
        <SearchIcon className="search_btn" />
      </div>
      <div className="details">
        <div
          className="account"
          onMouseOver={signIn}
          onMouseLeave={noDisplay}
        >
          {/* <AccountCircleIcon className="account__icon" /> */}
          <p className="account__info">
            Hello, <span>{user ? userDetails.firstName : 'Sign In'}</span>
          </p>
          <h5 className="account__info">
            Account & Lists <ArrowDropDownIcon className="all_dropDown" />
          </h5>
          {show && (
            <div className="hover">
              <div className="pointer"></div>
              <div className="up">
                {
                  !user ?
                  <Link to='/login'>
                    <button>Sign In</button>
                  </Link>
                  : <button onClick={signOut}>Sign Out</button>
                }
                <p>
                  New Customer? <span>Start Here</span>
                </p>
              </div>
              <div className="down">
                <div className="down__left">
                  <h3>Your Lists</h3>
                  <p>Create a List</p>
                  <p>Find a List or Registry</p>
                  <p>AmazonSmile Charity Lists</p>
                </div>
                <div className="down__right">
                  <h3>Your Accounts</h3>
                  <p>Account</p>
                  <p>Orders</p>
                  <p>Recommendations</p>
                  <p>Browsing History</p>
                  <p>Watchlist</p>
                  <p>Video Purchases & Rentals</p>
                  <p>Content & Devices</p>
                  <p>Subscribe & Save Items</p>
                  <p>Memberships & Subscriptions</p>
                  <p>Music Library</p>
                </div>
              </div>
            </div>
          )} 
        </div>
        <Link to='/orders'>
          <div className="order">
            {/* <AssessmentIcon className="order__icon" /> */}
            <p className="order__info">Returns</p>
            <h5 className="order__info">& Orders</h5>
          </div>
        </Link>
        <Link to="/cart">
          <div className="cart">
            <ShoppingCartCheckoutIcon />
            <h4>
              <span>{basket?.length}</span>Cart
            </h4>
          </div>
        </Link>
      </div>
    </nav>}
  </>
  );
};

export default Nav;
