import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { DataTableResource } from 'angular7-data-table';

@Component({
	selector: 'app-admin-products',
	templateUrl: './admin-products.component.html',
	styleUrls: [ './admin-products.component.css' ]
})
export class AdminProductsComponent implements OnInit, OnDestroy {
	//FIXME: interface Product nefunguje
	//products: Product[] =[];

	products: any[];
	// aby nehadzal chybu ze mu chyba property empty
	items: Product[] = [];
	itemCount: number;
	filteredProducts: any[];
	subscription: Subscription;
	tableResource: DataTableResource<any>;

	constructor(private productService: ProductService) {
		// https://alligator.io/angular/reactive-forms-valuechanges/
		// pouzit snapshotChanges miesto valueChanges kvoli updatu
    this.subscription = this.productService.getAll().snapshotChanges()
    .subscribe((products) => {
			this.filteredProducts = this.products = products;
      this.initializeTable(products);
		});
	}

	// privatna metoda na inicializovanie tabulky - separatne nemusime do konstruktora
	private initializeTable(products: any[]) {
		// inicializovat table Resource - data do tabulky
		this.tableResource = new DataTableResource(products);
		this.tableResource.query({ offset: 0 }).then((items) => {
			this.items = items;
			// count vrati totalny pocet zaznamov v tabulke
      this.tableResource.count().then((count) => (this.itemCount = count));
		});
	}
	// metoda ktora sa vzdy zavola po zmene tabulky - zmenia sa data
	reloadItems(params) {
    if (!this.tableResource) return 
      
		this.tableResource.query(params).then((items) => (this.items = items));
	}

	// metoda pre vyhladavanie
	filter(query: string) {
		this.filteredProducts = query
			? //toLowerCase aby nebral do uvahy velke a male pismena
				// ak query existuje
				this.products.filter((p) => p.payload.val()['title'].toLowerCase().includes(query.toLowerCase()))
			: // ak nenapiseme nic vratia sa len produkty
				this.products;
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	ngOnInit() {}
}
