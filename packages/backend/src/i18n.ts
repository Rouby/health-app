import { interpolateName } from "@formatjs/ts-transformer";

export function defineMessage({
  description,
  ...message
}: {
  defaultMessage: string;
  description?: string;
  values?: any;
}): MessageDescriptor {
  return {
    ...message,

    id: interpolateName({}, "[sha512:contenthash:base64:6]", {
      content: description
        ? `${message.defaultMessage}#${
            typeof description === "string"
              ? description
              : JSON.stringify(description)
          }`
        : message.defaultMessage,
    }),
  };
}

export type MessageDescriptor = {
  id: string;
  defaultMessage: string;
  values?: any;
};
