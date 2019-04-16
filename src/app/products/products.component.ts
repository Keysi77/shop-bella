import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  
  products: any[] = [];
  filteredProducts: any[] = [];
  category: string;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService, 
  ) {
      this.route.queryParamMap.subscribe(params => {
        this.category = params.get('category');
   
        this.productService.getAll().valueChanges().subscribe(products => {
   
          this.products = products;
          // vypisuje category
          this.filteredProducts = (this.category) ?
          this.products.filter( p => p.category === this.category) : 
          this.products;
          
        });
      });
     }
}
