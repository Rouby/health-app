import {
  Alert,
  Badge,
  Button,
  Card,
  Container,
  Group,
  Image,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { IconThumbDown, IconThumbUp } from "@tabler/icons";
import { Link } from "@tanstack/react-location";
import {
  motion,
  useAnimationControls,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { trpc } from "../../utils";

export function InterestsPage() {
  const {
    data: interest,
    mutateAsync: requestInterest,
    isLoading,
  } = trpc.interest.newInterest.useMutation();
  const { mutateAsync: setInterest } = trpc.interest.setInterest.useMutation();

  useEffect(() => {
    requestInterest();
  }, []);

  return (
    <Container>
      {!isLoading && !interest ? (
        <Alert
          mb="md"
          color="orange"
          title={
            <FormattedMessage defaultMessage="No new interests available" />
          }
        >
          <FormattedMessage defaultMessage="Check back later or view your previous interests." />
        </Alert>
      ) : (
        <Alert mb="md">
          <FormattedMessage
            defaultMessage="<b>Swipe right</b> if you'd like to try the practice, <b>swipe left</b> to indicate you are not interested."
            values={{
              b: (chunks) => (
                <Text component="span" weight={500}>
                  {chunks}
                </Text>
              ),
            }}
          />
        </Alert>
      )}
      <InterestCard
        interest={interest}
        onInterested={(interested) =>
          setInterest({ interestId: interest!.id, interested })
        }
        onNext={() => requestInterest()}
      />
      <Stack mt="md">
        <Button component={Link} to="common">
          <FormattedMessage defaultMessage="Common interests with partner" />
        </Button>
        <Button component={Link} to="mine">
          <FormattedMessage defaultMessage="Review your interest-settings" />
        </Button>
      </Stack>
    </Container>
  );
}

function InterestCard({
  interest,
  onInterested,
  onNext,
}: {
  interest?: {
    imagePath: string;
    translationKey: string;
    defaultMessage: string;
    descriptionTranslationKey: string;
    descriptionDefaultMessage: string;
    tags: { translationKey: string; defaultMessage: string }[];
  } | null;
  onInterested: (interested: boolean) => Promise<unknown>;
  onNext: () => Promise<unknown>;
}) {
  const { formatMessage: fmt } = useIntl();

  const controls = useAnimationControls();
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 300], [-40, 40]);
  const opacity = useMotionValue(1);

  const thumbUpOpacity = useTransform(x, [0, 300], [0, 1]);
  const thumbDownOpacity = useTransform(x, [-300, 0], [1, 0]);

  return (
    <motion.div
      style={{
        overflow: "hidden",
        willChange: "transform",
        cursor: "grab",
        position: "relative",
        maxWidth: 400,
      }}
    >
      <motion.div
        style={{ x, rotate, opacity }}
        animate={controls}
        drag="x"
        dragDirectionLock
        whileTap={{ cursor: "grabbing" }}
        transition={{ type: "spring", stiffness: 600, damping: 30 }}
        onDragEnd={(event, info) => {
          const offset = info.offset.x;
          const velocity = info.velocity.x;

          if (offset < -200 || velocity < -500) {
            Promise.all([
              onInterested(false),
              controls.start({
                x: -400,
                opacity: 0,
                transition: { duration: 0.2 },
              }),
              new Promise((resolve) => setTimeout(resolve, 500)),
            ])
              .then(() => onNext())
              .then(() => {
                controls.set({ x: 0 });
                thumbDownOpacity.set(0);
                controls.start({
                  opacity: 1,
                  transition: { duration: 0.5 },
                });
              });
          } else if (offset > 200 || velocity > 500) {
            Promise.all([
              onInterested(true),
              controls.start({
                x: 400,
                opacity: 0,
                transition: { duration: 0.2 },
              }),
              new Promise((resolve) => setTimeout(resolve, 500)),
            ])
              .then(() => onNext())
              .then(() => {
                controls.set({ x: 0 });
                thumbUpOpacity.set(0);
                controls.start({
                  opacity: 1,
                  transition: { duration: 0.5 },
                });
              });
          } else {
            controls.start({
              x: 0,
              transition: { duration: 0.5 },
            });
          }
        }}
      >
        {interest && (
          <Card shadow="md" radius="md" sx={{ maxWidth: 400 }}>
            <Card.Section>
              <Image
                src={interest.imagePath}
                height={250}
                withPlaceholder
                sx={{ pointerEvents: "none" }}
              />
            </Card.Section>

            <Group position="apart" mt="md" mb="xs">
              <Text weight={500}>
                {fmt({
                  id: interest.translationKey,
                  defaultMessage: interest.defaultMessage,
                })}
              </Text>
              <Group noWrap spacing="xs">
                {interest.tags.map((tag) => (
                  <Badge key={tag.translationKey}>
                    {fmt({
                      id: tag.translationKey,
                      defaultMessage: tag.defaultMessage,
                    })}
                  </Badge>
                ))}
              </Group>
            </Group>

            <Text size="xs">
              {fmt({
                id: interest.descriptionTranslationKey,
                defaultMessage: interest.descriptionDefaultMessage,
              })}
            </Text>
          </Card>
        )}
      </motion.div>
      <motion.div style={{ opacity: thumbUpOpacity, pointerEvents: "none" }}>
        <ThemeIcon
          size={100}
          variant="gradient"
          gradient={{ from: "teal", to: "lime", deg: 105 }}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -60%)",
          }}
        >
          <IconThumbUp width="80%" height="80%" strokeWidth={1} />
        </ThemeIcon>
      </motion.div>
      <motion.div style={{ opacity: thumbDownOpacity, pointerEvents: "none" }}>
        <ThemeIcon
          size={100}
          variant="gradient"
          gradient={{ from: "orange", to: "red", deg: 105 }}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -60%)",
          }}
        >
          <IconThumbDown width="80%" height="80%" strokeWidth={1} />
        </ThemeIcon>
      </motion.div>
    </motion.div>
  );
}
