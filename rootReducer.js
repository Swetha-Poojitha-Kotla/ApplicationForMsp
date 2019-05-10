

// import {LOGIN_SUCCESS} from '../actions/getAction';

const initState={
     newArray:[],
     arr:[],
    mspId:0,
    newArr:[],
    plandata:'',
};

export const rootReducer=(state=initState,action)=>{



   let id=action.mspId;
    if(action.type =='LOGIN_SUCCESS'){
    return {
        ...state,
        mspId:id, 
    }
   }

   
   let newplan=action.plandata;
   if(action.type =='PLAN_NAME'){
   return {
       ...state,
       plandata:newplan,
   }
    }



   let newqty=action.arr;
   if(action.type =='QUANTITY'){
   return {
       ...state,
       arr:newqty,
   }
    }


    let newData1=action.newArr;
    if(action.type =='SEARCH_VIEW'){
      return {
        ...state,
        newArr:newData1,
    }
}



   let newData=action.newArray;
   if(action.type =='SEARCH'){
     return {
       ...state,
       newArray:newData,
   }
  }
    

   return state;
    
    
};