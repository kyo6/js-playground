import React, {Component} from 'react';
import {TouchableOpacity,} from 'react-native';

class FocusableView extends Component {

  state={
    focused: false
  }

  onFocused = () => {
    this.setState({focused: true})
  }

  onBlured = () => {
    if(this.props.onBlur) {
      this.props.onBlur()
    }
    this.setState({focused: false})
  }

  render() {
    const {onPress, activeBg="#8f9bb3"} = this.props;
    const {focused} = this.state;
    let style = this.props.style;
    if(focused) {
      if(Array.isArray(style)) {
        style = [...style, {backgroundColor:activeBg}];
      } else {
        style = {...style, backgroundColor:activeBg}
      }

    }
    return (
      <TouchableOpacity
        onFocus={this.onFocused}
        onBlur={this.onBlured}
        accessible={true}
        onPress={onPress}
        style={style}
      >
        {this.props.children}
      </TouchableOpacity>
    );
  }
}

export default FocusableView;
