import CurrencyFormat from "react-currency-format";
import { getTotalPrice } from "../reducer";
import { useStateValue } from "../StateProvider";
import {useNavigate} from'react-router-dom';

const SubTotal = () => {
  const [{ basket }] = useStateValue();
  const navigate = useNavigate();

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => {
          return (
            <>
              <p>
                Subtotal ({basket?.length} items): <strong>{`${value}`}</strong>
              </p>
              <small className="subtotal__gift">
                <input type="checkbox" /> This order contains
              </small>
            </>
          );
        }}
        value={getTotalPrice(basket)}
        decimalScale={2}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
      <button onClick={e => navigate('/payment')}>Proceed to Checkout</button>
    </div>
  );
};

export default SubTotal;
