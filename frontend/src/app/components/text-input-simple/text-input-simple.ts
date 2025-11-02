import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-text-input-simple',
  standalone: true,
  templateUrl: './text-input-simple.html',
  styleUrl: './text-input-simple.css'
})
export class TextInputSimple {
  @Input() title: string = '';
  @Input() placeholder: string = '';

  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();

  onValueChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.valueChange.emit(this.value);
  }
}
