const redux = require('redux');
const createStore=redux.createStore;

 const initialState={
 mspId:0
 }
 
 //reducer
 const rootReducer=(state =initialState ,action) => {
     if(action.type === 'SETMSPID'){
         return {
             ...state,
             mspId:state.mspId + 1

         };
     }
 return state;
 };
 
 
 //store
 const store=createStore(rootReducer);
 console.log(store.getState());

   //subscription
   store.subscribe(()=>{
    console.log('[subscription]',store.getState());
});


 //dispatch Action
 store.dispatch({type: 'SETMSPID' });
 console.log(store.getState());


