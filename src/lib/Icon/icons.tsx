import React from 'react';
import { IconFont } from './index';
import './index.less'
import { getPrefixCls } from '../../utils';

interface IconProps {
  width?: string | number;
  height?: string | number;
  fill?: string;
  viewBox?: string;
  className?: string;
  style?: React.CSSProperties;
}

const renderIcon = (props : IconProps, type: string) => {
  const {className, ...rest} = props
  return <IconFont className={`${getPrefixCls('kkb-icon')} ${className}`} {...rest} type={type} />
}
/**
 * 通过iconfont导入的
 * icon库地址：https://www.iconfont.cn/manage/index?spm=a313x.7781069.1998910419.20&manage_type=myprojects&projectId=2792360&keyword=&project_type=&page=
 */
const Icons = {
  Upload: (props: IconProps) => renderIcon(props, 'icon-upload'),
  Loading: (props: IconProps) => renderIcon(props, 'icon-loading'),
  CheckboxCircleFill: (props: IconProps) => renderIcon(props, 'icon-checkbox-circle-fill'),
  CloseCircleFill: (props: IconProps) => renderIcon(props, 'icon-close-circle-fill'),
  Zip: (props: IconProps) => renderIcon(props, 'icon-zip'),
  FileImage: (props: IconProps) => renderIcon(props, 'icon-file-image'),
  FileMusic: (props: IconProps) => renderIcon(props, 'icon-file-music'),
  FileVideo: (props: IconProps) => renderIcon(props, 'icon-file-video'),
  FilePdf: (props: IconProps) => renderIcon(props, 'icon-pdf'),
  FileWord: (props: IconProps) => renderIcon(props, 'icon-word'),
  FileExcel: (props: IconProps) => renderIcon(props, 'icon-excel'),
  FilePpt: (props: IconProps) => renderIcon(props, 'icon-ppt'),
  FileOther: (props: IconProps) => renderIcon(props, 'icon-other'),
  KaikebaLinear: (props: IconProps) => renderIcon(props, 'icon-kaikeba-linear'),
  Picture: (props: IconProps) => renderIcon(props, 'icon-image'),
  MiduiLinear: (props: IconProps) => renderIcon(props, 'icon-midui-linear'),
  NextStep: (props: IconProps) => renderIcon(props, 'icon-next'),
  EyeLiner: (props: IconProps) => renderIcon(props, 'icon-eye-linear'),
  Heading: (props: IconProps) => renderIcon(props, 'icon-heading'),
  Bold: (props: IconProps) => renderIcon(props, 'icon-bold'),
  PreviousStep: (props: IconProps) => renderIcon(props, 'icon-previous'),
  ManageLinear: (props: IconProps) => renderIcon(props, 'icon-manage-linear'),
  HrLiner: (props: IconProps) => renderIcon(props, 'icon-hr-linear'),
  CodeLiner: (props: IconProps) => renderIcon(props, 'icon-code-linear'),
  DistributeLinear: (props: IconProps) => renderIcon(props, 'icon-distribute-linear'),
  WorkbenchLinear: (props: IconProps) => renderIcon(props, 'icon-workbench-linear'),
  EtgLinear: (props: IconProps) => renderIcon(props, 'icon-etg-linear'),
  HomeLinear: (props: IconProps) => renderIcon(props, 'icon-home-linear'),
  CustomerLinear: (props: IconProps) => renderIcon(props, 'icon-customer-linear'),
  DoLinear: (props: IconProps) => renderIcon(props, 'icon-do-linear'),
  ScrmLinear: (props: IconProps) => renderIcon(props, 'icon-scrm-linear'),
  CurriculumLinear: (props: IconProps) => renderIcon(props, 'icon-curriculum-linear'),
  Subordinate: (props: IconProps) => renderIcon(props, 'icon-subordinate'),
  Department: (props: IconProps) => renderIcon(props, 'icon-department'),
  Live: (props: IconProps) => renderIcon(props, 'icon-zhibo'),
  LiveReconnect: (props: IconProps) => renderIcon(props, 'icon-zhongshangzhibo'),
  LastTime: (props: IconProps) => renderIcon(props, 'icon-zuixinshangkeshijian'),
  Tel: (props: IconProps) => renderIcon(props, 'icon-dianhua'),
  LockLinear: (props: IconProps) => renderIcon(props, 'icon-lock-linear'),
  ForbidLinear: (props: IconProps) => renderIcon(props, 'icon-forbid-linear'),
  ThumbLinear: (props: IconProps) => renderIcon(props, 'icon-thumb-linear'),
  TimeLinear: (props: IconProps) => renderIcon(props, 'icon-time-linear'),
  Star: (props: IconProps) => renderIcon(props, 'icon-star'),
  AddNoBorderLinear: (props: IconProps) => renderIcon(props, 'icon-add-linear'),
  MoveLinear: (props: IconProps) => renderIcon(props, 'icon-move-linear'),
  CheckLinear: (props: IconProps) => renderIcon(props, 'icon-check-linear'),
  DownLinear: (props: IconProps) => renderIcon(props, 'icon-down-linear'),
  EditLinear: (props: IconProps) => renderIcon(props, 'icon-edit-linear'),
  DeleteLinear: (props: IconProps) => renderIcon(props, 'icon-delete-linear'),
  UpLinear: (props: IconProps) => renderIcon(props, 'icon-up-linear'),
  CloseLinear: (props: IconProps) => renderIcon(props, 'icon-close-linear'),
  SettingLinear: (props: IconProps) => renderIcon(props, 'icon-settings-linear'),
  HeartLinear: (props: IconProps) => renderIcon(props, 'icon-heart-linear'),
  ArrowUpLinear: (props: IconProps) => renderIcon(props, 'icon-arrow-up-linear'),
  ArrowDownLinear: (props: IconProps) => renderIcon(props, 'icon-arrow-down-linear'),
  DownloadLinear: (props: IconProps) => renderIcon(props, 'icon-download-linear'),
  RestartLinear: (props: IconProps) => renderIcon(props, 'icon-restart-linear'),
  NotificationLinear: (props: IconProps) => renderIcon(props, 'icon-notification-linear'),
  ShareLinear: (props: IconProps) => renderIcon(props, 'icon-share-linear'),
  WarningLinear: (props: IconProps) => renderIcon(props, 'icon-warning-linear'),
  InformationLinear: (props: IconProps) => renderIcon(props, 'icon-information-linear'),
  CheckboxLinear: (props: IconProps) => renderIcon(props, 'icon-checkbox-linear'),
  QuestionLinear: (props: IconProps) => renderIcon(props, 'icon-question-linear'),
  CloseCircleLinear: (props: IconProps) => renderIcon(props, 'icon-close-circle-linear'),
  SearchLinear: (props: IconProps) => renderIcon(props, 'icon-search-linear'),
  NorLinear: (props: IconProps) => renderIcon(props, 'icon-nor-linear'),
  SwitchLinear: (props: IconProps) => renderIcon(props, 'icon-switch-linear'),
  DataLinear: (props: IconProps) => renderIcon(props, 'icon-data-linear'),
  LaunchLinear: (props: IconProps) => renderIcon(props, 'icon-launch-linear'),
  OrderLinear: (props: IconProps) => renderIcon(props, 'icon-order-linear'),
  JurisdictionLinear: (props: IconProps) => renderIcon(props, 'icon-jurisdiction-linear'),
  AffairsLinear: (props: IconProps) => renderIcon(props, 'icon-affairs-linear'),
  OperateLinear: (props: IconProps) => renderIcon(props, 'icon-operate-linear'),
  ComplaintLinear: (props: IconProps) => renderIcon(props, 'icon-complaint-linear'),
  CommodityLinear: (props: IconProps) => renderIcon(props, 'icon-commodity-linear'),
  ReduceBorderedLinear: (props: IconProps) => renderIcon(props, 'icon-checkbox'),
  AddBorderedLinear: (props: IconProps) => renderIcon(props, 'icon-add')
}
export default Icons
