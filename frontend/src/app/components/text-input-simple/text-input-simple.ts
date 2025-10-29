import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-text-input-simple',
  standalone: true,
  templateUrl: './text-input-simple.html',
  styleUrl: './text-input-simple.css'
})
export class TextInputSimple {
  @Input() title: string = '';
  @Input() placeholder: string = '';
}
