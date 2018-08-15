import React, { Component } from 'react'
import { ActivityIndicator } from 'react-native'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux'
import XDate from 'xdate'
import PropTypes from 'prop-types'
import styleConstructor from './style'
import {
  CHANGE_MONTH_LEFT_ARROW,
  CHANGE_MONTH_RIGHT_ARROW,
} from '../../testIDs'
import { createAction, NavigationActions } from '../../utils'

const weekDaysNames = ['日', '一', '二', '三', '四', '五', '六']

@connect(({ todo }) => ({ ...todo }))
class CalendarHeader extends Component {
  static propTypes = {
    theme: PropTypes.object,
    hideArrows: PropTypes.bool,
    month: PropTypes.instanceOf(XDate),
    addMonth: PropTypes.func,
    showIndicator: PropTypes.bool,
    firstDay: PropTypes.number,
    renderArrow: PropTypes.func,
    hideDayNames: PropTypes.bool,
    weekNumbers: PropTypes.bool,
    onPressArrowLeft: PropTypes.func,
    onPressArrowRight: PropTypes.func,
  }

  static defaultProps = {
    monthFormat: 'MMMM yyyy',
  }

  constructor(props) {
    super(props)
    this.style = styleConstructor(props.theme)
    this.addMonth = this.addMonth.bind(this)
    this.substractMonth = this.substractMonth.bind(this)
    this.onPressLeft = this.onPressLeft.bind(this)
    this.onPressRight = this.onPressRight.bind(this)
  }

  componentDidMount() {}

  addMonth() {
    this.props.addMonth(1)
  }

  substractMonth() {
    this.props.addMonth(-1)
  }

  shouldComponentUpdate(nextProps) {
    if (
      nextProps.month.toString('yyyy MM') !==
      this.props.month.toString('yyyy MM')
    ) {
      return true
    }
    if (nextProps.showIndicator !== this.props.showIndicator) {
      return true
    }
    if (nextProps.hideDayNames !== this.props.hideDayNames) {
      return true
    }
    return false
  }

  onPressLeft() {
    const { month, dispatch, onPressArrowLeft } = this.props;
    let yearNum = month.getFullYear();
    let monthNum = month.getMonth();
    if(monthNum == 1) {
      yearNum -= 1;
      monthNum = 12;
    } else {
      monthNum -= 1;
    }
    dispatch(createAction('todo/save')({ curMonth: `${yearNum}-${monthNum}`}))
    if (typeof onPressArrowLeft === 'function') {
      return onPressArrowLeft(this.substractMonth)
    }
    return this.substractMonth()
  }

  onPressRight() {
    const { month, dispatch, onPressArrowRight } = this.props;
    let yearNum = month.getFullYear();
    let monthNum = month.getMonth();
    if(monthNum == 12) {
      yearNum += 1;
      monthNum = 1;
    } else {
      monthNum += 1;
    }
    dispatch(createAction('todo/save')({ curMonth: `${yearNum}-${monthNum}`}))
    if (typeof onPressArrowRight === 'function') {
      return onPressArrowRight(this.addMonth)
    }
    return this.addMonth()
  }

  render() {
    const { monthTodo, curMonth } = this.props
    const curMonthTodo = monthTodo[curMonth] || []
    console.log('shitttttt', this.props.monthTodo)
    let leftArrow = <View />
    let rightArrow = <View />
    // let weekDaysNames = weekDayNames(this.props.firstDay);
    if (!this.props.hideArrows) {
      leftArrow = (
        <TouchableOpacity
          onPress={this.onPressLeft}
          style={this.style.arrow}
          hitSlop={{ left: 20, right: 20, top: 20, bottom: 20 }}
          testID={CHANGE_MONTH_LEFT_ARROW}
        >
          {this.props.renderArrow ? (
            this.props.renderArrow('left')
          ) : (
            <Image
              source={require('../img/previous.png')}
              style={this.style.arrowImage}
            />
          )}
        </TouchableOpacity>
      )
      rightArrow = (
        <TouchableOpacity
          onPress={this.onPressRight}
          style={this.style.arrow}
          hitSlop={{ left: 20, right: 20, top: 20, bottom: 20 }}
          testID={CHANGE_MONTH_RIGHT_ARROW}
        >
          {this.props.renderArrow ? (
            this.props.renderArrow('right')
          ) : (
            <Image
              source={require('../img/next.png')}
              style={this.style.arrowImage}
            />
          )}
        </TouchableOpacity>
      )
    }
    let indicator
    if (this.props.showIndicator) {
      indicator = <ActivityIndicator />
    }
    return (
      <View>
        <View style={this.style.header}>
          {leftArrow}
            <Text
              allowFontScaling={false}
              style={this.style.monthText}
              accessibilityTraits="header"
            >
              {`${this.props.month.getFullYear()}年${this.props.month.getMonth() +
                1}月`}
            </Text>
            <View style={{ position: 'absolute', right: 45, flexDirection: 'row',alignItems: 'center', }}>
              <Icon style={this.style.todoIcon} name={'list-ol'} size={20} color={'#12b886'} />
              <Text
                style={{
                  marginLeft: 6,
                  display: curMonthTodo.length > 0? 'flex' : 'none',
                  fontSize: 18,
                  color: '#12b886',
                  transform: [{translateY: -1}],
                }}
              >
                {`${curMonthTodo.reduce( (sum, i) => sum + (i.isDone ? 1 : 0), 0 )}/${curMonthTodo.length}`}
              </Text>
            </View>
          {rightArrow}
        </View>
        {!this.props.hideDayNames && (
          <View style={this.style.week}>
            {this.props.weekNumbers && (
              <Text allowFontScaling={false} style={this.style.dayHeader} />
            )}
            {weekDaysNames.map((day, idx) => (
              <Text
                allowFontScaling={false}
                key={idx}
                accessible={false}
                style={this.style.dayHeader}
                numberOfLines={1}
                importantForAccessibility="no"
              >
                {day}
              </Text>
            ))}
          </View>
        )}
      </View>
    )
  }
}

export default CalendarHeader;
