export default {
   /**
    * Загрузка товара
    * @param id
    * @return {Function}
    */
    load: (id) => {
      return async (dispatch, getState, services) => {
        dispatch({type: 'comments/load-start'});
  
        try {
          const res = await services.api.request({
            url: `/api/v1/comments?search[parent]=${id}&limit=*&fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type)),count`
          });
          dispatch({type: 'comments/load-success', payload: {data: res.data.result}});
        } catch (e) {
          dispatch({type: 'comments/load-error'});
        }
      }
   },
    postComment: (text, parentId, type) => {
      return async (dispatch,getState , services) => { 
        try {
           const res = await services.api.request({
            url: `/api/v1/comments`,
            method: 'POST',
            body: JSON.stringify({
              text : text,
              parent:{_id: parentId,_type: type}
            })
          })
          dispatch({type:'postComment'})
        } catch(e){
          console.log(e);
        }
      } 
    },
    pickComment: (id, type = '') => {
      return (dispatch) => {
        dispatch({type: 'pickComment' , payload:{_id: type , parent:{_id: id} , isTextArea: true}})
      }
    },
    hideComment: () => {
      return (dispatch) => {
        dispatch({type: 'hideComment' , payload: {_id: '' , parent:{_id: ''} , isTextArea: true}})
      }
    },
 }
 