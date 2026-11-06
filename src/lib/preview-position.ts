/** Any rectangle in viewport coordinates, such as a DOMRect. */
export interface ViewportRect {
  left: number;
  top: number;
  right: number;
  width: number;
  height: number;
}

/** Position and size of the preview card, relative to the gallery stage. */
export interface PreviewBox {
  left: number;
  top: number;
  width: number;
  maxHeight: number;
}

const MARGIN = 12;
const WIDTH = 420;
const MIN_WIDTH = 240;
const MAX_HEIGHT = 360;

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(value, max));

/**
 * Place the Spotlight preview beside a tile and inside the gallery stage.
 * The card prefers the tile's right side, then its left. When neither side has
 * room for the full width it narrows on the roomier side instead of covering
 * the tile. `maxHeight` is the height the vertical clamp reserves, so the card
 * must not grow beyond it.
 */
export function placePreview(
  stage: ViewportRect,
  anchor: ViewportRect,
): PreviewBox {
  const fullWidth = Math.max(0, Math.min(WIDTH, stage.width - MARGIN * 2));
  const maxHeight = Math.max(
    0,
    Math.min(MAX_HEIGHT, stage.height - MARGIN * 2),
  );
  // Each side needs a gap next to the tile and a margin at the stage edge.
  const spaceRight = stage.right - anchor.right - MARGIN * 2;
  const spaceLeft = anchor.left - stage.left - MARGIN * 2;
  const onRight =
    spaceRight >= fullWidth ||
    (spaceLeft < fullWidth && spaceRight >= spaceLeft);
  const width = Math.min(
    fullWidth,
    Math.max(MIN_WIDTH, onRight ? spaceRight : spaceLeft),
  );
  const left = onRight
    ? anchor.right - stage.left + MARGIN
    : anchor.left - stage.left - MARGIN - width;
  return {
    width,
    maxHeight,
    left: clamp(left, MARGIN, stage.width - width - MARGIN),
    top: clamp(
      anchor.top - stage.top,
      MARGIN,
      stage.height - maxHeight - MARGIN,
    ),
  };
}
