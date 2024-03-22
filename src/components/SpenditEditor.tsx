import { withProps } from '@udecode/cn';
import { createSelectOnBackspacePlugin } from '@udecode/plate-select';
import { createNodeIdPlugin } from '@udecode/plate-node-id';
import { createAutoformatPlugin } from '@udecode/plate-autoformat';
import { createExitBreakPlugin, createSoftBreakPlugin } from '@udecode/plate-break';
import {
    createPlugins,
    Plate,
    insertNodes,
    setNodes,
    PlateContent,
    PlateElement,
    PlateLeaf,
    ELEMENT_DEFAULT,
    RenderAfterEditable,
    TElement,
} from '@udecode/plate-common';
import { createHeadingPlugin, ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_H4, ELEMENT_H5, ELEMENT_H6 } from '@udecode/plate-heading';
import { createParagraphPlugin, ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import {
    createBoldPlugin,
    createItalicPlugin,
    createStrikethroughPlugin,
    createUnderlinePlugin,
    createCodePlugin,
    createSubscriptPlugin,
    createSuperscriptPlugin,
    MARK_BOLD,
    MARK_ITALIC,
    MARK_STRIKETHROUGH,
    MARK_UNDERLINE,
    MARK_CODE,
    MARK_SUBSCRIPT,
    MARK_SUPERSCRIPT
} from "@udecode/plate-basic-marks";
import { createFontColorPlugin, createFontBackgroundColorPlugin } from '@udecode/plate-font';
import { createHighlightPlugin, MARK_HIGHLIGHT } from '@udecode/plate-highlight';
import {createAlignPlugin} from "@udecode/plate-alignment";
import {createLineHeightPlugin} from "@udecode/plate-line-height";
import {ELEMENT_CODE_BLOCK} from "@udecode/plate-code-block";
import {createIndentPlugin} from "@udecode/plate-indent";
import {createIndentListPlugin} from "@udecode/plate-indent-list";
import { createListPlugin, ELEMENT_UL, ELEMENT_OL, ELEMENT_LI } from '@udecode/plate-list';
import {createHorizontalRulePlugin, ELEMENT_HR} from '@udecode/plate-horizontal-rule';
import { createBlockquotePlugin, ELEMENT_BLOCKQUOTE } from '@udecode/plate-block-quote';
import { createLinkPlugin, ELEMENT_LINK } from '@udecode/plate-link';
import {createImagePlugin,createMediaEmbedPlugin, ELEMENT_IMAGE, ELEMENT_MEDIA_EMBED} from "@udecode/plate-media";
import { createTablePlugin, ELEMENT_TABLE, ELEMENT_TR, ELEMENT_TD, ELEMENT_TH } from '@udecode/plate-table';
import {createCaptionPlugin} from "@udecode/plate-caption";

/* 공통 UI */
import { TooltipProvider } from './plate-ui/tooltip';
import {FixedToolbar} from "./plate-ui/fixed-toolbar";
import {FixedToolbarButtons} from "./plate-ui/fixed-toolbar-buttons";
import { HeadingElement } from './plate-ui/heading-element';
import { ParagraphElement } from './plate-ui/paragraph-element';
import {CodeLeaf} from "./plate-ui/code-leaf";
import {HighlightLeaf} from "./plate-ui/highlight-leaf";
import {ListElement} from "./plate-ui/list-element";
import {HrElement} from "./plate-ui/hr-element";
import { BlockquoteElement } from './plate-ui/blockquote-element';
import {LinkElement} from "./plate-ui/link-element";
import {LinkFloatingToolbar} from "./plate-ui/link-floating-toolbar";
import { ImageElement } from './plate-ui/image-element';
import { createBlockSelectionPlugin } from '@udecode/plate-selection';
import { TableElement } from './plate-ui/table-element';
import { TableRowElement } from './plate-ui/table-row-element';
import { TableCellElement, TableCellHeaderElement } from './plate-ui/table-cell-element';
import {useMemo, useState} from "react";

const plugins = createPlugins(
    [
        createParagraphPlugin(),
        createHeadingPlugin(),
        createBoldPlugin(),
        createItalicPlugin(),
        createUnderlinePlugin(),
        createStrikethroughPlugin(),
        createCodePlugin(),
        createFontColorPlugin(),
        createHighlightPlugin(),
        createFontBackgroundColorPlugin(),
        createSuperscriptPlugin(),
        createSubscriptPlugin(),
        createAlignPlugin(),
        createLineHeightPlugin({
            inject: {
                props: {
                    defaultNodeValue: 1.5,
                    validNodeValues: [1, 1.2, 1.5, 2, 3],
                    validTypes: [
                        ELEMENT_PARAGRAPH,
                        ELEMENT_H1,
                        ELEMENT_H2,
                        ELEMENT_H3,
                        ELEMENT_H4,
                        ELEMENT_H5,
                        ELEMENT_H6,
                    ],
                },
            },
        }),
        createListPlugin(),
        createIndentPlugin({
            inject: {
                props: {
                    validTypes: [
                        ELEMENT_PARAGRAPH,
                        ELEMENT_H1,
                        ELEMENT_H2,
                        ELEMENT_H3,
                        ELEMENT_H4,
                        ELEMENT_H5,
                        ELEMENT_H6,
                        ELEMENT_CODE_BLOCK
                    ],
                },
            },
        }),
        createIndentListPlugin({
            inject: {
                props: {
                    validTypes: [
                        ELEMENT_PARAGRAPH,
                        ELEMENT_H1,
                        ELEMENT_H2,
                        ELEMENT_H3,
                        ELEMENT_H4,
                        ELEMENT_H5,
                        ELEMENT_H6,
                        ELEMENT_CODE_BLOCK
                    ],
                },
            },
        }),
        createHorizontalRulePlugin(),
        createAutoformatPlugin({
            options: {
                rules: [
                    {
                        mode: 'block',
                        type: ELEMENT_HR,
                        match: ['---', '—-', '___ '],
                        format: (editor) => {
                            setNodes(editor, { type: ELEMENT_HR });
                            insertNodes(editor, {
                                type: ELEMENT_DEFAULT,
                                children: [{ text: '' }],
                            });
                        },
                    },
                ],
            },
        }),
        createBlockquotePlugin(),
        createLinkPlugin({
            renderAfterEditable: LinkFloatingToolbar as RenderAfterEditable,
        }),
        createNodeIdPlugin(),
        createBlockSelectionPlugin(),
        createExitBreakPlugin({
            options: {
                rules: [
                    {
                        hotkey: 'mod+enter',
                    },
                    {
                        hotkey: 'mod+shift+enter',
                        before: true,
                    },
                    {
                        hotkey: 'enter',
                        query: {
                            start: true,
                            end: true,
                            // allow: KEYS_HEADING,
                        },
                        relative: true,
                        level: 1,
                    },
                ],
            },
        }),
        createSoftBreakPlugin({
            options: {
                rules: [
                    { hotkey: 'shift+enter' },
                    {
                        hotkey: 'enter',
                        query: {
                            allow: [
                                ELEMENT_CODE_BLOCK, ELEMENT_BLOCKQUOTE, ELEMENT_TD
                            ],
                        },
                    },
                ],
            },
        }),
        createCaptionPlugin({
            options: { pluginKeys: [ELEMENT_IMAGE, ELEMENT_MEDIA_EMBED] },
        }),
        createImagePlugin(),
        createMediaEmbedPlugin(),
        createSelectOnBackspacePlugin({
            options: { query: { allow: [ELEMENT_HR, ELEMENT_IMAGE, ELEMENT_MEDIA_EMBED] } },
        }),
        createTablePlugin(),
    ],
    {
        components: {
            [ELEMENT_H1]: withProps(HeadingElement, { variant: 'h1' }),
            [ELEMENT_H2]: withProps(HeadingElement, { variant: 'h2' }),
            [ELEMENT_H3]: withProps(HeadingElement, { variant: 'h3' }),
            [ELEMENT_H4]: withProps(HeadingElement, { variant: 'h4' }),
            [ELEMENT_H5]: withProps(HeadingElement, { variant: 'h5' }),
            [ELEMENT_H6]: withProps(HeadingElement, { variant: 'h6' }),
            [ELEMENT_PARAGRAPH]: ParagraphElement,
            [MARK_BOLD]: withProps(PlateLeaf, { as: 'strong' }),
            [MARK_ITALIC]: withProps(PlateLeaf, { as: 'em' }),
            [MARK_STRIKETHROUGH]: withProps(PlateLeaf, { as: 's' }),
            [MARK_UNDERLINE]: withProps(PlateLeaf, { as: 'u' }),
            [MARK_CODE]: CodeLeaf,
            [MARK_HIGHLIGHT]: HighlightLeaf,
            [MARK_SUBSCRIPT]: withProps(PlateLeaf, { as: 'sub' }),
            [MARK_SUPERSCRIPT]: withProps(PlateLeaf, { as: 'sup' }),
            [ELEMENT_UL]: withProps(ListElement, { variant: 'ul' }),
            [ELEMENT_OL]: withProps(ListElement, { variant: 'ol' }),
            [ELEMENT_LI]: withProps(PlateElement, { as: 'li' }),
            [ELEMENT_HR]: HrElement,
            [ELEMENT_BLOCKQUOTE]: BlockquoteElement,
            [ELEMENT_LINK]: LinkElement,
            [ELEMENT_IMAGE]: ImageElement,
            [ELEMENT_TABLE]: TableElement,
            [ELEMENT_TR]: TableRowElement,
            [ELEMENT_TD]: TableCellElement,
            [ELEMENT_TH]: TableCellHeaderElement,
        },
    }
);

export function SpenditEditor() {
    const [value, setValue] = useState<TElement[]>([]);

    const initialValue = useMemo(() => {
        const html = localStorage.getItem('plate-html') || '';
        if (html) {
            return JSON.parse(html);
        } else {
            return [{
                type: ELEMENT_DEFAULT,
                children: [{ text: '' }],
            }]
        }
    }, []) as TElement[];

    const handleClick = () => {
        const html = JSON.stringify(value);
        localStorage.setItem('plate-html', html);
    }

    return (
        <>
            <div>
                <button onClick={handleClick} style={{marginBottom:'10px', backgroundColor: "lightcyan", padding: '5px'}}>로컬스토리지에 저장</button>
            </div>
            <div>
                <TooltipProvider>
                    <div className={"Spendit-Editor"}>
                        <Plate
                            plugins={plugins}
                            initialValue={initialValue}
                            onChange={(newValue) => {
                                if (newValue.length === 0) {
                                    setValue([{
                                        type: ELEMENT_DEFAULT,
                                        children: [{ text: '' }],
                                    }] as TElement[]);
                                } else {
                                    setValue(newValue);
                                }
                            }}
                        >
                            <FixedToolbar>
                                <FixedToolbarButtons/>
                            </FixedToolbar>
                            <PlateContent
                                placeholder={'내용을 입력하세요'}
                                className={'Spendit-Content'}
                            />
                        </Plate>
                        <div className={'Spendit-Editor-Footer'}/>
                    </div>
                </TooltipProvider>

            </div>
        </>
    );
}
