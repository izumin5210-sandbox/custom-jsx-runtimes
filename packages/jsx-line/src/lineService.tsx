import type { ServiceImpl } from "@connectrpc/connect";
import type { LineService, User } from "./__generated__/tskaigikansai/line_pb";
import { pushMessage } from "./pushMessage";

const accessToken = process.env["LINE_ACCESS_TOKEN"]!;

export const lineService: ServiceImpl<typeof LineService> = {
  async sendHelloMessage(req) {
    console.log("sendHelloMessage", req);
    await pushMessage({
      toId: req.toId,
      message: <HelloMessage user={req.mentionedUser!} />,
      accessToken,
    });
    return {};
  },
};

function HelloMessage({ user }: { user: User }) {
  console.log(user);
  return (
    <message>
      Hello, <mention type="user" userId={user.id} />
    </message>
  );
}
