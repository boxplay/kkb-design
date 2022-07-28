import React from 'react'
import { createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});

export const name = [
  '张三',
  '李四',
  '赵五',
  '王小六'
]

export const text = [
  '短文本',
  '长长长长长长长长长长长长长长长长长长长长长长文本长长长长长长长长长长长长长长长长长长长长长长文本'
]

export const money = [
  null,
  NaN,
  0,
  '0',
  '0.00',
  '9.9',
  '168',
  '12900',
  '100000'
]
export const time = [
  null,
  NaN,
  '2021-04-12 12:00:00',
  '2021-05-31T16:19:17',
  '1619491346',
  '1619491346000'
]

export const avatar = [
  'https://img0.baidu.com/it/u=3324287611,3832720410&fm=26&fmt=auto&gp=0.jpg',
  'https://img1.baidu.com/it/u=2796144188,439704386&fm=26&fmt=auto&gp=0.jpg',
  'https://img2.baidu.com/it/u=2590128318,632998727&fm=26&fmt=auto&gp=0.jpg',
  'https://img1.baidu.com/it/u=3483534024,40664929&fm=26&fmt=auto&gp=0.jpg',
  'https://img0.baidu.com/it/u=298098053,3934671910&fm=26&fmt=auto&gp=0.jpg',
  'https://img1.baidu.com/it/u=3266904723,3191652437&fm=26&fmt=auto&gp=0.jpg'
]

export const group = [
  {
    value: 0,
    babel: '0%',
    color: 'red',
  },
  {
    value: 1,
    babel: '20%',
    color: 'green',
  },
  {
    value: 2,
    babel: '40%',
    color: 'blue',
  },
  {
    value: 3,
    babel: '60%',
    color: 'skyblue',
  },
  {
    value: 4,
    babel: '80%',
    color: 'pink',
  },
  {
    value: 5,
    babel: '100%',
    icon: <IconFont type="icon-tuichu" />
  }
]

export const trueText = [
  '前端优化的途径有很多，按粒度大致可以分为两类，第一类是页面级别的优化，例如HTTP请求数、脚本的无阻塞加载、内联脚本的位置优化等;第二类则是代码级别的优化，例如Javascript中的DOM操作优化、',
  '在职场中，你要做到的不仅是在脑子里有新的思想及见解，更重要的是能在同事、领导、客户面前清晰明确地表达出来。',
  '可变性：String类中使用字符数组保存字符串，privatefinalcharvalue[]，所以string对象是不可变的。StringBuilder与StringBuffer都继承自Abst',
  '对于许多Java从业者来说，MySQL的性能优化一直是大难题。无论是跳槽面试，还是日常的业务开发，你总会遇到这样那样的数据库性能瓶颈。',
  '人工智能目前是一个快速增长的领域，人才需求量大，相比于其他技术岗位，竞争度偏低，薪资相对较高，因此，现在是进入人工智能领域的大好时机。',
  '电台播音员教你完美发音',
  '体系化培养方案，以就业为导向，4大方案保障就业',
  '1v1职业生涯规划，做你职场成功之路背后的伙伴'
]
