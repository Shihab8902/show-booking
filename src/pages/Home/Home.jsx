import { useEffect, useState } from "react";
import axios from 'axios';
import ShowCard from "./ShowCard";

const Home = () => {

    //States
    const [shows, setShows] = useState([]);



    //Fetch data
    useEffect(() => {
        axios.get("https://api.tvmaze.com/search/shows?q=all")
            .then(res => {
                setShows(res?.data || []);
            })
    }, []);





    return <div className="container mx-auto px-5">






        {/* Show cards */}
        <div>
            {
                shows?.length > 0 ? <div>
                    {
                        shows?.map(show => <ShowCard key={show?.show.id} show={show} />)
                    }
                </div>
                    : ""
            }
        </div>




    </div>
}

export default Home