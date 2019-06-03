import { Provider } from 'react-redux';
import React, { Component } from 'react';
import { AsyncStorage, NetInfo } from './components/core'
import { LOGIN_TOKEN} from './helpers/constants'

import Screens from './screens';
import SplashScreen from './screens/Splash';
import { store } from './redux/store'
import API from './apis'
import { db } from './helpers/db';


class MainApp extends Component {

  state = {
    showRealApp: 0,
    initialRoute: 'Login'
  };

  subs;

  componentWillMount() {
    this.subs = setInterval(async () => {
        const token =  await AsyncStorage.getItem(LOGIN_TOKEN );
        const time =  await AsyncStorage.getItem('time');

        const isConnected  = await NetInfo.isConnected.fetch();
        if(token && isConnected){
          API.profile({time}).then(this.fetchProfileData)
        }
    } , 30000);

  }

  componentWillUnmount() {
    clearInterval(this.subs)
  }


  fetchProfileData = (res) => {
    const insertKeys = [
      'claw_collection' ,
      'cull_data' ,
      'evaluations',
      'evaluations_groups', 'farms' ,
      'field_sheet' ,'gestation_assessor',
      'gilt_assessor' ,'gilt_break_even' ,
      'groups' ,'herd_census' ,
      'insemination_assessor' ,'lactation_assessor'
    ];

    let insert = { 
     0: `SELECT date('now'),`,
     1: `SELECT date('now'),`,
     2: `SELECT date('now'),`,
     3: `SELECT date('now'),`,
     4: `SELECT date('now'),`,
     5: `SELECT date('now'),`,
     6: `SELECT date('now'),`,
     7: `SELECT date('now'),`,
     8: `SELECT date('now'),`,
     9: `SELECT date('now'),`,
     10: `SELECT date('now'),`,
     11: `SELECT date('now'),`,
     12: `SELECT date('now'),`,
    };

    insertKeys.map((table, k) => {

      res.data[table].map((i, key) => {
        delete i.is_sync;
        let columns = Object.keys(i);

        if(key === 0){
          insert[k] = `insert  OR REPLACE   into ${table} (`+ columns.toString() +`, is_sync) values `;
        }

        insert[k] += `(`;

        for(let _k in i){
          insert[k] += `'${(i[_k])}'` + ', '
        }

        insert[k] +=` 1),`;
      });

    })

    db.transaction((tx) => {
      tx.executeSql(insert[0].slice(0, -1), []);
      tx.executeSql(insert[1].slice(0, -1), []);
      tx.executeSql(insert[2].slice(0, -1), []);
      tx.executeSql(insert[3].slice(0, -1), []);
      tx.executeSql(insert[4].slice(0, -1), []);
      tx.executeSql(insert[5].slice(0, -1), []);
      tx.executeSql(insert[6].slice(0, -1), []);
      tx.executeSql(insert[7].slice(0, -1), []);
      tx.executeSql(insert[8].slice(0, -1), []);
      tx.executeSql(insert[9].slice(0, -1), []);
      tx.executeSql(insert[10].slice(0, -1), []);
      tx.executeSql(insert[11].slice(0, -1), []);
      tx.executeSql(insert[12].slice(0, -1), [], () => {
        AsyncStorage.setItem('time' , res.now);
      })
    }, (error)=> {
      console.log('transaction error: ' + error.message);
    }, ()=> {
    });
  }


  async componentDidMount() {

    const token = await AsyncStorage.getItem(LOGIN_TOKEN);
    var temp = await AsyncStorage.getItem('IS_LOOGED_IN');
    const isLoggedIn = JSON.parse(temp);

    let initialRoute = 'Login';

    if (token && isLoggedIn) {
      initialRoute = 'Home';
    }

    setTimeout(() => {
      this.setState({ initialRoute: initialRoute, showRealApp: 1 });
    }, 200)

  }


  render() {
    const { initialRoute, showRealApp } = this.state;

    if (showRealApp === 1) {
      return <Provider store={store}>
        <Screens initialRouteName={initialRoute} />
      </Provider>;
    } else {
      return <SplashScreen />
    }
  }
}

export default MainApp;