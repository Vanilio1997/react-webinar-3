import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function LoginLayout({children}){
   const cn = bem('LoginLayout');
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
