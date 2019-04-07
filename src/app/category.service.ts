import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class CategoryService {
	constructor(private db: AngularFireDatabase) {}

	// metoda, ktora getne data z DB a vypise ich do dropdown menu v product-form.html
	getCategories() {
		// Getne node s nazvom categories
    return this.db.list('/categories', ref => {
      // sortovanie - NEPOUZIVA sa uz query{}
      // https://firebase.google.com/docs/reference/js/firebase.database.Reference#limitToLast
      let sort = ref.orderByChild('name');
      return sort;
    }).snapshotChanges();
	}
}
