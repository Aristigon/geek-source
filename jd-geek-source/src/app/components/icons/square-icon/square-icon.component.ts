import { Component, Input } from "@angular/core";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { faSquare } from "@fortawesome/free-regular-svg-icons";

@Component({
  selector: "app-square-icon",
  template: "<fa-icon [size]='iconSize' [icon]='faSquare'></fa-icon>",
  styleUrls: ["./square-icon.component.scss"],
})
export class SquareIconComponent {
  @Input() iconSize: SizeProp;
  faSquare = faSquare;
}
