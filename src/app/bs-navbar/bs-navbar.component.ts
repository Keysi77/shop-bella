import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  // zobrazi udaje o prihlasenom pouzivatelovi
  user$: Observable<firebase.User>;
  // dollar znamena ze je vsade observable

  constructor(private afAuth: AngularFireAuth) { 
    
    // Zobrazi ktory uzivatel je momentalne prihlaseny - zobrazeny v template
    // afAuth.authState.subscribe(actualUser => this.user = actualUser);
    this.user$ = afAuth.authState; // async Pipe pouzijeme nemusime subscribe
    
  }
  // Logout 
 
  logout(){
    this.afAuth.auth.signOut();
  }

}
