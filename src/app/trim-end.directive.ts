import { Directive,ElementRef } from '@angular/core';

@Directive({
  selector: '[appTrimEnd]'
})
export class TrimEndDirective {
  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    const element = this.el.nativeElement;
    const originalText = element.innerText;
    const trimmedText = originalText.slice(0, -5);
    element.innerText = trimmedText;
  }

}
