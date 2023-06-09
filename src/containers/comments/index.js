import { memo,useCallback } from "react";
import useStore from "../../hooks/use-store";
import {useDispatch, useSelector as useSelectorRedux} from "react-redux";
import useSelector from "../../hooks/use-selector";
import { useParams } from "react-router-dom";
import commentsActions from "../../store-redux/comments/actions";
import PropTypes from "prop-types";
import listToTree from "../../utils/list-to-tree";
import Comment from "../../components/comment";
import TextArea from "../../components/text-area";
import LoginLink from "../../components/login-link";
import CommentsLayout from "../../components/comments-layout";

function Comments({comments,commentForAnswer}){
   const store = useStore();
   const dispatch = useDispatch();
   const params = useParams();

   const callbacks = {
      pickComment: useCallback( id => dispatch(commentsActions.pickComment(id)) ,[store]),
      postComment: useCallback ((text, parentId, type,id) => {
         dispatch(commentsActions.postComment(text, parentId, type))
         dispatch(commentsActions.load(id))
      },[store]),
      hideComment: useCallback (() => dispatch(commentsActions.hideComment()),[store]),

   }
   const selectRedux = useSelectorRedux( state => ({
      newCommentIdParent: state.comments.commentForAnswer,
   }))

   const select = useSelector(state => ({
      isAuthorized: state.session.exists
   }))

   const newValue  = comments.items && listToTree(comments.items , params.id);
   const NewComments = ({items}) => {
      return (
         <div>
            {
               items.map(item =>  
                  item.children.length  
                     ? 
                     <Comment 
                        comment={item} 
                        hideComment={callbacks.hideComment}
                        pickComment={callbacks.pickComment}
                        postComment={callbacks.postComment}
                        isAuthorized={select.isAuthorized}
                        newCommentIdParent={selectRedux.newCommentIdParent}
                        typeOfComment='comment'
                        link='/login'
                        pageId={params.id}
                     > 
                        <NewComments items={item.children}/>
                     </Comment>
                     : 
                  <Comment 
                     comment={item} 
                     hideComment={callbacks.hideComment}
                     pickComment={callbacks.pickComment}
                     postComment={callbacks.postComment}
                     isAuthorized={select.isAuthorized}
                     newCommentIdParent={selectRedux.newCommentIdParent}
                     typeOfComment='comment'
                     link='/login'
                     pageId={params.id}
                  />
               )
            }
         </div>
      )
   }

   return (
      <CommentsLayout>
         <h2>Комментарии ({comments.count})</h2>              
        { comments.items && <NewComments items={newValue}  />}
         <div>
            {  
               !selectRedux.newCommentIdParent 
               ? 
                     select.isAuthorized 
                     ?
                        <TextArea type='article' parentId={params.id} onPostComment={callbacks.postComment} headerText="Комментарий"/>
                     :
                        <LoginLink link={'/login'} type='arctile' onRefuce={callbacks.hideComment} />
               : 
                   null
            }

         </div>
      </CommentsLayout>
   )
}

Comments.propTypes = {
   comments: PropTypes.array,
   commentForAnswer: PropTypes.string
}

export default memo(Comments)