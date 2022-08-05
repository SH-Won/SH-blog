import hljs from 'highlight.js/lib/core';
import Quill from 'quill/core';
import Toolbar from 'quill/modules/toolbar';
import Image from 'quill/formats/image';
import Blockquote from 'quill/formats/blockquote';
import Underline from 'quill/formats/underline';
import SnowTheme from 'quill/themes/snow';
import CodeBlock, { Code as InlineCode } from 'quill/formats/code';
import Bold from 'quill/formats/bold';
import Italic from 'quill/formats/italic';
import Syntax from 'quill/modules/syntax';
import List, { ListItem } from 'quill/formats/list';
import Header from 'quill/formats/header';
import javascript from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';

import { getItem } from './storage';

Quill.register({
    'formats/blockquote': Blockquote,
    'formats/code-block': CodeBlock,
    'formats/underline': Underline,
    'formats/header': Header,
    'formats/list': List,
    'formats/bold': Bold,
    'formats/italic': Italic,
    'formats/image': Image,
    'formats/list/item': ListItem,
    'modules/syntax': Syntax,
    'modules/toolbar': Toolbar,
    'themes/snow': SnowTheme,
});

// const ENDPOINT = `${window.origin}`;
const ENDPOINT = 'https://blog-sh.herokuapp.com';
// const ENDPOINT = process.env.API_ENDPOINT;

function uploadMulter(editor) {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('multiple', '');
    input.setAttribute('accept', 'image/*');
    input.style.fontSize = '16px';
    input.style.display = 'none';
    const editorRoot = document.querySelector('.ql-container.ql-snow');
    editorRoot.appendChild(input);

    // IOS 의 경우 실제 input 이 웹 DOM 어딘가에 존재해야 change가 trigger 됨
    input.addEventListener('change', async () => {
        const formData = new FormData();
        const token = getItem('authorization');
        const refreshToken = getItem('refreshToken');
        for (let i = 0; i < input.files.length; i++) {
            formData.append('file', input.files[i]);
        }

        const res = await fetch(`${ENDPOINT}/api/posts/uploadfiles`, {
            method: 'POST',
            headers: {
                // 'Content-Type':'multipart/form-data'
                // 'Content-Type':'multipart/x-www-form-urlencoded'
                authorization: token,
                refreshToken,
            },
            credentials: 'include',
            body: formData,
        });
        if (res.ok) {
            const { data } = await res.json();
            const range = editor.getSelection();
            data.forEach(({ url }) => {
                const value = {
                    url: `${ENDPOINT}${url}`,
                    id: '',
                };
                editor.insertEmbed(range.index++, 'image', value);
            });
            editor.setSelection(++range.index, 0);
        }
        editorRoot.removeChild(input);
    });
    input.click();
}

let BlockEmbed = Quill.import('blots/block/embed');
class ImageBlot extends BlockEmbed {
    static create(value) {
        let node = super.create();
        node.classList.add('image');
        const img = document.createElement('img');
        img.setAttribute('src', value.url);
        img.setAttribute('data-id', value.id);
        node.appendChild(img);
        return node;
    }
    static value(node) {
        return {
            id: node.firstChild.getAttribute('data-id'),
            url: node.firstChild.getAttribute('src'),
        };
    }
    static set(node) {}
}

ImageBlot.blotName = 'image';
ImageBlot.tagName = 'figure';

const options = {
    theme: 'snow',
    modules: {
        toolbar: {
            container: [
                [{ header: [1, 2, false] }],
                ['bold', 'italic', 'underline', 'blockquote'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['image', 'code-block'],
            ],
        },

        syntax: {
            highlight: text => hljs.highlightAuto(text).value,
        },
    },
    placeholder: '내용을 입력 하세요',
};
export const quillEditor = element => {
    const lang = [
        ['javascript', javascript],
        ['css', css],
    ];
    lang.forEach(([lang, module]) => {
        hljs.registerLanguage(lang, module);
    });

    Quill.register(ImageBlot);
    const editor = new Quill(element, options);
    editor.getModule('toolbar').addHandler('image', () => {
        uploadMulter(editor);
    });
    return editor;
};
