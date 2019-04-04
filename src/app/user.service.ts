import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase';
import { AppUser } from './models/app-user';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export // Service pre ukladenie USERov do firebase databazy
class UserService {
	constructor(private db: AngularFireDatabase) {}

	// ukladanie pouzivatelov do DB
	save(user: firebase.User) {
		// update aby sa len updatli veci ktore su nove ak si v google zmenia vlastnosti
		// nebudu sa stale overridovat a nacitavat znova
		this.db.object('/users/' + user.uid).update({
			name: user.displayName, // meno pouzivatela ktore je zobrazene v UI
			email: user.email
		});
	}

	// metoda pre citanie Userov z DB + ich hodnoty ci je admin
	// Oanotovanie modelom User - uz sa nepouziva FirebaseObjectObservable ale AngularFireObject

	//TODO: Nefunguje ked dame model AngularFireObject<AppUser>
	// get(uid: string): Observable<any>{
	//   return this.db.object('/users/' + uid).valueChanges();;
	// }
	//FIXME: https://stackoverflow.com/questions/47422348/error-ts2345-angular-angularfire2-checking-if-user-isadmin
	/*
  get(uid: string): AngularFireObject<AppUser>{
    return this.db.object('/users/' + uid).valueChanges();;
  }
  */
	//! ALEBO TOTO:

	get(uid: string): AngularFireObject<AppUser> {
		return this.db.object('/users/' + uid);
	}
}
