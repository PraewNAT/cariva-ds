> Source of truth: Figma file-upload section, node 4457:62799

# CrvFileUpload

File upload dropzone and file item components.

## Exports

- `CrvFileUpload`
- `CrvFileUploadItem`

## Variants

- `CrvFileUpload.state`: `default`, `hover`, `dragging`, `error`, `disabled`
- `CrvFileUploadItem.state`: `idle`, `uploading`, `complete`, `error`

## Tokens

- Container size: 320x160
- Item size: 320x56
- Upload container padding: `spacing/xl`
- Upload container gap: `spacing/sm`
- Item row padding: `spacing/md spacing/lg`
- Item row gap: `spacing/md`
- Radius: upload `radius/12`, item/file icon `radius/4`
- Label: `typography/label/medium`
- Description/meta: `typography/body/small`
- Colors: semantic tokens only

## Usage

Use `CrvFileUpload` for the drag/click target and render one or more `CrvFileUploadItem` rows below it after files are selected. The component surfaces file selection via `onFilesSelected`; upload behavior remains app-owned.
