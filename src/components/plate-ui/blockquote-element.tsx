'use client';

import React from 'react';
import { cn, withRef } from '@udecode/cn';
import { PlateElement } from '@udecode/plate-common';

export const BlockquoteElement = withRef<typeof PlateElement>(
  ({ className, children, ...props }, ref) => {
    return (
      <PlateElement
        ref={ref}
        asChild
        className={cn(className)}
        style={{ borderLeft: '2px solid #e1e1e1', paddingLeft: '8px', fontStyle: 'italic' }}
        {...props}
      >
        <blockquote>{children}</blockquote>
      </PlateElement>
    );
  }
);
