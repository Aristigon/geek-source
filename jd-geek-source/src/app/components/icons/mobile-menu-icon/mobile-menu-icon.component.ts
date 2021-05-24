import { Component, Input } from "@angular/core";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { faBars } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-mobile-menu-icon",
  template: "<fa-icon [size]='iconSize' [icon]='faBars'></fa-icon>",
  styleUrls: ["./mobile-menu-icon.component.scss"],
})
export class MobileMenuIconComponent {
  @Input() iconSize: SizeProp;
  faBars = faBars;
}
