

const useLocalStorage = () => {

    //Save data to local storage
    const saveDataToLS = (data) => {
        const storedData = JSON.parse(localStorage.getItem("bookings"));


        if (Array.isArray(storedData)) {
            const newData = [...storedData, data];
            localStorage.setItem("bookings", JSON.stringify(newData));
        } else {
            localStorage.setItem("bookings", JSON.stringify([data]));
        }
    }




    return { saveDataToLS }



}

export default useLocalStorage