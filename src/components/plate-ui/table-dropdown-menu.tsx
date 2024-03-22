import React from 'react';
import { DropdownMenuProps } from '@radix-ui/react-dropdown-menu';
import {
  focusEditor,
  someNode,
  useEditorRef,
  useEditorSelector,
} from '@udecode/plate-common';
import {
  deleteColumn,
  deleteRow,
  deleteTable,
  ELEMENT_TABLE,
  insertTable,
  insertTableColumn,
  insertTableRow,
} from '@udecode/plate-table';

import { Icons, iconVariants } from '../icons';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  useOpenState,
} from './dropdown-menu';
import { ToolbarButton } from './toolbar';

export function TableDropdownMenu(props: DropdownMenuProps) {
  const tableSelected = useEditorSelector(
    (editor) => someNode(editor, { match: { type: ELEMENT_TABLE } }),
    []
  );

  const editor = useEditorRef();
  const openState = useOpenState();

  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton pressed={openState.open} tooltip="표" isDropdown>
          <Icons.table />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="flex w-[180px] min-w-0 flex-col gap-0.5"
        style={{zIndex: 1000}}
      >
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Icons.table className={iconVariants({ variant: 'menuItem' })} />
            <span>표</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem
              className="min-w-[180px] flex"
              onSelect={async () => {
                insertTable(editor);
                focusEditor(editor);
              }}
            >
              <Icons.add className={iconVariants({ variant: 'menuItem' })} />
              표 추가
            </DropdownMenuItem>
            <DropdownMenuItem
              className="min-w-[180px] flex"
              disabled={!tableSelected}
              onSelect={async () => {
                deleteTable(editor);
                focusEditor(editor);
              }}
            >
              <Icons.trash className={iconVariants({ variant: 'menuItem' })} />
              표 삭제
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger disabled={!tableSelected}>
            <Icons.column className={iconVariants({ variant: 'menuItem' })} />
            <span>열</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem
              className="min-w-[180px] flex"
              disabled={!tableSelected}
              onSelect={async () => {
                insertTableColumn(editor);
                focusEditor(editor);
              }}
            >
              <Icons.add className={iconVariants({ variant: 'menuItem' })} />
              오른쪽에 열 추가
            </DropdownMenuItem>
            <DropdownMenuItem
              className="min-w-[180px] flex"
              disabled={!tableSelected}
              onSelect={async () => {
                deleteColumn(editor);
                focusEditor(editor);
              }}
            >
              <Icons.minus className={iconVariants({ variant: 'menuItem' })} />
              열 삭제
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger disabled={!tableSelected}>
            <Icons.row className={iconVariants({ variant: 'menuItem' })} />
            <span>행</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem
              className="min-w-[180px] flex"
              disabled={!tableSelected}
              onSelect={async () => {
                insertTableRow(editor);
                focusEditor(editor);
              }}
            >
              <Icons.add className={iconVariants({ variant: 'menuItem' })} />
              아래에 행 추가
            </DropdownMenuItem>
            <DropdownMenuItem
              className="min-w-[180px] flex"
              disabled={!tableSelected}
              onSelect={async () => {
                deleteRow(editor);
                focusEditor(editor);
              }}
            >
              <Icons.minus className={iconVariants({ variant: 'menuItem' })} />
              행 삭제
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
