// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,
  firebase: {
    apiKey: "AIzaSyDbSul24AYIRgTbJWMcHe8Z3bo8lU9RUzo",
    authDomain: "applicazioni-web-63d92.firebaseapp.com",
    databaseURL: "https://applicazioni-web-63d92.firebaseio.com",
    projectId: "applicazioni-web-63d92",
    storageBucket: "applicazioni-web-63d92.appspot.com",
    messagingSenderId: "1098101396959"
  },
  envName: 'prod'
};

