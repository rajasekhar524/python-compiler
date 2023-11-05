import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import PythonCompiler from '../PythonCompiler'; // Import your component

test('renders PythonCompiler and executes code correctly', async () => {
  // Render the component
  render(<PythonCompiler />);

  // Find the "Run" button and click it
  const runButton = screen.getByText(/Run/i);
  fireEvent.click(runButton);

  // You may need to wait for the execution to finish
  await waitFor(() => {
    // Assert or check the expected output
    // For example, you can check for specific text in the rendered output
    const output = screen.getByText('Expected Text in Output');
    expect(output).toBeInTheDocument();
  });
});
