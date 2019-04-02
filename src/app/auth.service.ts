import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
// LOGIKA pre componenty

export class AuthService {
	// zobrazi udaje o prihlasenom pouzivatelovi
	user$: Observable<firebase.User>;
	// dollar znamena ze je vsade observable

	constructor(private afAuth: AngularFireAuth) {
		// Zobrazi ktory uzivatel je momentalne prihlaseny - zobrazeny v template
		// afAuth.authState.subscribe(actualUser => this.user = actualUser);
		this.user$ = afAuth.authState; // async Pipe pouzijeme nemusime subscribe
	}

	// login with Google
	login() {
		// redirect na prihlasenie cez google
		this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
	}

	// Logout
	logout() {
		this.afAuth.auth.signOut();
	}
}
