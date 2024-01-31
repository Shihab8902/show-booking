import { useLocation, useNavigate } from "react-router-dom";
import DOMPurify from 'dompurify';
import noImagePlaceholder from '../../assets/noImagePlaceholder.jpg';
import { useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";


const ShowSummary = () => {
    // Show data
    const location = useLocation();
    const data = location.state;
    const { show } = data;
    const { image, summary, name, language, genres, rating } = show;


    //States
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAlreadyBooked, setIsAlreadyBooked] = useState(false);


    //Check for booking status
    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("bookings")) || [];
        const isExist = storedData?.find(data => data.id === show.id);
        if (isExist) {
            setIsAlreadyBooked(true);
        }
    }, [])




    const sanitizedSummary = DOMPurify.sanitize(summary);
    const navigate = useNavigate();

    return <div className="flex flex-col lg:flex-row gap-10 ">
        {/* image */}
        <div className="h-screen lg:w-5/12 flex-shrink-0">
            <img className="w-full h-full" src={image?.original || noImagePlaceholder} alt="" />
        </div>

        {/* contents */}
        <div className="lg:pr-10 container  lg:h-screen py-10 overflow-y-auto">
            {/* Name with language */}
            <div className="flex items-center justify-center lg:justify-start">
                <h3 className="font-semibold text-3xl">{name}</h3> <span className="font-semibold text-gray-400">({language})</span>
            </div>

            {/* Genres */}
            <p className="font-medium my-3 text-center lg:text-left text-gray-400">
                {genres?.map((item, index) => (
                    <span key={index}>
                        {index > 0 && ','}
                        {item}
                    </span>
                ))}
            </p>

            {/* rating */}
            <div className="text-center lg:text-left">
                {
                    rating.average ? <p className='font-bold'><span className='text-blue-700'>⭐{rating?.average}</span>/10</p>
                        : <p className='text-xs font-bold text-blue-700'>Not reviewed yet</p>
                }
            </div>

            {/* summary */}
            <div className="mt-10 px-5 lg:px-0">
                <h4 className="font-semibold text-xl uppercase text-gray-500 border-b-4 border-b-blue-600 inline-block pr-2">Summary</h4>
                <div className="mt-3 leading-8" dangerouslySetInnerHTML={{ __html: sanitizedSummary }}></div>
            </div>


            {/* Action buttons */}
            <div className="mt-10 flex items-center flex-col lg:flex-row gap-6 px-5 lg:px-0">
                <button onClick={() => navigate(-1)} className=" lg:flex-1 w-full border  border-slate-700 py-3 hover:bg-gray-100 rounded-md ">View List</button>
                <button disabled={isAlreadyBooked} onClick={() => setIsModalOpen(!isModalOpen)} className="lg:flex-1 w-full bg-blue-600 py-3 hover:bg-blue-700 text-white rounded-md disabled:bg-gray-500">{isAlreadyBooked ? "Already Booked" : "Book ticket"}</button>
            </div>


        </div>

        <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} data={data} isAlreadyBooked={isAlreadyBooked} setIsAlreadyBooked={setIsAlreadyBooked} />


    </div>





}

export default ShowSummary