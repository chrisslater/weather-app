import React from 'react';
import { render } from 'react-dom';

if (module.hot) {
  module.hot.accept();
}

const dest = document.getElementById('app');
render(<div>Hello World</div>, dest);
