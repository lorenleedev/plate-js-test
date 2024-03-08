import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import logo from './logo.svg';
import {Parser} from 'html-to-react';
import './App.css';
import { withProps } from '@udecode/cn';
import {
    createPlugins,
    Plate,
    RenderAfterEditable,
    PlateLeaf,
    PlateEditor,
    useEditorRef,
    createPlateEditor, deserializeHtml, TElement
} from '@udecode/plate-common';
import { createParagraphPlugin, ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import { createHeadingPlugin, ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_H4, ELEMENT_H5, ELEMENT_H6 } from '@udecode/plate-heading';
import { createBlockquotePlugin, ELEMENT_BLOCKQUOTE } from '@udecode/plate-block-quote';
import { createCodeBlockPlugin, ELEMENT_CODE_BLOCK, ELEMENT_CODE_LINE, ELEMENT_CODE_SYNTAX } from '@udecode/plate-code-block';
import { createHorizontalRulePlugin, ELEMENT_HR } from '@udecode/plate-horizontal-rule';
import { createLinkPlugin, ELEMENT_LINK } from '@udecode/plate-link';
import { createImagePlugin, ELEMENT_IMAGE, createMediaEmbedPlugin, ELEMENT_MEDIA_EMBED } from '@udecode/plate-media';
import { createCaptionPlugin } from '@udecode/plate-caption';
import { createMentionPlugin, ELEMENT_MENTION, ELEMENT_MENTION_INPUT } from '@udecode/plate-mention';
import { createTodoListPlugin, ELEMENT_TODO_LI } from '@udecode/plate-list';
import { createExcalidrawPlugin, ELEMENT_EXCALIDRAW } from '@udecode/plate-excalidraw';
import { createTogglePlugin, ELEMENT_TOGGLE } from '@udecode/plate-toggle';
import { createTablePlugin, ELEMENT_TABLE, ELEMENT_TR, ELEMENT_TD, ELEMENT_TH } from '@udecode/plate-table';
import { createBoldPlugin, MARK_BOLD, createItalicPlugin, MARK_ITALIC, createUnderlinePlugin, MARK_UNDERLINE, createStrikethroughPlugin, MARK_STRIKETHROUGH, createCodePlugin, MARK_CODE, createSubscriptPlugin, MARK_SUBSCRIPT, createSuperscriptPlugin, MARK_SUPERSCRIPT } from '@udecode/plate-basic-marks';
import { createFontColorPlugin, createFontBackgroundColorPlugin, createFontSizePlugin } from '@udecode/plate-font';
import { createHighlightPlugin, MARK_HIGHLIGHT } from '@udecode/plate-highlight';
import { createKbdPlugin, MARK_KBD } from '@udecode/plate-kbd';
import { createAlignPlugin } from '@udecode/plate-alignment';
import { createIndentPlugin } from '@udecode/plate-indent';
import { createIndentListPlugin } from '@udecode/plate-indent-list';
import { createLineHeightPlugin } from '@udecode/plate-line-height';
import { createAutoformatPlugin } from '@udecode/plate-autoformat';
import { createBlockSelectionPlugin } from '@udecode/plate-selection';
import { createComboboxPlugin } from '@udecode/plate-combobox';
import { createDndPlugin } from '@udecode/plate-dnd';
import { createEmojiPlugin } from '@udecode/plate-emoji';
import { createExitBreakPlugin, createSoftBreakPlugin } from '@udecode/plate-break';
import { createNodeIdPlugin } from '@udecode/plate-node-id';
import { createResetNodePlugin } from '@udecode/plate-reset-node';
import { createDeletePlugin } from '@udecode/plate-select';
import { createTabbablePlugin } from '@udecode/plate-tabbable';
import { createTrailingBlockPlugin } from '@udecode/plate-trailing-block';
import { createCommentsPlugin, CommentsProvider, MARK_COMMENT } from '@udecode/plate-comments';
import { createDeserializeDocxPlugin } from '@udecode/plate-serializer-docx';
import { createDeserializeCsvPlugin } from '@udecode/plate-serializer-csv';
import { createDeserializeMdPlugin } from '@udecode/plate-serializer-md';
import { createJuicePlugin } from '@udecode/plate-juice';
// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';

import { BlockquoteElement } from './components/plate-ui/blockquote-element';
import { HrElement } from './components/plate-ui/hr-element';
import { ImageElement } from './components/plate-ui/image-element';
import { Editor } from './components/plate-ui/editor';
// import { LinkElement } from '@/components/plate-ui/link-element';
import { LinkFloatingToolbar } from './components/plate-ui/link-floating-toolbar';
// import { ToggleElement } from '@/components/plate-ui/toggle-element';
// import { HeadingElement } from '@/components/plate-ui/heading-element';
// import { MediaEmbedElement } from '@/components/plate-ui/media-embed-element';
// import { ParagraphElement } from '@/components/plate-ui/paragraph-element';
// import { TableElement } from '@/components/plate-ui/table-element';
// import { TableRowElement } from '@/components/plate-ui/table-row-element';
// import { TableCellElement, TableCellHeaderElement } from '@/components/plate-ui/table-cell-element';
import { FixedToolbar } from './components/plate-ui/fixed-toolbar';
// import { FixedToolbarButtons } from './components/plate-ui/fixed-toolbar-buttons';
import { withPlaceholders } from './components/plate-ui/placeholder';
import { withDraggables } from './components/plate-ui/with-draggables';
import {serializeHtml, elementToHtml, leafToHtml, createElementWithSlate} from "@udecode/plate-serializer-html";
import {getTEditor, normalizeInitialValue} from "@udecode/plate";
const plugins = createPlugins(
    [
        createHeadingPlugin(),
        createBlockquotePlugin(),
        createCodeBlockPlugin(),
        createHorizontalRulePlugin(),
        createLinkPlugin({
            renderAfterEditable: LinkFloatingToolbar as RenderAfterEditable,
        }),
        createImagePlugin(),
        createMediaEmbedPlugin(),
        createCaptionPlugin({
            options: {
                pluginKeys: [
                    ELEMENT_IMAGE, ELEMENT_MEDIA_EMBED
                ]
            },
        }),
        createMentionPlugin(),
        createTodoListPlugin(),
        createExcalidrawPlugin(),
        createTogglePlugin(),
        createTablePlugin(),
        createBoldPlugin(),
        createItalicPlugin(),
        createUnderlinePlugin(),
        createStrikethroughPlugin(),
        createCodePlugin(),
        createSubscriptPlugin(),
        createSuperscriptPlugin(),
        createFontColorPlugin(),
        createFontBackgroundColorPlugin(),
        createFontSizePlugin(),
        createHighlightPlugin(),
        createKbdPlugin(),
        createAlignPlugin({
            inject: {
                props: {
                    validTypes: [
                        ELEMENT_PARAGRAPH,
                        // ELEMENT_H1, ELEMENT_H2, ELEMENT_H3
                    ],
                },
            },
        }),
        createIndentPlugin({
            inject: {
                props: {
                    validTypes: [
                        ELEMENT_PARAGRAPH,
                        // ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_BLOCKQUOTE, ELEMENT_CODE_BLOCK
                    ],
                },
            },
        }),
        createIndentListPlugin({
            inject: {
                props: {
                    validTypes: [
                        ELEMENT_PARAGRAPH,
                        // ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_BLOCKQUOTE, ELEMENT_CODE_BLOCK
                    ],
                },
            },
        }),
        createLineHeightPlugin({
            inject: {
                props: {
                    defaultNodeValue: 1.5,
                    validNodeValues: [1, 1.2, 1.5, 2, 3],
                    validTypes: [
                        ELEMENT_PARAGRAPH,
                        // ELEMENT_H1, ELEMENT_H2, ELEMENT_H3
                    ],
                },
            },
        }),
        createAutoformatPlugin({
            options: {
                rules: [
                    // Usage: https://platejs.org/docs/autoformat
                ],
                enableUndoOnDelete: true,
            },
        }),
        createBlockSelectionPlugin({
            options: {
                sizes: {
                    top: 0,
                    bottom: 0,
                },
            },
        }),
        createComboboxPlugin(),
        createDndPlugin({
            options: { enableScroller: true },
        }),
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
        createNodeIdPlugin(),
        createResetNodePlugin({
            options: {
                rules: [
                    // Usage: https://platejs.org/docs/reset-node
                ],
            },
        }),
        createDeletePlugin(),
        createSoftBreakPlugin({
            options: {
                rules: [
                    { hotkey: 'shift+enter' },
                    {
                        hotkey: 'enter',
                        query: {
                            allow: [
                                // ELEMENT_CODE_BLOCK, ELEMENT_BLOCKQUOTE, ELEMENT_TD
                            ],
                        },
                    },
                ],
            },
        }),
        createTabbablePlugin(),
        createTrailingBlockPlugin({
            options: { type: ELEMENT_PARAGRAPH },
        }),
        createCommentsPlugin(),
        createDeserializeDocxPlugin(),
        createDeserializeCsvPlugin(),
        createDeserializeMdPlugin(),
        createJuicePlugin(),
    ],
    {
        components: withDraggables(withPlaceholders({
            [ELEMENT_BLOCKQUOTE]: BlockquoteElement,
            [ELEMENT_HR]: HrElement,
            [ELEMENT_IMAGE]: ImageElement,
            // [ELEMENT_LINK]: LinkElement,
            // [ELEMENT_TOGGLE]: ToggleElement,
            // [ELEMENT_H1]: withProps(HeadingElement, { variant: 'h1' }),
            // [ELEMENT_H2]: withProps(HeadingElement, { variant: 'h2' }),
            // [ELEMENT_H3]: withProps(HeadingElement, { variant: 'h3' }),
            // [ELEMENT_H4]: withProps(HeadingElement, { variant: 'h4' }),
            // [ELEMENT_H5]: withProps(HeadingElement, { variant: 'h5' }),
            // [ELEMENT_H6]: withProps(HeadingElement, { variant: 'h6' }),
            // [ELEMENT_MEDIA_EMBED]: MediaEmbedElement,
            // [ELEMENT_PARAGRAPH]: ParagraphElement,
            // [ELEMENT_TABLE]: TableElement,
            // [ELEMENT_TR]: TableRowElement,
            // [ELEMENT_TD]: TableCellElement,
            // [ELEMENT_TH]: TableCellHeaderElement,
            [MARK_BOLD]: withProps(PlateLeaf, { as: 'strong' }),
            [MARK_ITALIC]: withProps(PlateLeaf, { as: 'em' }),
            [MARK_STRIKETHROUGH]: withProps(PlateLeaf, { as: 's' }),
            [MARK_SUBSCRIPT]: withProps(PlateLeaf, { as: 'sub' }),
            [MARK_SUPERSCRIPT]: withProps(PlateLeaf, { as: 'sup' }),
            [MARK_UNDERLINE]: withProps(PlateLeaf, { as: 'u' }),
        })),
    }
);

const initialValue = [
    {
        id: '1',
        type: 'p',
        children: [{ text: '이미지를 드롭한 후 콘솔에보면 url에 base64형태로 파싱해 저장하는 것을 확인할 수 있습니다.' }],
    },
];

const editor = createPlateEditor({plugins});

const tmpEditor = createPlateEditor({
    plugins: createPlugins([
        /* element and mark plugins */
    ], {
        components: {
            /* components for the same */
        },
    }),
});
const useConvertPlateToHtml = (editor: any) => {
    const [html, setHtml] = useState('');

    const convertPlateToHtml = (nodes: any) => {
        const serializedHtml = serializeHtml(editor, { nodes });
        console.log('serializedHtml', serializedHtml); // FIXME: 여기서 img가 html로 직렬화안됨
        setHtml(serializedHtml);
    }

    return { html, convertPlateToHtml };
};

const useConvertHtmlToPlate = () => {
    const [plate, setPlate] = useState<any>([]);
    const convertHtmlToPlate = (html: HTMLHtmlElement | string) => {
        const plate = deserializeHtml(tmpEditor, {
            element: html,
        }) as TElement[];
        console.log('plate', normalizeInitialValue(tmpEditor, plate))
        setPlate(normalizeInitialValue(tmpEditor, plate));
    }
    return { plate, convertHtmlToPlate };
}

function stringToHTML(htmlString: string) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = htmlString.trim();
    return wrapper.innerHTML;
}

function App() {
    const { html, convertPlateToHtml } = useConvertPlateToHtml(tmpEditor);
    const { plate, convertHtmlToPlate } = useConvertHtmlToPlate();

    const initialValue = useMemo(() => {
        const tmpEditor = createPlateEditor({ plugins });
        return deserializeHtml(tmpEditor, { element: '하잉' });
    }, []);
    const onChange = (nodes: any) => {
        convertPlateToHtml(nodes);
        localStorage.setItem('plate-html', html);
    }

    useEffect(() => {
        const html = localStorage.getItem('plate-html');
        convertHtmlToPlate(html || '');
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1>Plate JS로 구현한 텍스트 에디터</h1>
            </header>
            <div className={"editor-wrapper"}>
                <Plate
                    plugins={plugins}
                    onChange={(value) => onChange(value)}
                >
                    <FixedToolbar>
                        {/*<FixedToolbarButtons />*/}
                    </FixedToolbar>
                    <Editor className={"custom-class"} />
                </Plate>
            </div>
        </div>
    );
}

export default App;
