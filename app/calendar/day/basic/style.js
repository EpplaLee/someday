import { StyleSheet, Platform } from 'react-native'
import * as defaultStyle from '../../../style'

const STYLESHEET_ID = 'stylesheet.day.basic'

export default function styleConstructor(theme = {}) {
  const appStyle = { ...defaultStyle, ...theme }
  return StyleSheet.create({
    base: {
      width: 32,
      height: 32,
      alignItems: 'center',
    },
    text: {
      fontSize: 14,
      fontFamily: appStyle.textDayFontFamily,
      fontWeight: '200',
      color: appStyle.dayTextColor,
      backgroundColor: 'rgba(255, 255, 255, 0)',
    },
    solarText: {
      fontSize: 14,
      color: appStyle.dayTextColor,
      backgroundColor: 'rgba(255, 255, 255, 0)',
    },
    lunarText: {
      fontSize: 10,
      color: '#999999',
      backgroundColor: 'rgba(255, 255, 255, 0)',
    },
    alignedText: {
      marginTop: Platform.OS === 'android' ? 4 : 6,
    },
    selected: {
      backgroundColor: '#eee',
      borderRadius: 16,
    },
    today: {
      backgroundColor: appStyle.todayBackgroundColor,
    },
    todayText: {
      color: appStyle.todayTextColor,
    },
    selectedText: {
      color: appStyle.selectedDayTextColor,
    },
    disabledText: {
      color: appStyle.textDisabledColor,
    },
    dot: {
      width: 4,
      height: 4,
      marginTop: 1,
      borderRadius: 2,
      opacity: 0,
    },
    visibleDot: {
      opacity: 1,
      backgroundColor: appStyle.dotColor,
    },
    selectedDot: {
      backgroundColor: appStyle.selectedDotColor,
    },
    ...(theme[STYLESHEET_ID] || {}),
  })
}
