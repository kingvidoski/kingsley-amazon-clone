import { useStateValue } from "../StateProvider";
import {CheckoutItem, SubTotal} from ".";

const Checkout = () => {
  const [{ basket, newBasket }] = useStateValue();

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
        />

        {basket?.length === 0 ? (
          <div className="checkout__title">
            <h2>Your Shopping cart is empty</h2>
          </div>
        ) : (
          <div className="checkout__item">
            <div className="checkout__title">
              <h2>Shopping Cart</h2>
            </div>
            {newBasket.map(item => {
              return (
                <CheckoutItem
                  key={item.id}
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
        )}
      </div>
      {basket?.length > 0 && (
        <div className="checkout__right">
          <SubTotal />
        </div>
      )}
    </div>
  );
};

export default Checkout;
