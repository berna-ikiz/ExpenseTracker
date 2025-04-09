import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import colors from "../theme/colors";

type Props = {
  onSelectDate: (date: string) => void;
  selectedDate?: string;
};
const Calender = ({ onSelectDate, selectedDate = "" }: Props) => {
  const [currentSelectedDate, setCurrentSelectedDate] = useState(selectedDate);
  useEffect(() => {
    setCurrentSelectedDate(selectedDate);
  }, [selectedDate]);
  return (
    <Calendar
      // Handler which gets executed on day press. Default = undefined
      onDayPress={(day) => {
        onSelectDate(day.dateString);
      }}
      // Handler which gets executed on day long press. Default = undefined
      onDayLongPress={(day) => {
        console.log("selected day", day);
      }}
      // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
      monthFormat={"yyyy MM"}
      // Hide month navigation arrows. Default = false
      hideArrows={true}
      // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
      // Replace default month and year title with custom one. the function receive a date as parameter
      // Enable the option to swipe between months. Default = false
      enableSwipeMonths={true}
      // Collection of dates that have to be marked. Default = {}
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
  );
};

export default Calender;

const styles = StyleSheet.create({});
