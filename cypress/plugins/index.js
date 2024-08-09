/// <reference types="cypress" />

const oracledb = require("oracledb");

/**
 * @type {Cypress.PluginConfig}
 */

// oracledb.initOracleClient({ libDir: "/Users/vicky/Downloads/instantclient_19_16" }); //update to your path and delete the comment


const queryData = async(query, dbconfig) => {
  let conn;
  try{
      conn = await oracledb.getConnection(dbconfig);
      return result = await conn.execute(query);
  }catch(err){
      console.log("Error===>"+err)
      return err
  } finally{
    if(conn){
      try{
        conn.close();
      }catch(err){
        console("Error===>"+err);
      }
    }
  }
}

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on("task", {
    sqlQuery: query => {
      return queryData(query, config.env.db);
    },
  });
};
