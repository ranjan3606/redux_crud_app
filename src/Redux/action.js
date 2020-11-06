export function getData() {
    console.log('called');
    return dispatch => {
        return dispatch({
            type: 'GET_DATA'
        });
    }
};

export function addData(data) {
    return dispatch => {
        return dispatch({
            type: 'ADD_DATA',
            payload: data
        });
    }
};

export function editData(data) {
    return dispatch => {
        return dispatch({
            type: 'EDIT_DATA',
            payload: data
        });
    }
};

export function deleteData(id) {
    return dispatch => {
        return dispatch({
            type: 'DELETE_DATA',
            payload: id
        });
    }
};