import { Input } from "antd";
import { debounce } from "lodash";
const { Search } = Input;

export const SearchBar = ({ onSearch, placeholder }) => {
  const debouncedSearch = debounce(onSearch, 500);
  return (
    <Search
      placeholder={placeholder}
      onChange={(e) => debouncedSearch(e.target.value)}
      onSearch={onSearch}
      style={{
        width: 200,
      }}
    />
  );
};
