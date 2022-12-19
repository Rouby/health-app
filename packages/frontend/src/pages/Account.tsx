import {
  Button,
  Container,
  Group,
  Loader,
  LoadingOverlay,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconChecks, IconQuestionMark } from "@tabler/icons";
import { Link } from "@tanstack/react-location";
import { useEffect, useState, useTransition } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useAuth } from "../state";
import { trpc } from "../utils";

export function AccountPage() {
  const utils = trpc.useContext();

  const { data, isLoading } = trpc.account.get.useQuery(undefined, {
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
  const {
    mutate,
    isLoading: isSaving,
    error,
  } = trpc.account.update.useMutation({
    onSuccess: (result) => {
      utils.account.get.setData(undefined, (data) => ({ ...data, ...result }));
    },
  });

  const [search, setSearch] = useState("");
  const { data: searchResults, isFetching: isSearching } =
    trpc.account.findPartner.useQuery(
      { name: search },
      {
        keepPreviousData: true,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
      }
    );

  const [, setAuth] = useAuth();

  const [, startTransition] = useTransition();

  const { formatMessage } = useIntl();

  const form = useForm({
    initialValues: {
      name: "",
      partnerId: "",
    },

    validate: {
      name: (value) =>
        value.length > 2
          ? null
          : formatMessage({
              defaultMessage: "Name must be at least 3 characters",
            }),
    },
  });

  useEffect(() => {
    form.setValues({
      name: data?.name ?? "",
      partnerId: data?.partner?.id ?? "",
    });
  }, [data]);

  return (
    <>
      <Container sx={{ position: "relative" }}>
        <form
          id="login"
          onSubmit={form.onSubmit((values) =>
            mutate({ name: values.name, partnerId: values.partnerId })
          )}
        >
          <LoadingOverlay visible={isLoading} overlayBlur={2} />
          <Stack>
            <TextInput
              required
              minLength={3}
              name="name"
              label={<FormattedMessage defaultMessage="Name" />}
              placeholder={<FormattedMessage defaultMessage="Your name" />}
              {...form.getInputProps("name")}
            />

            <Select
              label={<FormattedMessage defaultMessage="Partner" />}
              clearable
              searchable
              searchValue={search}
              onSearchChange={setSearch}
              data={[
                ...(searchResults?.map(({ id, name }) => ({
                  value: id,
                  label: name,
                })) ?? []),
                ...(data?.partner
                  ? [{ value: data.partner.id, label: data.partner.name }]
                  : []),
              ]}
              nothingFound={<FormattedMessage defaultMessage="No user found" />}
              icon={
                data?.partner ? (
                  !data?.partnerProposer ? (
                    <IconQuestionMark stroke={1.5} />
                  ) : (
                    <IconChecks stroke={1.5} />
                  )
                ) : null
              }
              rightSection={isSearching ? <Loader size={16} /> : null}
              description={
                data?.partnerProposer && !data.partner ? (
                  <Text
                    variant="link"
                    onClick={() =>
                      mutate({ partnerId: data.partnerProposer?.id })
                    }
                  >
                    <FormattedMessage
                      defaultMessage="Accept request from {proposer}"
                      values={{ proposer: data.partnerProposer.name }}
                    />
                  </Text>
                ) : null
              }
              {...form.getInputProps("partnerId")}
            />
          </Stack>

          <Group position="apart" mt="md" noWrap>
            <Text color="red">{error?.message}</Text>
            <Group position="right" noWrap>
              <Button
                variant="outline"
                component={Link}
                to="/"
                onClick={() => {
                  startTransition(() => {
                    setAuth({ token: null, persist: true });
                    setAuth({ token: null, persist: false });
                  });
                }}
              >
                <FormattedMessage defaultMessage="Logout" />
              </Button>
              <Button type="submit" loading={isSaving}>
                <FormattedMessage defaultMessage="Save" />
              </Button>
            </Group>
          </Group>
        </form>
      </Container>
    </>
  );
}
