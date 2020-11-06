const initialstate = {
    tabledata: [
        { id: 1, fullName: "Ranjan Kumar", email: "ranjan17@navgurukul.org", phone: "9868673606" },
        { id: 2, fullName: "Aslam Desusa", email: "aslam@gmail.com", phone: "7473673606" },
        { id: 3, fullName: "Shakruddin Pathan", email: "shakruddin@yahoo.com", phone: "6555673606" }
    ]
};

const reducer = (state = initialstate, action) => {
    switch (action.type) {
        case 'GET_DATA':
            return {
                ...state
            };
        case 'ADD_DATA':
            return {
                ...state,
                tabledata: state.tabledata.concat(action.payload)
            };
        case 'EDIT_DATA':
            return {
                ...state,
                tabledata: state.tabledata.map(
                    (content, i) => content.id === action.payload.id ? {...content, fullName : action.payload.fullName ,  email : action.payload.email, phone: action.payload.phone }
                    : content)
            };
        case 'DELETE_DATA':
            return {
                ...state,
                tabledata: state.tabledata.filter(item => item.id !== action.payload)
            };
        default:
            return state;
    }
};

export default reducer;
