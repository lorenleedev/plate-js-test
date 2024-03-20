import React from 'react';
import { DropdownMenuProps } from '@radix-ui/react-dropdown-menu';
import {
  collapseSelection,
  findNode,
  focusEditor,
  isBlock,
  isCollapsed,
  TElement,
  toggleNodeType,
  useEditorRef,
  useEditorSelector,
} from '@udecode/plate-common';
import {ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_H4, ELEMENT_H5, ELEMENT_H6} from '@udecode/plate-heading';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';

import { Icons } from '../icons';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  useOpenState,
} from './dropdown-menu';
import { ToolbarButton } from './toolbar';

const items = [
  {
    value: ELEMENT_PARAGRAPH,
    label: 'Paragraph',
    description: 'Paragraph',
    icon: Icons.paragraph,
  },
  {
    value: ELEMENT_H1,
    label: 'Heading 1',
    description: 'Heading 1',
    icon: Icons.h1,
  },
  {
    value: ELEMENT_H2,
    label: 'Heading 2',
    description: 'Heading 2',
    icon: Icons.h2,
  },
  {
    value: ELEMENT_H3,
    label: 'Heading 3',
    description: 'Heading 3',
    icon: Icons.h3,
  },
  {
    value: ELEMENT_H4,
    label: 'Heading 4',
    description: 'Heading 4',
    icon: Icons.h4,
  },
  {
    value: ELEMENT_H5,
    label: 'Heading 5',
    description: 'Heading 5',
    icon: Icons.h5,
  },
  {
    value: ELEMENT_H6,
    label: 'Heading 6',
    description: 'Heading 6',
    icon: Icons.h6,
  }
];

const defaultItem = items.find((item) => item.value === ELEMENT_PARAGRAPH)!;

export function FontSizeDropDownMenu(props: DropdownMenuProps) {
  const value: string = useEditorSelector((editor) => {
    if (isCollapsed(editor.selection)) {
      const entry = findNode<TElement>(editor, {
        match: (n) => isBlock(editor, n),
      });

      if (entry) {
        return (
          items.find((item) => item.value === entry[0].type)?.value ??
          ELEMENT_PARAGRAPH
        );
      }
    }

    return ELEMENT_PARAGRAPH;
  }, []);

  const editor = useEditorRef();
  const openState = useOpenState();

  const selectedItem =
    items.find((item) => item.value === value) ?? defaultItem;
  const { icon: SelectedItemIcon, label: selectedItemLabel } = selectedItem;

  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton className={"Spendit-Toolbar-Button"}
          pressed={openState.open}
          tooltip="글자 크기"
          isDropdown
        >
          <SelectedItemIcon/>
          <span>{selectedItemLabel}</span>
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>글자 크기</DropdownMenuLabel>

        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(type) => {
            toggleNodeType(editor, { activeType: type });
            collapseSelection(editor);
            focusEditor(editor);
          }}
        >
          {items.map(({ value: itemValue, label, icon: Icon }) => (
            <DropdownMenuRadioItem
              key={itemValue}
              value={itemValue}
            >
              <Icon/>
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
