import React, { PropTypes } from 'react';

function Html({ bundledPath }) {
  return (
    <html>
      <body>
        <div id="app" />
        <script src={bundledPath}></script>
      </body>
    </html>
  );
}

Html.propTypes = {
  bundledPath: PropTypes.string.isRequired,
};

export default Html;
