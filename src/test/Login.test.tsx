import React from 'react';
import { render } from '@testing-library/react';
import Login from '../pages/Login';
import { expect } from '@jest/globals';

test("exist components", () => {
  const view = render(<Login />);
  expect(view.container).toMatchSnapshot();
});