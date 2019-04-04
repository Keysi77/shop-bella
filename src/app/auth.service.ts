import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable, EMPTY } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from './models/app-user';
import { UserService } from './user.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable({
	providedIn: 'root'
})
export // LOGIKA pre componenty

class AuthService {
	// zobrazi udaje o prihlasenom pouzivatelovi
	user$: Observable<firebase.User>;
	// dollar znamena ze je vsade observable

	constructor(
		// Injectnute Servicy
		private afAuth: AngularFireAuth,
		private route: ActivatedRoute,
		private userService: UserService
	) {
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

	// ziskanie Usera aby sme vedeli, ci je alebo neni admin
	get appUser$(): Observable<AppUser> {
		return this.user$.pipe(
			// SwitchMap - mapuje a rovno aj prehodi na Observable
			// userService - v UserService je metoda GET ktora berie data z modelu interface AppUser
			// aby sme sa dostali k hodnote isAdmin
			switchMap((user) => {
				// chyba pri logoute ak existuje pouzivatel vrati toto
				if (user) return this.userService.get(user.uid).valueChanges();
				// ak neexistuje vrati Observable of null
				//Observable.of(null) uz nefunguje
				return of(null);
			})
		);
		// SwitchMap prehodi z firebase user objectu na AppUser object
		// treba pridat valueChanges()
	}
}
