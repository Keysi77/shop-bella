import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../models/product';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  
  products: any[] = [];
  filteredProducts: any[] = [];
  categories;
  category: string;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService, 
    private categoryService: CategoryService) {

      this.categories = this.categoryService.getCategories();


      this.route.queryParamMap.subscribe(params => {
        this.category = params.get('category');
   
        this.productService.getAll().valueChanges().subscribe(products => {
   
          this.products = products;
   
          this.filteredProducts = (this.category) ?
          this.products.filter( p => p.category === this.category) : 
          this.products;
          
        });
      });
     }


  ngOnInit() {
  }

}
