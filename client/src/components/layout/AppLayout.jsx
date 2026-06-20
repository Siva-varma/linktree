const AppLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#cffafe,_#f8fafc_40%,_#ecfeff_80%)] px-4 py-8 md:px-8">
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </div>
  );
};

export default AppLayout;
