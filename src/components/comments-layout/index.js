import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function CommentsLayout({header,children}) {

  const cn = bem('CommentsLayout');

  return (
    <div className={cn()}>
      <div className={cn('header')}>
        {header}
      </div>
        {children}
    </div>
  );
}

CommentsLayout.propTypes = {
  children: PropTypes.node
}

export default memo(CommentsLayout);
