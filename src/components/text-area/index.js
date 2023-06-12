import {memo, useState} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function TextArea({headerText,parentId,type, onPostComment , onRefuce,}) {
   const [textAreaValue, setTextAreaValue] = useState('');
   const cn = bem("TextArea");
   return(
   <div className={cn()}>
      <strong>Новый {headerText}</strong>
      <div>
         <textarea className={cn("input")} onChange={(e) => setTextAreaValue(e.target.value)} /> 
      </div>
      <div className={cn("btns")}>
         <button onClick={() => onPostComment(textAreaValue, parentId, type)}>Отправить</button>
         {
            type === 'comment' 
               ?
            <button onClick={()=> onRefuce()}>Отменить</button>
               :
            null
         }
      </div>
   </div>
  )
}

TextArea.propTypes = {
   headerText: PropTypes.string,
   parentId: PropTypes.string,
   type: PropTypes.string,
   onPostComment: PropTypes.func,
   pageId: PropTypes.string,
   onRefuce: PropTypes.func,
};

export default memo(TextArea);
