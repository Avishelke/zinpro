var Sqlite = require('react-native-sqlite-storage');
var db = Sqlite.openDatabase({name: 'sqlite.db', createFromLocation: '~sqlite.db'})

export {db};

export function DBtransaction(query, args = []){
   return db.transaction((tx) => {
     return tx.executeSql(query, args, (tx, results)=> {
      
      let rows = results.rows.raw();
      
      return rows;

     })
   })
 }

export function syncEvaluationDB(){
  
  tx.executeSql(`select * from evaluations where is_sync= ?`, [0], (tx, results) => {
    //Get Unsync rows
    API.syncEvaluation(results.rows.raw()).then((d) => {
      db.transaction((tx) => {
        tx.executeSql(`update evaluations set is_sync=?`, [1], () => {})
      })
    })
  })
}



export function syncgroupDB(){
  
  tx.executeSql(`select * from groups where is_sync= ?`, [0], (tx, results) => {
    //Get Unsync rows
    API.syncgroupDB(results.rows.raw()).then((d) => {
      db.transaction((tx) => {
        tx.executeSql(`update groups set is_sync=?`, [1], () => {})
      })
    })
  })
}


export function syncfarmDB(){
  
  tx.executeSql(`select * from farms where is_sync= ?`, [0], (tx, results) => {
    //Get Unsync rows
    API.syncgroupDB(results.rows.raw()).then((d) => {
      db.transaction((tx) => {
        tx.executeSql(`update farms set is_sync=?`, [1], () => {})
      })
    })
  })
}


