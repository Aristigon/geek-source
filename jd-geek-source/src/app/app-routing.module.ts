import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CategoryPageComponent } from "./components/core/category-page/category-page.component";
import { HomeComponent } from "./components/core/home/home.component";
import { ProductPageComponent } from "./components/core/product-page/product-page.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent },
  { path: "product/:product", component: ProductPageComponent },
  { path: "category/:category", component: CategoryPageComponent },
  {
    path: "category/:textSearch/:searchProducts",
    component: CategoryPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
