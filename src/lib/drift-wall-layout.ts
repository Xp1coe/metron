/**
 * Vertical layout of a Drift Wall column.
 *
 * Each column is a track holding several copies of its tiles. The track moves
 * by an offset that wraps within one copy, so the loop is seamless. The plane
 * holding the tracks is centered on the stage, which means the tiles must
 * cover the plane's center, not the top of the track.
 */

/**
 * Distance above and below the plane's center that tiles must cover. It is
 * larger than half the stage to allow for the tilt, perspective, and tile lift.
 */
export const wallReach = (stageHeight: number) => stageHeight * 0.8;

/** Copies needed to cover the reach for every offset within one copy. */
export const wallCopies = (reach: number, copyHeight: number) =>
  Math.max(2, Math.ceil((reach * 2) / copyHeight) + 1);

/**
 * Translation of a track for an offset in [0, copyHeight). The track starts at
 * the top edge of the covered range, so its spare copy is always below it.
 */
export const trackShift = (
  planeHeight: number,
  reach: number,
  offset: number,
) => planeHeight / 2 - reach - offset;

/**
 * The copy of a tile that can sit on the plane's center while the offset stays
 * within one copy. `tileCenter` is measured from the top of a copy.
 */
export const centeringCopy = (
  reach: number,
  copyHeight: number,
  tileCenter: number,
) => Math.max(0, Math.ceil((reach - tileCenter) / copyHeight));

/** Offset that puts the given copy of a tile on the plane's center. */
export const centeringOffset = (
  reach: number,
  copyHeight: number,
  tileCenter: number,
  copy: number,
) => copy * copyHeight + tileCenter - reach;
