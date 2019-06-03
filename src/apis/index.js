import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { LOGIN_TOKEN } from '../helpers/constants';

// axios.defaults.baseURL = 'http://swinefarmassessor.com/api/web/';
// axios.defaults.baseURL = 'http://swinefarmassessor.com/zepro-feet-first/api/web/';
axios.defaults.baseURL = 'http://103.211.216.244/zepro-feet-first/api/web/';


axios.defaults.headers.common['Content-Type'] = 'application/json';

axios.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem(LOGIN_TOKEN);
    if (token != null) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, (err) => {
    return Promise.reject(err);
});


export default class API {

    static login = (data) => axios.post('user/login', data).then(res => res.data);
    
    static profile = (data) => axios.post('user/profile', data).then(res => res.data).catch(( arrow) => {debugger});

    static syncFarm = async (data) => axios.post('farm/create', data).then(res => res.data)

    static syncEvaluation = async (data) => axios.post('evaluations/create', data).then(res => res.data)

    static syncGroup = async (data) => axios.post('group/create', data).then(res => res.data)

    static syncData = async (data) => axios.post('user/sync-data', data).then(res => res.data)

    static syncGestation = async (data) => axios.post('assessor/gestation', data).then(res => res.data)

    static syncGilt = async (data) => axios.post('assessor/gilt', data).then(res => res.data)

    static syncInsemination = async (data) => axios.post('assessor/insemination', data).then(res => res.data)

    static syncLactation = async (data) => axios.post('assessor/lactation', data).then(res => res.data)

}

