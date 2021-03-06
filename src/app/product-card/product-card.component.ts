import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
	selector: 'product-card',
	templateUrl: './product-card.component.html',
	styleUrls: [ './product-card.component.css' ]
})
export class ProductCardComponent {
	// aby sme molhi v product-card.html pouzivat product.title, price a pod
	@Input('product') product: Product;
	@Input('show-actions') showActions = true;

	constructor(private cartService: ShoppingCartService) {}
  

	addToCard(product: Product) {
    
	}
}
