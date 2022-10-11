import { exit } from "process";
import { IEnv } from "./eat-it.types";
import { IEnvironmentType } from "./eat-it.types";

export const env = (): IEnv => {
  const _environment:IEnvironmentType = <IEnvironmentType>process.env?.ENVIRONMENT || 'development';

  if (_environment === 'development') return require("./environment/dev.env");
  else if (_environment === "production" || _environment === 'beta') return require("./environment/prod.env"); 
  else if (_environment === "staging") return require("./environment/qa.env"); 
  else {
    console.log(`
      Error. Shell variable ENVIRONMENT not set.
      Acceptable values are 'development' | 'production'
    `);
    exit(1); 
  }
};