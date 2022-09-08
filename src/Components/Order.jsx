import moment from 'moment';
import CurrencyFormat from 'react-currency-format';
import { CheckoutItem } from '.';
import { useStateValue } from '../StateProvider';

export default function Order({order}) {
    const [{ userDetails }] = useStateValue();
    return (
    <div className='order'>
        <h2>Order</h2>
        <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
        <p className="order__id">
            <small>{order.id}</small> <br />
            <small>Delivery address: {userDetails.address}</small> 
        </p>
            {order.data.basket?.map((item, index) =>{
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
                        hideBtn
                />
                )
            })}
            <CurrencyFormat
                renderText={(value) => {
                return (
                    <h3 className='order__total'>Order Total: {value}</h3>
                );
                }}
                value={order.data.amount / 100}
                decimalScale={2}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />
    </div>
    )
}
