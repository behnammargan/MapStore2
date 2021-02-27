import {INCREMENT_COUNTER , SET_VERSION,SET_ANNOT} from '../actions/example'
export default (state = {counter:0},action) => {
    switch (action.type){
        case INCREMENT_COUNTER:
            return{
                ...state,
                counter: state.counter + 1
            };
            case SET_VERSION:    
            return{
                ...state,
                version: action.version
            }
            case SET_ANNOT:    
            return{
                ...state,
                extent: action.ann
            }
        
        default:

            return state;
            
    }
};