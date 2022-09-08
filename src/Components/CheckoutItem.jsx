import { Button } from "@mui/material";
import { useState } from "react";
import { useStateValue } from "../StateProvider";

const CheckoutItem = ({
  id,
  title,
  image,
  price,
  relPrice,
  rating,
  quantity,
  kobo,
  hideBtn
}) => {
  const [value, setValue] = useState();
  const [, dispatch] = useStateValue();

  function removeFromBasket() {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  }

  function deleteItem() {
    dispatch({
      type: "DELETE",
      id: id,
    });
  }

  function addQuantity() {
    const qty = 1;
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        relPrice: relPrice,
        kobo: kobo,
        rating: rating,
        quantity: qty,
      },
    });
  }

  return (
    <div className="checkout__product">
      <img src={image} alt="" />
      <div className="checkout__info">
        <p className="title">{title}</p>
        <p className="checkout__price">
          <sup>$</sup>
          <strong>{price}</strong>
          <sup>{kobo}</sup>
        </p>
        <div className="checkout__rating">
          {Array(rating)
            .fill()
            .map((_) => {
              return <p>⭐</p>;
            })}
        </div>
        <div className="checkout__btn">
          {!hideBtn &&
            <>
              <div className="qty">
              <Button
                className="qty__btn"
                variant="contained"
                onClick={removeFromBasket}
              >
                -
              </Button>
              <span>{quantity}</span>
              <Button
                className="qty__btn"
                variant="contained"
                onClick={addQuantity}
              >
                +
              </Button>
              </div>
              <div className="del">
                <button onClick={deleteItem}>Delete</button>
              </div>
            </>
          }
        </div>
      </div>
    </div>
  );
};

export default CheckoutItem;
