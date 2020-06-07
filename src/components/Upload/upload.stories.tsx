import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Upload } from './upload';
import Icon from '../Icon/icon';
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
      <Icon icon="upload" size="5x" theme="secondary" />
      <br/>
      <p>Drag file over to upload</p>
    </Upload>
  )
}

storiesOf('Upload component', module)
  .add('Upload', SimpleUpload)