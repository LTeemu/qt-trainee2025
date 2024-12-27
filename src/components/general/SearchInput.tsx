import { FaSearch } from "react-icons/fa";

type Props = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  containerClassName?: string;
};

const SearchInput = ({ onChange, containerClassName }: Props) => {
  return (
    <div className={`${containerClassName} relative flex-1`}>
      <FaSearch
        size={20}
        color="gray"
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
      />
      <input
        type="text"
        className="pl-10 w-full pr-4 py-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search device"
        onChange={onChange}
      />
    </div>
  );
};

export default SearchInput;
