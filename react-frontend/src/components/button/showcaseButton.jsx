import React from 'react';
// import PropTypes from 'prop-types';

function ShowcaseButton(props) {
  const {buttonContent, onClick} = props;
  return (
    <button className="showcase-button" onClick={onClick}>
      {buttonContent}
    </button>
  );
}

// ShowcaseButton.PropTypes = {
//   buttonContent: PropTypes.string.isRequired,
//   onClick: PropTypes.func.isRequired
// };

export default ShowcaseButton;