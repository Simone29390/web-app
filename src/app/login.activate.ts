import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Firestore} from "./firestore-cfg/firestore";

@Injectable()
export class LoginActivate implements CanActivate {
  private fs: Firestore;

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
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // Wrapper of this object
    let self = this;

    // Current firebase cfg
    let fb = this.fs.getConfiguredFirebase();

    // On user auth change select correct page
    fb.auth().onAuthStateChanged( function( user ) {
      if ( Boolean( user ) && self.router.url !== self.ROUTE.root ) {
        self.router.navigate([self.ROUTE.showcase]);
      } else if( !Boolean( user ) ) {
        self.router.navigate([self.ROUTE.login]);
      }
    });

    return true;
  }
}
