import { Component, Input } from "@angular/core";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { faCheckSquare } from "@fortawesome/free-regular-svg-icons";

@Component({
  selector: "app-check-square-icon",
  template: "<fa-icon [size]='iconSize' [icon]='faCheckSquare'></fa-icon>",
  styleUrls: ["./check-square-icon.component.scss"],
})
export class CheckSquareIconComponent {
  @Input() iconSize: SizeProp;
  faCheckSquare = faCheckSquare;
}
