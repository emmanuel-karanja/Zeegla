
export const persistStore=()=>(next)=>(reducer,initialState,enhancer)=>{
  let store;

  if(typeof initialState !=='function'){
    store=next(reducer,initialState,enhancer);
  }else{
    const preloadedState=initialState ||
        JSON.parse(localStorage.getItem('@@PersistedState')|| {});

    store=next(reducer,preloadedState,enhancer);
    console.log('inside the persistStore',preloadedState);
  }
  
  store.subscribe(()=>{
    localStorage.setItem('@@PersistedState',JSON.stringify(store.getState()))
  });

  return store;
}
