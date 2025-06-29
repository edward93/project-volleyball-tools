import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useAppSelector } from "reduxTools/hooks";

import styles from "./team-settings.module.scss";

/** Team settings tool props */
type TeamSettingsToolProps = {
  teamId: string;
};

// TODO: Make sure subs and potentially other settings reset when new set starts
/**
 * Team settings Tool Component
 * @returns - Team settings Tool Component
 */
const TeamSettingsComponent = (props: TeamSettingsToolProps) => {
  // props deconstruct
  const { teamId } = props;
  const team = useAppSelector((selector) => selector.teams.byId[teamId]);

  // modal controls
  const [opened, { open, close }] = useDisclosure(false);

  // game sate
  const { currentStateId } = useAppSelector((selector) => selector.gameState);
  const currentState = useAppSelector((selector) => selector.gameState.byId[currentStateId ?? ""]);

  // TODO: simplify getting latest entity from the dependency of the game state
  // team settings
  const currentTeamSettingsId = currentState?.dependencies?.teamSettingsIds?.[teamId];
  const teamSettings = useAppSelector((selector) =>
    currentTeamSettingsId
      ? selector.teamSettings.byId[currentTeamSettingsId]
      : Object.values(selector.teamSettings.byId).filter((c) => c.teamId === teamId)[0],
  );

  /**
   * Handles `Team settings` btn click event
   * @param event - Click event
   */
  const onTeamSettingsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    open();
  };

  return (
    <div className={styles.container}>
      <Modal opened={opened} onClose={close} title={`${team.name} Settings`} centered size="md">
        <div className={styles.modalContent}>
          <section>
            <Text size="sm">Substitution: {`${teamSettings.subs.substitutionsMade}/${teamSettings.subs.maxSubstitutions}`}</Text>
          </section>
          <section>
            <Text size="sm">Timeouts: {`${teamSettings.timeouts.timeoutsMade}/${teamSettings.timeouts.maxTimeouts}`}</Text>
          </section>
          <section>
            <Text size="sm">
              Challenges: {`${teamSettings.challenges.challengesMade}/${teamSettings.challenges.maxChallenges}`}
            </Text>
          </section>
          <section className={styles.actions}>
            <Button variant="outline" color="gray" onClick={close}>
              Cancel
            </Button>
            <Button variant="filled" color="" onClick={close}>
              Confirm
            </Button>
          </section>
        </div>
      </Modal>
      <Button
        variant="outline"
        size="xs"
        fullWidth
        radius="xs"
        color="gray"
        leftIcon={<FontAwesomeIcon icon={faGear} />}
        onClick={onTeamSettingsClick}
      >
        Team Settings
      </Button>
    </div>
  );
};

export default TeamSettingsComponent;
