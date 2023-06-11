import React, { memo } from 'react';
import './style.css'

function CommentsQuantity ({quantity}){
  return (
    <h2 className='commentsHeader'>Комментарии ({quantity})</h2>
  )
}

export default memo(CommentsQuantity);
