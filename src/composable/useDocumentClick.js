import { useEventListener } from "@/composable/useEventListener.js";

export function useDocumentClick(callback) {
  useEventListener(document, "click", (event) => {
    callback(event, event.type);
  });
}
