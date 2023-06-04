import LoginFormLayout from "../layouts/login-form-layout";
import Form from "../form";
import { memo } from "react";
import PropTypes from "prop-types";

function LoginForm(props){
   return(
      <LoginFormLayout>
         <h2>{props.headerText}</h2>
         <Form items={props.items} onSubmit={props.onSubmit} btnText={props.btnText} errorMessage={props.errorMessage}/>
      </LoginFormLayout>
   )
}

LoginForm.propTypes = {
   headerText: PropTypes.string,
   items: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      id: PropTypes.string,
      type: PropTypes.string
    })),
    onSubmit: PropTypes.func.isRequired,
    btnText: PropTypes.string,
    errorMessage: PropTypes.string
}

export default memo(LoginForm)