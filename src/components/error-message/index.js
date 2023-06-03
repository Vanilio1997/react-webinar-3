import './style.css';
import PropTypes from 'prop-types';
import { memo } from 'react';
import {cn as bem} from '@bem-react/classname';

function ErrorMessage({text}){
   const cn = bem('ErrorMessage');
   return (
    <div className={cn()}>
      {text}
    </div>
  )
}

ErrorMessage.propTypes = {
   text: PropTypes.string.isRequired
};

export default memo(ErrorMessage);
