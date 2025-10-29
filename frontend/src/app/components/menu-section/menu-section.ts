import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { MenuItemComponent } from "../menu-item/menu-item";
@Component({
  selector: "app-menu-section",
  standalone: true,
  templateUrl: "./menu-section.html",
  styleUrls: ["./menu-section.css"],
  imports: [MenuItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuSection {}
