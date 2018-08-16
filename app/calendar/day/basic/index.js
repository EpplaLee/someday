import React, { Component } from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import PropTypes from 'prop-types'
import { shouldUpdate } from '../../../component-updater'
import solarLunar from '../../../solarLunar'
import { createAction, NavigationActions } from '../../../utils'
import { connect} from 'react-redux'
import styleConstructor from './style'
import XDate from 'xdate'

@connect(({ daily }) => ({ ...daily }))
class Day extends Component {
  static propTypes = {
    // TODO: disabled props should be removed
    state: PropTypes.oneOf(['disabled', 'today', '']),

    // Specify theme properties to override specific styles for calendar parts. Default = {}
    theme: PropTypes.object,
    marking: PropTypes.any,
    onLongPress: PropTypes.func,
    date: PropTypes.object,
    day: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.style = styleConstructor(props.theme)
    this.onDayPress = this.onDayPress.bind(this)
    this.onDayLongPress = this.onDayLongPress.bind(this)
  }

  onDayPress() {
    this.props.dispatch(createAction('daily/save')({ curday: this.props.date}));
    this.props.onPress(this.props.date)
  }

  onDayLongPress() {
    this.props.onLongPress(this.props.date)
  }

  solarToLunar(day) {
    const { date } = this.props
    return solarLunar.solar2lunar(
      date.year,
      date.month,
      date.day,
    )
  }

  shouldComponentUpdate(nextProps) {
    if(nextProps.curday === this.props.date) {
      return true
    } else if(this.props.curday === this.props.date) {
      return true
    }
    return shouldUpdate(this.props, nextProps, [
      'state',
      'children',
      'marking',
      'onLongPress',
      'weekNumber',
    ])
  }

  render() {
    const lunarInfo = this.solarToLunar(this.props.day)
    const containerStyle = [this.style.base]
    const solarTextStyle = [this.style.solarText]
    const lunarTextStyle = [this.style.lunarText]
    const dotStyle = [this.style.dot]

    let marking = this.props.marking || {}
    if (marking && marking.constructor === Array && marking.length) {
      marking = {
        marking: true,
      }
    }
    const isDisabled =
      typeof marking.disabled !== 'undefined'
        ? marking.disabled
        : this.props.state === 'disabled'
    let dot
    if (marking.marked) {
      dotStyle.push(this.style.visibleDot)
      if (marking.dotColor) {
        dotStyle.push({ backgroundColor: marking.dotColor })
      }
      dot = <View style={dotStyle} />
    }

    if (marking.selected) {
      containerStyle.push(this.style.selected)
      if (marking.selectedColor) {
        containerStyle.push({ backgroundColor: marking.selectedColor })
      }
      dotStyle.push(this.style.selectedDot)
      solarTextStyle.push(this.style.selectedText)
      lunarTextStyle.push(this.style.selectedText)
    } else if (isDisabled) {
      solarTextStyle.push(this.style.disabledText)
      lunarTextStyle.push(this.style.disabledText)
    } else if (this.props.state === 'today') {
      containerStyle.push(this.style.today)
      solarTextStyle.push(this.style.todayText)
      lunarTextStyle.push(this.style.todayText)
    }
    if(this.props.date === this.props.curday) {
      containerStyle.push(this.style.selected)
    }
    return (
      <TouchableOpacity
        style={containerStyle}
        onPress={this.onDayPress}
        onLongPress={this.onDayLongPress}
        activeOpacity={marking.activeOpacity}
        disabled={marking.disableTouchEvent}
      >
        <Text allowFontScaling={false} style={solarTextStyle}>
          {String(this.props.children)}
        </Text>
        <Text allowFontScaling={false} style={lunarTextStyle}>
          {lunarInfo.term || lunarInfo.dayCn}
        </Text>
        {dot}
      </TouchableOpacity>
    )
  }
}

export default Day
