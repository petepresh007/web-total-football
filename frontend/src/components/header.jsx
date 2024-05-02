import { FaBars, FaTwitter } from "react-icons/fa";
import { AiFillFacebook, AiFillInstagram } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
export const HeaderElement = () => {
    const navigate = useNavigate()
    return (
        <header>
            <div className="nav-button">
                <section className="socials-float-left">
                    <p>Total football, contact us</p>
                    <AiFillFacebook className="socials-logo" />
                    <AiFillInstagram className="socials-logo" />
                    <FaTwitter className="socials-logo"/>
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
                        <h1 onClick={() => navigate("/")} style={{ cursor: "pointer" }}><span style={{color:"red"}}>Total</span>Football</h1>
                        <img src="./football_2.jpeg" alt=""  className="football-img"/>
                    </section>
                    <FaBars className="bars" />
                </div>

                <div className="nav-bar-section">
                    <nav>
                        <Link>Home</Link>
                        <Link>About</Link>
                        <Link>News</Link>
                        <Link>Football</Link>
                        <Link>Livescores</Link>
                        <Link>Betting tips</Link>
                        <Link>Sign up</Link>
                        <Link>Sign in</Link>
                    </nav>
                </div>
            </div>
        </header>
    )
}