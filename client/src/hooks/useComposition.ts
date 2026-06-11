import * as React from "react";

export function useComposition<T extends HTMLElement>(props: {
  onKeyDown?: React.KeyboardEventHandler<T>;
  onCompositionStart?: React.CompositionEventHandler<T>;
  onCompositionEnd?: React.CompositionEventHandler<T>;
}) {
  return {
    onKeyDown: props.onKeyDown,
    onCompositionStart: props.onCompositionStart,
    onCompositionEnd: props.onCompositionEnd,
  };
}
