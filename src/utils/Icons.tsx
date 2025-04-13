import FontAwesome from "react-native-vector-icons/FontAwesome";

type IconProps = {
  color?: string;
  size: number;
};

export const AddIcon = ({ color = "#F8F8FF", size }: IconProps) => (
  <FontAwesome name="plus" size={size} color={color} />
);

export const CategoryIcon = ({ color = "#F8F8FF", size }: IconProps) => (
  <FontAwesome name="th" size={size} color={color} />
);

export const DeleteIcon = ({ color = "#F8F8FF", size }: IconProps) => (
  <FontAwesome name="trash" size={size} color={color} />
);

export const HomeIcon = ({ color = "#F8F8FF", size }: IconProps) => (
  <FontAwesome name="home" size={size} color={color} />
);
