import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { LogoCheckCircle } from '../logo-check-circle/logo-check-circle';

@Component({
  selector: "app-menu-header",
  standalone: true,
  templateUrl: "./menu-header.html",
  styleUrls: ["./menu-header.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LogoCheckCircle]
})
export class MenuHeader {}
