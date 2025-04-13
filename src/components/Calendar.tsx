import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Calendar } from "react-native-calendars";
import colors from "../theme/colors";
import { formDate } from "../utils/GlobalFunctions";
import { CalendarIcon } from "../utils/Icons";

type Props = {
  onSelectDate: (date: string) => void;
  selectedDate?: string;
  title?: string;
  isVisible: boolean;
  onToggle: () => void;
};
const Calender = ({
  onSelectDate,
  selectedDate = "",
  isVisible,
  onToggle,
}: Props) => {
  const [currentSelectedDate, setCurrentSelectedDate] = useState(selectedDate);

  useEffect(() => {
    setCurrentSelectedDate(selectedDate);
  }, [selectedDate]);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <TouchableOpacity
          style={styles.calenderButton}
          onPress={() => onToggle()}
        >
          <Text
            style={
              selectedDate
                ? [styles.calenderButtonTitle, { color: colors.slateGray }]
                : styles.calenderButtonTitle
            }
          >
            {selectedDate ? selectedDate : "Date 🗓️"}
          </Text>
        </TouchableOpacity>
      </View>
      {isVisible && (
        <Calendar
          onDayPress={(day) => {
            onSelectDate(day.dateString);
            onToggle();
          }}
          onDayLongPress={(day) => {
            onToggle();
          }}
          monthFormat={"yyyy MM"}
          hideArrows={true}
          enableSwipeMonths={true}
          markedDates={
            currentSelectedDate
              ? {
                  [currentSelectedDate]: {
                    selected: true,
                    marked: true,
                    selectedColor: colors.charcoal,
                    dotColor: colors.ivory,
                  },
                }
              : {}
          }
        />
      )}
    </View>
  );
};

export default Calender;

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "2%",
  },
  title: {
    fontSize: 24,
    color: colors.silver,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  calenderButton: {
    backgroundColor: colors.ivory,
    padding: 10,
    borderRadius: 10,
    borderColor: colors.slateGray,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    flex: 2,
    shadowColor: colors.slateGray,
    shadowOpacity: 0.7,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  calenderButtonTitle: {
    fontSize: 24,
    color: colors.silver,
  },
});
