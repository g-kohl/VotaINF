import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from "@angular/core";
@Component({
  selector: "app-menu-item",
  standalone: true,
  templateUrl: "./menu-item.html",
  styleUrls: ["./menu-item.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuItemComponent {
  @Input() title: string = '';
  @Input() route: string = '';
  @Output() clicked = new EventEmitter<string>();

  onClick() {
    this.clicked.emit(this.route);
  }
}