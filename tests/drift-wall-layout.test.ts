import assert from "node:assert/strict";
import test from "node:test";
import {
  centeringCopy,
  centeringOffset,
  trackShift,
  wallCopies,
  wallReach,
} from "../src/lib/drift-wall-layout";

/** The catalog's wall: 108 platforms in 8 columns of 124px rows. */
const ROW = 124;
const columnRows = [14, 14, 14, 14, 13, 13, 13, 13];
const stageHeights = [288, 600, 640, 950, 1400, 2200];

const layout = (stageHeight: number, rows = columnRows) => {
  const reach = wallReach(stageHeight);
  const columns = rows.map((count) => {
    const copyHeight = count * ROW;
    return { copyHeight, copies: wallCopies(reach, copyHeight) };
  });
  const planeHeight = Math.max(
    ...columns.map((column) => column.copyHeight * column.copies),
  );
  return { reach, columns, planeHeight };
};

test("every column covers the area around the plane's center at every offset", () => {
  for (const stageHeight of stageHeights) {
    const { reach, columns, planeHeight } = layout(stageHeight);
    const center = planeHeight / 2;
    for (const { copyHeight, copies } of columns)
      for (let offset = 0; offset < copyHeight; offset += 7) {
        const top = trackShift(planeHeight, reach, offset);
        const bottom = top + copyHeight * copies;
        const where = `stage ${stageHeight}, copy ${copyHeight}, offset ${offset}`;
        assert.ok(top <= center - reach, `gap above: ${where}`);
        assert.ok(bottom >= center + reach, `gap below: ${where}`);
      }
  }
});

test("an unshifted track leaves a gap below the center, which is the bug", () => {
  const { columns, planeHeight } = layout(950);
  const { copyHeight, copies } = columns[0];
  const offset = copyHeight - 1;
  const bottomWithoutShift = copyHeight * copies - offset;
  assert.ok(bottomWithoutShift < planeHeight / 2 + 950 / 2);
});

test("short columns get enough copies to cover a tall stage", () => {
  const { reach, columns, planeHeight } = layout(1400, [1, 2, 3]);
  for (const { copyHeight, copies } of columns) {
    const bottom =
      trackShift(planeHeight, reach, copyHeight - 1) + copyHeight * copies;
    assert.ok(bottom >= planeHeight / 2 + reach);
  }
});

test("a focused tile is centered using a copy that keeps the column covered", () => {
  for (const stageHeight of stageHeights) {
    const { reach, columns, planeHeight } = layout(stageHeight);
    columns.forEach(({ copyHeight, copies }, column) => {
      for (let index = 0; index < columnRows[column]; index += 1) {
        const tileCenter = (index + 0.5) * ROW;
        const copy = centeringCopy(reach, copyHeight, tileCenter);
        const offset = centeringOffset(reach, copyHeight, tileCenter, copy);
        assert.ok(copy >= 0 && copy < copies, `copy ${copy} of ${copies}`);
        assert.ok(offset >= 0 && offset < copyHeight, `offset ${offset}`);
        const centerOfTile =
          trackShift(planeHeight, reach, offset) +
          copy * copyHeight +
          tileCenter;
        assert.ok(Math.abs(centerOfTile - planeHeight / 2) < 1e-6);
      }
    });
  }
});
