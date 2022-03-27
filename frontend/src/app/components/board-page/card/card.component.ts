import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from 'src/app/shared/models/card.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() card!: Card;
  @Output() emitDeleteCard: EventEmitter<{ cardId: string }> = new EventEmitter();

  deleteCard(cardId: string) {
    this.emitDeleteCard.emit({ cardId });
  }
  
}
