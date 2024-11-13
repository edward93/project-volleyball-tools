import { CourtPosition, CourtPositionCoordinates, HalfCourt, RotationPositionType } from "types/volleyballTool.New.Types";

//#region positions for half court layout
// half court constants
const HALF_COURT_LEFT_X = 900;
const HALF_COURT_MIDDLE_X = 1200;
const HALF_COURT_RIGHT_X = 1500;
const HALF_COURT_FRONT_ROW_Y = 250;
const HALF_COURT_BACK_ROW_Y = 700;

// TODO: positions for half court (vertical)
export const FrontLeft: CourtPositionCoordinates = {
  id: 4,
  halfCourt: HalfCourt.Left,
  x: HALF_COURT_LEFT_X,
  y: HALF_COURT_FRONT_ROW_Y,
};

export const FrontMiddle: CourtPositionCoordinates = {
  id: 3,
  halfCourt: HalfCourt.Left,
  x: HALF_COURT_MIDDLE_X,
  y: HALF_COURT_FRONT_ROW_Y,
};

export const FrontRight: CourtPositionCoordinates = {
  id: 2,
  halfCourt: HalfCourt.Left,
  x: HALF_COURT_RIGHT_X,
  y: HALF_COURT_FRONT_ROW_Y,
};

export const BackLeft: CourtPositionCoordinates = {
  id: 5,
  halfCourt: HalfCourt.Left,
  x: HALF_COURT_LEFT_X,
  y: HALF_COURT_BACK_ROW_Y,
};

export const BackMiddle: CourtPositionCoordinates = {
  id: 6,
  halfCourt: HalfCourt.Left,
  x: HALF_COURT_MIDDLE_X,
  y: HALF_COURT_BACK_ROW_Y,
};

export const BackRight: CourtPositionCoordinates = {
  id: 1,
  halfCourt: HalfCourt.Left,
  x: HALF_COURT_RIGHT_X,
  y: HALF_COURT_BACK_ROW_Y,
};

/** Default location of positions for half court vertical view */
export const DefaultRotationPositionsVertical = {
  1: BackRight,
  2: FrontRight,
  3: FrontMiddle,
  4: FrontLeft,
  5: BackLeft,
  6: BackMiddle,
};

//#endregion

//#region positions for full court (horizontal) layout

//some constants
const BACK_ROW_X_HZ = 600;
const FRONT_ROW_X_HZ = 950;
export const LeftCourtPos1: CourtPositionCoordinates = {
  id: 1,
  halfCourt: HalfCourt.Left,
  x: BACK_ROW_X_HZ,
  y: 940,
};
export const RightCourtPos1: CourtPositionCoordinates = {
  id: 1,
  halfCourt: HalfCourt.Right,
  x: 1800,
  y: 250,
};

export const LeftCourtPos2: CourtPositionCoordinates = {
  id: 2,
  halfCourt: HalfCourt.Left,
  x: FRONT_ROW_X_HZ,
  y: 940,
};
export const RightCourtPos2: CourtPositionCoordinates = {
  id: 2,
  halfCourt: HalfCourt.Right,
  x: 1345,
  y: 250,
};

export const LeftCourtPos3: CourtPositionCoordinates = {
  id: 3,
  halfCourt: HalfCourt.Left,
  x: FRONT_ROW_X_HZ,
  y: 600,
};
export const RightCourtPos3: CourtPositionCoordinates = {
  id: 3,
  halfCourt: HalfCourt.Right,
  x: 1345,
  y: 600,
};

export const LeftCourtPos4: CourtPositionCoordinates = {
  id: 4,
  halfCourt: HalfCourt.Left,
  x: FRONT_ROW_X_HZ,
  y: 250,
};
export const RightCourtPos4: CourtPositionCoordinates = {
  id: 4,
  halfCourt: HalfCourt.Right,
  x: 1345,
  y: 940,
};

export const LeftCourtPos5: CourtPositionCoordinates = {
  id: 5,
  halfCourt: HalfCourt.Left,
  x: BACK_ROW_X_HZ,
  y: 250,
};
export const RightCourtPos5: CourtPositionCoordinates = {
  id: 5,
  halfCourt: HalfCourt.Right,
  x: 1800,
  y: 940,
};

export const LeftCourtPos6: CourtPositionCoordinates = {
  id: 6,
  halfCourt: HalfCourt.Left,
  x: BACK_ROW_X_HZ,
  y: 600,
};
export const RightCourtPos6: CourtPositionCoordinates = {
  id: 6,
  halfCourt: HalfCourt.Right,
  x: 1800,
  y: 600,
};

/** Rotation positional coordinates */
export const RotationPositions: RotationPositionType = {
  1: {
    [HalfCourt.Left]: LeftCourtPos1,
    [HalfCourt.Right]: RightCourtPos1,
  },
  2: {
    [HalfCourt.Left]: LeftCourtPos2,
    [HalfCourt.Right]: RightCourtPos2,
  },
  3: {
    [HalfCourt.Left]: LeftCourtPos3,
    [HalfCourt.Right]: RightCourtPos3,
  },
  4: {
    [HalfCourt.Left]: LeftCourtPos4,
    [HalfCourt.Right]: RightCourtPos4,
  },
  5: {
    [HalfCourt.Left]: LeftCourtPos5,
    [HalfCourt.Right]: RightCourtPos5,
  },
  6: {
    [HalfCourt.Left]: LeftCourtPos6,
    [HalfCourt.Right]: RightCourtPos6,
  },
};

//#endregion

/** All court positions */
export const CourtPositions: CourtPosition[] = [1, 2, 3, 4, 5, 6];