'use client';

import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CrvTag } from '../CrvTag';
import {
  getAbsoluteActionsSx,
  getAbsoluteContentSx,
  getAbsoluteImageSx,
  getAbsoluteRootSx,
  getActionsSx,
  getCardBodySx,
  getCardContentSx,
  getCardHeadingGroupSx,
  getCardRootSx,
  getDescriptionSx,
  getHeaderSx,
  getImageSx,
  getTopMessageSx,
  getTrailingSlotSx,
} from './crvCardStyles';
import type { CrvCardProps } from './CrvCard.types';

// Ground truth: Figma Card section 4536:123343
// (crv-card-vertical 4657:31022, crv-card-horizontal 4570:20745, crv-card-small-horizontal 4570:20655)

function ImagePlaceholder() {
  return <Box aria-hidden sx={{ width: '100%', height: '100%' }} />;
}

export const CrvCard = forwardRef<HTMLDivElement, CrvCardProps>(function CrvCard(
  {
    orientation = 'vertical',
    imagePosition = 'right',
    image,
    showImage = true,
    tag,
    showTag = true,
    topMessage,
    showTopMessage = true,
    header,
    description,
    showDescription = true,
    actions,
    trailing,
    showTrailing = true,
    sx,
    ...rest
  },
  ref,
) {
  const isAbsolute = orientation === 'horizontal' && imagePosition === 'absolute';

  const tagNode =
    showTag && tag ? (
      <CrvTag color="success" label={tag} size="small" sx={{ alignSelf: 'flex-start' }} />
    ) : null;

  const headingGroup = (
    <Box sx={getCardHeadingGroupSx(orientation)}>
      {header ? (
        <Typography component="h3" sx={getHeaderSx()}>
          {header}
        </Typography>
      ) : null}
      {showDescription && description ? (
        <Typography component="p" sx={getDescriptionSx()}>
          {description}
        </Typography>
      ) : null}
    </Box>
  );

  const content = (
    <Box sx={getCardContentSx()}>
      {tagNode}
      {orientation !== 'small' && showTopMessage && topMessage ? (
        <Typography component="p" sx={getTopMessageSx()}>
          {topMessage}
        </Typography>
      ) : null}
      {headingGroup}
    </Box>
  );

  const imageNode =
    showImage ? (
      <Box sx={isAbsolute ? getAbsoluteImageSx() : getImageSx(orientation, imagePosition)}>
        {image ?? <ImagePlaceholder />}
      </Box>
    ) : null;

  const actionsNode =
    actions && orientation !== 'small' ? <Box sx={getActionsSx()}>{actions}</Box> : null;

  // imgAbsolute — right-pinned image, text constrained left, full-width CTA on top
  if (isAbsolute) {
    return (
      <Box
        ref={ref}
        sx={[getAbsoluteRootSx(), ...(Array.isArray(sx) ? sx : sx ? [sx] : [])]}
        {...rest}
      >
        {imageNode}
        <Box sx={getAbsoluteContentSx()}>{content}</Box>
        {actions ? <Box sx={getAbsoluteActionsSx()}>{actions}</Box> : null}
      </Box>
    );
  }

  // small — thumbnail + text, no actions/top message
  if (orientation === 'small') {
    return (
      <Box
        ref={ref}
        sx={[getCardRootSx('small'), ...(Array.isArray(sx) ? sx : sx ? [sx] : [])]}
        {...rest}
      >
        {imageNode}
        <Box sx={[getCardContentSx(), { flex: 1, minWidth: 0 }]}>
          {tagNode}
          {headingGroup}
        </Box>
        {showTrailing && trailing ? <Box sx={getTrailingSlotSx()}>{trailing}</Box> : null}
      </Box>
    );
  }

  // vertical & horizontal (left/right)
  return (
    <Box
      ref={ref}
      sx={[getCardRootSx(orientation), ...(Array.isArray(sx) ? sx : sx ? [sx] : [])]}
      {...rest}
    >
      {imageNode}
      <Box sx={getCardBodySx(orientation)}>
        {content}
        {actionsNode}
      </Box>
    </Box>
  );
});
