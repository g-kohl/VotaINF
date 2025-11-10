import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-switch',
  standalone: true,
  templateUrl: './button-switch.html',
  styleUrl: './button-switch.css'
})
export class ButtonSwitch {
  @Input() title: string = '';
  @Input() subtitle: string = '';

  isOn: boolean = false;

  @Output() toggleChange = new EventEmitter<boolean>();

  // Função para alternar o estado
  toggle() {
    this.isOn = !this.isOn;
    this.toggleChange.emit(this.isOn);
  }
}
