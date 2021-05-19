import { Component, Input } from "@angular/core";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { faBars } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-bars-menu-icon",
  template: "<fa-icon [size]='iconSize' [icon]='faBars'></fa-icon>",
  styleUrls: ["./bars-menu-icon.component.scss"],
})
export class BarsMenuIconComponent {
  @Input() iconSize: SizeProp;
  faBars = faBars;
}
