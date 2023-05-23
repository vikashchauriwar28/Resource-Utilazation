import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCapitalizeName]'
})
export class CapitalizeNameDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input') onInput() {
    const value: string = this.el.nativeElement.value;
    const capitalizedValue = this.capitalizeName(value);
    this.el.nativeElement.value = capitalizedValue;
  }

  capitalizeName(value: string): string {
    const words = value.split(' ');

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      if (word.length > 0) {
        const firstChar = word.charAt(0).toUpperCase();
        const restOfWord = word.substring(1).toLowerCase();
        words[i] = firstChar + restOfWord;
      }
    }

    return words.join(' ');
  }

}
