import { ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector, Type } from "@angular/core";
import { ContainerModalComponent } from "../modals/container-modal.component";
import { MakeIdService } from "./make-id.service";
import { Observable, Subject, take } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ModalService {
    private stateModals: { id: string, componentRef: ComponentRef<any>, subjectClose: Subject<void>, close: Subject<void>, obsClose: Observable<any> }[] = [];

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector,
        private _makeIdService: MakeIdService
    ) { }

    public open(component: Type<any>, options?:{data: any}): { componentRef: ComponentRef<any>, close: Observable<any> } {
        const componentContainerRef = this.componentFactoryResolver
            .resolveComponentFactory(ContainerModalComponent)
            .create(this.injector);
        const componentRef = this.componentFactoryResolver
            .resolveComponentFactory(component)
            .create(this.injector);

        this.appRef.attachView(componentContainerRef.hostView);
        this.appRef.attachView(componentRef.hostView);

        const domContainerElem = (componentContainerRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

        const id = `modal-${this._makeIdService.onGetId(56)}`;
        componentContainerRef.instance.id = id;
        domContainerElem.setAttribute('id', id);
        domContainerElem.querySelector('.modal-content')?.append(domElem);

        document.body.appendChild(domContainerElem);

        if (options?.data && componentRef.instance.data !== undefined) {
            componentRef.instance.data = options.data;
        }

        // setTimeout(() => {
        //     this.appRef.detachView(componentRef.hostView);
        //     componentRef.destroy();
        // }, 3000);
        const subjectClose = new Subject<void>();
        const close = new Subject<any>();
        const instance = {
            id: id,
            componentRef: componentContainerRef,
            subjectClose: subjectClose,
            close: close,
            obsClose: new Observable((obs) => {
                subjectClose.pipe(take(1)).subscribe(() => {
                    this.stateModals = this.stateModals.filter((modal) => modal.id !== id);
                    this.appRef.detachView(instance.componentRef.hostView);
                    instance.componentRef.destroy();
                });
                close.pipe(take(1)).subscribe((data) => {
                    if (data !== undefined) {
                        this.stateModals = this.stateModals.filter((modal) => modal.id !== id);
                        this.appRef.detachView(instance.componentRef.hostView);
                        instance.componentRef.destroy();
                        obs.next(data);
                    } else {
                        instance.subjectClose.next();
                    }
                });
            }).pipe(take(1))
        };
        this.stateModals.push(instance);
        componentContainerRef.instance.instance = instance;
        return {
            componentRef: instance.componentRef,
            close: instance.obsClose
        };
    }

    public close(data?: any): void {
        const modal = this.stateModals[this.stateModals.length - 1];
        this.appRef.detachView(modal.componentRef.hostView);
        modal.componentRef.destroy();
        modal.close.next(data || null);
    }
}
