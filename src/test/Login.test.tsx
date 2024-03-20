import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from '../pages/Login';
import { expect } from '@jest/globals';
import '@testing-library/jest-dom';

test("exist components", () => {
  render(<Login />);
  const loginElement = screen.getByTestId("login");
  // expect(loginElement).toBeInTheDocument();
});