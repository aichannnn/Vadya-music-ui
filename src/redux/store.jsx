import {createStore} from 'redux'
import rootReducer from './reducers'

//load state
const loadState = () =>{
    try {
        const serializedState = localStorage.getItem('state')
        if(serializedState==='null'){
            return undefined
        }
        const state =JSON.parse(serializedState)
        if (state && typeof state ==='object' && 'auth' in state){
            return state;
        }
        return undefined
    } catch (error) {
        return undefined
    }
};

// Save state to localStorage
const saveState = (state) =>{
try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state',serializedState)
} catch (error) {
    //error
}
};

const persistedState = loadState();

const store = createStore(
    rootReducer,
    persistedState
);

store.subscribe(()=>{
    saveState(store.getState())
});
export default store;