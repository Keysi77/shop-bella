import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';
import { Observable } from 'rxjs/internal/Observable';
import { Router, ActivatedRoute } from '@angular/router';
// take zoberie jedno observable nemusi sa potom unsubscribovat
import { take, map } from 'rxjs/operators';

@Component({
	selector: 'app-product-form',
	templateUrl: './product-form.component.html',
	styleUrls: [ './product-form.component.css' ]
})
export class ProductFormComponent implements OnInit {
	//categories$ : any; // observable
	categories: Observable<any>;
	product = <any>{};
	id; // aby sme mali k ID pristup v kazdej metode cez this.id
	del: boolean = false;

	// v ProductService je logika pre spracovanie dat pre databazu
	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private categoryService: CategoryService,
		private productService: ProductService
	) {
		this.categories = categoryService.getCategories();

		// zisti sa ID produktu
		this.id = this.route.snapshot.paramMap.get('id');
		// take zoberie len jedno observable
		if (this.id) {
			// getne udaje podla ID
			this.productService
				.get(this.id)
				.snapshotChanges()
				.pipe(map((s) => ({ $key: s.key, ...s.payload.val() })), take(1))
				.subscribe((p) => {
					return (this.product = p);
				});
		}
	}

	// save() na ulozenie dat do DB
	save(product) {
		// ak mame ID updatujeme inak sa uklada novy produkt
		if (this.id) this.productService.update(this.id, product);
		else this.productService.create(product);

		//FIXME: product.category je undefined
		// console.log(product);

		// po ulozeni novej polozky do DB sa presmeruje na zoznam s produktami
		this.router.navigate([ '/admin/products' ]);
	}

  // delete produkt
  delete(){
    // ak nepotvrdi zmazanie vrati sa
    if(!confirm('Are you shure you want to delete this product?')) return;
   	// ak potvrdi zmaze sa polozka a presmeruje na zoznam s produktami
    this.productService.delete(this.id);
    this.del = true; // pomocny boolean
    this.router.navigate(['/admin/products']); 
   }

	ngOnInit() {}
}
