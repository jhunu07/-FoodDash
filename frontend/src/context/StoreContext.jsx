import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { food_list as staticFoodList } from "../assets/assets";

// eslint-disable-next-line react-refresh/only-export-components
export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const url = import.meta.env.VITE_API_URL || "http://localhost:5001";

  const [token, setToken] = useState(null);
  const [food_list, setFoodList] = useState([]);
  const [cartItems, setCartItems] = useState({});

  // Fetch food list — fall back to static list on failure
  const fetchFoodList = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data?.data?.length) {
        setFoodList(response.data.data);
      } else {
        setFoodList(staticFoodList);
      }
    } catch {
      setFoodList(staticFoodList);
      toast.warn("Could not reach server — showing demo menu.", { toastId: "food-fallback" });
    }
  }, [url]);

  // Load cart data from server
  const loadCartData = useCallback(async (jwtToken) => {
    try {
      const response = await axios.post(
        `${url}/api/cart/get`,
        {},
        { headers: { Authorization: `Bearer ${jwtToken}` } }
      );
      const cartData = response.data?.cartData;
      if (cartData) {
        setCartItems(cartData);
        localStorage.removeItem("cartItems");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        setToken(null);
        toast.error("Session expired. Please log in again.");
      } else {
        toast.error("Failed to load cart. Please refresh.");
      }
    }
  }, [url]);

  // Load token and cart on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken && savedToken !== "undefined") {
      setToken(savedToken);
      loadCartData(savedToken);
    } else {
      const localCart = localStorage.getItem("cartItems");
      if (localCart) {
        try {
          setCartItems(JSON.parse(localCart));
        } catch {
          localStorage.removeItem("cartItems");
        }
      }
    }
    fetchFoodList();
  }, [fetchFoodList, loadCartData]);

  // Save cart to localStorage if not logged in
  useEffect(() => {
    if (!token) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems, token]);

  // Keep cart clean: remove stale ids and non-positive quantities once food list is available
  useEffect(() => {
    if (!food_list.length) return;

    const validIds = new Set(food_list.map((item) => item._id));
    const normalized = {};

    for (const [itemId, qty] of Object.entries(cartItems)) {
      const quantity = Number(qty);
      if (validIds.has(itemId) && quantity > 0) {
        normalized[itemId] = quantity;
      }
    }

    if (JSON.stringify(normalized) !== JSON.stringify(cartItems)) {
      setCartItems(normalized);
    }
  }, [cartItems, food_list]);

  // Add to cart
  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] ? prev[itemId] + 1 : 1,
    }));

    if (token) {
      try {
        await axios.post(
          `${url}/api/cart/add`,
          { itemId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch {
        // Revert optimistic update
        setCartItems((prev) => {
          const updated = { ...prev };
          if (updated[itemId] > 1) updated[itemId] -= 1;
          else delete updated[itemId];
          return updated;
        });
        toast.error("Failed to add item to cart. Please try again.");
      }
    }
  };

  // Remove from cart
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) newCart[itemId] -= 1;
      else delete newCart[itemId];
      return newCart;
    });

    if (token) {
      try {
        await axios.post(
          `${url}/api/cart/remove`,
          { itemId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch {
        toast.error("Failed to update cart. Please try again.");
      }
    }
  };

  // Total cart price
  const getTotalCartAmount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      const item = food_list.find((food) => food._id === itemId);
      if (item) total += item.price * cartItems[itemId];
    }
    return total;
  };

  // Total cart item count
  const getTotalCartItems = () => {
    if (!food_list.length) return 0;
    let count = 0;
    for (const food of food_list) {
      const quantity = Number(cartItems[food._id] || 0);
      if (quantity > 0) count += quantity;
    }
    return count;
  };

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
