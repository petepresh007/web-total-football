import { useState, useEffect, useContext } from "react";
import {adminUrl} from "../server";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../components/constext";


export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    const {setAdmin} = useContext(UserContext);
    axios.defaults.withCredentials = true;

    const getAdmin = async () => {
        try {
            const { data } = await axios.get(`${adminUrl}/persistlogin`)
            setAdmin(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAdmin();
    }, []);


    
    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post(`${adminUrl}/loginadmin`, {email, password});
            alert(`Welcome ${data.user.username}`);
            navigate('/dashboard');
            setAdmin(data)
        } catch (error) {
            alert(error.response.data.msg)
        }
    }

    return (
        <div className="login-admin">
            <div className="login-admin-center">
                <div className="login-admin-center-details">
                    <h1>Login</h1>
                    <form action="" onSubmit={handleLogin}>
                        <div>
                            <input
                                type="email"
                                placeholder="enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="enter password"
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                        </div>

                        <button>submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}