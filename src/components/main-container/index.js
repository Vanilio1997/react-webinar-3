import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import "./style.css";

function MainContainer({children}) {

  return (
    <div className={'MainContainer'}>
      {children}
    </div>
  );
}

MainContainer.propTypes = {
  children: PropTypes.node
}

export default React.memo(MainContainer);
