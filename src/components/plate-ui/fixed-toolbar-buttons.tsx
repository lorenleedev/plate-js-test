import React from 'react';
import {
    MARK_BOLD,
    MARK_CODE,
    MARK_ITALIC,
    MARK_STRIKETHROUGH, MARK_SUBSCRIPT, MARK_SUPERSCRIPT,
    MARK_UNDERLINE,
} from '@udecode/plate-basic-marks';
import {
    ELEMENT_DEFAULT,
    focusEditor,
    insertEmptyElement,
    insertNodes,
    toggleNodeType,
    useEditorReadOnly,
    useEditorRef
} from '@udecode/plate-common';

import {Icons, iconVariants} from '../icons';

import { MarkToolbarButton } from './mark-toolbar-button';
import { ModeDropdownMenu } from './mode-dropdown-menu';
import {ToolbarButton, ToolbarGroup} from './toolbar';
import {FontSizeDropDownMenu} from "./font-size-dropdown-menu";
import {MARK_BG_COLOR, MARK_COLOR} from "@udecode/plate-font";
import {ColorDropdownMenu} from "./color-dropdown-menu";
import {AlignDropdownMenu} from "./align-dropdown-menu";
import {LineHeightDropdownMenu} from "./line-height-dropdown-menu";
import {Separator} from "./separator";
import {IndentListToolbarButton} from "./indent-list-toolbar-button";
import {ListStyleType} from "@udecode/plate-indent-list";
import {IndentToolbarButton} from "./indent-toolbar-button";
import {OutdentToolbarButton} from "./outdent-toolbar-button";
import {InsertDropdownMenu} from "./insert-dropdown-menu";
import {ELEMENT_HR} from "@udecode/plate-horizontal-rule";
import {ELEMENT_BLOCKQUOTE} from "@udecode/plate-block-quote";
import {LinkToolbarButton} from "./link-toolbar-button";
import {ELEMENT_IMAGE, insertImage, insertMedia} from "@udecode/plate-media";
import {MediaToolbarButton} from "./media-toolbar-button";
import {ELEMENT_PARAGRAPH} from "@udecode/plate-paragraph";
import {TableDropdownMenu} from "./table-dropdown-menu";

export function FixedToolbarButtons() {
    const editor = useEditorRef();
  const readOnly = useEditorReadOnly();

  return (
    <div className={'Spendit-Toolbar-Button-Group-Wrapper'}>
        {!readOnly && (
          <>
            <ToolbarGroup noSeparator>
                {/*요소를 추가하는 드롭다운 버튼*/}
              {/*<InsertDropdownMenu />*/}
              <FontSizeDropDownMenu />
            </ToolbarGroup>

              <ToolbarGroup noSeparator>
                  <MarkToolbarButton tooltip="굵게" nodeType={MARK_BOLD}>
                      <span style={{fontWeight: 'bold'}}>가</span>
                  </MarkToolbarButton>
                  <MarkToolbarButton tooltip="기울임꼴" nodeType={MARK_ITALIC}>
                      <span style={{fontStyle: 'italic'}}>i</span>
                  </MarkToolbarButton>
                  <MarkToolbarButton
                      tooltip="밑줄"
                      nodeType={MARK_UNDERLINE}
                  >
                      <span style={{textDecoration: 'underline'}}>U</span>
                  </MarkToolbarButton>

                  <MarkToolbarButton
                      tooltip="취소선"
                      nodeType={MARK_STRIKETHROUGH}
                  >
                      <span style={{textDecoration: 'line-through'}}>S</span>
                  </MarkToolbarButton>

                  <MarkToolbarButton tooltip="코드" nodeType={MARK_CODE}>
                      <Icons.code/>
                  </MarkToolbarButton>

                  <ColorDropdownMenu nodeType={MARK_COLOR} tooltip="텍스트 색상">
                      <Icons.color className={iconVariants({variant: 'toolbar'})}/>
                  </ColorDropdownMenu>

                  <ColorDropdownMenu
                      nodeType={MARK_BG_COLOR}
                      tooltip="텍스트 배경색"
                  >
                      <Icons.bg className={iconVariants({variant: 'toolbar'})}/>
                  </ColorDropdownMenu>
                  <MarkToolbarButton tooltip="위첨자" nodeType={MARK_SUPERSCRIPT}>
                      <Icons.subscript/>
                  </MarkToolbarButton>
                  <MarkToolbarButton tooltip="아래첨자" nodeType={MARK_SUBSCRIPT}>
                      <Icons.subscript/>
                  </MarkToolbarButton>
              </ToolbarGroup>

              <ToolbarGroup noSeparator>
                  <AlignDropdownMenu/>
                  <LineHeightDropdownMenu/>
                  <IndentListToolbarButton nodeType={ListStyleType.Disc}/>
                  <IndentListToolbarButton nodeType={ListStyleType.Decimal}/>
                  <OutdentToolbarButton/>
                  <IndentToolbarButton/>
                  <MarkToolbarButton tooltip="구분선" nodeType={ELEMENT_HR} onClick={() => {
                      toggleNodeType(editor, { activeType: ELEMENT_HR });
                      insertNodes(editor, {
                          type: ELEMENT_DEFAULT,
                          children: [{ text: '' }],
                      });
                      focusEditor(editor);
                  }}>
                      구분선
                  </MarkToolbarButton>
                  <MarkToolbarButton tooltip="인용" nodeType={ELEMENT_BLOCKQUOTE} onClick={() => {
                      toggleNodeType(editor, { activeType: ELEMENT_BLOCKQUOTE });
                      // insertNodes(editor, {
                      //     type: ELEMENT_DEFAULT,
                      //     children: [{ text: '' }],
                      // });
                      focusEditor(editor);
                  }}>
                      인용
                  </MarkToolbarButton>
                  <LinkToolbarButton />
              </ToolbarGroup>
              <ToolbarGroup noSeparator>
                  {/*<MediaToolbarButton nodeType={ELEMENT_IMAGE} />*/}

                  <ToolbarButton
                      tooltip="이미지 추가"
                      onClick={async (event) => {
                          await insertMedia(editor, {getUrl: () => {
                              return new Promise((resolve, reject) => {
                                  const input = document.createElement('input');
                                  input.type = 'file';
                                  input.accept = 'image/*';
                                  // 파일 선택창 열기
                                  input.click();
                                  // 파일 선택 시 처리
                                  input.onchange = (e) => {
                                      const files = (e.target as HTMLInputElement).files;
                                      if (!files || files.length === 0) {
                                          reject('No file selected');
                                          return;
                                      }
                                      // 파일 읽기
                                      const reader = new FileReader();
                                      reader.onload = (e) => {
                                          const result = e.target!.result as string;
                                          resolve(result);
                                      };
                                      reader.readAsDataURL(files[0]);
                                  };
                              });
                          }, type: ELEMENT_IMAGE});
                          focusEditor(editor);
                        }}
                  >
                      <Icons.image />
                  </ToolbarButton>
                  <TableDropdownMenu />
              </ToolbarGroup>

          </>
        )}

        {/*<ToolbarGroup noSeparator>*/}
        {/*    <ModeDropdownMenu/>*/}
        {/*</ToolbarGroup>*/}
    </div>
  );
}
