import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage, Checkout, Login, Nav, Payment, Orders } from "./Components";
import { auth } from "./firebase";
import "./index.scss";
import { useStateValue } from "./StateProvider";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { db } from "./firebase";

const promise = loadStripe('pk_test_51LSMbhJSTT4m2IQXzKNFkFnHUWSaCeUIT3LN2PzYwEnl6wB8opZgXZtJZC8V45wZ8MIEUU8kqf5NHUpQC9C6fKdL00EoRGwfiQ');

const App = () => {
  const [show, setShow] = useState();
  const [{ basket, newBasket, user }, dispatch] = useStateValue();

  useEffect(() => {
    function local() {
      if (basket?.length > 0) {
        window.localStorage.setItem("basket", JSON.stringify(basket));
        window.localStorage.setItem("newBasket", JSON.stringify(newBasket));
      }
    }

    local();
  }, [basket])

  useEffect(() => {
    dispatch({
        type: "RESET_BASKET",
        basket: JSON.parse(localStorage.getItem("basket") || "[]"),
        newBasket: JSON.parse(localStorage.getItem("newBasket") || "[]")
      })
  }, [])


  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])

  useEffect(() => {
        if (user) {
            db.collection("details").doc(user?.uid).onSnapshot((snapshot) => {
                dispatch({
                    type: "SET_USER_DETAILS",
                    userDetails: {
                        firstName: snapshot._delegate._document.data.value.mapValue.fields.firstName.stringValue,
                        surName: snapshot._delegate._document.data.value.mapValue.fields.surName.stringValue,
                        phoneNo: snapshot._delegate._document.data.value.mapValue.fields.phoneNo.stringValue,
                        address: snapshot._delegate._document.data.value.mapValue.fields.address.stringValue,
                        country: snapshot._delegate._document.data.value.mapValue.fields.country.stringValue,
                        countryCode: snapshot._delegate._document.data.value.mapValue.fields.countryCode.stringValue,
                    },
                })
            })
        }
    }, [user])

  function signIn() {
    setTimeout(() => {
      setShow(true);
    }, 300);
  }

  function noDisplay() {
    setShow(false);
  }

  function removeOverlay() {
    setShow(false);
  }

  return (
    <Router>
      {show && <div className="overlay" onMouseOver={removeOverlay}></div>}
      <Nav signIn={signIn} noDisplay={noDisplay} show={show} />
      <Routes>
        <Route exact path="/" element={[<HomePage />]}/>
        <Route path="/cart" element={[<Checkout />]} />
        <Route path="/login" element={<Login />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/payment" element={[
          <Elements stripe={promise}>
            <Payment />
          </Elements>
        ]} />
      </Routes>
    </Router>
  );
}; 

export default App;
