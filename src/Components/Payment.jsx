import { Link, useNavigate } from 'react-router-dom';
import { CheckoutItem } from '.';
import CurrencyFormat from "react-currency-format";
import { getTotalPrice } from "../reducer";
import { useStateValue } from '../StateProvider';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import axios from '../axios';
import { db } from "../firebase";


function Payment() {
    const [{ basket, newBasket, user, userDetails }, dispatch] = useStateValue(); 
    const navigate = useNavigate();

    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState('');
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                url: `/payments/create?total=${getTotalPrice(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret);
        }
        
        getClientSecret();
    }, [basket])

    // console.log('THE SECRET IS >>>', clientSecret)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {

            db.collection('users')
            .doc(user?.uid)
            .collection('orders')
            .doc(paymentIntent.id)
                .set({
                basket: newBasket,
                amount: paymentIntent.amount,
                created: paymentIntent.created
            })
            

            setSucceeded(true);
            setError(null);
            setProcessing(false);

            window.localStorage.removeItem("basket");
            window.localStorage.removeItem("newBasket");

            dispatch({
                type: 'EMPTY_BASKET'
            })

            navigate('/orders', {replace: true});
        })
    }

    const handleChange = e => {
        setDisabled(e.empty);
        setError(e.error ? e.error.message : '');
    }

    return (
    <div className='payment'>
        <div className='payment__container'>
            <h1>
                Checkout (
                    <Link to='/cart'>{basket?.length} items</Link>
                )
            </h1>
            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Delivery Address</h3>
                </div>
                <div className='payment__address'>
                    <p>{userDetails.firstName} {userDetails.surName}</p>
                    <p>{user.email}</p>
                    <p>{userDetails.countryCode} {userDetails.phoneNo}</p>
                    <p>{userDetails.address}, {userDetails.country}</p>
                </div>
            </div>

            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Review items and delivery</h3>
                    </div>
                    <div className='payment__items'>
                        {newBasket.map((item, index) => {
                            return (
                                <CheckoutItem
                                    key={index}
                                    id={item.id}
                                    title={item.title}
                                    image={item.image}
                                    price={item.price}
                                    relPrice={item.relPrice}
                                    rating={item.rating}
                                    quantity={item.quantity}
                                    kobo={item.kobo}
                                />
                            );
                        })}
                    </div>
            </div>

            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Payment Method</h3>
                </div>
                <div className="payment__details">
                    <form onSubmit={handleSubmit}>
                        <CardElement onChange={handleChange} />

                        <div className="payment__pricecontainer">
                            <CurrencyFormat
                                renderText={(value) => {
                                return (
                                    <h3>Order Total: {value}</h3>
                                );
                                }}
                                value={getTotalPrice(basket)}
                                decimalScale={2}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                            />
                            <button disabled={processing || disabled || succeeded}>
                                <span>{processing ? <p>Processing</p> : 'Buy Now'}</span>
                            </button>
                        </div>
                        {error && <div>{error}</div>}
                    </form>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Payment
