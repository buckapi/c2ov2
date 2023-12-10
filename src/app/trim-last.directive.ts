import { Directive,ElementRef } from '@angular/core';

@Directive({
  selector: '[appTrimLast]'
})
export class TrimLastDirective {
  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    const element = this.el.nativeElement;
    const originalText = element.innerText;
    const trimmedText = originalText.substring(originalText.length - 4);
    element.innerText = trimmedText;
  }

}
