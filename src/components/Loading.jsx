
const Loading = () => {
  return (
    // w-full instead of w-screen: 100vw includes the scrollbar and overflows horizontally
    <div className="flex h-screen w-full items-center justify-center bg-black">
      <div className="three-body">
        <div className="three-body__dot"></div>
        <div className="three-body__dot"></div>
        <div className="three-body__dot"></div>
      </div>
    </div>
  );
};

export default Loading;
