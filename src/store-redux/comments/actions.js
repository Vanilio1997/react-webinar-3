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
            headers: {
              'Content-Type': 'application/json',
              'X-Token': localStorage.getItem('token')
            },
            body: JSON.stringify({
              text : text,
              parent:{_id: parentId,_type: type}
            })
          })
          dispatch({type:'postComment'})
        } catch(e){
          dispatch({type: 'comments/load-error'});
        }
      } 
    },
    pickComment: (id) => {
      return (dispatch) => {
        dispatch({type: 'pickComment' , payload: id })
      }
    },
    hideComment: () => {
      return (dispatch) => {
        dispatch({type: 'hideComment'})
      }
    },
 }
 