import { useStateValue } from '../StateProvider';

const Products = ({ id, image, title, price, kobo, rating, relPrice, quantity }) => {
    const [, dispatch] = useStateValue();


    function addToBasket() {
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: id,
                title: title,
                image: image,
                price: price,
                relPrice: relPrice,
                kobo: kobo,
                rating: rating,
                quantity: quantity,
            }
        })
    };

    return (
        <section>
            <div className='product__info'>
                <p>{title}</p>
                <p className='product__price'>
                    <sup>$</sup>
                    <strong>{price}</strong>
                    <sup>{kobo}</sup>
                </p>
                <div className='product__rating'>
                    {Array(rating)
                        .fill()
                        .map((_, index) => {
                            return <p key={index}>⭐</p>
                        })
                    }
                </div>
            </div>
            <img src={image} alt='' />
            <button onClick={addToBasket}>Add to basket</button>
        </section>
    );
}

export default Products
