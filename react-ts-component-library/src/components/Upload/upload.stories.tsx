import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Upload, UploadFile } from './upload';
import { UploadList } from './uploadList'
import Icon from '../Icon/icon';

const defaultFileList: UploadFile[] = [
  {uid: '123', size: 1234, name: 'hello.md', status: 'uploading', precent: 30},
  {uid: '122', size: 1234, name: 'xyz.md', status: 'success', precent: 30},
  {uid: '121', size: 1234, name: 'lambda.md', status: 'error', precent: 30},
]

const checlkFileSize = (file: File) => {
  if (Math.round(file.size / 1024) > 50) {
    alert('file too big')
    return false
  }
  return true
}

const filePromise = (file: File) => {
  const newFile = new File([file], 'new-name.png', {type: file.type})
  return Promise.resolve(newFile)
}

const SimpleUpload = () => {
  return (
    <Upload
      action='https://jsonplaceholder.typicode.com/posts'
      beforeUpload={filePromise}
      onProgress={action('progress')}
      onSuccess={action('success')}
      onError={action('error')}
      onChange={action('change')}
      name='fileName'
      data={{'key':'value'}}
      headers={{'X-Powered-By': 'vinking-ship'}}
      accept=".jpg"
      multiple
      drag
    >
      {/* <Icon icon="upload" size="5x" theme="secondary" />
      <br/>
      <p>Drap file over to upload</p> */}
      Click to upload
    </Upload>
  )
}


storiesOf('Upload component', module)
  .add('Upload', SimpleUpload)