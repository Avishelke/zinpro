import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';


const Loader = ({loading}) => {
    return  <Spinner
        visible={loading}
        overlayColor="rgba(0, 0, 0, 0.60)"
        textContent={"Loading..."} 
        textStyle={{color: '#FFF'}} />
}

export default Loader