export default interface AutoCompleteResponse {
    label: string;
    value: {
        description: string;
        place_id: string;
    };
}
