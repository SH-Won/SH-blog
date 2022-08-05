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
                        // 'Content-Type':'multipart/x-www-form-urlencoded'
                    },
                    body: formData,
                });
                return await res.json();
            })
            .then(({ data }) => {
                return Promise.resolve({
                    default: `${window.origin}${data[0].url}`,
                    attributes: {
                        'data-id': 'image',
                    },
                });
            });
    };
}
export default function CustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = loader => new UploadAdapter(loader);
}
