import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
@Component({
  selector: "app-avatar",
  standalone: true,
  templateUrl: "./user-avatar.html",
  styleUrls: ["./user-avatar.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent {
  @Input() initials: string = "L";
  @Input() type = "Initial";
  @Input() size = "Large";
  @Input() shape = "Circle";
}
