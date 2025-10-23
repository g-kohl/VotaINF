import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
@Component({
  selector: "app-menu-separator",
  standalone: true,
  templateUrl: "./menu-separator.html",
  styleUrls: ["./menu-separator.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuSeparator {}
