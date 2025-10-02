declare module "toastify-js" {
  export interface ToastifyOptions {
    text: string;
    duration?: number;
    selector?: string;
    destination?: string;
    newWindow?: boolean;
    close?: boolean;
    gravity?: "top" | "bottom";
    position?: "left" | "center" | "right";
    backgroundColor?: string;
    stopOnFocus?: boolean;
    style?: Partial<CSSStyleDeclaration>;
    offset?: {
      x?: number | string;
      y?: number | string;
    };
    avatar?: string;
    className?: string;
    onClick?: () => void;
    escapeMarkup?: boolean;
  }

  export default function Toastify(options: ToastifyOptions): {
    showToast: () => void;
    hideToast: () => void;
  };
}
