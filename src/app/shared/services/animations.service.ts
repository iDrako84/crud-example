import { ElementRef, Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AnimationsService {
  private renderer: Renderer2;

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  /**
   * Creazione animazione
   * @param e Evento del mouse con parametri
   * @param el Elemento del DOM
   */
  public animateRipple(e: MouseEvent, el: ElementRef) {
    const div = this.renderer.createElement('div');
    this.renderer.appendChild(el.nativeElement, div);
    const d = Math.max(el.nativeElement.clientWidth, el.nativeElement.clientHeight);
    div.style.width = div.style.height = d + 'px';
    const rect = el.nativeElement.getBoundingClientRect();
    div.style.left = e.clientX - rect.left - d / 2 + 'px';
    div.style.top = e.clientY - rect.top - d / 2 + 'px';
    div.style.borderRadius = '50%';
    div.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
    div.style.position = 'absolute';
    div.style.WebkitTransform = 'scale(0)';
    div.style.transform = 'scale(0)';
    div.style.WebkitAnimation = 'ripple 300ms linear';
    div.style.animation = 'ripple 300ms linear';
    setTimeout(() => {
      this.renderer.removeChild(el.nativeElement, div);
    }, 400);
  }
}
