import {Injectable} from '@angular/core';
import firebase from 'firebase';
import {User} from '@firebase/auth-types'

@Injectable()
export class AuthProvider {

  private userId: String;

  constructor() {
    console.log('Hello AuthProvider Provider');
  }

  async signUpUser(email: string,
                   password: string,
                   firstName: string,
                   lastName: string): Promise<any> {

    try {
      // @ts-ignore
      const newUser: User = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      await firebase
        .auth()
        .onAuthStateChanged((user) => {
          if (user) {
            this.userId = user.uid;
            console.log(user.uid);
          }
        });

      await firebase
        .database()
        .ref(`/userProfile/${this.userId}`)
        .set({email: email, firstName: firstName, lastName: lastName});
      console.log(`${newUser.uid}`);
      return newUser;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async logoutUser(): Promise<any> {
    return new Promise(((resolve, reject) => {
      firebase.auth().signOut()
        .then(() => {
          let loggedOut = true;
          resolve(loggedOut);
        })
        .catch((error: any) => {
          reject(error);
        })
    }));
  }

  async loginUser(email: string, password: string): Promise<any> {
    return firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password);
  }
}
