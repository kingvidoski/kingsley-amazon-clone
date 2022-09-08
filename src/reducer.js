export const initialState = {
  basket: [],
  newBasket: [],
  user: null,
  userDetails: {},
};

export const getTotalPrice = (basket) =>
  basket?.reduce((acc, item) => item.relPrice + acc, 0);

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TO_BASKET":
      const index = state.newBasket.findIndex(
        (item) => item.id === action.item.id
      );
      const filtered = state.basket.filter((b) => b.id === action.item.id);
      const sum = filtered.reduce((acc, obj) => {
        return acc + obj.quantity;
      }, 0);

      if (index >= 0) {
        state.newBasket.splice(index, 1);
      }

      state.newBasket.reverse();

      const newQ = action.item.quantity + sum;
      let newAction = { ...action.item, quantity: newQ };

      return {
        ...state,
        basket: [...state.basket, action.item],
        newBasket: [newAction, ...state.newBasket],
      };

    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
        newBasket: [],
      };

    case "REMOVE_FROM_BASKET":
      let newCart = [...state.basket];
      let newCrt = [...state.newBasket];
      let newQty;
      const ind = state.basket.findIndex((item) => item.id === action.id);
      const indx = state.newBasket.findIndex((item) => item.id === action.id);
      const newfiltered = state.basket.filter((b) => b.id === action.id);
      const newSum = newfiltered.reduce((acc, obj) => {
        return acc + obj.quantity;
      }, 0);

      newQty = newSum - 1;
      let x = state.newBasket[indx].quantity;
      x = newQty;

      state.newBasket.map((v) => {
        if (v.id === action.id) {
          v.quantity = x;
        } else {
          return v;
        }
      });

      if (state.newBasket[indx].quantity === 0) {
        newCrt.splice(indx, 1);
      }

      if (ind >= 0) {
        newCart.splice(ind, 1);
      } else {
        console.warn(
          `Can't remove product (id: ${action.id}) as its not found in basket`
        );
      }

      return {
        ...state,
        basket: newCart,
        newBasket: newCrt,
      };

    case "DELETE":
      const indz = state.newBasket.findIndex((item) => item.id === action.id);
      let filta = state.basket.filter((b) => b.id !== action.id);
      let newB = [...state.newBasket];

      if (indz >= 0) {
        newB.splice(indz, 1);
      } else {
        console.warn(
          `Can't remove product (id: ${action.id}) as its not found in basket`
        );
      }

      return {
        ...state,
        basket: filta,
        newBasket: newB,
      };

    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    case "SET_USER_DETAILS":
      return {
        ...state,
        userDetails: {
          firstName: action.userDetails.firstName,
          surName: action.userDetails.surName,
          phoneNo: action.userDetails.phoneNo,
          address: action.userDetails.address,
          country: action.userDetails.country,
          countryCode: action.userDetails.countryCode,
        },
      };

    case "RESET_BASKET":
      return {
        ...state,
        basket: action.basket,
        newBasket: action.newBasket,
      };

    default:
      return state;
  }
}

export default reducer;
