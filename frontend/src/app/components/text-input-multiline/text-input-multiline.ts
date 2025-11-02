import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-text-input-multiline',
  standalone: true,
  templateUrl: './text-input-multiline.html',
  styleUrl: './text-input-multiline.css'
})
export class TextInputMultiline {
  @Input() title: string = '';
  @Input() placeholder: string = '';

  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();

  onValueChange(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    this.value = target.value;
    this.valueChange.emit(this.value);
  }
}
