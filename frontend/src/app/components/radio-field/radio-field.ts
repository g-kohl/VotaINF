import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-field.html',
  styleUrls: ['./radio-field.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class RadioButtonComponent {
  // Array de opções, ex: [{ label: 'Aprovação', value: 'approve' }, { label: 'Reprovação', value: 'reprove' }, { label: 'Abstenção', value: 'abstain' }]
  @Input() options: { label: string; value: any }[] = [];

  // Nome do grupo de radio buttons (para separar grupos)
  @Input() name: string = 'radio';

  // Valor selecionado
  @Input() selectedValue: string = '';
  @Input() isDisabled: boolean = false;

  // Evento emitido quando o valor muda
  @Output() selectedValueChange = new EventEmitter<string>();

  // Função chamada quando o usuário escolhe uma opção
  onSelectionChange(value: any) {
    this.selectedValue = value;
    this.selectedValueChange.emit(value);
  }
}
