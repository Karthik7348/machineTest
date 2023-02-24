import { useEffect, useState } from "react";
import '../styles/mainpage.css';
const MainPage = () => {
    let [links, setLinks] = useState([])

    useEffect(() => {
        let fetchData = async () => {
            let response = await fetch("http://localhost:7000/links")
            let data = await response.json()
            setLinks(data)
        }
        fetchData()
    }, [])

    return (
        <div className="iframes">
            {
               
                 links.map(item => (
                    <div className="main-page">
                        <iframe width="560" height="315" src={item} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen ></iframe>
                    </div>
                ))
            }
        </div>
    );
}

export default MainPage;