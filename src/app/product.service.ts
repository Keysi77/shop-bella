import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  constructor(private db: AngularFireDatabase) { }

  // pushe objekt product do nodu /products
  create(product) {
    return this.db.list('/products').push(product);
  }
  // vsetky produkty getne na vypisane do tabulky v admin-products.html
  getAll(){
    return this.db.list('/products');
  }
  getAllCategories(){
    return this.db.list('/categories');
  }
  // vrati ID produktu pre editovanie 
  get(productId){
    return this.db.object('/products/' + productId);
  }
  // pre update poroduktu
  update(productId, product){
    return this.db.object('products/' + productId).update(product);
  }
  // pre zmazanie produktu ktory editujeme
  delete(productId){
    return this.db.object('/products/' + productId).remove();
  }

}
