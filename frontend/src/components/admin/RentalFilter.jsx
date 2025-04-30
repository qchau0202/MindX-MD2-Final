import { Select } from "antd";

const { Option } = Select;

const RentalFilter = ({ onSortChange }) => {
  return (
    <Select
      defaultValue="newest"
      style={{ width: 120 }}
      onChange={onSortChange}
    >
      <Option value="newest">Newest</Option>
      <Option value="oldest">Oldest</Option>
    </Select>
  );
};

export default RentalFilter;