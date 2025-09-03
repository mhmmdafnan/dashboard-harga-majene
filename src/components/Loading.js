import { HiChartSquareBar } from "react-icons/hi";

const loading = () => {
  return (
    <div className=" flex-col gap-4 w-full flex items-center justify-center">
      <div className="bg-white w-20 h-20 border-4 border-transparent text-[#FF9B00] text-4xl animate-spin flex items-center justify-center border-t-[#FF9B00] rounded-full">
        <div className="w-16 h-16 border-4 border-transparent text-[#FFC900] text-2xl animate-spin flex items-center justify-center border-t-[#FFC900] rounded-full">
          <div>
            {HiChartSquareBar({
              size: 40,
              className: "text-[#1A5C6C] animate-pulse",
            })}
          </div>
        </div>
      </div>
      Loading...
    </div>
  );
};

export default loading;
