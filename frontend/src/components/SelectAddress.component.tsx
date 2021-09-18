import React, { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const SelectAddress = (props: { onChange: (value: any) => void }) => {
    return (
        <div>
            <GooglePlacesAutocomplete
                apiKey="AIzaSyAzxSHMke4V7MM3TfjToxzcSCVtQrTPe2g"
                apiOptions={{
                    language: "it",
                    region: "it",
                }}
                selectProps={{
                    onChange: (value: any) => props.onChange(value),
                }}
            />
        </div>
    );
};

export default SelectAddress;
