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
    percent?: number;
    /** 源文件 */
    raw?: File;
    /** 成功上传 */
    response?: any;
    /** 上传失败 */
    error?: any;
}
export interface UploadProps {
    /** 上传地址 */
    action: string;
    /** 要展示的上传文件列表数据 */
    defaultFileList?: UploadFile[];
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
/**
 * ## Upload上传
 * ---
 * 文件选择上传和拖拽上传控件。
 *
 * ### 何时使用
 * ---
 * 上传是将信息（网页、文字、图片、视频等）通过网页或者上传工具发布到远程服务器上的过程。
 * - 当需要上传一个或一些文件时。
 * - 当需要展现上传的进度时。
 * - 当需要使用拖拽交互时。
 *
 * ### 使用方式
 * ```js
 * import { Upload上传 } from 'ts-com-ui'
 * ```
 */
export declare const Upload: FC<UploadProps>;
export default Upload;
