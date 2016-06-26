import React, { PropTypes } from 'react';

function Html({ bundledPath }) {
  return (
    <html>
      <head>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />
      </head>
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
