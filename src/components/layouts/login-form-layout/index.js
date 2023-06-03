import './style.css';
import PropTypes from 'prop-types';
import { memo } from 'react';
import {cn as bem} from '@bem-react/classname';

function LoginFormLayout({head , children}){
   const cn = bem('LoginFromLayout');
   return (
    <div className={cn()}>
      <div>
         {head}
      </div>
      <div>
         {children}
      </div>
    </div>
  )
}

LoginFormLayout.propTypes = {
  children: PropTypes.node,
};

export default memo(LoginFormLayout);
