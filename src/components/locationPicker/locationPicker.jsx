import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import useFetchInsideEventHandler from "../../hooks/useFetchInsideEventHandler";
import { toast } from "react-toastify";
import FormSelect from "../formSelect/formSelect";
import Tooltip from "../tooltip/tooltip";

// Define the LocationPicker component that takes selectedProvince, setSelectedProvince, selectedDistrict, and setSelectedDistrict as props
// The mode can be "search" for searching purposes, "edit" for editing the location on a user's profile
const LocationPicker = ({
    mode,
    selectedProvince,
    setSelectedProvince,
    selectedDistrict,
    setSelectedDistrict,
}) => {
    // Create a state variable to store the fetched districts
    const [fetchedDistrictsInSearch, setFetchedDistrictsInSearch] = useState([]);
    // Use the useFetch custom hook to fetch the data for all provinces from the API
    const [fetchedProvinces, fetchedProvincesError, fetchedProvincesLoading] = useFetch(
        `${import.meta.env.VITE_APP_API_URL}/api/location/get-provinces`
    );

    // Get the fetchInsideEventHandler function from useFetchInsideEventHandler custom hook to fetch districts
    const fetchInsideEventHandler = useFetchInsideEventHandler();

    // Create a URLSearchParams object and append a key-value pair to construct the URL for data fetching
    const params = new URLSearchParams();
    params.append("provinceNames", selectedProvince);

    // Use the useFetch custom hook to fetch the data for all districts based on the selected province(s)
    const [fetchedDistrictsInEdit, fetchedDistrictsInEditError] = useFetch(
        `${import.meta.env.VITE_APP_API_URL}/api/location/get-districts?${params.toString()}`,
        { shouldFetchData: mode === "edit" }
    );

    // Define a function to handle the change of the select element for provinces
    const handleProvinceChange = async (e) => {
        // Get all the options of the select element
        const options = e.target.options;
        // Filter out the ones that are selected
        const selectedOptions = [...options].filter((option) => option.selected);
        // Map the selected options to an array of province names
        const selectedProvinces = selectedOptions.map((option) => option.value);
        setSelectedProvince(selectedProvinces);
        const params = new URLSearchParams();
        params.append("provinceNames", selectedProvinces);
        if (selectedProvinces.length > 0) {
            try {
                const data = await fetchInsideEventHandler(
                    `${
                        import.meta.env.VITE_APP_API_URL
                    }/api/location/get-districts?${params.toString()}`
                );
                setFetchedDistrictsInSearch(data);
            } catch (error) {
                toast.error("Error fetching districts. Please try again later.");
                console.error("Error fetching districts:", error);
            }
        } else {
            setFetchedDistrictsInSearch([]);
        }
    };

    // Define a function to handle the change of the select element for districts
    const handleDistrictChange = (e) => {
        // Get all the options of the select element
        const options = e.target.options;
        // Filter out the ones that are selected
        const selectedOptions = [...options].filter((option) => option.selected);
        // Map the selected options to an array of district names
        const selectedDistricts = selectedOptions.map((option) => option.value);
        setSelectedDistrict(selectedDistricts);
    };

    // Return the JSX code for rendering the LocationPicker component
    return (
        <div className="mx-2 my-4 flex flex-col rounded-md bg-indigo-900 p-2.5 shadow-xl">
            <Tooltip id="locationPicker">
                <p className="my-3">
                    <span className="font-bold">How to pick:</span> Choose your preferred provinces
                    and/or cities from the top box, and the box below will show the corresponding
                    districts for you to select. On desktop or laptop, you can click and drag or
                    press Command (Mac)/Control (Windows) and click to choose multiple options.
                </p>
            </Tooltip>
            <fieldset aria-live="polite">
                <legend className="mx-auto mb-2 font-semibold">Where do you want to play?</legend>
                {fetchedProvincesLoading && (
                    <>
                        <FormSelect
                            label="Provinces/Cities"
                            optionPlaceholder="—Pick your provinces/cities—"
                            multiple={true}
                            selectOptions={[]}
                            className="mb-2"
                        ></FormSelect>
                        <FormSelect
                            label="Districts"
                            optionPlaceholder="—Pick your districts—"
                            multiple={true}
                            selectOptions={[]}
                            disabled={!selectedProvince}
                        ></FormSelect>
                    </>
                )}
                {!fetchedProvincesLoading && fetchedProvincesError && (
                    <span className="m-3">{fetchedProvincesError.message}</span>
                )}
                {!fetchedProvincesLoading && fetchedProvinces && (
                    <>
                        <FormSelect
                            label="Provinces/Cities"
                            optionPlaceholder="—Pick your provinces/cities—"
                            value={selectedProvince}
                            onChange={handleProvinceChange}
                            multiple={true}
                            selectOptions={fetchedProvinces}
                            className="mb-2"
                        ></FormSelect>
                        {mode === "edit" ? (
                            fetchedDistrictsInEditError ? (
                                <span className="m-3">{fetchedDistrictsInEditError.message}</span>
                            ) : (
                                <FormSelect
                                    label="Districts"
                                    optionPlaceholder="—Pick your districts—"
                                    value={selectedDistrict}
                                    onChange={handleDistrictChange}
                                    multiple={true}
                                    selectOptions={
                                        fetchedDistrictsInEdit ? fetchedDistrictsInEdit : []
                                    }
                                    disabled={!selectedProvince}
                                ></FormSelect>
                            )
                        ) : (
                            <>
                                <FormSelect
                                    label="Districts"
                                    optionPlaceholder="—Pick your districts—"
                                    value={selectedDistrict}
                                    onChange={handleDistrictChange}
                                    multiple={true}
                                    selectOptions={fetchedDistrictsInSearch}
                                    disabled={!selectedProvince}
                                ></FormSelect>
                            </>
                        )}
                    </>
                )}
            </fieldset>
        </div>
    );
};
export default LocationPicker;
