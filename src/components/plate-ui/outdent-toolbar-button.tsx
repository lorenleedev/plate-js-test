import React from 'react';
import { withRef } from '@udecode/cn';
import { useOutdentButton } from '@udecode/plate-indent';

import { Icons } from '../icons';

import { ToolbarButton } from './toolbar';

export const OutdentToolbarButton = withRef<typeof ToolbarButton>(
  (rest, ref) => {
    const { props } = useOutdentButton();

    return (
      <ToolbarButton ref={ref} tooltip="내어쓰기" {...props} {...rest}>
        <Icons.outdent />
      </ToolbarButton>
    );
  }
);
