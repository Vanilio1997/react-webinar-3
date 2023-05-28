import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';
import { Link } from "react-router-dom";
import { multiLanguges } from "../../languages";

function Menu({menuItems,language}){
  return (
    <div className='Menu'>
     <ul className="MenuListContainer">
      {
        menuItems.map(item =>(
          <li className="MenuItem">
            <Link to={item.link}>
              {multiLanguges[language][item.text]}
            </Link>
          </li>
        ))
      }
     </ul>
    </div>
  )
}

Menu.propTypes = {
  title: PropTypes.node,
  language: PropTypes.language,
};

export default memo(Menu);
