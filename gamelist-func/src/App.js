import "./App.css";
// import NavBar from "./components/NavBar";
import Favorite from "./components/Favorite";
import Footer from "./components/Footer";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AllGames from "./components/AllGames";
import Search from "./components/Search";
import HomePage from "./components/HomePage";
import { MdGames } from "react-icons/md";
import { BsFillHeartFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { AiFillInfoCircle } from "react-icons/ai";
import About from "./components/About";
import FacebookLogin from "react-facebook-login";


// APP -> ALLGAMES -> GAMES
function App() {
  // let games = [
  //   { gameName: "gta", id: 1 },
  //   { gameName: "bocw", id: 2 },
  //   { gameName: "cod", id: 3 },
  //   { gameName: "mw3", id: 4 },
  //   { gameName: "mw2", id: 5 },
  // ];
  const [fav, setFav] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");

  const addToFav = (game) => {
    console.log("zzzzzzzz", game);
    var search = fav.find((e) => game.id == e.id);
    if (search) {
      alert("ALREADY THERE!");
    } else {
      setFav([...fav, game]);
    }
  };

  const setInfo = (n, t, e) => {
    setName(n);
    setToken(t);
    setEmail(e);
  };

  const removeAll = () => {
    setFav([]);
  };
  const removeFav = (game) => {
    const getIndex = fav.findIndex((x) => x.id == game.id);
    fav.splice(getIndex, 1);
    setFav([...fav]);
    console.log("SETTING NOW! ", fav);
  };

  const responseFacebook = (response) => {
    if (localStorage.getItem("token")) {
      setName(response.name);
      setEmail(response.email);
      setToken(response.accessToken);
    } else {
      console.log("you are not singned in");
    }
  };

  return (
    <>
      <Router>
        <div>
          <nav
            class="navbar navbar-expand-lg navbar-dark bg-primary"
            style={{ fontFamily: "Mate SC, serif", fontSize: "22px" }}
          >
            <div class="container-fluid">
              <a class="navbar-brand" href="/">
                GameList
              </a>
              <div class="collapse navbar-collapse" id="navbarColor01">
                <ul class="navbar-nav me-auto">
                  <li class="nav-item mx-4">
                    <Link className="nav-link" to="/">
                      <AiFillHome size={30} /> Home
                    </Link>
                  </li>
                  <li class="nav-item mx-4">
                    <Link className="nav-link" to="/games">
                      <MdGames size={30} /> Games
                    </Link>
                  </li>
                  <li class="nav-item mx-4">
                    <Link className="nav-link" to="/favorites">
                      <BsFillHeartFill size={30} /> Favorites
                      <span class="badge rounded-pill bg-secondary mx-2">
                        {fav.length}
                      </span>{" "}
                    </Link>
                  </li>
                  <li class="nav-item mx-4">
                    <Link className="nav-link" to="/about">
                      <AiFillInfoCircle size={30} /> About
                    </Link>
                  </li>
                </ul>

                <form class="d-flex">
                  <input
                    class="form-control me-sm-2 m-2"
                    type="text"
                    placeholder="Search"
                    onChange={(e) => setSearchInput(e.target.value)}
                  />

                  <Link className="nav-link" to="/search">
                    <button
                      class="btn btn-secondary my-2 my-sm-0"
                      type="submit"
                    >
                      Search
                    </button>
                  </Link>

                  {token ? (
                    <Link className="nav-link text-light" to="/logout">
                      LOGOUT
                    </Link>
                  ) : null}
                </form>
              </div>
            </div>
          </nav>

          <Switch>
            <Route
              exact
              path="/"
              render={() => <HomePage setInfo={setInfo} />}
            />

            <Route
              exact
              path="/games"
              render={() => <AllGames addToFav={addToFav} />}
            />
            <Route
              path="/favorites"
              render={() => (
                <Favorite
                  favs={fav}
                  removeFav={removeFav}
                  removeAll={removeAll}
                />
              )}
            />

            <Route exact path="/about" render={() => <About />} />

            <Route
              path="/search"
              render={() => <Search target={searchInput} addToFav={addToFav} />}
            />

            <Route
              path="/logout"
              render={() => <HomePage setInfo={setInfo} />}
            />
          </Switch>
        </div>
      </Router>

      <Footer />
    </>
  );
}

export default App;
