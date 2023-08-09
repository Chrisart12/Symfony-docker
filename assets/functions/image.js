export function isImage (filename) {
    if (undefined === filename) {
        return false;
    }

    return (filename.match(/\.(jpeg|jpg|gif|png)$/) != null);
}