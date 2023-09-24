import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import { AnimationsService } from '../../services/animations.service';

const classList: string[] = [
  'relative',
  'outline-0',
  'overflow-hidden',
  'inline-block',
  'bg-blue-400',
  'text-white',
  'border-2',
  'border-blue-400',
  'px-2',
  'py-1',
  'rounded',
  'text-center',
  'text-lg',
  'sm:enabled:hover:shadow',
  'sm:enabled:hover:shadow-blue-400',
  'disabled:cursor-not-allowed',
  'disabled:opacity-60',
  'sm:active:!bg-blue-400',
  'sm:active:!text-white',
  'transition-colors', 
  'transition-shadow', 
  'duration-200'
];

@Directive({
  standalone: true,
  selector: '[appButtonInfo]'
})
export class ButtonInfoDirective implements OnInit {

  constructor(
    private _elementRef: ElementRef,
    private _animationsService: AnimationsService
  ) { }

  ngOnInit(): void {
    this._elementRef.nativeElement.classList.add(...classList);
  }

  @HostListener('click', ['$event']) onMouseWheelChrome(event: any) {
    this._animationsService.animateRipple(event, this._elementRef);
  }
}
