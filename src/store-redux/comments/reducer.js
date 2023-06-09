// Начальное состояние
const initialState = {
   data: [],
   value: 0,
   quantity: null,
   commentForAnswer: null,
   waiting: false 
 }
 
 // Обработчик действий
  function reducer(state = initialState, action) {
    switch (action.type) {
      case "comments/load-start":
        return { ...state, data: {}, waiting: true};
      case "comments/load-success":
        return { ...state, data: action.payload.data, waiting: false};
      case "comments/load-error":
       return { ...state, data: {}, waiting: false}; 
      case "pickComment":
        return {...state , commentForAnswer: action.payload};
      case "postComment": 
        return {...state , commentForAnswer: null};
      case "hideComment":
        return {...state , commentForAnswer: null}
      default:
        return state;
    }
 }
 
 export default reducer;
 