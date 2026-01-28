const DashboardHeader = () => {
    return (
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#3b2f2f]">My Dashboard</h1>
          <p className="text-gray-600">Manage everything from here</p>
        </div>
        <div className="flex items-center gap-4">
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="rounded-full w-10 h-10 object-cover border-2 border-black"
          />
        </div>
      </div>
    );
  };
  