import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { MenuHeader } from "../menu-header/menu-header";
import { MenuItemComponent } from "../menu-item/menu-item";
import { MenuSection } from "../menu-section/menu-section";
import { MenuSeparator } from "../menu-separator/menu-separator";
import { MenuWelcome } from "../menu-welcome/menu-welcome";
import { AvatarComponent } from "../user-avatar/user-avatar";
import { LogoCheckCircle } from "../logo-check-circle/logo-check-circle";
import { Router } from "@angular/router";

@Component({
  selector: "app-menu",
  standalone: true,
  templateUrl: "./menu-component.html",
  styleUrls: ["./menu-component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MenuHeader, MenuItemComponent, MenuSection, MenuSeparator, MenuWelcome, 
    AvatarComponent, LogoCheckCircle
  ]
})
export class MenuComponent {
  constructor(private router: Router) {}

  onMenuItemClick(route: string) {
    console.log('Item clicado:', route);
    this.router.navigate([route]);
  }
  
}
