import { useEffect, useState } from "react";
import axios from 'axios';
import ShowCard from "./ShowCard";
import Loader from "../../components/Loader/Loader";

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

        <h3 className="text-center my-10 text-4xl font-bold ">Trending Shows</h3> <hr />

        {
            shows?.length > 0 ? <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 my-10">
                {
                    shows?.map(show => <ShowCard key={show?.show.id} data={show} />)
                }
            </div>
                : <Loader />
        }

    </div>
}

export default Home