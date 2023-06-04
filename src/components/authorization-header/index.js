import { memo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ButtonLink from "../button-link";

function AuthorizationHeader(props){
   return(
      <>
         {
            props.token
            ?
               <>
                  <Link to={props.profileLink}>{props.userName}</Link>
                  <ButtonLink onClickCallback={props.onLeaveProfile} link={props.loginLink} text="Выход"/>
               </>
            :
               <ButtonLink link={props.loginLink} text="Вход"/>
         }
      </>
   )
   
}

AuthorizationHeader.propTypes = {
   userName: PropTypes.string,
   onLeaveProfile: PropTypes.func,
   profileLink: PropTypes.string,
   loginLink: PropTypes.string,
   token: PropTypes.string | PropTypes.null,
}

export default memo(AuthorizationHeader)