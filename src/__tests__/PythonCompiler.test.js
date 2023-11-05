import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import PythonCompiler from './PythonCompiler';

test('renders PythonCompiler component', () => {
  render(<PythonCompiler />);
  const codeMirror = screen.getByText('.py');
  expect(codeMirror).toBeInTheDocument();
});

test('runs Python code and displays the output', async () => {
  render(<PythonCompiler />);

  const codeInput = screen.getByRole('textbox');
  const runButton = screen.getByText('Run');

  fireEvent.change(codeInput, { target: { value: 'print("Hello, World!")' });
  fireEvent.click(runButton);

  // Wait for the loading spinner to disappear
  await waitFor(() => {
    const loadingSpinner = screen.queryByText('loading-spinner');
    expect(loadingSpinner).toBeNull();
  });

  const output = screen.getByText('Hello, World!');
  expect(output).toBeInTheDocument();
});

test('clears code and output on "Clear" button click', async () => {
  render(<PythonCompiler />);

  const codeInput = screen.getByRole('textbox');
  const runButton = screen.getByText('Run');
  const clearButton = screen.getByText('Clear');

  fireEvent.change(codeInput, { target: { value: 'print("Hello, World!")' });
  fireEvent.click(runButton);

  // Wait for the loading spinner to disappear
  await waitFor(() => {
    const loadingSpinner = screen.queryByText('loading-spinner');
    expect(loadingSpinner).toBeNull();
  });

  fireEvent.click(clearButton);

  const codeAfterClear = screen.getByRole('textbox');
  const outputAfterClear = screen.queryByText('Hello, World!');

  expect(codeAfterClear).toHaveValue('');
  expect(outputAfterClear).toBeNull();
});
