import { StyleSheet, Platform } from 'react-native'
import * as defaultStyle from '../../style'

const STYLESHEET_ID = 'stylesheet.calendar.header'

export default function(theme = {}) {
  const appStyle = { ...defaultStyle, ...theme }
  return StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 10,
      paddingRight: 10,
      alignItems: 'center',
    },
    monthText: {
      fontSize: 20,
      fontFamily: appStyle.textMonthFontFamily,
      fontWeight: appStyle.textMonthFontWeight,
      color: '#739EAF',
      margin: 20,
    },
    arrow: {
      padding: 10,
    },
    arrowImage: {
      ...Platform.select({
        ios: {
          tintColor: '#739EAF',
        },
        android: {
          tintColor: '#739EAF',
        },
      }),
    },
    week: {
      marginTop: 7,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    dayHeader: {
      marginTop: 2,
      marginBottom: 7,
      width: 32,
      textAlign: 'center',
      fontSize: appStyle.textDayHeaderFontSize,
      fontFamily: appStyle.textDayHeaderFontFamily,
      color: '#739EAF',
    },
    ...(theme[STYLESHEET_ID] || {}),
  })
}
