import { Button, Switch, TextInput } from "@mantine/core";
import { ChangeEvent, MouseEvent } from "react";
import styles from "./gameSetup.module.scss";

/**
 * Component that handles team creation
 * @returns - Team creation component
 */
export const CreateTeamComponent = (props: {
  teamName: string;
  halfCourt: boolean;
  updateTeamName: (value: string) => void;
  updateHalfCourtFlag: (value: boolean) => void;
  createTeam: () => void;
}) => {
  const { halfCourt, updateHalfCourtFlag, updateTeamName, teamName, createTeam } = props;

  /**
   * Handles team name change events
   * @param event - input change event
   */
  const onTeamNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    updateTeamName(event.target.value);
  };

  /**
   * Handles team create btn click event
   * @param event - Btn click event
   */
  const onCreateNewTeamClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    createTeam();
  };

  /**
   * Validate team name
   *
   * @param teamName - Team name
   */
  const isTeamNameValid = (teamName: string) => {
    if (!teamName) return false;
    if (teamName.length < 2) return false;

    return true;
  };

  return (
    <div className={styles.teamSetupContainer}>
      <section className={styles.teamName}>
        <Switch
          label="Half Court Setup"
          checked={halfCourt}
          labelPosition="left"
          onChange={(event) => updateHalfCourtFlag(event.currentTarget.checked)}
          description="Use half court or full court layout"
        />
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
        <Button variant="filled" onClick={onCreateNewTeamClick} disabled={!isTeamNameValid(teamName)}>
          Create
        </Button>
      </section>
    </div>
  );
};

export default CreateTeamComponent;
