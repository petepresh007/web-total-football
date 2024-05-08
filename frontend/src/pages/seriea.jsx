import { useState, useEffect } from "react";
import axios from "axios";
import { football, url } from "../server";
import { useNavigate } from "react-router-dom";

export const SerieA = () => {
    const [news, setNews] = useState("");
    const navigate = useNavigate();

    async function getNews() {
        try {
            const { data } = await axios.get(`${football}/seriea`);
            setNews(data)
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getNews()
    }, [])

    return <div className="football-news">
        <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>Italian Serie A</h1>
        <div className="football-news-center">
            {
                news && news.map(data => (
                    <div className="football-news-details" key={data.id}>
                        <h1 onClick={() => navigate(`/news/${data.id}`)}>{data.title}</h1>
                        <img src={`${url}/upload/${data.file[0].filename}`} alt="image" />
                        <small>{data.date}</small>
                    </div>
                ))
            }
        </div>
    </div>
}