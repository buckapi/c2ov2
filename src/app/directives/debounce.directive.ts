import { Directive, Input, Output, EventEmitter, ElementRef, OnDestroy } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Subscription, fromEvent, timer } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
  selector: '[appDebounce]'
})
export class DebounceDirective implements OnDestroy {
  @Input() delay = 2000; // Adjust the delay as needed (2 seconds in this case)
  @Output() ngModelChangeDebounced = new EventEmitter();

  private subscription: Subscription;

  constructor(private el: ElementRef, private ngModel: NgModel) {
    this.subscription = fromEvent(el.nativeElement, 'input')
      .pipe(debounceTime(this.delay))
      .subscribe(() => {
        this.ngModelChangeDebounced.emit(this.ngModel.model);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
