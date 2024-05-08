import axios from "axios";
import { useState, useEffect } from "react";
import { football } from "../server";
import {AiOutlineUpload,} from "react-icons/ai"
import {FaFile} from "react-icons/fa"

export const CreateNews = () => {
    const [title, setTitle] = useState("")
    const [news, setNews] = useState("")
    const [file, setFile] = useState("")
    const [category, setCategory] = useState("News");

    const handleRegistration = async (e) => {
        e.preventDefault();
        const registerInput = new FormData();
        registerInput.append("title", title);
        registerInput.append("news", news);
        for (const image of file) {
            registerInput.append("file", image);
        }
        registerInput.append("category", category);

        try {
            const { data } = await axios.post(`${football}/create`, registerInput)
            // console.log(data)
            alert(data.msg)
        } catch (error) {
            //console.log(error)
            alert(error.response.data.msg)
        }
        setNews('')
        setTitle('')
    }


    return <div className="create-news">
        <div className="create-news-center">
            <h1>Football</h1>
            <form action="" onSubmit={handleRegistration}>
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
                        value={news}
                        onChange={(e) => setNews(e.target.value)}
                    ></textarea>
                </div>

                <div className="avar-file">
                    <FaFile className="aifr"/>
                    <input
                        type="file"
                        id="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => setFile(e.target.files)}
                        style={{display:"none"}}
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
    </div>
}