import { FaBars, FaTemperatureHigh, FaTwitter } from "react-icons/fa";
import { AiFillFacebook, AiFillInstagram, AiFillCaretDown } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from 'react';
import {adminUrl} from "../server";
import axios from "axios";
import {UserContext} from "../components/constext"

export const HeaderElement = () => {
    const navigate = useNavigate();
    const [showHideNav, setshowHideNav] = useState(true);
    //const [admin, setAdmin] = useState("")
    const { admin, setAdmin } = useContext(UserContext)
    const [football, setFootball] = useState("");
    axios.defaults.withCredentials = true;

    const toggleNewsNav = () => setshowHideNav(previous => !previous);
    //const toggleFootball = () => setFootball(previous => !previous);

    const getAdmin = async () => {
        try {
            const { data } = await axios.get(`${adminUrl}/persistlogin`);
            setAdmin(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAdmin();
    }, []);

    const logout = async () => {
        try {
            const { data } = await axios.post(`${adminUrl}/logoutadmin`);
            console.log(data)
            setAdmin("");
            navigate("/adminlogin")
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <header>
            <div className="nav-button">
                <section className="socials-float-left">
                    <p>Total football, contact us</p>
                    <AiFillFacebook className="socials-logo" />
                    <AiFillInstagram className="socials-logo" />
                    <FaTwitter className="socials-logo" />
                </section>
                <form className="nav-search">
                    <input
                        type="text"
                        placeholder="search"
                    />
                </form>
            </div>

            <div className="nav-bottom">
                <div className="logo-button">
                    <section className="logo-football-img">
                        <h1 onClick={() => navigate("/")} style={{ cursor: "pointer" }}><span style={{ color: "red" }}>Total</span>Football</h1>
                        <img src="./football_2.jpeg" alt="" className="football-img" />
                    </section>
                    <FaBars className="bars" />
                </div>

                <div className="nav-bar-section">
                    <nav>
                        <Link>Home</Link>
                        <Link>About</Link>
                        <span>
                            <Link>Football</Link>
                            <AiFillCaretDown className="home-caret" onClick={() => toggleNewsNav()} />
                        </span>
                        <Link>Livescores</Link>
                        <Link>Betting-tips</Link>
                        {
                            admin ? (
                                <span>
                                    <Link to="/dashboard">Account</Link>
                                    <Link onClick={() => logout()}>Logout</Link>
                                </span>
                            ) : (
                                <span>
                                    <Link>Sign-up</Link>
                                    <Link>Sign-in</Link>
                                </span>
                            )
                        }

                    </nav>
                    <section className={`news-section ${showHideNav ? "" : "show-news-nav"}`}>
                        <Link to="/epl" onClick={()=>toggleNewsNav()}>EPL</Link>
                        <Link to='/seriea' onClick={() => toggleNewsNav()}>Serie A</Link>
                        <Link to="/laliga" onClick={() => toggleNewsNav()}>Laliga</Link>
                        <Link to="/bundesliga" onClick={() => toggleNewsNav()}>Bundesliga</Link>
                        <Link to='/npfl' onClick={() => toggleNewsNav()}>NPFL</Link>
                        <Link to='/ucl' onClick={() => toggleNewsNav()}>UCL/UEL</Link>
                        <Link>Others</Link>
                    </section>
                </div>
            </div>
        </header>
    )
}