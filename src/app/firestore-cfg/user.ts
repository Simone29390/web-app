
import { FirestoreQM } from "../firestore-cfg/firestoreQueryManager";
import { EventEmitter } from "@angular/core";

class User {
  // Define a user emitter and initialize it
  private userIsInEE: EventEmitter<object>;
  private user: object;

  constructor( u: object ) {
    this.user = u;

    this.userIsInEE = new EventEmitter();
  }

  public isUserInDB( u: User, fsQM: FirestoreQM ): void {
    if( !u || !u.getEmail() || !fsQM )
      return;

    let self = this;

    // Retrieve the reference of db query
    let refQ = fsQM.getRefQuery( 'users', [{
      filter:     'email',
      comparison: '==',
      value:      u.getEmail()
    }]);

    refQ.get()
      .then( function( querySnapshot ) {
        if( !querySnapshot.size ) {
          // Emit event with false value
          self.userIsInEE.emit({
            isIn: false
          });

          return;
        }

        querySnapshot.forEach( function( doc ) {
          let userData = doc && doc.data();

          // Emit event with condition value
          self.userIsInEE.emit({
            isIn: userData && userData.email === u.getEmail()
          });
        });
      })
      .catch( function( error ) {
        // Emit event with false value
        self.userIsInEE.emit({
          isIn: false
        });
      });
  }

  public getUserIsInEmitter(): EventEmitter<object> {
    return this.userIsInEE;
  }

  public getFirstName(): string {
    let fName = this.user[ 'displayName' ];

    if( fName.split( ' ' ).length > 1 )
      return fName.split( ' ' )[0];

    return fName;
  }

  public getLastName(): string {
    let lName = this.user[ 'displayName' ];

    if( lName.split( ' ' ).length > 1 )
      return lName.split( ' ' )[1];

    return lName;
  }

  public getPhoneNumber(): string {
    return this.user[ 'phoneNumber' ];
  }

  public getEmail(): string {
    return this.user[ 'email' ];
  }

  public getPhoto(): string {
      return this.user[ 'photoURL' ];
  }

  public getUid(): string {
    return this.user[ 'uid' ];
  }
}

// Export original validator but rename it
export { User };
