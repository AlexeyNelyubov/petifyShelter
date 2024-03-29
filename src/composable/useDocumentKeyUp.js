import { useEventListener } from "/src/composable/useEventListener.js";

export function useDocumentKeyUp(callback, key) {
  useEventListener(document, "keyup", (event) => {
    if (event.key === key) {
      callback(event, event.type);
    }
  });
}
