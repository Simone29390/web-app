import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Firestore} from "./firestore-cfg/firestore";
import * as firebase from "firebase";
import {FirebaseQM} from "./firestore-cfg/firebaseQueryManager";
import Query = firebase.database.Query;

@Injectable()
export class LoginActivate implements CanActivate {
  private fs: Firestore;
  private qm: FirebaseQM;
  isMobile;
  private fb: firebase.app.App;

  /**
   * Route
   * @type {{root: string; showcase: string; login: string}}
   */
  private ROUTE: any = {
    // Root
    root: '/',

    // Showcase page
    showcase: '',

    // Login Page
    login: 'login'
  };

  constructor( private router: Router ) {
    this.fs = new Firestore();
    this.fs = new Firestore();
    this.fb = this.fs.getConfiguredFirebase();
    this.qm = new FirebaseQM();

  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // Wrapper of this object
    let self = this;

    // Current firebase cfg
    let fb = this.fs.getConfiguredFirebase();

    // On user auth change select correct page
    fb.auth().onAuthStateChanged( function( user ) {
      if ( Boolean( user ) && user != null && self.router.url !== self.ROUTE.root ) {
        //self.router.navigate([self.ROUTE.showcase]);

        const ref = self.qm.getReference( 'User' );

        let query: Query = ref.child(user.uid);

        query.once('value').then(function (querySnapshot) {

          if (querySnapshot.exists()) {
            self.router.navigate([self.ROUTE.showcase]);
          } else {
            //TODO
            console.log('non esiste')
          }
        });

      } else if( !Boolean( user ) ) {
        self.router.navigate([self.ROUTE.login]);
      }
    });

    return true;
  }
}
