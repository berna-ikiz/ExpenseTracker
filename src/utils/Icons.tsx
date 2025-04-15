import FontAwesome from "react-native-vector-icons/FontAwesome";
import colors from "../theme/colors";

type IconProps = {
  color?: string;
  size: number;
};

export const AddIcon = ({ color = colors.white, size }: IconProps) => (
  <FontAwesome name="plus" size={size} color={color} />
);

export const CategoryIcon = ({ color = colors.white, size }: IconProps) => (
  <FontAwesome name="th" size={size} color={color} />
);

export const DeleteIcon = ({ color = colors.white, size }: IconProps) => (
  <FontAwesome name="trash" size={size} color={color} />
);

export const HomeIcon = ({ color = colors.white, size }: IconProps) => (
  <FontAwesome name="home" size={size} color={color} />
);

export const CalendarIcon = ({ color = colors.white, size }: IconProps) => (
  <FontAwesome name="calendar-o" size={size} color={color} />
);

export const BackIcon = ({ color = colors.white, size }: IconProps) => (
  <FontAwesome name="arrow-left" size={size} color={color} />
);

export const EmojiIcon = ({ color = colors.white, size }: IconProps) => (
  <FontAwesome name="smile-o" size={size} color={color} />
);
