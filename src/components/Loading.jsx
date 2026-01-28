import React from 'react';

const Loading = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-black">
      <div className="three-body">
        <div className="three-body__dot"></div>
        <div className="three-body__dot"></div>
        <div className="three-body__dot"></div>
      </div>
    </div>
  );
};

export default Loading;
