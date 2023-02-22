import 'bcdice/lib/bcdice/i18n_list.json';
import { I18n } from 'bcdice/lib/internal';

import i18n38 from 'bcdice/lib/bcdice/i18n/SwordWorld.ja_jp.json'
I18n.$load_translation(JSON.stringify(i18n38));
import i18n39 from 'bcdice/lib/bcdice/i18n/SwordWorld2_0.ja_jp.json'
I18n.$load_translation(JSON.stringify(i18n39));
import i18n40 from 'bcdice/lib/bcdice/i18n/SwordWorld2_5.ja_jp.json'
I18n.$load_translation(JSON.stringify(i18n40));

import i18n401 from 'bcdice/lib/bcdice/i18n/SwordWorld.zh_hans.json'
I18n.$load_translation(JSON.stringify(i18n401));

import i18n402 from 'bcdice/lib/bcdice/i18n/SwordWorld2_0.zh_hans.json'
I18n.$load_translation(JSON.stringify(i18n402));

import i18n403 from 'bcdice/lib/bcdice/i18n/SwordWorld2_5.zh_hans.json'
I18n.$load_translation(JSON.stringify(i18n403));


// 此文件由以下代码自动生成:
// let i18nCount = 1
// I18nList.i18nList.forEach(I18nInfo => {
//   I18nInfo.locales.forEach(locale => {
//     // eslint-disable-next-line @typescript-eslint/no-var-requires
//     console.log(`import i18n${i18nCount} from 'bcdice/lib/bcdice/i18n/${I18nInfo.baseClassName}.${locale}.json'`);
//     console.log(`I18n.$load_translation(JSON.stringify(i18n${i18nCount}));`);
//     i18nCount += 1;
//   });
// });
