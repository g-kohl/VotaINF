import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
@Component({
  selector: "app-check-circle",
  standalone: true,
  templateUrl: "./logo-check-circle.html",
  styleUrls: ["./logo-check-circle.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoCheckCircle {
  @Input() size = "48";
}
