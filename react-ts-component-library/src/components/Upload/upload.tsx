import React, { FC, useRef, ChangeEvent, useState } from 'react';
import axios from 'axios'

import UploadList from './uploadList'
import Dragger from './dragger'

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'

export interface UploadFile {
  uid: string;
  /** 文件大小 */
  size: number;
  /** 文件名 */
  name: string;
  /** 文件状态 'ready' | 'uploading' | 'success' | 'error' */
  status?: UploadFileStatus;
  /** 上传百分比 */
  precent ?: number;
  /** 源文件 */
  raw ?: File;
  /** 成功上传 */
  responce ?: any;
  /** 上传失败 */
  error ?: any 
}

export interface UploadProps {
  /** 上传地址 */
  action: string;
  /** 要展示的上传文件列表数据 */
  dafaultFileList ?: UploadFile[];
  /** 上传之前对文件检查 */
  beforeUpload ?: (file: File) => boolean | Promise<File>  ;
  /** 上传进度 */
  onProgress ?: (percentage: number, file: File) => void;
  /** 上传成功 */
  onSuccess ?: (data: any, file: File) => void;
  /** 上传失败 */
  onError ?: (err: any, file: File) => void;
  /** 检测文件变化 */
  onChange ?: (file: File) => void;
  /** 取消上传某一文件 */
  onRemove ?: (file: UploadFile) => void;
  /** 自定义请求头 */
  headers?: {[key: string] : any};
  name ?: string;
  data?:{[key: string]: any};
  withCredentials?: boolean;
  /** 允许上传的文件类型 */
  accept?: string;
  /** 是否支持多选 */
  multiple ?: boolean,
  /** 是否支持拖动上传 */
  drag?: boolean,
}

export const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    dafaultFileList,
    beforeUpload,
    onProgress,
    onSuccess,
    onError,
    onChange,
    onRemove,
    name,
    headers,
    data,
    withCredentials,
    accept,
    multiple,
    children,
    drag,
  } = props
  
  const fileInput = useRef<HTMLInputElement>(null)
  const [fileList, setFileList] = useState<UploadFile[]>( dafaultFileList || [])

  const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
    setFileList(prevList => {
      return prevList.map(file => {
        if (file.uid === updateFile.uid) {
          return {...file, ...updateObj}
        } else {
          return file
        }
      })
    })
  }

  const handleUploadClick = () => {
    if (fileInput.current){
      fileInput.current.click()
    }
  }

  const post = (file: File) => {
    let _file:UploadFile = {
      uid: Date.now() + 'upload-file',
      status: 'ready',
      name: file.name,
      size: file.size,
      precent: 0,
      raw: file
    }

    // setFileList([_file, ...fileList])
    setFileList(prevFileList => (
      [_file, ...prevFileList]
    ))
    const formData = new FormData()
      formData.append(name || 'file', file)
      if (data) {
        Object.keys(data).forEach(key => {
          formData.append(key, data[key])
        })
      }
      axios.post(action, formData, {
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data'
        },
        withCredentials,
        onUploadProgress: (e) => {
          let percentage = Math.round((e.loaded * 100) / e.total) || 0
          updateFileList(_file, {precent: percentage, status: 'uploading'})
          if (percentage < 100) {
            if (onProgress) {
              onProgress(percentage, file)
            }
          }
        }
      }).then(res => {
        console.log(res);
        updateFileList(_file, {status: 'success', responce: res.data})
        if (onSuccess) {
          onSuccess(res.data, file)
        }
        onChange && onChange(file)
      }).catch(err => {
        updateFileList(_file, {status: 'error', error: err})
        if (err && onError) {
          onError(err, file)
        }
        onChange && onChange(file)
      })
  }

  const uploadFiles = (files: FileList) => {
    let postFiles = Array.from(files)
    postFiles.forEach(file => {
      if (!beforeUpload) {
        post(file)
      } else {
        const result = beforeUpload(file)
        if (result && result instanceof Promise) {
          result.then(processedFile => {
            post(processedFile)
          })
        } else if (!!result) {
          post (file)
        }
      }
    })
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) {
      return
    }

    uploadFiles(files)
    if (fileInput.current) {
      fileInput.current.value = ''
    }
  }

  const handleRemoveClick = (file: UploadFile) => {
    setFileList((prevList) => {
      return prevList.filter(item => item.uid !== file.uid )
    })
    if (onRemove) {
      onRemove(file)
    }
  }

  return (
    <div
      className="viking-upload-component"
    >
      <div
        className="viking-upload-input"
        style={{display: 'inlint-block'}}
        onClick={handleUploadClick}
      >
        {drag ? 
        (<Dragger
            onFile={(files) => {uploadFiles(files)}}
          >
          {children}
        </Dragger>): {children}}
      </div>
      <input
        className="viking-file-input"
        ref={fileInput}
        style={{display: 'none'}}
        onChange={handleFileChange}
        type="file"
        accept={accept}
        multiple={multiple}
      />
      <UploadList 
        fileList ={fileList}
        onRemove={handleRemoveClick}
      />
    </div>
  )
}

Upload.defaultProps = {
  name: 'file',
}

export default Upload;