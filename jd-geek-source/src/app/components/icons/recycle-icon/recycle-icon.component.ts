import { Component, Input } from "@angular/core";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-recycle-icon",
  template: "<fa-icon [size]='iconSize' [icon]='faTrash'></fa-icon>",
  styleUrls: ["./recycle-icon.component.scss"],
})
export class RecycleIconComponent {
  @Input() iconSize: SizeProp;
  faTrash = faTrash;
}
