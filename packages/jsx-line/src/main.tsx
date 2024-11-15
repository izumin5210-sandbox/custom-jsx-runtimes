import { pushMessage } from "./pushMessage";

const toId = process.env["LINE_MESSAGE_TO"]!;
const userId = process.env["LINE_USER_ID"]!;
const accessToken = process.env["LINE_ACCESS_TOKEN"]!;

type User = { id: string };

function UserMention({ user }: { user: User }) {
  return <mention type="user" userId={user.id} />;
}

function Sample({ user }: { user: User }) {
  return (
    <message>
      Hello, <UserMention user={user} /> <emoji name="laugh" />
    </message>
  );
}

pushMessage({
  toId,
  message: <Sample user={{ id: userId }} />,
  accessToken,
});
