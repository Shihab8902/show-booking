import PropTypes from 'prop-types';
import noImagePlaceholder from '../../assets/noImagePlaceholder.jpg';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';



const ShowCard = ({ data }) => {
    const { show } = data;
    const { name, image, rating, runtime, language } = show;


    //Initialize aos
    useEffect(() => {
        AOS.init({
            duration: 700
        });
    }, [])

    return <div className='border-2 ' data-aos="fade-up">

        <div className='overflow-hidden'>
            <img className='w-full h-[400px]  block hover:scale-105 transition-all duration-300' src={image?.medium || image?.original || noImagePlaceholder} alt={name} />
        </div>

        <div className='flex items-center justify-between mt-5 px-2'>
            <h3 className='text-xl font-bold'>{name}</h3>
            {
                rating.average ? <p className='font-bold'><span className='text-blue-700'>⭐{rating?.average}</span>/10</p>
                    : <p className='text-xs font-bold text-blue-700'>Not reviewed yet</p>
            }
        </div>


        <div className='flex justify-between items-center mt-4 px-2'>
            <div>
                <span className='uppercase text-sm font-bold text-gray-500'>Language</span>
                <p className='text-center text-sm font-semibold'> {language}</p>
            </div>
            <div>
                <span className='uppercase text-sm font-bold text-gray-500'>Running time</span>
                <p className='text-center text-sm font-semibold'>{runtime ? runtime + " Minutes" : "N/A"}</p>
            </div>
        </div>

        <div >
            <button className='mt-5 w-full bg-blue-600 py-3 hover:bg-blue-700 text-white font-semibold'>View Summary</button>
        </div>


    </div>
}




//Prop validation
ShowCard.propTypes = {
    data: PropTypes.object
}

export default ShowCard