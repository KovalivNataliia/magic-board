import { Component, Output, EventEmitter } from '@angular/core';
import { colors } from 'src/app/shared/enum-data/colors';

@Component({
  selector: 'app-color-panel',
  templateUrl: './color-panel.component.html',
  styleUrls: ['./color-panel.component.scss']
})

export class ColorPanelComponent {

  @Output() emitSetColor: EventEmitter<{ color: string }> = new EventEmitter();
  colorsData = Object.values(colors)

  setColor(color: string) {
    this.emitSetColor.emit({ color })
  }

}
