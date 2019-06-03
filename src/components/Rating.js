import React, { Component } from 'react';
//import react in our code. 
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from '../components/core';
import { THEME_COLOR, px2dp } from '../helpers/theme'

export default class Rating extends Component {
  state = {
    Default_Rating: 3,
  };

  Star = 'http://aboutreact.com/wp-content/uploads/2018/08/star_filled.png';
  Star_With_Border = 'http://aboutreact.com/wp-content/uploads/2018/08/star_corner.png';

  UpdateRating = (key) => {
    this.setState({ Default_Rating: key }, () => {
      this.props.changeRating(key)
    });
  }

  componentDidMount(){
    this.setState({Default_Rating: this.props.score_rate});
  }

  render() {
    let React_Native_Rating_Bar = [];

    for (let i = 1; i <= 7; i++) {
      React_Native_Rating_Bar.push(
        <TouchableOpacity
          activeOpacity={0.7}
          key={i}
          onPress={() => { this.UpdateRating(i) }}>
          <Image
            style={styles.StarImage}
            source={
              i <= this.state.Default_Rating
                ? { uri: this.Star }
                : { uri: this.Star_With_Border }
            }
          />
        </TouchableOpacity>
      );
    }
    return (
      <View style={styles.MainContainer}>
        <Text style={styles.textStyleSmall}>{this.props.label}: </Text>
        <View style={styles.childView}>{React_Native_Rating_Bar}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: "5%",
  },
  childView: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  StarImage: {
    width: px2dp(25),
    height: px2dp(25),
    resizeMode: 'cover',
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 23,
    color: '#000',
    marginTop: 15,
  },
  textStyleSmall: {
    textAlign: 'center',
    fontSize: px2dp(24),
    color: THEME_COLOR,
    fontWeight: "500",
  },
});