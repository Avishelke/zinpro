import React from "react";
import {
  Text,
  StyleSheet,
  TouchableHighlight,
  View, Image
} from "./core";
import { THEME_COLOR } from '../helpers/theme'



function getImage(icon) {
  switch (icon) {
    case 'ic_gestation':
      return require(`../../assets/icons/ic_gestation.png`);

    case 'ic_gilt':
      return require(`../../assets/icons/ic_gilt.png`);

    case 'ic_insemination':
      return require(`../../assets/icons/ic_insemination.png`);

    case 'ic_lactation':
      return require(`../../assets/icons/ic_lactation.png`);

    case 'ic_claw_graph':
      return require(`../../assets/icons/ic_claw_graph.png`);

    case 'ic_gilt_break_even':
      return require(`../../assets/icons/ic_gilt_break_even.png`);

    case 'ic_herd_census':
      return require(`../../assets/icons/ic_herd_census.png`);

    case 'ic_cull_data':
      return require(`../../assets/icons/ic_cull_data.png`);
      case 'ic_farm':
      return require(`../../assets/icons/farm.png`);
    case 'zinpro_data':
      return require(`../../assets/icons/ic_cull_data.png`);

    default:
      return require(`../../assets/icons/ic_lactation.png`);


  }
}

const AssessorsItem = (props) => {
  const { icon, label,_label } = props;

  const source = getImage(icon);

  return <View style={styles.container}>
    <TouchableHighlight
      onPress={() => { props.onPress(label) }}
      underlayColor={'white'} style={styles.info}>

      <View style={styles.item}>
        <View style={{ width: 80, height: 80 }}>
          <Image
            source={source}
            resizeMode='contain' />
        </View>
        <Text style={styles.lableStyle}>{_label}</Text>
      </View>

    </TouchableHighlight>
  </View>
}


const styles = StyleSheet.create({
  container: {
    marginHorizontal: "3%",
    width: "44%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  info: {
    width: "100%", height: 168
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  lableStyle: {
    fontWeight: "500",
    fontSize: 22,
    marginTop: 20
  }
});

export default AssessorsItem;
