import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private getCart(cartId: string){
    this.db.object('/shopping-carts/' + cartId);
  }

  // create volame vo vnutri preto je private
  private create(){
    return this.db.list('/shopping-carts').push({
      // zisti cas kedy bola shopping cart vytvorena
       dateCreated: new Date().getTime()
    })
  }

  // asynchronnu metodu volame ako synchronnu
  private async getOrCreate(){
    let cartId = localStorage.getItem('cartId');
		// ak neexistuje v localstorage tak sa vytvori podla datumu
		if (!cartId) {
      // ako synchronnu metodu
      let result = await this.create(); // nebudeme cakat na result tohto Promisu
      localStorage.setItem('cartId', result.key);
      // getnute data z firebase
      return this.getCart(result.key);
		}  
      // ak mame shopping cart 
      return this.getCart(cartId);
		
  }
}
