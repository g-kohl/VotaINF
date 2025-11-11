import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form-time',
  standalone: true,
  templateUrl: './form-time.html',
  styleUrl: './form-time.css'
})
export class FormTime {
  @Input() title: string = '';

  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();

  onValueChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.valueChange.emit(this.value);
  }
}
