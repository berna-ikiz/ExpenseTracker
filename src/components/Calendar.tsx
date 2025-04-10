import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Calendar } from "react-native-calendars";
import colors from "../theme/colors";

type Props = {
  onSelectDate: (date: string) => void;
  selectedDate?: string;
  title?: string;
};
const Calender = ({ onSelectDate, selectedDate = "", title }: Props) => {
  const [currentSelectedDate, setCurrentSelectedDate] = useState(selectedDate);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const toggleCalender = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  useEffect(() => {
    setCurrentSelectedDate(selectedDate);
  }, [selectedDate]);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity
          style={styles.calenderButton}
          onPress={() => toggleCalender()}
        >
          <Text style={styles.calenderButtonTitle}> 🗓️ </Text>
        </TouchableOpacity>
      </View>
      {isCalendarVisible && (
        <Calendar
          onDayPress={(day) => {
            onSelectDate(day.dateString);
          }}
          onDayLongPress={(day) => {
            console.log("selected day", day);
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
    width: "100%",
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
    color: colors.gray,
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
  },
});
