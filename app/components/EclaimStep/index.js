import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';
import styles from './styles'
import * as Common from '../common'
import * as Config from '../../config'
import StepIndicator from 'react-native-step-indicator';
import Icon from 'react-native-vector-icons/Feather';

const labels = ["Details","Verification","Submit"];
const customStyles = {
  stepIndicatorSize: 20,
  currentStepIndicatorSize:20,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 2,
  stepStrokeCurrentColor: '#0392CF',
  stepStrokeWidth: 2,
  stepStrokeFinishedColor: '#0392CF',
  stepStrokeUnFinishedColor: '#D4D4D4',
  separatorFinishedColor: '#0392CF',
  separatorUnFinishedColor: '#D4D4D4',
  stepIndicatorFinishedColor: '#0392CF',
  stepIndicatorUnFinishedColor: '#D4D4D4',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#0392CF',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#D4D4D4',
  labelColor: '#cecece',
  labelSize: 13,
  currentStepLabelColor: '#2C3E50',
  labelFontFamily: Config.FONT_FAMILY_ROMAN
}

class EclaimFormStep extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPosition: 0
    };
  }

  renderStepIndicator = ({ position, stepStatus}) => {
    let stepIcon

    if (stepStatus == 'current') {
      stepIcon = <View style={{backgroundColor: "#ffffff"}}/>
    } else if (stepStatus == 'finished') {
      stepIcon = <Icon
        type="SimpleLineIcons"
        name="check"
        style={{
          color: "#fff"
        }}
      />
    } else {
      stepIcon = <View style={{backgroundColor: "#cccccc"}}/>
    }

    return (
      <View style={
          (stepStatus == 'finished') ?
          {backgroundColor: '#0392CF'} :
          {backgroundColor: '#FFFFFF'}
        }>
        {stepIcon}
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <StepIndicator
         customStyles={customStyles}
         currentPosition={(this.props.currentPosition) ? this.props.currentPosition : this.state.currentPosition}
         labels={labels}
         stepCount={3}
         renderStepIndicator={this.renderStepIndicator}
        />
      </View>
    );
  }
}

export default EclaimFormStep;
