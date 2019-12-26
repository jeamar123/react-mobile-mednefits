import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

class CustomDropdown extends Component{
  constructor(props) {
    super(props);
    this.state = {
      showDrop : false,
      selectData : this.props.DropdownData,
      value : this.props.value,
    };
    // console.log( this.state );

  }

  closeDrop(){
    if( this.state.showDrop == true ){
      this.setState({ 
        showDrop : false
      });
    }
  }

  toggleDrop(){
    this.setState({ 
      showDrop : this.state.showDrop == true ? false : true,
    });
  }

  setSelectedValue( value ){
    this.setState({ 
      value : value,
      showDrop : false,
    });
    this.props.onChangeValue( value );
  }

  render() {
    return (
      <View 
        style={ styles.container } 
        {...this.props} 
      >
        <TouchableOpacity style={ [ styles.labelStyle, this.props.labelContainerStyle ] } onPress={() => this.toggleDrop()} >
          <Text 
            style={ [ styles.textWhite, styles.labelText, this.props.labelStyle, this.props.labelOverlay] } 
          >{ this.state.value }</Text>
          <Icons
            name="angle-down"
            style={ [ styles.dropArrowIcon, this.props.labelOverlay ] }
          />
        </TouchableOpacity>

        {
          this.state.showDrop ? <View style={ [ styles.customArrow, this.props.dropArrowStyle ] }/> : null
        }
        {
          this.state.showDrop ? 
            <View style={ [ styles.dropContainer, this.props.dropContainerStyle ] }>
              { 
                this.state.selectData.map((item,i) => {
                  if( item != this.state.value ){
                    return <TouchableOpacity onPress={() => this.setSelectedValue( item )} style={ styles.selectValue } key={i}><Text>{item}</Text></TouchableOpacity>
                  }
                })
              }  
            </View>
          : null
        }
      </View>
    );
  }
};

export default CustomDropdown;
