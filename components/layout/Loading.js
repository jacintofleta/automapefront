import { PaperAirplaneIcon } from "@heroicons/react/solid";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="text-teal-500 pt-40 lg:pt-60">
        <PaperAirplaneIcon className="h-10 w-10 animate-bounce mx-auto" />
      </div>
    </div>
  );
};

export default DashboardLayout;
