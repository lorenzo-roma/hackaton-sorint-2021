const SelectAddress = () => {
    return (
        <div>
            <script
                async
                src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCEE4TBbznhMAw6igFIl_sq_NHqkYgd9go&libraries=places&callback=initAutocomplete"
            ></script>
            <script lang="js">
                {`let autocomplete;
                console.log("completed");
                function initAutoComplete(){
                    autocomplete = new google.maps.places.AutoComplete(
                        document.getElementById('autocomplete'),
                        {
                            componentRestrictions: {"country": ["IT"]},
                            fields: ["place_id", 'geometry', "name"]
                        }
                    );
                    autocomplete.addListener("place_changed", onPlaceChanged);
                };
                
                function onPlaceChanged(){
                    let place = autocomplete.getPlace();
                    if(!place.geometry){
                        document.getElementById("autocomplete").placeholder = "Enter a place";
                    } else {
                        document.getElementById("details").innerHTML = place.name;
                    }

                };`}
            </script>
            <input id="autocomplete" placeholder="Enter a place" type="text" />
        </div>
    );
};

export default SelectAddress;
