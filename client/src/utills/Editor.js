import ClassicEditor from './ckeditor';
const ENDPOINT = `${window.origin}/api/posts/uploadfiles`;

class UploadAdapter {
    constructor(loader) {
        this.loader = loader;
    }
    upload = () => {
        return this.loader.file
            .then(async file => {
                let formData = new FormData();
                formData.append('file', file);
                const res = await fetch(ENDPOINT, {
                    method: 'POST',
                    headers: {
                        // 'Content-Type':'multipart/form-data'
                    },
                    body: formData,
                });
                return await res.json();
            })
            .then(response => Promise.resolve({ default: response.url }));
    };
}
function CustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = loader => new UploadAdapter(loader);
}

export default function Editor({ $target, self }) {
    ClassicEditor.create($target, {
        extraPlugins: [CustomUploadAdapterPlugin],
    })
        .then(editor => {
            editor.editing.view.change(writer => {
                writer.setStyle('min-height', '450px', editor.editing.view.document.getRoot());
            });
            editor.ui.element.style.margin = '2rem';
            self = editor;
        })
        .catch(err => console.log(err));

    // this.editor.config
}
