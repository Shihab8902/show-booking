import PropTypes from 'prop-types';
import { IoMdClose } from "react-icons/io";
import useLocalStorage from '../../hooks/useLocalStorage';
import Swal from 'sweetalert2';

const Modal = ({ isModalOpen, setIsModalOpen, data, isAlreadyBooked, setIsAlreadyBooked }) => {

    const { saveDataToLS } = useLocalStorage();


    //Handle submit
    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.target;
        const id = data?.show?.id;
        const showName = form.showName.value;
        const language = form.language.value;
        const name = form.name.value;
        const email = form.email.value;
        const bookedAt = form.booking.value;
        const bookingData = { id, showName, language, name, email, bookedAt };
        saveDataToLS(bookingData);
        setIsModalOpen(!isModalOpen);
        setIsAlreadyBooked(!isAlreadyBooked);
        Swal.fire({
            position: "center",
            icon: "success",
            text: "Ticket booked successfully!",
            showConfirmButton: false,
            timer: 1500
        });

    }


    return (
        <>
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center ">
                    <div className="fixed inset-0 bg-black opacity-50 "></div>

                    <div className="z-50 bg-white  relative rounded-lg shadow-lg lg:w-5/12">
                        {/* Modal close button */}
                        <span className="absolute top-4 right-4 cursor-pointer text-2xl text-gray-500" onClick={() => setIsModalOpen(!isModalOpen)}>
                            <IoMdClose />
                        </span>

                        <div className="p-10 mt-5">
                            <form onSubmit={handleSubmit}>

                                <div className="flex gap-6">
                                    <div>
                                        <label className="font-semibold text-sm block mb-1 text-gray-500" htmlFor="showName">Show name</label>
                                        <input className="w-full border rounded border-slate-400 outline-none py-2 px-5" type="text" name="showName" id="showName" placeholder="Show name" defaultValue={data?.show?.name} readOnly />
                                    </div>

                                    <div>
                                        <label className="font-semibold text-sm block mb-1 text-gray-500" htmlFor="language">Language</label>
                                        <input className="w-full border rounded border-slate-400 outline-none py-2 px-5" type="text" name="language" id="language" placeholder="Language" defaultValue={data?.show?.language} readOnly />
                                    </div>
                                </div>

                                <div className="mt-5">
                                    <label className="font-semibold text-sm block mb-1 text-gray-500" htmlFor="show-name">Name*</label>
                                    <input className="w-full border rounded border-slate-400 outline-none py-2 px-5" type="text" name="name" id="name" placeholder="Enter your name" required />
                                </div>

                                <div className="mt-5">
                                    <label className="font-semibold text-sm block mb-1 text-gray-500" htmlFor="email">Email*</label>
                                    <input className="w-full border rounded border-slate-400 outline-none py-2 px-5" type="email" name="email" id="email" placeholder="Enter your email" required />
                                </div>

                                <div className="mt-5">
                                    <label className="font-semibold text-sm block mb-1 text-gray-500" htmlFor="booking">Booking At*</label>
                                    <input className="w-full border rounded border-slate-400 outline-none py-2 px-5" type="date" name="booking" id="booking" required />
                                </div>

                                <div className="mt-5">
                                    <button className="w-full py-3 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700">Book Ticket</button>
                                </div>


                            </form>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;



//Prop validation
Modal.propTypes = {
    isModalOpen: PropTypes.bool,
    data: PropTypes.object,
    setIsModalOpen: PropTypes.func,
    setIsAlreadyBooked: PropTypes.func,
    isAlreadyBooked: PropTypes.bool
}