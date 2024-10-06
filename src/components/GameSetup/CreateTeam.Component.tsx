import { Button, TextInput } from "@mantine/core";
import { ChangeEvent } from "react";
import styles from "./gameSetup.module.scss";

/**
 * Component that handles team creation
 * @returns - Team creation component
 */
export const CreateTeamComponent = (props: { teamName: string; updateTeamName: (value: string) => void }) => {
  const { updateTeamName, teamName } = props;
  /**
   * Handles team name change events
   * @param event - input change event
   */
  const onTeamNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    updateTeamName(event.target.value);
  };

  return (
    <div className={styles.teamSetupContainer}>
      <section className={styles.teamName}>
        <TextInput
          label="Team Name"
          name="team-name"
          withAsterisk
          placeholder="e.g. Blue"
          value={teamName}
          onChange={onTeamNameChange}
        />
      </section>
      <section className={styles.actions}>
        <Button variant="filled">Create</Button>
      </section>
    </div>
  );
};

export default CreateTeamComponent;
