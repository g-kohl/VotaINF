import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { AvatarComponent } from "../user-avatar/user-avatar";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-menu-welcome",
  standalone: true,
  templateUrl: "./menu-welcome.html",
  styleUrls: ["./menu-welcome.css"],
  imports: [AvatarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuWelcome {
  user: any;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.user = this.userService.getUser();
  }

  get initials(){
    if (!this.user?.username) return "";

    return this.user.username.substring(0, 1).toUpperCase();
  }
}
