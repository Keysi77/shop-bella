import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
// LOGIKA pre componenty

export class AuthService {
	// zobrazi udaje o prihlasenom pouzivatelovi
	user$: Observable<firebase.User>;
	// dollar znamena ze je vsade observable

	constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute) {
		// Zobrazi ktory uzivatel je momentalne prihlaseny - zobrazeny v template
		// afAuth.authState.subscribe(actualUser => this.user = actualUser);
		this.user$ = afAuth.authState; // async Pipe pouzijeme nemusime subscribe
	}

	// login with Google
	login() {
		// pred odoslanim do google, ulozime nasu URL do local storage
		// returnUrl je v canActivate() v auth-guard.service
		// ak mame returnUrl (napr /check-out) pojdeme nan, inak pojdeme na root site (ked sa odhlasim a hned prihlasim)
		let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/'; 
		// ulozenie itemu do localStorage
		localStorage.setItem('returnUrl', returnUrl);
		// redirect na prihlasenie cez google
		this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
	}

	// Logout
	logout() {
		this.afAuth.auth.signOut();
	}
}
