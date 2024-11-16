import type { JSX } from "./jsx-runtime";

export async function pushMessage({
  toId,
  message,
  accessToken,
}: {
  toId: string;
  message: JSX.Element;
  accessToken: string;
}) {
  console.log({
    toId,
    message,
    accessToken,
  });
  const res = await fetch("https://api.line.me/v2/bot/message/push", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      to: toId,
      messages: [message],
    }),
  });
  console.error(await res.text());
}
