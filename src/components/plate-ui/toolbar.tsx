import * as React from 'react';
import * as ToolbarPrimitive from '@radix-ui/react-toolbar';
import { cn, withCn, withRef, withVariants } from '@udecode/cn';
import { cva, VariantProps } from 'class-variance-authority';

import { Icons } from '../icons';

import { Separator } from './separator';
import { withTooltip } from './tooltip';

export const Toolbar = withCn(
  ToolbarPrimitive.Root,
    'Spendit-Toolbar'
);

export const ToolbarToggleGroup = withCn(
  ToolbarPrimitive.ToolbarToggleGroup,
  'flex items-center'
);

export const ToolbarLink = withCn(
  ToolbarPrimitive.Link,
  'font-medium underline underline-offset-4'
);

export const ToolbarSeparator = withCn(
  ToolbarPrimitive.Separator,
  'my-1 w-[1px] shrink-0 bg-border'
);

const toolbarButtonVariants = cva(
  cn(
''  ),
  {
    variants: {
      variant: {
        default:
          '',
        outline:
          '',
      },
      size: {
        default: '',
        sm: '',
        lg: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm',
    },
  }
);

const ToolbarButton = withTooltip(
  // eslint-disable-next-line react/display-name
  React.forwardRef<
    React.ElementRef<typeof ToolbarToggleItem>,
    Omit<
      React.ComponentPropsWithoutRef<typeof ToolbarToggleItem>,
      'asChild' | 'value'
    > &
      VariantProps<typeof toolbarButtonVariants> & {
        pressed?: boolean;
        isDropdown?: boolean;
      }
  >(
    (
      { className, variant, size, isDropdown, children, pressed, ...props },
      ref
    ) => {
      return typeof pressed === 'boolean' ? (
        <ToolbarToggleGroup
          type="single"
          value="single"
          disabled={props.disabled}
        >
          <ToolbarToggleItem
            ref={ref}
            className={`Spendit-Toolbar-Toogle-Item ${pressed? 'Spendit-Toolbar-Toogle-Item-Pressed' : ''}`}
            value={pressed ? 'single' : ''}
            {...props}
          >
            {isDropdown ? (
              <>
                <div className={"Spendit-Toolbar-Selected-Label"}>{children}</div>
                <div className={"Spendit-Dropdown-Icon-Wrapper"}>
                  <Icons.arrowDown data-icon />
                </div>
              </>
            ) : (
              children
            )}
          </ToolbarToggleItem>
        </ToolbarToggleGroup>
      ) : (
        <ToolbarPrimitive.Button
          ref={ref}
          className={cn(
            toolbarButtonVariants({
              variant,
              size,
            }),
            isDropdown && 'pr-1',
            className
          )}
          {...props}
        >
          {children}
        </ToolbarPrimitive.Button>
      );
    }
  )
);
ToolbarButton.displayName = 'ToolbarButton';
export { ToolbarButton };

export const ToolbarToggleItem = withVariants(
  ToolbarPrimitive.ToggleItem,
  toolbarButtonVariants,
  ['variant', 'size']
);

export const ToolbarGroup = withRef<
  'div',
  {
    noSeparator?: boolean;
  }
>(({ className, children, noSeparator }, ref) => {
  const childArr = React.Children.map(children, (c) => c);
  if (!childArr || childArr.length === 0) return null;

  return (
    <div ref={ref} className={cn('Spendit-Toolbar-Group', className)}>
      {!noSeparator && (
          <Separator orientation="vertical" />
      )}

      {children}
    </div>
  );
});
