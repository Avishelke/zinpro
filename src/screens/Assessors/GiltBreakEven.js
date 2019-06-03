import React, { Component } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  WebView,
  Platform
} from "react-native";
import DatePicker from 'react-native-datepicker'

import BottomButton from "./../../components/BottomButton";
import { ToastAndroid } from 'react-native';

import { db } from '../../helpers/db'
import DefaultScreen from "../../hoc/DefaultScreen";
import { SHOW_SUCCESS_MESSAGE } from "../../redux/actions";
const isAndroid = Platform.OS === 'android';

class App extends Component {
  toast() {
    ToastAndroid.show('Saved Sucess !', ToastAndroid.SHORT);
  }
  state = {
    consumption1: '',
    cost1: '',
    consumption2: '',
    cost2: '',
    consumption3: '',
    cost3: '',
    consumption4: '',
    cost4: '',
    consumption5: '',
    cost5: '',
    consumption6: '',
    cost6: '',
    weight: '',
    lean: '',
    marketSold: '',
    feedWeight: '',
    cycles: '',
    giltFeed: '',
    giltFeedCost: '',
    giltGenetic: '',
    otherCost: '',
    retentionRate: '',
    oldSow: '',
    totalCulled: '',
    soldSows: '',

    data: [
      ["LACTOINICIADOR", 5, 0.95, "=B1*C1", ""], ["STARTER", 15, 0.48, "=B2*C2", ""], ["GROWER", 50, 0.33, "=B3*C3", ""],
      ["FINISHER", 183, 0.28, "=B4*C4", ""], ["FEED5", "", "", "=B5*C5", ""], ["FEED6", "", "", "=B6*C6", ""],
      ["TOTAL", "=SUM(B1:B6)", "", "=SUM(D1:D6)", ""], ["", "", "", "", ""], ["", "", "", "", ""],
      ["", "", "KG", "F/G", "mrkt price Kg"], ["WEIGHT", "", "100", "=B7/C11", "=C15/C11"],
      ["LEAN", "", "75", "=B7/C12", "=C15/C12"], ["", "", "", "", ""], ["", "", "", "", ""],
      ["MARKET €/SOLD PIG", "", "103.50", "", ""], ["", "", "", "", ""], ["FEED WEIGHT ON COST", "", "80", "", ""],
      ["CYCLES/SOW/YEAR", "", "2.43", "", ""], ["", "", "", "", ""], ["MARGIN/SOLD PIG", "", "=C15-(D7*100/C17)", "", ""],
      ["", "", "", "", ""], ["", "CONSUMPTIONCOST/Kg", "TOTAL"], ["GILT FEED CONSUMPTION", "360", "0.34", "=B23*C23"], [""],
      ["GILT GENETIC VALUE", "", "", "200"], [""], ["OTHER COSTS", "", "", "50"], ["RETENTION RATE", "", "", "100"],
      ["TOTAL COST PER GILT", "", "", "=(D23+D25+D27)*100/D28"], [""], [""], [""], ["OLD SOW MARKET VALUE", "", "", "140"],
      ["TOTAL CULLED SOWS", "", "", "490"], ["SOLD SOWS TO SLAUGHTER ", "", "", "410"],
      ["EARNINGS  SOW", "", "", "=D33*D35/D34"], [""], ["GILT REAL COST", "", "", "=D29-D36"], [], [], [],
      ["SOLD PIGS", "9", "10", "11", "12", "13"],
      ["P1", "=C20*B42*C18", "=C20*C42*C18", "=C20*D42*C18", "=C20*E42*C18", "=C20*F42*C18"],
      ["P2", "=C20*B42*C18+B43", "=C20*C42*C18+C43", "=C20*D42*C18+D43", "=C20*E42*C18+E43", "=C20*F42*C18+F43"],
      ["P3", "=C20*B42*C18+B44", "=C20*C42*C18+C44", "=C20*D42*C18+D44", "=C20*E42*C18+E44", "=C20*F42*C18+F44"],
      ["P4", "=C20*B42*C18+B45", "=C20*C42*C18+C45", "=C20*D42*C18+D45", "=C20*E42*C18+E45", "=C20*F42*C18+F45"],
      ["P5", "=C20*B42*C18+B46", "=C20*C42*C18+C46", "=C20*D42*C18+D46", "=C20*E42*C18+E46", "=C20*F42*C18+F46"],
      ["P6", "=C20*B42*C18+B47", "=C20*C42*C18+C47", "=C20*D42*C18+D47", "=C20*E42*C18+E47", "=C20*F42*C18+F47"],
      ["GILT COST", "=D38", "=D38", "=D38", "=D38", "=D38"], [],
      ["SOLD/SOW/YEAR", "=B42*C18", "=C42*C18", "=D42*C18", "=E42*C18", "=F42*C18"]
    ],
    id: false,
    loader: true
  };

  date;
  evaluation_group_id;

  constructor(props) {
    super(props);
    // this.webView = null;

    this.date = new Date().toISOString().slice(0, 10);
  }

  componentDidMount = () => {
    // this.evaluation_group_id = this.props.selectedEvaluationGroup;
    this.evaluation_group_id = this.props.navigation.getParam('evaluationId');

    db.transaction((tx) => {
      tx.executeSql(`select * from gilt_break_even WHERE evaluation_group_id=?`, [this.evaluation_group_id], (tx, r) => {
        const { length, id } = r.rows;

        if (length > 0) {
          const { data } = r.rows.item(0);
          let $data = JSON.parse(data);
          // console.log('$data::::::', $data);
          let updatedata = [
            ["LACTOINICIADOR", $data[0][1], $data[0][2], "=B1*C1", ""],
            ["STARTER", $data[1][1], $data[1][2], "=B2*C2", ""],
            ["GROWER", $data[2][1], $data[2][2], "=B3*C3", ""],
            ["FINISHER", $data[3][1], $data[3][2], "=B4*C4", ""],
            ["FEED5", $data[4][1], $data[4][2], "=B5*C5", ""],
            ["FEED6", $data[5][1], $data[5][2], "=B6*C6", ""],
            ["TOTAL", "=SUM(B1:B6)", "", "=SUM(D1:D6)", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "KG", "F/G", "mrkt price Kg"],
            ["WEIGHT", "", $data[10][2], "=B7/C11", "=C15/C11"],
            ["LEAN", "", $data[11][2], "=B7/C12", "=C15/C12"],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["MARKET €/SOLD PIG", "", $data[14][2], "", ""],
            ["", "", "", "", ""],
            ["FEED WEIGHT ON COST", "", $data[16][2], "", ""],
            ["CYCLES/SOW/YEAR", "", $data[17][2], "", ""],
            ["", "", "", "", ""],
            ["MARGIN/SOLD PIG", "", "=C15-(D7*100/C17)", "", ""],
            ["", "", "", "", ""],
            ["", "CONSUMPTION", "COST/Kg", "TOTAL"],
            ["GILT FEED CONSUMPTION", $data[22][1], $data[22][2], "=B23*C23"],
            [""],
            ["GILT GENETIC VALUE", "", "", $data[24][3]],
            [""],
            ["OTHER COSTS", "", "", $data[26][3]],
            ["RETENTION RATE", "", "", $data[27][3]],
            ["TOTAL COST PER GILT", "", "", "=(D23+D25+D27)*100/D28"],
            [""],
            [""],
            [""],
            ["OLD SOW MARKET VALUE", "", "", $data[32][3]],
            ["TOTAL CULLED SOWS", "", "", $data[33][3]],
            ["SOLD SOWS TO SLAUGHTER ", "", "", $data[34][3]],
            ["EARNINGS  SOW", "", "", "=D33*D35/D34"],
            [""],
            ["GILT REAL COST", "", "", "=D29-D36"],
            [],
            [],
            [],
            ["SOLD PIGS", "9", "10", "11", "12", "13"],
            ["P1", "=C20*B42*C18", "=C20*C42*C18", "=C20*D42*C18", "=C20*E42*C18", "=C20*F42*C18"],
            ["P2", "=C20*B42*C18+B43", "=C20*C42*C18+C43", "=C20*D42*C18+D43", "=C20*E42*C18+E43", "=C20*F42*C18+F43"],
            ["P3", "=C20*B42*C18+B44", "=C20*C42*C18+C44", "=C20*D42*C18+D44", "=C20*E42*C18+E44", "=C20*F42*C18+F44"],
            ["P4", "=C20*B42*C18+B45", "=C20*C42*C18+C45", "=C20*D42*C18+D45", "=C20*E42*C18+E45", "=C20*F42*C18+F45"],
            ["P5", "=C20*B42*C18+B46", "=C20*C42*C18+C46", "=C20*D42*C18+D46", "=C20*E42*C18+E46", "=C20*F42*C18+F46"],
            ["P6", "=C20*B42*C18+B47", "=C20*C42*C18+C47", "=C20*D42*C18+D47", "=C20*E42*C18+E47", "=C20*F42*C18+F47"],
            ["GILT COST", "=D38", "=D38", "=D38", "=D38", "=D38"],
            [],
            ["SOLD/SOW/YEAR", "=B42*C18", "=C42*C18", "=D42*C18", "=E42*C18", "=F42*C18"]
          ];

          this.setState({
            consumption1: $data[0][1],
            cost1: $data[0][2],
            consumption2: $data[1][1],
            cost2: $data[1][2],
            consumption3: $data[2][1],
            cost3: $data[2][2],
            consumption4: $data[3][1],
            cost4: $data[3][2],
            consumption5: $data[4][1],
            cost5: $data[4][2],
            consumption6: $data[5][1],
            cost6: $data[5][2],
            weight: $data[10][2],
            lean: $data[11][2],
            marketSold: $data[14][2],
            feedWeight: $data[16][2],
            cycles: $data[17][2],
            giltFeed: $data[22][1],
            giltFeedCost: $data[22][2],
            giltGenetic: $data[24][3],
            otherCost: $data[26][3],
            retentionRate: $data[27][3],
            oldSow: $data[32][3],
            totalCulled: $data[33][3],
            soldSows: $data[34][3],
            data: updatedata,
            id: id
          }, () => {
            setTimeout(() => {
              // this.webView.postMessage(JSON.stringify(this.state.data));
              console.log('this.state:::::::::::::::::::::::::::', this.state)
            }, 1000);
          });
        } else {
          setTimeout(() => {
            // this.webView.postMessage(JSON.stringify(this.state.data));
          }, 1000);
        }

        setTimeout(() => {
          // this.webView.postMessage(JSON.stringify(this.state.data));
        }, 1000);

      });
    })
  }


  saveGiltBreakEven = () => {
    let query = '';
    let args = [];

    let giltData = [
      ["LACTOINICIADOR", this.state.consumption1, this.state.cost1, "=B1*C1", ""],
      ["STARTER", this.state.consumption2, this.state.cost2, "=B2*C2", ""],
      ["GROWER", this.state.consumption3, this.state.cost3, "=B3*C3", ""],
      ["FINISHER", this.state.consumption4, this.state.cost4, "=B4*C4", ""],
      ["FEED5", this.state.consumption5, this.state.cost5, "=B5*C5", ""],
      ["FEED6", this.state.consumption6, this.state.cost6, "=B6*C6", ""],
      ["TOTAL", "=SUM(B1:B6)", "", "=SUM(D1:D6)", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "KG", "F/G", "mrkt price Kg"],
      ["WEIGHT", "", this.state.weight, "=B7/C11", "=C15/C11"],
      ["LEAN", "", this.state.lean, "=B7/C12", "=C15/C12"],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["MARKET €/SOLD PIG", "", this.state.marketSold, "", ""],
      ["", "", "", "", ""],
      ["FEED WEIGHT ON COST", "", this.state.feedWeight, "", ""],
      ["CYCLES/SOW/YEAR", "", this.state.cycles, "", ""],
      ["", "", "", "", ""],
      ["MARGIN/SOLD PIG", "", "=C15-(D7*100/C17)", "", ""],
      ["", "", "", "", ""],
      ["", "CONSUMPTION", "COST/Kg", "TOTAL"],
      ["GILT FEED CONSUMPTION", this.state.giltFeed, this.state.giltFeedCost, "=B23*C23"],
      [""],
      ["GILT GENETIC VALUE", "", "", this.state.giltGenetic],
      [""],
      ["OTHER COSTS", "", "", this.state.otherCost],
      ["RETENTION RATE", "", "", this.state.retentionRate],
      ["TOTAL COST PER GILT", "", "", "=(D23+D25+D27)*100/D28"],
      [""],
      [""],
      [""],
      ["OLD SOW MARKET VALUE", "", "", this.state.oldSow],
      ["TOTAL CULLED SOWS", "", "", this.state.totalCulled],
      ["SOLD SOWS TO SLAUGHTER ", "", "", this.state.soldSows],
      ["EARNINGS  SOW", "", "", "=D33*D35/D34"],
      [""],
      ["GILT REAL COST", "", "", "=D29-D36"],
      [],
      [],
      [],
      ["SOLD PIGS", "9", "10", "11", "12", "13"],
      ["P1", "=C20*B42*C18", "=C20*C42*C18", "=C20*D42*C18", "=C20*E42*C18", "=C20*F42*C18"],
      ["P2", "=C20*B42*C18+B43", "=C20*C42*C18+C43", "=C20*D42*C18+D43", "=C20*E42*C18+E43", "=C20*F42*C18+F43"],
      ["P3", "=C20*B42*C18+B44", "=C20*C42*C18+C44", "=C20*D42*C18+D44", "=C20*E42*C18+E44", "=C20*F42*C18+F44"],
      ["P4", "=C20*B42*C18+B45", "=C20*C42*C18+C45", "=C20*D42*C18+D45", "=C20*E42*C18+E45", "=C20*F42*C18+F45"],
      ["P5", "=C20*B42*C18+B46", "=C20*C42*C18+C46", "=C20*D42*C18+D46", "=C20*E42*C18+E46", "=C20*F42*C18+F46"],
      ["P6", "=C20*B42*C18+B47", "=C20*C42*C18+C47", "=C20*D42*C18+D47", "=C20*E42*C18+E47", "=C20*F42*C18+F47"],
      ["GILT COST", "=D38", "=D38", "=D38", "=D38", "=D38"],
      [],
      ["SOLD/SOW/YEAR", "=B42*C18", "=C42*C18", "=D42*C18", "=E42*C18", "=F42*C18"]
    ];

    if (this.state.id === false) {
      query = `INSERT INTO gilt_break_even (data,date,is_sync,evaluation_group_id, is_active) VALUES (?,?,?,?,?)`;
      args = [JSON.stringify(giltData), this.date, 0, this.evaluation_group_id, 1];
    } else {
      query = `update gilt_break_even set data=?, is_sync=? where id=?`;
      args = [JSON.stringify(giltData), 0, this.state.id]
    }

    db.transaction((tx) => {
      tx.executeSql(query, args, (tx, r) => {
        this.props.syncData();
        this.toast();
        setTimeout(() => {
          // this.props.navigation.navigate('Assessor');
        }, 1000)
      });
    })

  }

  onMessage = (event) => {
    let data = JSON.parse(event.nativeEvent.data);

    this.setState({ data }, () => {
      this.saveGiltBreakEven();
    })

  }

  render() {
    const {
      container,
      labelText,
      inputboxInline,
      inputboxInlineRight,
      inputbox,
      inlineGroup
    } = styles;
    return (
      // <WebView
      //   source={{ uri: isAndroid ?  'file:///android_asset/gilt_break_even.html': './gilt_break_even.html' }}
      //   ref={(webView) => this.webView = webView}
      //   onMessage={this.onMessage}
      //   scalesPageToFit />

      <View style={container}>
        <ScrollView style={{ marginBottom: "20%" }}>

          <View style={{ marginTop: 10, marginBottom: 20 }} />
          <Text style={styles.heading}>Feed example 1 </Text>

          <TextInput
            value={this.state.consumption1}
            placeholder={"CONSUMPTION "}
            style={inputbox}
            keyboardType={'numeric'}
            onChangeText={(consumption1) => this.setState({ consumption1 })}
          />

          <TextInput
            value={this.state.cost1}
            placeholder={"COST"}
            style={inputbox}
            keyboardType={'numeric'}
            onChangeText={(cost1) => this.setState({ cost1 })}
          />
          <Text style={styles.heading}>Feed example 2 </Text>

          <TextInput
            value={this.state.consumption2}
            placeholder={"CONSUMPTION "}
            style={inputbox}
            keyboardType={'numeric'}
            onChangeText={(consumption2) => this.setState({ consumption2 })}
          />

          <TextInput
            value={this.state.cost2}
            placeholder={"COST"}
            style={inputbox}
            keyboardType={'numeric'}
            onChangeText={(cost2) => this.setState({ cost2 })}
          />
          <Text style={styles.heading}>Feed example 3 </Text>

          <TextInput
            value={this.state.consumption3}
            placeholder={"CONSUMPTION "}
            style={inputbox}
            keyboardType={'numeric'}
            onChangeText={(consumption3) => this.setState({ consumption3 })}
          />

          <TextInput
            value={this.state.cost3}
            placeholder={"COST"}
            style={inputbox}
            keyboardType={'numeric'}
            onChangeText={(cost3) => this.setState({ cost3 })}
          />
          <Text style={styles.heading}>Feed example 4 </Text>

          <TextInput
            value={this.state.consumption4}
            placeholder={"CONSUMPTION "}
            style={inputbox}
            keyboardType={'numeric'}
            onChangeText={(consumption4) => this.setState({ consumption4 })}
          />

          <TextInput
            value={this.state.cost4}
            placeholder={"COST"}
            style={inputbox}
            keyboardType={'numeric'}
            onChangeText={(cost4) => this.setState({ cost4 })}
          />
          <Text style={styles.heading}>Feed example 5 </Text>

          <TextInput
            value={this.state.consumption5}
            placeholder={"CONSUMPTION "}
            style={inputbox}
            keyboardType={'numeric'}
            onChangeText={(consumption5) => this.setState({ consumption5 })}
          />

          <TextInput
            value={this.state.cost5}
            placeholder={"COST"}
            style={inputbox}
            keyboardType={'numeric'}
            onChangeText={(cost5) => this.setState({ cost5 })}
          />
          <Text style={styles.heading}>Feed example 6 </Text>

          <TextInput
            value={this.state.consumption6}
            placeholder={"CONSUMPTION "}
            style={inputbox}
            keyboardType={'numeric'}
            onChangeText={(consumption6) => this.setState({ consumption6 })}
          />

          <TextInput
            value={this.state.cost6}
            placeholder={"COST"}
            style={inputbox}
            keyboardType={'numeric'}
            onChangeText={(cost6) => this.setState({ cost6 })}
          />

          <TextInput
            value={this.state.weight}
            placeholder={"WEIGHT "}
            style={inputbox}
            keyboardType={'numeric'}
            onChangeText={(weight) => this.setState({ weight })}
          />

          <TextInput
            value={this.state.lean}
            placeholder={"LEAN"}
            style={inputbox}
            keyboardType={'numeric'}
            onChangeText={(lean) => this.setState({ lean })}
          />

          <TextInput
            value={this.state.marketSold}
            placeholder={"MARKET €/SOLD PIG "}
            style={inputbox}
            keyboardType={'numeric'}
            onChangeText={(marketSold) => this.setState({ marketSold })}
          />

          <TextInput
            value={this.state.feedWeight}
            placeholder={"FEED WEIGHT ON COST"}
            style={inputbox}
            keyboardType={'numeric'}
            onChangeText={(feedWeight) => this.setState({ feedWeight })}
          />
          {/* <Text>Feed example 2 </Text> */}

          <TextInput
            value={this.state.cycles}
            placeholder={"CYCLES/SOW/YEAR "}
            style={inputbox}
            keyboardType={'numeric'}
            onChangeText={(cycles) => this.setState({ cycles })}
          />

          <TextInput
            value={this.state.giltFeed}
            placeholder={"GILT FEED CONSUMPTION"}
            style={inputbox}
            keyboardType={'numeric'}
            onChangeText={(giltFeed) => this.setState({ giltFeed })}
          />

          <TextInput
            value={this.state.giltFeedCost}
            placeholder={"GILT FEED COST "}
            style={inputbox}
            keyboardType={'numeric'}
            onChangeText={(giltFeedCost) => this.setState({ giltFeedCost })}
          />

          <TextInput
            value={this.state.giltGenetic}
            placeholder={"GILT GENETIC VALUE "}
            style={inputbox}
            keyboardType={'numeric'}
            onChangeText={(giltGenetic) => this.setState({ giltGenetic })}
          />

          <TextInput
            value={this.state.otherCost}
            placeholder={"OTHER COSTS"}
            style={inputbox}
            keyboardType={'numeric'}
            onChangeText={(otherCost) => this.setState({ otherCost })}
          />
          {/* <Text>Feed example 2 </Text> */}

          <TextInput
            value={this.state.retentionRate}
            placeholder={"RETENTION RATE "}
            style={inputbox}
            keyboardType={'numeric'}
            onChangeText={(retentionRate) => this.setState({ retentionRate })}
          />

          <TextInput
            value={this.state.oldSow}
            placeholder={"OLD SOW MARKET VALUE"}
            style={inputbox}
            keyboardType={'numeric'}
            onChangeText={(oldSow) => this.setState({ oldSow })}
          />

          <TextInput
            value={this.state.totalCulled}
            placeholder={"TOTAL CULLED SOWS "}
            style={inputbox}
            keyboardType={'numeric'}
            onChangeText={(totalCulled) => this.setState({ totalCulled })}
          />

          <TextInput
            value={this.state.soldSows}
            onChangeText={(soldSows) => this.setState({ soldSows })}
            keyboardType={'numeric'}
            placeholder={"SOLD SOWS TO SLAUGHTER"} style={inputbox}
          />

        </ScrollView>

        <BottomButton text={"Save"} onPress={this.saveGiltBreakEven} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%"
  },
  heading: {
    textAlign: "center",
    marginHorizontal: "auto",
    paddingVertical: 20,
    fontWeight: "700",
    fontSize: 22
  },
  section: {
    marginHorizontal: 20,
    paddingVertical: 10,
    fontWeight: "600",
    fontSize: 18
  },
  tablerow: {
    display: "flex",
    flexDirection: "row"
  },
  headerText: {
    // textAlign: "center",
    fontSize: 12,
    paddingVertical: 5
  },
  header: {
    textAlign: "center",
    fontSize: 12,
    paddingVertical: 5,
    fontWeight: "700"
  },
  tableheader: {
    borderWidth: 1,
    flex: 1
  },
  inputbox: {
    marginHorizontal: 15,
    height: 40,
    borderColor: "gray",
    borderWidth: 0,
    marginVertical: 10,
    borderBottomWidth: 1
  },
  bordernonecolumn: {
    flex: 1
    // borderRightWidth: 0,
  }
});

export default DefaultScreen(App);
