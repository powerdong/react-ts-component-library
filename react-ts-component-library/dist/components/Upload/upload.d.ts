import { FC } from 'react';
export declare type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error';
export interface UploadFile {
    uid: string;
    /** 文件大小 */
    size: number;
    /** 文件名 */
    name: string;
    /** 文件状态 'ready' | 'uploading' | 'success' | 'error' */
    status?: UploadFileStatus;
    /** 上传百分比 */
    precent?: number;
    /** 源文件 */
    raw?: File;
    /** 成功上传 */
    responce?: any;
    /** 上传失败 */
    error?: any;
}
export interface UploadProps {
    /** 上传地址 */
    action: string;
    /** 要展示的上传文件列表数据 */
    dafaultFileList?: UploadFile[];
    /** 上传之前对文件检查 */
    beforeUpload?: (file: File) => boolean | Promise<File>;
    /** 上传进度 */
    onProgress?: (percentage: number, file: File) => void;
    /** 上传成功 */
    onSuccess?: (data: any, file: File) => void;
    /** 上传失败 */
    onError?: (err: any, file: File) => void;
    /** 检测文件变化 */
    onChange?: (file: File) => void;
    /** 取消上传某一文件 */
    onRemove?: (file: UploadFile) => void;
    /** 自定义请求头 */
    headers?: {
        [key: string]: any;
    };
    name?: string;
    data?: {
        [key: string]: any;
    };
    withCredentials?: boolean;
    /** 允许上传的文件类型 */
    accept?: string;
    /** 是否支持多选 */
    multiple?: boolean;
    /** 是否支持拖动上传 */
    drag?: boolean;
}
export declare const Upload: FC<UploadProps>;
export default Upload;
