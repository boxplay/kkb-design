import React from 'react';
import { IconFont } from '../Icon';

export enum FileType {
  AUDIO,
  EXCEL,
  PIC,
  RAR,
  DOC,
  PDF,
  VIDEO,
  PPT,
  OTHER
}

type AudioType = '.cda' | '.wav' | '.mp3' | '.mp1' | '.amr' | '.mp2' | '.mmf' | '.aac' | '.mid' | '.vqf' | '.ogg' | '.ra' | '.ape' | '.flac'
type ExcelType = '.xlsx' | '.xls'
type VideoType = '.avi' | '.mpg' | '.mlv' | '.mpeg' | '.dat' | '.mov' | '.wmv' | '.rm' | '.swf' | '.flv' | 'mp4'
type PicType = '.png' | '.jpg' | '.jpeg' | '.gif' | '.svg' | '.bmp' | '.webp' | '.tif'
type RarType = '.zip' | '.rar' | '.arj' | '.tar' | '.gz' | '.z' | '.ari' | 'arc' | '.7z' | '.001' | '.bz' | '.taz' | '.zipx'
type DocType = '.doc' | '.docx'
type PdfType = '.pdf'
type PPTType = '.ppt' | '.pptx'

export const excelSuffix: ExcelType[] = ['.xlsx', '.xls']
export const rArSuffix: RarType[] = ['.zip', '.rar', '.arj', '.tar', '.gz', '.z', '.ari', 'arc', '.7z', '.001', '.bz', '.taz', '.zipx']
export const wordSuffix: DocType[] = ['.doc', '.docx']
export const pdfSuffix: PdfType[] = ['.pdf']
export const pptSuffix: PPTType[] = ['.ppt', '.pptx']
export const videoSuffix: VideoType[] = ['.avi','.mpg','.mlv','.mpeg','.dat', '.mov', '.wmv', '.rm', '.swf','.flv','mp4']
export const audioSuffix: AudioType[] = ['.cda', '.wav', '.mp3', '.mp1', '.amr', '.mp2', '.mmf', '.aac', '.mid','.vqf','.ogg', '.ra', '.ape', '.flac']
export const imgSuffix: PicType[] = ['.png','.jpg','.jpeg','.gif','.svg','.bmp','.webp', '.tif']

interface FileIconType {
  fileSuffix?: any, // 文件后缀
  color?: string,
  style?: React.CSSProperties,
  width?: number,
  height?: number,
  className?: string
}

const handleSuffix = (suffix: string) => {
  // excel
  if (excelSuffix.includes(suffix as ExcelType)) return FileType.EXCEL
  // word
  if (wordSuffix.includes(suffix as DocType)) return FileType.DOC
  // pdf
  if (pdfSuffix.includes(suffix as PdfType)) return FileType.PDF
  // video
  if (videoSuffix.includes(suffix as VideoType)) return FileType.VIDEO
  // 音频
  if (audioSuffix.includes(suffix as AudioType)) return FileType.AUDIO
  // 压缩包
  if (rArSuffix.includes(suffix as RarType)) return FileType.RAR
  // 图片
  if (imgSuffix.includes(suffix as PicType)) return FileType.PIC
  // PPT
  if (pptSuffix.includes(suffix as PPTType)) return FileType.PPT

  return FileType.OTHER
}

/**
 * 不同文件后缀渲染不同的icon
 * @param fileSuffix // 文件后缀
 * @param color
 * @param style
 * @constructor
 */
const FileIcon = ({ fileSuffix = '.zip', color, style, width, height, className }: FileIconType) => {
  const suffix = handleSuffix(fileSuffix)
  const iconStyle = style || {}
  const icon = (type: string) => <IconFont
    style={{ fontSize: '16px',...iconStyle}}
    color={color}
    width={width || 16}
    height={height || 18}
    type={type}
    className={className}/>

  const icons = {
    [FileType.RAR]: icon('icon-zip'),
    [FileType.PIC]: icon('icon-file-image'),
    [FileType.AUDIO]: icon('icon-file-music'),
    [FileType.VIDEO]: icon('icon-file-video'),
    [FileType.PDF]: icon('icon-pdf'),
    [FileType.DOC]: icon('icon-word'),
    [FileType.EXCEL]: icon('icon-excel'),
    [FileType.PPT]: icon('icon-ppt'),
    [FileType.OTHER]: icon('icon-other'),
  }
  
  return icons[suffix]
}
export default FileIcon
