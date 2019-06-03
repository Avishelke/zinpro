import React, { Component } from 'react';
import { View, StyleSheet, NetInfo } from '../components/core';

import Toaster from 'react-native-toaster'
import Loader from '../components/Loader'
import { connect } from 'react-redux'
import {
    SHOW_LOADER, HIDE_LOADER, HIDE_ERROR_MESSAGE,
    SELECT_EVALUATION, SELECT_GROUP, SELECT_FARM, SELECT_EVALUATION_GROUP
} from '../redux/actions'
import { db } from '../helpers/db';
import API from "../apis";

const styles = StyleSheet.create({
    container: { width: "100%", height: "100%", backgroundColor: 'white' }
})

export default function (ComposedComponent) {

    class DefaultScreeen extends Component {
        
        data = {
            clawEvaluation: [],
            culldata: [],
            evaluations: [],
            evaluationsgroups: [],
            farms: [],
            fieldsheet: [],
            giltbreakeven: [],
            groups: [],
            herdcensus: [],
        }

        updateImageData = (res, table) => {
            let insert = ``;

            res.map((i, key) => {
                delete i.is_sync;
                let columns = Object.keys(i);

                if (key === 0) {
                    insert = `insert  OR REPLACE   into ${table} (` + columns.toString() + `, is_sync) values `;
                }

                insert += `(`;

                for (let _k in i) {
                    insert += `'${(i[_k])}'` + ', '
                }

                insert += ` 1),`;
            });

            db.transaction((tx) => {
                tx.executeSql(insert.slice(0, -1), []);
            })
        }

        syncData = async () => {

            const isConnected  = await NetInfo.isConnected.fetch();

            if(!isConnected){
                return false;
            }

            db.transaction((tx) => {
                tx.executeSql(`select * from claw_collection where is_sync=?`, [0], (tx, results) => { this.data.clawcollection = results.rows.raw() });
                tx.executeSql(`select * from cull_data where is_sync=?`, [0], (tx, results) => { this.data.culldata = results.rows.raw() });
                tx.executeSql(`select * from evaluations where is_sync=?`, [0], (tx, results) => { this.data.evaluations = results.rows.raw() });
                tx.executeSql(`select * from evaluations_groups where is_sync=?`, [0], (tx, results) => { this.data.evaluationsgroups = results.rows.raw() });
                tx.executeSql(`select * from farms where is_sync=?`, [0], (tx, results) => { this.data.farms = results.rows.raw() });
                tx.executeSql(`select * from field_sheet where is_sync=?`, [0], (tx, results) => { this.data.fieldsheet = results.rows.raw() });
                tx.executeSql(`select * from gilt_break_even where is_sync=?`, [0], (tx, results) => { this.data.giltbreakeven = results.rows.raw() });
                tx.executeSql(`select * from groups where is_sync=?`, [0], (tx, results) => { this.data.groups = results.rows.raw() });
                tx.executeSql(`select * from herd_census where is_sync=?`, [0], (tx, results) => {
                    this.data.herdcensus = results.rows.raw();

                    if (this.data.clawcollection.length > 0 ||
                        this.data.culldata.length > 0 ||
                        this.data.evaluations.length > 0 ||
                        this.data.evaluationsgroups.length > 0 ||
                        this.data.farms.length > 0 ||
                        this.data.fieldsheet.length > 0 ||
                        this.data.giltbreakeven.length > 0 ||
                        this.data.groups.length > 0 ||
                        this.data.herdcensus.length > 0
                    ) {

                        API.syncData(this.data).then((res) => {
                            db.transaction((tx) => {
                                tx.executeSql(`update claw_collection set is_sync=?`, [1]);
                                tx.executeSql(`update cull_data set is_sync=?`, [1]);
                                tx.executeSql(`update evaluations set is_sync=?`, [1]);
                                tx.executeSql(`update evaluations_groups set is_sync=?`, [1]);
                                tx.executeSql(`update farms set is_sync=?`, [1]);
                                tx.executeSql(`update field_sheet set is_sync=?`, [1]);
                                tx.executeSql(`update gilt_break_even set is_sync=?`, [1]);
                                tx.executeSql(`update groups set is_sync=?`, [1]);
                                tx.executeSql(`update herd_census set is_sync=?`, [1]);
                            })
                        })
                    }
                });
                tx.executeSql(`select * from gestation_assessor where is_sync=? and is_active=?`, [0, 1], (tx, results) => {
                    if (results.rows.raw().length > 0) {
                        API.syncGestation(results.rows.raw()).then((res) => {
                            this.updateImageData(res.data , 'gestation_assessor')
                        })
                    }
                });
                tx.executeSql(`select * from gilt_assessor where is_sync=? and is_active=?`, [0, 1], (tx, results) => {
                    if (results.rows.raw().length > 0) {
                        API.syncGilt(results.rows.raw()).then((res) => {
                            this.updateImageData(res.data , 'gilt_assessor')
                        })
                    }
                });
                tx.executeSql(`select * from insemination_assessor where is_sync=? and is_active=?`, [0, 1], (tx, results) => {
                    if (results.rows.raw().length > 0) {
                        API.syncInsemination(results.rows.raw()).then((res) => {
                            this.updateImageData(res.data , 'insemination_assessor')
                        })
                    }
                });
                tx.executeSql(`select * from lactation_assessor where is_sync=? and is_active=?`, [0, 1], (tx, results) => {
                    if (results.rows.raw().length > 0) {
                        API.syncLactation(results.rows.raw()).then((res) => {
                            this.updateImageData(res.data , 'lactation_assessor')
                        })
                    }
                });
            })
        }

        render() {
            const { message, loader } = this.props;

            return <View style={styles.container}>

                <Toaster message={message} onShow={() => {
                    this.props.hidemessage()
                }} />

                <Loader loading={loader} />
                <ComposedComponent {...this.props} syncData={this.syncData} />

            </View>
        }
    }

    return connect(
        (state) => {
            return {
                message: state.messagestate.message,
                loader: state.appstate.loader,
                network_available: state.appstate.network_available,
                sync: state.appstate.sync,
                selectedEvaluation: state.evaluationsstate.selectedEvaluation,
                selectedEvaluationGroup: state.evaluationsstate.selectedEvaluationGroup,
                selectedGroup: state.groupsstate.selectedGroup,
                selectedFarm: state.farmstate.selectedFarm,
            }
        },
        (dispatch) => {
            return {
                showmessage: (action, message) => {
                    dispatch({ type: action, payload: { message: message } });
                },
                hidemessage: () => {
                    dispatch({ type: HIDE_ERROR_MESSAGE, payload: {} });
                },
                showloader: () => {
                    dispatch({ type: SHOW_LOADER });
                },
                hideloader: () => {
                    dispatch({ type: HIDE_LOADER });
                },
                selectFarm: (farm_id) => {
                    dispatch({ type: SELECT_FARM, payload: farm_id });
                },
                selectEvaluation: (farm_name) => {
                    dispatch({ type: SELECT_EVALUATION, payload: farm_name });
                },
                selectGroup: (group_name) => {
                    dispatch({ type: SELECT_GROUP, payload: group_name });
                },
                selectEvaluationGroup: (ev_gr_name) => {
                    alert(JSON.stringify(ev_gr_name))
                    dispatch({ type: SELECT_EVALUATION_GROUP, payload: ev_gr_name });
                }
            }
        }
    )(DefaultScreeen);
}