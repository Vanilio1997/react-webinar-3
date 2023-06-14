import { memo,useCallback,useEffect, useMemo } from "react";
import useStore from "../../hooks/use-store";
import {useDispatch, useSelector as useSelectorRedux} from "react-redux";
import useSelector from "../../hooks/use-selector";
import { useParams,useNavigate, useLocation } from "react-router-dom";
import commentsActions from "../../store-redux/comments/actions";
import PropTypes, { object } from "prop-types";
import listToTree from "../../utils/list-to-tree";
import treeToList from "../../utils/tree-to-list";
import Comment from "../../components/comment";
import TextArea from "../../components/text-area";
import LoginLink from "../../components/login-link";
import CommentsLayout from "../../components/comments-layout";
import CommmentsQuantity from "../../components/commments-quantity";
import shallowEqual from "shallowequal";


function Comments({comments}){
   const store = useStore();
   const dispatch = useDispatch();
   const params = useParams();
   const navigate = useNavigate();


   const callbacks = {
      pickComment: useCallback( (id,type) => dispatch(commentsActions.pickComment(id,type)) ,[store]),
      postComment: useCallback ((text, parentId, type) => {
         if(text.trim().length){
            dispatch(commentsActions.postComment(text, parentId, type))
         }
      },[store]),
      hideComment: useCallback (() => dispatch(commentsActions.hideComment()),[store]),
      onSignIn: useCallback(() => {
         navigate('/login', {state: {back: location.pathname}});
      }, [location.pathname]),
   }
   const selectRedux = useSelectorRedux( state => ({
      commentForAnswerInfo: state.comments.commentForAnswerInfo,
   }), shallowEqual);

   const select = useSelector(state => ({
      isAuthorized: state.session.exists,
      userName: state.session?.user?.profile?.name,
   }));
   const arrForRander = comments ? [...comments?.items ,selectRedux.commentForAnswerInfo] : []
   let renderComments =  useMemo(() => ([ 
         ...treeToList( listToTree(arrForRander ,params.id) , (item, level) => (
         {...item , level: level }
        ))
   ]) , [comments, selectRedux.commentForAnswerInfo]);

      return (
      <CommentsLayout>
         <CommmentsQuantity quantity={comments?.count} />    
         {
          renderComments?.length && renderComments.map(comment => (
               <Comment 
                  comment={comment} 
                  hideComment={callbacks.hideComment}
                  pickComment={callbacks.pickComment}
                  postComment={callbacks.postComment}
                  isAuthorized={select.isAuthorized}
                  commentForAnswerInfo={selectRedux.commentForAnswerInfo}
                  typeOfComment='comment'
                  onSign={callbacks.onSignIn}
                  pageId={params.id}
                  userName={select.userName}
                  key={comment._id}
            />
            ))
         }
         <div>
            {  
               !selectRedux.commentForAnswerInfo._id 
               ? 
                     select.isAuthorized 
                     ?
                        <TextArea type='article' parentId={params.id} onPostComment={callbacks.postComment} headerText="Комментарий"/>
                     :
                        <LoginLink onSign={callbacks.onSignIn} type='arctile' onRefuce={callbacks.hideComment} />
               : 
                   null
            }

         </div>
      </CommentsLayout>
   )
}

Comments.propTypes = {
   comments: PropTypes.array,
}

export default memo(Comments)
