import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form-checkbox',
  standalone: true,
  templateUrl: './form-checkbox.html',
  styleUrl: './form-checkbox.css'
})
export class FormCheckbox {
  @Input() itemId: number = 0;
  @Input() title: string = '';
  @Input() subtitle: string = '';

  @Input() checked: boolean = false;
  @Output() checkedChange = new EventEmitter<boolean>();

  onCheckedChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.checked = target.checked;
    this.checkedChange.emit(this.checked);
  }
}
