import { useState, useRef, useEffect, useContext } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartItems, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const cartCount = getTotalCartItems();

  /* ---------------- SCROLL TO SECTION (NO TIMEOUT HACK) ---------------- */
  const scrollToSection = (id) => {
    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        requestAnimationFrame(tryScroll);
      }
    };
    requestAnimationFrame(tryScroll);
  };

  const goToSection = (id, menuName) => {
    setMenu(menuName);
    setMobileMenuOpen(false);

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollToSection(id), 0);
    } else {
      scrollToSection(id);
    }
  };

  /* ---------------- SEARCH ---------------- */
  const toggleSearch = () => {
    if (searchVisible && inputRef.current) inputRef.current.blur();

    setSearchVisible((prev) => {
      if (prev) setSearchQuery("");
      return !prev;
    });
  };

  /* ---------------- DROPDOWN ---------------- */
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  /* ---------------- MOBILE MENU ---------------- */
  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  /* ---------------- SCROLL EFFECT + ACTIVE SECTION ---------------- */
  useEffect(() => {
    const sections = [
      { id: "explore-menu", menu: "menu" },
      { id: "app-download", menu: "mobile-app" },
      { id: "footer", menu: "footer" },
    ];

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      for (let sec of sections) {
        const el = document.getElementById(sec.id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
          setMenu(sec.menu);
          return;
        }
      }

      if (window.scrollY < 200) setMenu("home");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ---------------- CLOSE DROPDOWN OUTSIDE ---------------- */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ---------------- CLOSE MENUS ON ROUTE CHANGE ---------------- */
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  /* ---------------- LOGOUT ---------------- */
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <div className={`navbar ${isScrolled ? "navbar-scrolled" : ""}`}>

      {/* -------- LOGO -------- */}
      <Link
        to="/"
        className="navbar-brand"
        onClick={() => {
          setMenu("home");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <img src={assets.logo} alt="Tomato Logo" className="logo" />
      </Link>

      {/* -------- MENU -------- */}
      <ul className={`navbar-menu ${mobileMenuOpen ? "mobile-open" : ""}`}>

        <li>
          <Link
            to="/"
            onClick={() => {
              setMenu("home");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={menu === "home" ? "active-link" : ""}
          >
            🏠 Home
          </Link>
        </li>

        <li>
          <button
            className={`nav-btn ${menu === "menu" ? "active-link" : ""}`}
            onClick={() => goToSection("explore-menu", "menu")}
          >
            🍽️ Menu
          </button>
        </li>

        <li>
          <button
            className={`nav-btn ${menu === "mobile-app" ? "active-link" : ""}`}
            onClick={() => goToSection("app-download", "mobile-app")}
          >
            📱 Mobile App
          </button>
        </li>

        <li>
          <Link
            to="/help"
            onClick={() => {
              setMenu("help");
              setMobileMenuOpen(false);
            }}
            className={menu === "help" ? "active-link" : ""}
          >
            💬 Help
          </Link>
        </li>

      </ul>

      {/* -------- RIGHT SIDE -------- */}
      <div className="navbar-right">

        {/* SEARCH */}
        <div className={`search-container ${searchVisible ? "search-open" : ""}`}>
          {searchVisible && (
            <input
              ref={inputRef}
              type="text"
              placeholder="Search food..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
              autoFocus
            />
          )}
          <button className="search-btn" onClick={toggleSearch} aria-label="Toggle search">
            {searchVisible ? "✕" : "🔍"}
          </button>
        </div>

        {/* CART */}
        <Link to="/cart" className="cart-link">
          <div className="cart-icon-wrapper">
            <img src={assets.basket_icon} alt="Shopping cart" />
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </div>
        </Link>

        {/* AUTH */}
        {!token ? (
          <button className="signin-btn" onClick={() => setShowLogin(true)}>
            <span className="btn-icon">👤</span>
            Sign In
          </button>
        ) : (
          <div className="navbar-profile" ref={dropdownRef}>
            <div
              className="profile-avatar"
              onClick={toggleDropdown}
              role="button"
              tabIndex={0}
            >
              <img src={assets.profile_icon} alt="profile" />
              <span className="online-indicator"></span>
            </div>

            {dropdownOpen && (
              <ul className="nav-profile-dropdown">
                <li onClick={() => navigate("/myorders")}>
                  <img src={assets.bag_icon} alt="orders" />
                  <span>My Orders</span>
                </li>

                <li onClick={logout}>
                  <img src={assets.logout_icon} alt="logout" />
                  <span>Logout</span>
                </li>
              </ul>
            )}
          </div>
        )}

        {/* MOBILE BUTTON */}
        <button className="mobile-menu-btn" onClick={toggleMobileMenu} aria-label="Toggle menu">
          <span className={`hamburger ${mobileMenuOpen ? "open" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;