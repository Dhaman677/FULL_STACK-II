export const initialState = {
  favorites: [],
};

export const appReducer = (state, action) => {
  switch (action.type) {
    case "ADD_FAVORITE":
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };

    case "REMOVE_FAVORITE":
      return {
        ...state,
        favorites: state.favorites.filter(
          (item) => item.id !== action.payload
        ),
      };

    case "CLEAR_FAVORITES":
      return {
        ...state,
        favorites: [],
      };

    default:
      return state;
  }
};