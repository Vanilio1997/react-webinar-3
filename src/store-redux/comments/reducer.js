// Начальное состояние
const initialState = {
   data: null,
   quantity: null,
   commentForAnswerInfo: {_id: '' , parent:{_id: ''} , isTextArea: true},
   waiting: false,
   newComment:null,
 }
 
 // Обработчик действий
  function reducer(state = initialState, action) {
    switch (action.type) {
      case "comments/load-start":
        return { ...state, waiting: true};
      case "comments/load-success":
        return { ...state, data: action.payload.data, waiting: false};
      case "comments/load-error":
       return { ...state, data: {}, waiting: false}; 
      case "pickComment":
        return {...state , commentForAnswerInfo: action.payload};
      case "postComment": 
        return {...state, data: {...state.data , 
                          items: [...state.data.items , action.payload.comment]},
                          commentForAnswerInfo: action.payload.textArea };
      case "hideComment":
        return {...state , commentForAnswerInfo: action.payload}
      default:
        return state;
    }
 }
 
 export default reducer;
 