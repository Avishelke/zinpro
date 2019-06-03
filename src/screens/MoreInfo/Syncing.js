import React from "react";
import {
  StyleSheet,
  View,
  Text
} from "../../components/core";

const MoreInfoItem = props => {
  return (
    <View style={styles.container}>
      <Text>Syncing is defined as the process of merging your data between the app and website.</Text>
    
      <Text style={{marginTop: 20}}>
        Application data is stored on the device whether in online or offline mode. It is recommended to sync the app and save data to the website when reconnecting to the internet to ensure data is not lost.
      </Text>

      <Text style={{ marginTop: 20 }}>
      You can sync the app manually through the Sync button in menu bar, automatically through logging in to the app or viewing the results page. Anytime the app is syncing, you will see an indicator and a completion message.
      </Text>
      
      <Text style={{ marginTop: 20 }}>
      App data is prioritized over the website data upon syncing. Thus, if you make a change to an evaluation group on the website and make another change to the same evaluation group on the app, the app data overwrites the website data.
      </Text>

      <Text style={{ marginTop: 20 }}>
      Utilizing multiple devices to sync data within one user profile could jeopardize the integrity of your data. When multiple users or multiple devices are used for scoring the same evaluation under the same user login, not all user data will be saved accurately due to continuous syncing and prioritization of new data. To avoid overwriting or losing data, it is recommended that you do not share your login and divide your evaluation groups between multiple logins or devices.
      </Text>

      <Text style={{ marginTop: 20 }}>
      If you create a new assessment while offline and then reconnect to the internet while still scoring, the system will provide a message to sync prior to running a report. This ensures syncing is complete.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    marginHorizontal: "3%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  info: {
    width: "100%",
    height: 168
  }
});

export default MoreInfoItem;
