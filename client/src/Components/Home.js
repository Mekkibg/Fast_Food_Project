import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { current } from "../redux/Actions/useractions";
import { useHistory, Link } from "react-router-dom";
// import Admin from "./Admin";
import ProductsScreen from "./ProductsScreen";

const Home = () => {
  const history = useHistory();

  const user = useSelector((state) => state.UserReducer.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(current());
  }, []);

  const [cartItems, setCartItems] = useState([]);
  // console.log("cartItems", cartItems);

  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (!cart) {
      localStorage.setItem("cart", []);
    } else {
      setCartItems(JSON.parse(cart));
    }
  }, []);

  const addToCart = (item) => {
    const newcart = JSON.parse(localStorage.getItem("cart"));
    // console.log("newcart =>", newcart)
    var exist = false;

    newcart.forEach((el) => {
      if (el._id === item._id) {
        exist = true;
        return false;
      }
    });

    console.log(exist);
    if (!exist) {
      item.qtn = 1;
      newcart.push(item);

      localStorage.setItem("cart", JSON.stringify(newcart));
      setCartItems(JSON.parse(localStorage.getItem("cart")));
    }
  };

  const [prods, setProds] = useState([]);
  const [filtredProds, setFiltredProds] = useState([]);

  const [filterParam, setFilterParam] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();

  useEffect(() => {
    getProds();
    getCategories();
  }, []);

  const getProds = () => {
    axios
      .get("/products")
      .then((res) => {
        setProds(res.data);
        setFiltredProds(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const getCategories = () => {
    axios
      .get("/categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  useEffect(() => {
    setFiltredProds(search());
  }, [filterParam]);

  const search = () => {
    if (filterParam !== "") {
      if (selectedCategory) {
        setSelectedCategory(null);
      }
      const filtred = prods.filter((item) => {
        return item.name.toLowerCase().includes(filterParam);
      });
      return filtred;
    } else {
      return prods;
    }
  };

  const searchByCategory = (cat) => {
    if (cat?._id === selectedCategory?._id) {
      setSelectedCategory(null);
      setFiltredProds(prods);
      return;
    } else {
      setSelectedCategory(cat);
    }
    const filtred = prods?.filter((item) => {
      return item._category._id === cat._id;
    });
    setFiltredProds(filtred ? filtred : []);
  };

  const deleteItem = (id) => {
    const newcart = JSON.parse(localStorage.getItem("cart")).filter((el) => {
      return el._id !== id;
    });

    localStorage.setItem("cart", JSON.stringify(newcart));
    setCartItems(newcart);
  };

  const decrease = (key) => {
    const newcart = JSON.parse(localStorage.getItem("cart"));

    if (newcart[key].qtn > 0) {
      newcart[key].qtn--;
    }

    localStorage.setItem("cart", JSON.stringify(newcart));
    setCartItems(JSON.parse(localStorage.getItem("cart")));
  };

  const increase = (key) => {
    const newcart = JSON.parse(localStorage.getItem("cart"));

    newcart[key].qtn++;

    console.log(newcart);
    localStorage.setItem("cart", JSON.stringify(newcart));
    setCartItems(JSON.parse(localStorage.getItem("cart")));

  };

  const checkout = async () => {
    const data__ = {
      data: JSON.stringify(cartItems),
      buyer: user._id,
      // total: Number(cartItems.qtn) * Number(cartItems.price) ,
      
    };
    

    const res = await axios.post("/orders/create", data__);
    if (res.data.status) {
      localStorage.setItem("cart", JSON.stringify([]));
      setCartItems([]);
      setSuccesBuy(true);
      setTimeout(() => {
        setSuccesBuy(false);
      }, 1900);
    }
  };

  const [succesBuy, setSuccesBuy] = useState(false);

  return (
    <>
      {user?.role === "admin" ? (
        <ProductsScreen />
      ) : (
        <div className="HOME">
          <div className="banner">
            <span className="bannerInner">10% OFF THIS WEEK</span>
          </div>
          <div className="headerHome"></div>
          <div className="sideBar">
            <div className="sideBar_menu">
              {user ? (
                <div className="fcs">
                  <span className="bigger">Hello {user?.name}</span>
                  <a
                    onClick={() => {
                      localStorage.removeItem("token");
                      history.push("/SignUp");
                    }}
                  >
                    <img
                      className="logoutBtn"
                      src="https://p.kindpng.com/picc/s/312-3120740_logout-hd-png-download.png"
                    />
                  </a>
                </div>
              ) : (
                <div>
                  <span className="bigger">Hello Guest</span>
                </div>
              )}
            </div>
            <div className="sideBar_inner">
              <span className="title">Order Menu</span>

              {cartItems.length > 0 ? (
                <>
                  <div className="ordersList">
                    {cartItems &&
                      cartItems.map((p, key) => (
                        <div className="orderItem">
                          <img src={p.image} />
                          <div className="textDataItem">
                            <span className="name">{p.name}</span>
                            <div className="sameLine">
                              <span className="price">DT {p.price}</span>
                              <div className="numb">
                                <span
                                  style={{ cursor: "pointer" }}
                                  onClick={() => decrease(key)}
                                >
                                  -
                                </span>
                                <span className="totalQtn">{p.qtn}</span>
                                <span
                                  style={{ cursor: "pointer" }}
                                  onClick={() => increase(key)}
                                >
                                  +
                                </span>
                              </div>
                            </div>
                          </div>
                          <span
                            className="deleteBtn"
                            onClick={() => deleteItem(p._id)}
                            style={{
                              fontWeight: "bold",
                              cursor: "pointer",
                              marginLeft: "auto",
                            }}
                          >
                            X
                          </span>
                        </div>
                      ))}
                  </div>
                  <span className="total">
                    Total :{" "}
                    
                    { cartItems.reduce(
                      (total, item) => total + item.price * item.qtn,
                      0
                    )}{" "}
                    DT
                  </span>
                  <button
                    onClick={checkout}
                    className="checkout"
                    disabled={cartItems.length > 0 ? false : true}
                  >
                    Checkout
                  </button>
                </>
              ) : (
                <div className="emptyCart">
                  {succesBuy ? (
                    <div>
                      <img
                      alt="image1"
                        style={{ width: "100%" }}
                        className="imageSuccess"
                        src="https://i.gifer.com/7efs.gif"
                      />
                    </div>
                  ) : (
                    <div>
                      {user ? (
                        <div>Cart is Empty</div>
                      ) : (
                        <div>
                          Sign In{" "}
                          <a style={{ color: "red" }} href="/SignUp">
                            here
                          </a>{" "}
                          to buy
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="searchArea">
            <h1 className="logoBrand_">🍔</h1>
            <input
              value={filterParam}
              onChange={(e) => setFilterParam(e.target.value)}
              type="text"
              name="searchFood"
              placeholder="Search by food name"
            />
          </div>

          <div className="categories">
            {categories &&
              categories.map((cat, key) => (
                <div
                  onClick={() => searchByCategory(cat)}
                  className={`cate ${
                    cat._id === selectedCategory?._id ? "selectedCategory" : ""
                  }`}
                >
                  <img src={cat?.image} />
                  <span className="nameCat">{cat?.name}</span>
                </div>
              ))}
          </div>

          <div className="products">
            {filtredProds &&
              filtredProds.map((p, key) => (
                <div className="prod">
                  <img src={p.image} />
                  <span className="cat">{p?._category?.name}</span>
                  <span className="name">{p.name}</span>
                  <span className="price">DT {p.price}</span>
                  {user && (
                    <button onClick={() => addToCart(p)} className="addToCart">
                      +
                    </button>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
