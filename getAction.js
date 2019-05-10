

export const onLogin = (mspId) => {
    return {
        type:'LOGIN_SUCCESS',
        mspId
    }
}


export const planname = (plandata) => {
    return {
        type:'PLAN_NAME',
        plandata
    }
}


export const quantityArray = (arr) => {
    return {
        type:'QUANTITY',
        arr
    }
}

  
export const onSearchView = (newArr) => {
    return {
        type:'SEARCH_VIEW',
        newArr
    }
}

  
export const onSearch = (newArray) => {
    return {
        type:'SEARCH',
        newArray
    }
}
  
