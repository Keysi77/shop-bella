import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// vytvorene funkcie pre validacie, ktore HTML a Angular defaultne nema
import { CustomFormsModule } from 'ng2-validation';
// pre data v tabulkach - sortovanie a pod
// import { DataTableModule } from 'angular-4-data-table';
// Firebase importy
import { environment } from 'src/environments/environment.prod';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
// Routingg
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
// Komponenty
import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShopingCartComponent } from './shoping-cart/shoping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
// Servisy
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { UserService } from './user.service';
import { AdminAuthGuardService } from './admin-auth-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CategoryService } from './category.service';
import { FormsModule } from '@angular/forms';
import { ProductService } from './product.service';
// modul pre animacie 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatComponentsModule } from './material.module';
import { DataTableModule } from 'angular7-data-table';

@NgModule({
	declarations: [
		AppComponent,
		BsNavbarComponent,
		HomeComponent,
		ProductsComponent,
		ShopingCartComponent,
		CheckOutComponent,
		OrderSuccessComponent,
		MyOrdersComponent,
		AdminProductsComponent,
		AdminOrdersComponent,
		LoginComponent,
		ProductFormComponent
	],
	imports: [
    MatComponentsModule,
    BrowserModule,
    DataTableModule,
		//DataTableModule,
		CustomFormsModule,
		FormsModule,
		AppRoutingModule,
		AngularFireModule.initializeApp(environment.firebaseConfig),
		AngularFireDatabaseModule,
		AngularFireAuthModule,
		// Routing
		RouterModule.forRoot([
			// Routes pre normalnych pouzivatelov
			{ path: '', component: HomeComponent },
			{ path: 'products', component: ProductsComponent },
			{ path: 'shoping-cart', component: ShopingCartComponent },
			// zabezpec canActivate ze k tomuto routingu sa dostane len prihlaseny pouzivatel
			{ path: 'check-out', component: CheckOutComponent, canActivate: [ AuthGuardService ] },
			{ path: 'order-success', component: OrderSuccessComponent, canActivate: [ AuthGuardService ] },
			{ path: 'my/orders', component: MyOrdersComponent, canActivate: [ AuthGuardService ] },
			{ path: 'login', component: LoginComponent },
			{ path: 'order-success', component: OrderSuccessComponent },
			// Routes pre admina/adminov - AdminAuthGuardService - ci sme isAdmin = true
			{
				path: 'admin/products/new',
				component: ProductFormComponent,
				canActivate: [ AuthGuardService, AdminAuthGuardService ]
			},
			{
				path: 'admin/products',
				component: AdminProductsComponent,
				canActivate: [ AuthGuardService, AdminAuthGuardService ]
			},
			// pre editovanie polozky podla id
			{
				path: 'admin/products/:id',
				component: ProductFormComponent,
				canActivate: [ AuthGuardService, AdminAuthGuardService ]
			},
			{
				path: 'admin/orders',
				component: AdminOrdersComponent,
				canActivate: [ AuthGuardService, AdminAuthGuardService ]
			}
		]),
		NgbModule.forRoot()
	],
	providers: [ AuthService, AuthGuardService, UserService, AdminAuthGuardService, CategoryService, ProductService ],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
//asdsd
