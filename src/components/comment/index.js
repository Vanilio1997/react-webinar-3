import { Children, memo} from "react"
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import TextArea from "../text-area";
import LoginLink from "../login-link";
import { setTimes } from "../../utils/setTime";

function Comment({comment,pickComment,postComment,hideComment,isAuthorized, typeOfComment, children,pageId,userName ,onSign}){
   const cn = bem('Comment');
   let date = new Date(comment.dateCreate);
   date = setTimes(date);
   return (
      <div className={cn()} style={{paddingLeft: comment.level < 11 ? `${comment.level*30}px` : `${11*30}px`}}>

         {
            !comment?.isTextArea
            ?
               <div className={cn('container')}>
                  <div className={cn('infoContainer')}>
                     <span className={`${cn('userName')} ${userName === comment.author.profile.name ? 'currentUserComment' : ''}`}>
                        {comment?.author?.profile?.name}</span>
                     <span className={cn('date')}>{date}</span>
                  </div>
                  <div>
                     <span className={cn('text')}>{comment.text}</span>
                  </div>
                  <div>
                     <div className={cn('btn')} onClick={() => pickComment(comment._id, 'comment') }>
                        Ответить
                     </div>
                  </div>
               </div>
            :
               <div>
                  {
                     comment._id 
                     ?    
                        isAuthorized 
                        ?
                           <TextArea 
                              type="comment" parentId={comment.parent._id} 
                              pageId={pageId} onRefuce={hideComment} 
                              onPostComment={postComment} 
                              headerText="Ответ"
                           />
                        :
                           <LoginLink onSign={onSign} type={typeOfComment} onRefuce={hideComment} />

                     :
                        null
                  }
            </div>
         }
         {Children.map(children, child =>
            <div>
               {child}
            </div>
         )}
      </div>
   )
}

Comment.propstype = {
   comment: PropTypes.object,
   pickComment: PropTypes.func,
   postComment: PropTypes.func,
   hideComment: PropTypes.func,
   commentForAnswerInfo: PropTypes.string,
   isAuthorized: PropTypes.bool,
   userName: PropTypes.string,
   link: PropTypes.string
}

export default memo(Comment);
