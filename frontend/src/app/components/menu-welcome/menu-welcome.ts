import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { AvatarComponent } from "../user-avatar/user-avatar";
@Component({
  selector: "app-menu-welcome",
  standalone: true,
  templateUrl: "./menu-welcome.html",
  styleUrls: ["./menu-welcome.css"],
  imports: [AvatarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuWelcome {}
