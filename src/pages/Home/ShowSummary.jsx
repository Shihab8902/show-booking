import { useLocation, useNavigate } from "react-router-dom";
import DOMPurify from 'dompurify';
import noImagePlaceholder from '../../assets/noImagePlaceholder.jpg';

const ShowSummary = () => {
    const location = useLocation();
    const data = location.state;
    const { show } = data;
    const { image, summary, name, language, genres, rating } = show;

    const sanitizedSummary = DOMPurify.sanitize(summary);

    const navigate = useNavigate();

    return <div className="flex gap-10 ">
        {/* image */}
        <div className="h-screen w-5/12 flex-shrink-0">
            <img className="w-full h-full" src={image?.original || noImagePlaceholder} alt="" />
        </div>

        {/* contents */}
        <div className="my-10 pr-10 container ">
            {/* Name with language */}
            <div className="flex items-center">
                <h3 className="font-semibold text-3xl">{name}</h3> <span className="font-semibold text-gray-400">({language})</span>
            </div>

            {/* Genres */}
            <p className="font-medium my-3  text-gray-400">
                {genres?.map((item, index) => (
                    <span key={index}>
                        {index > 0 && ','}
                        {item}
                    </span>
                ))}
            </p>

            {/* rating */}
            <div >
                {
                    rating.average ? <p className='font-bold'><span className='text-blue-700'>⭐{rating?.average}</span>/10</p>
                        : <p className='text-xs font-bold text-blue-700'>Not reviewed yet</p>
                }
            </div>

            {/* summary */}
            <div className="mt-10">
                <h4 className="font-semibold text-xl uppercase text-gray-500 border-b-4 border-b-blue-600 inline-block pr-2">Summary</h4>
                <div className="mt-3 leading-8" dangerouslySetInnerHTML={{ __html: sanitizedSummary }}></div>
            </div>


            {/* Action buttons */}
            <div className="mt-10 flex items-center gap-6">
                <button onClick={() => navigate(-1)} className=" flex-1 border border-slate-700 py-3 hover:bg-gray-100 rounded-md ">View List</button>
                <button className="flex-1 bg-blue-600 py-3 hover:bg-blue-700 text-white rounded-md">Book ticket</button>
            </div>


        </div>


    </div>





}

export default ShowSummary