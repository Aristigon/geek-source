import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { IconsModule } from "./modules/icons/icons.module";
// For api testing -- will be removed
import { TestDiplayComponent } from "./components/test-diplay/test-diplay.component";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { ButtonComponent } from "./components/common/button/button.component";
import { ProductShowcaseComponent } from "./components/product-showcase/product-showcase.component";
import { SearchComponent } from "./components/search/search.component";
import { ShopByCategoryComponent } from "./components/shop-by-category/shop-by-category.component";
import { HeroImageComponent } from "./components/hero-image/hero-image.component";
import { FeaturedProductsComponent } from "./components/featured-products/featured-products.component";
import { DailyDealsComponent } from "./components/daily-deals/daily-deals.component";
import { HottestDealsComponent } from "./components/hottest-deals/hottest-deals.component";
import { BestBuyService } from "./services/best-buy.service";
import { TemplateDrivenDropdownMenuComponent } from "./components/common/template-driven-dropdown-menu/template-driven-dropdown-menu.component";
import { VerticalDropdownMenuComponent } from "./components/common/vertical-dropdown-menu/vertical-dropdown-menu.component";
import { LogoComponent } from "./components/logo/logo.component";
import { ShoppingCartComponent } from "./components/shopping-cart/shopping-cart.component";
import { ProductRatingsComponent } from "./components/product-ratings/product-ratings.component";
import { HomeComponent } from "./components/home/home.component";
import { ProductDisplayPortalComponent } from "./components/common/product-display-portal/product-display-portal.component";
import { HeroDisplayComponent } from './components/hero-display/hero-display.component';

@NgModule({
  declarations: [
    AppComponent,
    TestDiplayComponent,
    HeaderComponent,
    FooterComponent,
    ButtonComponent,
    ProductShowcaseComponent,
    SearchComponent,
    ShopByCategoryComponent,
    HeroImageComponent,
    FeaturedProductsComponent,
    DailyDealsComponent,
    HottestDealsComponent,
    TemplateDrivenDropdownMenuComponent,
    VerticalDropdownMenuComponent,
    LogoComponent,
    ShoppingCartComponent,
    ProductDisplayPortalComponent,
    ProductRatingsComponent,
    HomeComponent,
    HeroDisplayComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FontAwesomeModule,
    IconsModule,
  ],
  providers: [BestBuyService],
  bootstrap: [AppComponent],
})
export class AppModule {}
