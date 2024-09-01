import {
  Box,
  Collapse,
  Container,
  Overlay,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { usePrevious, useToggle } from "@mantine/hooks";
import { useMatchRoute, useNavigate } from "@tanstack/react-location";
import { motion } from "framer-motion";
import { useIntl } from "react-intl";
import { trpc } from "../../utils";

export function PositionsPage() {
  const { formatMessage: fmt } = useIntl();
  const { data: positions } = trpc.interest.positions.useQuery();
  const nav = useNavigate();
  const matches = useMatchRoute();
  const selected = matches({ to: ":id" });
  const selectedPosition = positions?.find(
    (position) => position.id === selected?.id
  );
  const lastSelected = usePrevious(selectedPosition?.id);

  const theme = useMantineTheme();

  return (
    <Container>
      <Box
        sx={(theme) => ({
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, 70px)",
          gap: theme.spacing.xs,
          justifyContent: "center",
        })}
      >
        {positions?.map((position) => (
          <Card
            key={position.id}
            id={position.id}
            label={fmt({
              id: position.translationKey,
              defaultMessage: position.defaultMessage,
            })}
            imagePath={position.imagePath}
            isSelected={selected?.id === position.id}
            wasSelected={lastSelected === position.id}
            isActive={position.userIntents.some((intent) => intent.done)}
            onSelect={() =>
              selected?.id === position.id
                ? nav({ to: "." })
                : nav({ to: position.id })
            }
          />
        ))}
        <DetailCard
          isVisible={!!selectedPosition}
          key={selectedPosition?.id ?? ""}
          id={selectedPosition?.id ?? ""}
          imagePath={selectedPosition?.imagePath ?? ""}
          isActive={
            selectedPosition?.userIntents.some((intent) => intent.done) ?? false
          }
          label={
            selectedPosition
              ? fmt({
                  id: selectedPosition?.translationKey,
                  defaultMessage: selectedPosition?.defaultMessage,
                })
              : null
          }
          description={
            selectedPosition
              ? fmt({
                  id: selectedPosition?.descriptionTranslationKey,
                  defaultMessage: selectedPosition?.descriptionDefaultMessage,
                })
              : null
          }
          onSelect={() => nav({ to: "." })}
        />
      </Box>
    </Container>
  );
}

function Card({
  id,
  imagePath,
  isActive,
  isSelected,
  wasSelected,
  label,
  onSelect,
}: {
  id: string;
  imagePath: string;
  isSelected: boolean;
  wasSelected: boolean;
  isActive: boolean;
  label: React.ReactNode;
  onSelect: () => void;
}) {
  if (isSelected) {
    return <div />;
  }

  return (
    <motion.img
      onClick={onSelect}
      layout
      layoutId={id}
      transition={{ duration: 0.2 }}
      style={{
        filter: isActive ? undefined : "grayscale(100%)",
        objectFit: "contain",
        backgroundColor: "white",
        zIndex: wasSelected ? 1 : 0,
      }}
      width={70}
      height={70}
      src={imagePath}
    />
  );
}

function DetailCard({
  id,
  isVisible,
  imagePath,
  isActive,
  label,
  description,
  onSelect,
}: {
  isVisible: boolean;
  id: string;
  imagePath: string;
  isActive: boolean;
  label: React.ReactNode;
  description: React.ReactNode;
  onSelect: () => void;
}) {
  const theme = useMantineTheme();
  const [hideDescription, toggleHideDescription] = useToggle();

  return (
    <Box
      sx={{
        position: "fixed",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        zIndex: 10,
        pointerEvents: isVisible ? "all" : "none",
      }}
    >
      {isVisible && (
        <>
          <Overlay opacity={0.6} color="#000" zIndex={5} onClick={onSelect} />
          <Box
            sx={{
              position: "absolute",
              zIndex: 6,
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <motion.div
              key={id}
              layout
              layoutId={id}
              transition={{ duration: 0.4 }}
            >
              <motion.img
                style={{
                  filter: isActive ? undefined : "grayscale(100%)",
                  width: "80vmin",
                  height: "80vmin",
                  objectFit: "contain",
                  backgroundColor: "white",
                  borderRadius: theme.radius.lg,
                  ...(hideDescription
                    ? {
                        borderBottomLeftRadius: theme.radius.lg,
                        borderBottomRightRadius: theme.radius.lg,
                      }
                    : {
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0,
                      }),
                }}
                width={70}
                height={70}
                src={imagePath}
              />
              <Text
                variant="gradient"
                gradient={{ from: "indigo", to: "orange", deg: -145 }}
                weight={700}
                sx={{
                  position: "absolute",
                  top: 0,
                  left: "2%",
                  fontSize: "3cqh",
                }}
              >
                {label}
              </Text>
              <Collapse in={!hideDescription}>
                <Box
                  sx={(theme) => ({
                    background: theme.white,
                    borderRadius: theme.radius.md,
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0,
                    padding: theme.spacing.xs,
                    marginTop: -1,
                  })}
                  onClick={() => toggleHideDescription()}
                >
                  <Text size="xs" color="black">
                    {description}
                  </Text>
                </Box>
              </Collapse>
            </motion.div>
          </Box>
        </>
      )}
    </Box>
  );
}
