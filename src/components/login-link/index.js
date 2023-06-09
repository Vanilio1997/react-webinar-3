import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import { Link } from "react-router-dom";


function LoginLink({link, onRefuce,type}){
   const cn = bem('LoginLink');
  return (
    <div className={cn()}>
      <Link to={link}>Войдите</Link>, чтобы иметь возможность ответить.
      {
         type === 'comment'
         ?
            <button className={cn('refuceBtn')} onClick={()=> onRefuce()}>Отмена</button>
         :
            null
      }
    </div>
  )
}

LoginLink.propTypes = {
  link: PropTypes.string,
  onRefuce: PropTypes.func,
  type: PropTypes.string
};

export default memo(LoginLink);
