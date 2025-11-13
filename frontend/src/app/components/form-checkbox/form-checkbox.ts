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
  @Output() checkedChange = new EventEmitter<boolean>();

  onChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.checkedChange.emit(target.checked);
  }


}
