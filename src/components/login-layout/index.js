import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem, cn} from '@bem-react/classname';
import './style.css';

function LoginLayout({children}){
   const cn = bem('LoginHeader');
   return (
    <div className={cn()}>
      {children}
    </div>
  )
}

LoginLayout.propTypes = {
  children: PropTypes.node,
};

export default memo(LoginLayout);
