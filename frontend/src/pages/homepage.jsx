import axios from "axios";
import { landing, url, football } from "../server";
import { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


export const HomePage = () => {
    const [Landing, setLanding] = useState("");
    const [breakingNews, setBreakingNews] = useState("");
    const [allNewsToDisp, setAllNewsToDisp] = useState("");
    const [epl, setEpl] = useState("");
    const [laliga, setLaliga] = useState("");
    const [ucl, setUcl] = useState("");
    const [bundesliga, setBundesliga] = useState("");
    const [npfl, setNpfl] = useState("");
    const [seriea, setSiriea] = useState("");
    const navigate = useNavigate();

    const settings = {
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 8000,
        arrows: false
    };


    const getAllnotes = async () => {
        try {
            const { data } = await axios.get(`${landing}/all`);
            setLanding(data)
        } catch (error) {
            console.log(error)
        }
    }

    const allBreakingNews = async () => {
        try {
            const { data } = await axios.get(`${football}/news`);
            setBreakingNews(data)
        } catch (error) {
            console.log(error)
        }
    }

    const allNews = async () => {
        try {
            const { data } = await axios.get(`${football}/allfootball?limit=6`);
            setAllNewsToDisp(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        allNews()
    }, [])

    useEffect(() => {
        allBreakingNews()
    }, [])

    useEffect(() => {
        getAllnotes()
    }, [])

    const allBreakingEPL = async () => {
        try {
            const { data } = await axios.get(`${football}/epl?limit=4`);
            setEpl(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        allBreakingEPL()
    }, [])


    const allBreakingLaliga = async () => {
        try {
            const { data } = await axios.get(`${football}/laliga?limit=4`);
            setLaliga(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        allBreakingLaliga()
    }, [])

    const allBreakingUCL = async () => {
        try {
            const { data } = await axios.get(`${football}/ucl?limit=4`);
            setUcl(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        allBreakingUCL()
    }, [])


    const allBreakingBundesliga = async () => {
        try {
            const { data } = await axios.get(`${football}/bundesliga?limit=4`);
            setBundesliga(data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        allBreakingBundesliga()
    }, [])

    const allBreakingNPFL = async () => {
        try {
            const { data } = await axios.get(`${football}/npfl?limit=4`);
            setNpfl(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        allBreakingNPFL()
    }, [])

    const allBreakingSirieA = async () => {
        try {
            const { data } = await axios.get(`${football}/seriea?limit=4`);
            setSiriea(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        allBreakingSirieA()
    }, [])


    return (
        <div className="hompage">
            <section className="hompage-center">
                <div className="hompe-top">
                    <Slider {...settings} >
                        {
                            allNewsToDisp && allNewsToDisp.map(data => (
                                <div className="home-top-display" key={data.id}>
                                    <img src={`${url}/upload/${data.file[0].filename}`} alt="image" />
                                    <p onClick={() => navigate(`/news/${data.id}`)}>{data.title}</p>
                                </div>
                            ))
                        }
                    </Slider>
                </div>

                <div className="home-bottom">
                    <section className="home-bottom-center-first">
                        <div className="bottom-right">
                            <h1>Breaking News</h1>
                            {
                                breakingNews && breakingNews.map(data => (
                                    <div key={data.id} className="home-right-cont">
                                        <small style={{ fontSize: ".8rem" }}>{data.date}</small>
                                        <p onClick={() => navigate(`/news/${data.id}`)}>{data.title}</p>
                                    </div>
                                ))
                            }
                            <div className="home-arrow">
                                <h1>See All Breaking News </h1>
                                <FaArrowRight />
                            </div>
                        </div>


                        <div className="bottom-left">
                            {
                                allNewsToDisp && allNewsToDisp.map((data) => {
                                    return <div className="bottom-left-cont" key={data.id}>
                                        <img src={`${url}/upload/${data.file[0].filename}`} alt="image" />
                                        <p onClick={() => navigate(`/news/${data.id}`)}>{data.title}</p>
                                        <small style={{ fontSize: ".8rem" }}>{data.date}</small>
                                    </div>
                                })
                            }
                        </div>
                    </section>

                    <section className="EPL">
                        <h1>English Premier League</h1>
                        <div className="epl-center">
                            {
                                epl && epl.map(data => (
                                    <div className="epl-single" key={data.id}>
                                        <small style={{ fontSize: ".8rem" }}>{data.date}</small>
                                        <img src={`${url}/upload/${data.file[0].filename}`} alt="images" />
                                        <p onClick={() => navigate(`/news/${data.id}`)}>{data.title}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </section>

                    <section className="EPL">
                        <h1>Spanish Laliga</h1>
                        <div className="epl-center">
                            {
                                laliga && laliga.map(data => (
                                    <div className="epl-single" key={data.id}>
                                        <small style={{ fontSize: ".8rem" }}>{data.date}</small>
                                        <img src={`${url}/upload/${data.file[0].filename}`} alt="images" />
                                        <p onClick={() => navigate(`/news/${data.id}`)}>{data.title}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </section>

                    <section className="EPL">
                        <h1>UCL/UEL</h1>
                        <div className="epl-center">
                            {
                                ucl && ucl.map(data => (
                                    <div className="epl-single" key={data.id}>
                                        <small style={{ fontSize: ".8rem" }}>{data.date}</small>
                                        <img src={`${url}/upload/${data.file[0].filename}`} alt="images" />
                                        <p onClick={() => navigate(`/news/${data.id}`)}>{data.title}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </section>

                    <section className="EPL">
                        <h1>German Bundesliga</h1>
                        <div className="epl-center">
                            {
                                bundesliga && bundesliga.map(data => (
                                    <div className="epl-single" key={data.id}>
                                        <small style={{ fontSize: ".8rem" }}>{data.date}</small>
                                        <img src={`${url}/upload/${data.file[0].filename}`} alt="images" />
                                        <p onClick={() => navigate(`/news/${data.id}`)}>{data.title}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </section>

                    <section className="EPL">
                        <h1>Nigerian Professional Premier League</h1>
                        <div className="epl-center">
                            {
                                npfl && npfl.map(data => (
                                    <div className="epl-single" key={data.id}>
                                        <small style={{ fontSize: ".8rem" }}>{data.date}</small>
                                        <img src={`${url}/upload/${data.file[0].filename}`} alt="images" />
                                        <p onClick={() => navigate(`/news/${data.id}`)}>{data.title}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </section>

                    <section className="EPL">
                        <h1>Italian Serie A</h1>
                        <div className="epl-center">
                            {
                                seriea && seriea.map(data => (
                                    <div className="epl-single" key={data.id}>
                                        <small style={{ fontSize: ".8rem" }}>{data.date}</small>
                                        <img src={`${url}/upload/${data.file[0].filename}`} alt="images" />
                                        <p onClick={() => navigate(`/news/${data.id}`)}>{data.title}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </section>

                </div>
            </section>
        </div>
    )
}