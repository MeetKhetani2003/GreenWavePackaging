import { FaLeaf } from "react-icons/fa";

const Logo = () => {
  return (
    <div className="flex items-center gap-4">
      <div className="text-4xl text-green-700">
        <FaLeaf />
      </div>
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-green-700">
          Greenwave Packaging
        </h1>
        <p className="text-gray-500 text-sm">Sustainable Packaging Solutions</p>
      </div>
    </div>
  );
};
export default Logo;
