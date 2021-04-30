/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnInit } from "@angular/core";
import { AccordianSub } from "src/app/models/accordion.interface";

@Component({
  selector: "foldout",
  templateUrl: "./foldout.component.html",
  styleUrls: ["./foldout.component.scss"],
})
export class FoldoutComponent implements OnInit {
  @Input() subMenu: AccordianSub[];
  subCatLink: string[] = [];

  ngOnInit(): void {
    this.subMenu.forEach((sub) => {
      this.subCatLink.push(`/category/false/${sub.id}`);
    });
  }
}
