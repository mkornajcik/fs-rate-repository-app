import { Picker } from "@react-native-picker/picker";

const OrderBar = ({ selectedOrder, onSelect }) => {
  return (
    <Picker selectedValue={selectedOrder} onValueChange={(itemValue) => onSelect(itemValue)}>
      <Picker.Item label="Latest repositories" value="latest" />
      <Picker.Item label="Highest rated repositories" value="highest" />
      <Picker.Item label="Lowest rated repositories" value="lowest" />
    </Picker>
  );
};

export default OrderBar;
