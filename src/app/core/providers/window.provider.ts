import { isPlatformBrowser } from '@angular/common';
import { ClassProvider, FactoryProvider, InjectionToken, PLATFORM_ID, Provider } from '@angular/core';

type URLType = typeof window.URL;

// Definición del token de inyección para la ventana
export const WINDOW = new InjectionToken<Window & { URL: URLType }>('windowToken');

// Definición abstracta para la referencia a Window, para su uso en distintos entornos
export abstract class WindowRef {
  abstract get nativeWindow(): Window | object;
}

// Implementación para entornos de navegador
export class BrowserWindowRef extends WindowRef {
  override get nativeWindow(): Window {
    return window;
  }
}

// Fábrica para determinar si estamos en un entorno de navegador o no
export function windowFactory(browserWindowRef: BrowserWindowRef, platformId: object): Window | object {
  return isPlatformBrowser(platformId) ? browserWindowRef.nativeWindow : {};
}

// Proveedor para la implementación de `WindowRef` en entornos de navegador
const browserWindowProvider: ClassProvider = {
  provide: WindowRef,
  useClass: BrowserWindowRef,
};

// Proveedor de fábrica que selecciona entre el objeto `window` o un objeto vacío en función de la plataforma
const windowProvider: FactoryProvider = {
  provide: WINDOW,
  useFactory: windowFactory,
  deps: [WindowRef, PLATFORM_ID],
};

// Exportación del conjunto de proveedores para ser utilizados en el módulo de la aplicación
export const WINDOW_PROVIDERS: Provider[] = [browserWindowProvider, windowProvider];
