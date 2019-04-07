import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';

@Component({
	selector: 'app-admin-products',
	templateUrl: './admin-products.component.html',
	styleUrls: [ './admin-products.component.css' ]
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  //FIXME: interface Product nefunguje 
  // products: Product[];

  products: any[];
  // aby nehadzal chybu ze mu chyba property empty
	items: any[] = [];
	itemCount: any[] = [];
	filteredProducts: any[];
	subscription: Subscription;

	constructor(private productService: ProductService) {
		// https://alligator.io/angular/reactive-forms-valuechanges/
		// pouzit snapshotChanges miesto valueChanges kvoli updatu
    this.subscription = this.productService.getAll()
    .snapshotChanges()
    .subscribe((products) => {
			this.filteredProducts = this.products = products;
		});
	}

	// metoda pre vyhladavanie
	filter(query: string) {
    this.filteredProducts = query
    //toLowerCase aby nebral do uvahy velke a male pismena
      // ak query existuje
			? this.products.filter((p) => p.payload.val()['title'].toLowerCase().includes(query.toLowerCase()))
      // ak nenapiseme nic vratia sa len produkty
      : this.products;
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	ngOnInit() {}
}
