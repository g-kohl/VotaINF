import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form-date',
  standalone: true,
  templateUrl: './form-date.html',
  styleUrl: './form-date.css'
})
export class FormDate {
  @Input() title: string = '';
  @Input() id: string = '';

  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();

  onValueChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.valueChange.emit(this.value);
  }
}
