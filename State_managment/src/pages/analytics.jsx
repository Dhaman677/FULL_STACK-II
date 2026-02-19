import { useContext, useMemo } from "react";
import { AppContext } from "../context/AppContext";

const Analytics = () => {
  const { favorites, dispatch } = useContext(AppContext);

  const totalFavorites = useMemo(() => {
    console.log("Calculating total...");
    return favorites.length;
  }, [favorites]);

  return (
    <div>
      <h1>Analytics Page</h1>

      <h3>Total Favorites: {totalFavorites}</h3>

      <button
        onClick={() =>
          dispatch({
            type: "ADD_FAVORITE",
            payload: { id: Date.now(), name: "Project" },
          })
        }
      >
        Add Favorite
      </button>

      <button onClick={() => dispatch({ type: "CLEAR_FAVORITES" })}>
        Clear All
      </button>

      <ul>
        {favorites.map((item) => (
          <li key={item.id}>
            {item.name}
            <button
              onClick={() =>
                dispatch({
                  type: "REMOVE_FAVORITE",
                  payload: item.id,
                })
              }
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Analytics;