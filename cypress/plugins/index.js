/// <reference types="cypress" />

const oracledb = require("oracledb");

/**
 * @type {Cypress.PluginConfig}
 */

// oracledb.initOracleClient({ libDir: "/Users/weerapornpaisingkhon/instantclient_19_3" }); //update to your path and delete the comment

const queryData = (query, dbconfig) => {
  return new Promise((resolve, reject) => {
    oracledb.getConnection(dbconfig, (err, connection) => {
      console.log("Starting a connection. . . . . ");

      if (err) {
        console.error(err.message);
        return;
      }

      console.log("Connection was successful!!!");

      connection.execute(query, (err, result) => {
        if (err) {
          error = err;
          console.log("SQL error ====>" + error);
          reject(error);
        } else {
          resolve(result);
          connection.close();
        }
      });
    });
  });
};

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on("task", {
    sqlQuery: (query) => {
      return queryData(query, config.env.db);
    },
  });
};
