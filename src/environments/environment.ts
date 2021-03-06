// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,
  firebase: {
    apiKey: "AIzaSyD_piYZVRV41FTKFsG33JkROBGFaNysVR0",
    authDomain: "appriuso.firebaseapp.com",
    databaseURL: "https://appriuso.firebaseio.com",
    projectId: "appriuso",
    storageBucket: "appriuso.appspot.com",
    messagingSenderId: "1027648136525"
  },
  envName: 'prod'
};

