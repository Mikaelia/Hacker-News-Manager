import React from "react";
import PropTypes from "prop-types";

//// BUTTON COMPONENT ////
const Button = ({ onClick, className, children }) => (
  <button onClick={onClick} className={className} type="button">
    {children}
  </button>
);

//// LOADING COMPONENT ////
const Loading = () => <div>Loading...</div>;

//// HOC ////
const withLoading = Component => ({ isLoading, ...rest }) =>
  isLoading ? <Loading /> : <Component {...rest} />;

//// ENHANCED BUTTON ////
const ButtonWithLoading = withLoading(Button);

Button.defaultProps = {
  className: ""
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default ButtonWithLoading;
