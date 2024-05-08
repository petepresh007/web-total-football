import { useState, useEffect } from "react";
import { adminUrl, football } from "../server";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiFillEdit, AiOutlineUpload } from "react-icons/ai";
import { FaTrash, FaFile, FaWindowClose } from "react-icons/fa";


export const Dashboard = () => {
    const [admin, setAdmin] = useState("");
    const [news, setNews] = useState("");
    const [searchQuery, setSearchQury] = useState("");

    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState("")
    const [newsUp, setNewsUp] = useState("")
    const [file, setFile] = useState("")
    const [category, setCategory] = useState("");
    const [formID, setFormID] = useState('');
    axios.defaults.withCredentials = true;

    const toggleForm = (id) => {
        setShowForm(previous => !previous);
        setFormID(id);
    }

    const hideshowform = () => setShowForm(previous => !previous);

    const allNews = async () => {
        try {
            const { data } = await axios.get(`${football}/allfootball`);
            setNews(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        allNews();
    }, [])

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

    const deleteNews = async (footballID) => {
        try {
            const { data } = await axios.delete(`${football}/allfootball/${footballID}`);
            alert(data.msg);
           // console.log(data.id)
            setNews(data.data)
        } catch (error) {
            alert(error.response.data.msg)
        }
    }

    const search = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.get(`${football}/search/?query=${encodeURIComponent(searchQuery)}`);
            setNews(data);
            console.log(data)
        } catch (error) {
            console.log(error);
        }
    }


    const handleCreate = async (e) => {
        e.preventDefault()
        const registerInput = new FormData();
        registerInput.append("title", title);
        registerInput.append("news", news);
        for (const image of file) {
            registerInput.append("file", image);
        }
        registerInput.append("category", category);

        try {
            const { data } = await axios.patch(`${football}/allfootball/${formID}`, registerInput)
            //console.log(data)
            alert(data.msg)
            setNews(data.data)
        } catch (error) {
            //console.log(error)
            alert(error.response.data.msg)
        }
        setFormID('');
        setShowForm(false)
    }

    return (
        <div className="dashboard">
            {admin && <h3>Welcome {admin.username}</h3>}
            <div>
                <form action="" onChange={search}>
                    <input
                        type="text"
                        placeholder="search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQury(e.target.value)}
                    />
                </form>
            </div>

            <div className="length-nav">
                <div className="len">
                    <span>available news</span>
                    {news ? <span>{news.length}</span> : <span>loading....</span>}
                </div>
                <div className="link-adm">
                    <Link>Logout</Link>
                    <Link to="/createnews">Create-News</Link>
                    <Link>Create-User</Link>
                </div>
            </div>

            <div className="dashboard-center">
                <div className="dashboard-center-right">
                    <h3>News</h3>
                    {
                        news && news.map(data => {
                            return <div className="dash-news-disp-cen">
                                <p>{data.title.substring(0, 30)}</p>
                                <p>{data.category.substring(0, 30)}</p>
                                <p>{data.date}</p>
                                <AiFillEdit onClick={() => toggleForm(data.id)} />
                                <FaTrash onClick={() => deleteNews(data.id)} />
                            </div>
                        })
                    }

                    <div >
                        {showForm && (
                            <div className="admin-update-form">
                                <form action="" onSubmit={handleCreate}>
                                    <div className="edit-close">
                                        <p>Edit</p>
                                        <FaWindowClose onClick={() => hideshowform()} />
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="title"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <textarea
                                            type="text"
                                            placeholder="news"
                                            value={newsUp}
                                            onChange={(e) => setNewsUp(e.target.value)}
                                        ></textarea>
                                    </div>

                                    <div className="avar-file">
                                        <FaFile className="aifr" />
                                        <input
                                            type="file"
                                            id="file"
                                            accept="image/*"
                                            multiple
                                            onChange={(e) => setFile(e.target.files)}
                                            style={{ display: "none" }}
                                        />
                                        <label htmlFor="file"><AiOutlineUpload className="aifr" /></label>
                                    </div>

                                    <div>
                                        <select
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                        >
                                            <option value="News">News</option>
                                            <option value="EPL">EPL</option>
                                            <option value="Laliga">Laliga</option>
                                            <option value="Serie A">Serie A</option>
                                            <option value="Bundesliga">Bundesliga</option>
                                            <option value="NPFL">NPFL</option>
                                            <option value="Others">Others</option>
                                            <option value="UCL">UCL</option>
                                        </select>
                                    </div>
                                    <button>Submit</button>
                                </form>
                            </div>
                            
                        )}
                    </div>
                </div>
                
                <div className="dashboard-center-left">

                </div>
            </div>
        </div>
    )
}