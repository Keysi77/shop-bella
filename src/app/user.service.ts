import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
// Service pre ukladenie USERov do firebase databazy
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  // ukladanie pouzivatelov do DB
  save(user: firebase.User){
    // update aby sa len updatli veci ktore su nove ak si v google zmenia vlastnosti
    // nebudu sa stale overridovat a nacitavat znova
    this.db.object('/users/' + user.uid).update({
      name: user.displayName, // meno pouzivatela ktore je zobrazene v UI  
      email: user.email
    });
  }
}
