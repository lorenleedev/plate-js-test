'use client';

import React from 'react';
import { cn, withRef } from '@udecode/cn';
import { PlateLeaf } from '@udecode/plate-common';

export const CodeLeaf = withRef<typeof PlateLeaf>(
  ({ className, children, ...props }, ref) => {
    return (
      <PlateLeaf
        ref={ref}
        asChild
        style={{ backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: '4px' }}
        {...props}
      >
        <code>{children}</code>
      </PlateLeaf>
    );
  }
);
