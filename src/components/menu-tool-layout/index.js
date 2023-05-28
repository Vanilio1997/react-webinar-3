import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function MenuToolLayout({children}) {

  const cn = bem('MenuToolLayout');

  return (
   <div className={cn()}>
      {children}
   </div>
  );
}

MenuToolLayout.propTypes = {
  children: PropTypes.node
}

export default memo(MenuToolLayout);