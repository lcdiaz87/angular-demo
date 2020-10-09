import { Injectable } from '@angular/core';
import { IProfile } from '../models/iprofile';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  public user: IProfile;
  constructor () {}


  getProfileUser (): Promise<IProfile> {
    return new Promise ((resolve , reject) => {
      setTimeout (() => {
        if (Math.round(Math.random())) {
          this.user = {
            firstName : 'Michael' ,
            lastName : 'Collins' ,
            username : 'michael.collins',
            age : 30
          };
          resolve(this.user);
        } else {
          reject({ error: 'Profile not found' });
        }
      } , 1000/* Math.random () * 5000 */);
    });
  }
  setName (firstName: string, lastName: string) {
    return new Promise ((resolve , reject) => {
      setTimeout (() => {
        if (Math.round(Math.random())) {
          this.user.firstName = firstName;
          this.user.lastName = lastName;
          resolve(this.user);
        } else {
          reject({ error: 'Invalid name' });
        }
      } , 1000/* Math.random () * 5000 */);
    }) 
  }
  setEmail (firstName: string, lastName: string) {
    return new Promise ((resolve , reject) => {
      setTimeout (() => {
        if (Math.round(Math.random())) {
          this.user.username = firstName.replace(/\s/g, "").toLowerCase() + "." + lastName.replace(/\s/g, "").toLowerCase();
          resolve(this.user);
        } else {
          reject({ error: 'Invalid email' });
        }
      } , 1000/* Math.random () * 5000 */);
    }) 
  }
  
}
