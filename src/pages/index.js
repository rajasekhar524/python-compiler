import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const DynamicPythonCompiler = dynamic(() => import('../PythonCompiler'), {
  ssr: false, // Disable server-side rendering for this component
});

const Home = () => {
  return (
    <div>
      <DynamicPythonCompiler />
    </div>
  );
};

export default Home;
