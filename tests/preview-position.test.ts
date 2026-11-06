import assert from "node:assert/strict";
import test from "node:test";
import { placePreview, type ViewportRect } from "../src/lib/preview-position";

const rect = (
  left: number,
  top: number,
  width: number,
  height: number,
): ViewportRect => ({ left, top, width, height, right: left + width });

/** The stage is offset in the viewport to catch viewport/stage coordinate mixups. */
const stage = rect(100, 200, 1200, 640);
const tile = (left: number, top: number) => rect(left, top, 156, 124);

const assertInsideStage = (
  box: ReturnType<typeof placePreview>,
  bounds: ViewportRect,
) => {
  assert.ok(box.left >= 12, `left ${box.left}`);
  assert.ok(box.top >= 12, `top ${box.top}`);
  assert.ok(box.left + box.width <= bounds.width - 12, "right edge");
  assert.ok(box.top + box.maxHeight <= bounds.height - 12, "bottom edge");
};

test("the preview sits to the right of a tile, aligned with its top", () => {
  const anchor = tile(300, 400);
  const box = placePreview(stage, anchor);
  assert.deepEqual(box, { left: 368, top: 200, width: 420, maxHeight: 360 });
  assertInsideStage(box, stage);
});

test("the preview flips to the left of a tile near the right edge", () => {
  const anchor = tile(1100, 400);
  const box = placePreview(stage, anchor);
  assert.equal(box.width, 420);
  assert.equal(box.left + box.width, anchor.left - stage.left - 12);
  assertInsideStage(box, stage);
});

test("the preview stays inside the stage for tiles at the bottom or past the edges", () => {
  for (const anchor of [
    tile(300, 780),
    tile(300, 150),
    tile(20, 400),
    tile(1250, 400),
    tile(1250, 900),
  ])
    assertInsideStage(placePreview(stage, anchor), stage);
  // A tile at the bottom shifts the card up by exactly its reserved height.
  assert.equal(placePreview(stage, tile(300, 780)).top, 640 - 360 - 12);
});

test("the preview narrows instead of covering a tile when neither side fits", () => {
  const narrow = rect(0, 0, 960, 640);
  const anchor = tile(402, 300);
  const box = placePreview(narrow, anchor);
  assert.ok(box.width < 420 && box.width >= 240, `width ${box.width}`);
  assert.ok(
    box.left >= anchor.right + 12 || box.left + box.width <= anchor.left - 12,
    "the card does not overlap the tile",
  );
  assertInsideStage(box, narrow);
});

test("the preview fits a short stage by limiting its height", () => {
  const short = rect(0, 0, 1200, 288);
  const box = placePreview(short, tile(300, 150));
  assert.equal(box.maxHeight, 264);
  assert.equal(box.top, 12);
  assertInsideStage(box, short);
});
