import React, { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import AutoCompleteResponse from "../classes/autocomplete-response.class";

const SelectAddress = (props: {
    onChange: (value: any) => void;
    value: AutoCompleteResponse | undefined;
}) => {
    const optionalOptions = props.value ? { value: props.value } : {};
    return (
        <div className="sanserif">
            <GooglePlacesAutocomplete
                apiKey="AIzaSyAzxSHMke4V7MM3TfjToxzcSCVtQrTPe2g"
                apiOptions={{
                    language: "it",
                    region: "it",
                }}
                selectProps={{
                    ...optionalOptions,
                    onChange: (value: any) => props.onChange(value),
                }}
            />
        </div>
    );
};

export default SelectAddress;
