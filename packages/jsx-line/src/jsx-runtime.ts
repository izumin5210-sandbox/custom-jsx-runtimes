const emojis = {
  laugh: { productId: "5ac1bfd5040ab15980c9b435", emojiId: "002" },
};

export namespace JSX {
  export type IntrinsicElements = {
    message: {};
    mention: { type: "user"; userId: string };
    emoji: { name: keyof typeof emojis };
  };

  export type Element = Node | string | null;

  export type Node<P = {}> = {
    type: keyof IntrinsicElements;
    props: P;
  };

  export type Component<P> = (props: P) => Node<P>;
}

export function jsx(
  component: JSX.Component<any> | keyof JSX.IntrinsicElements,
  props: any,
): any {
  if (typeof component === "string") {
    switch (component) {
      case "message": {
        const chunks: string[] = [];
        const substitution: Record<string, any> = {};
        for (const child of props.children) {
          if (typeof child === "string") {
            chunks.push(child);
          } else {
            const id = generateRandomId();
            chunks.push(`{${id}}`);
            substitution[id] = child;
          }
        }
        return {
          type: "textV2",
          text: chunks.join(""),
          substitution,
        };
      }
      case "emoji": {
        return {
          type: "emoji",
          ...emojis[props.name as keyof typeof emojis],
        };
      }
      case "mention": {
        return {
          type: "mention",
          mentionee: props,
        };
      }
      default: {
        return null;
      }
    }
  }
  return component({ ...props });
}

export function jsxs<P>(
  component: JSX.Component<P>,
  props: P,
): JSX.Node<P> | null {
  return jsx(component, props);
}

function generateRandomId(): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) => characters[byte % characters.length]).join(
    "",
  );
}
