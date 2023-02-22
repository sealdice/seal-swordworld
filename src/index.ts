import { Version } from 'bcdice';
import './bcdi18n'
import 'bcdice/lib/bcdice/game_system/SwordWorld2_5_SimplifiedChinese';
import StaticLoader from './bcd-loader'
import { bracketParse } from './bracket-parser';
import GameSystemClass from 'bcdice/lib/game_system';


// console.log('BCDice Version:', Version);

let curSys: GameSystemClass = undefined;

const loader = new StaticLoader();
loader.dynamicLoad('SwordWorld2.5:SimplifiedChinese').then((GameSystem) => {
  curSys = GameSystem;
  register();
}).catch(e => {
  console.error('JS插件剑世界2.5加载失败:' + e.toString())
  return;
})

const replaceMap = {
  '＞': '>',
  '<': '<',
  '，': ','
};

const strReplaceAll = function (s, s1, s2: string) {
  return s.replace(new RegExp(s1, "gm"), s2);
}

const register = () => {
  let ext = seal.ext.find('sw');
  if (!ext) {
    ext = seal.ext.new('sw', '木落', '1.1.0');
    seal.ext.register(ext);
  }

  const cmdSW = seal.ext.newCmdItemInfo();
  cmdSW.name = 'sw';
  cmdSW.help = '剑世界骰点，格式为 .sw <式子>，以下说明为系统原文:\n\n' + curSys.HELP_MESSAGE;

  cmdSW.solve = (ctx, msg, cmdArgs) => {
    let val = cmdArgs.getArgN(1);
    switch (val) {
      case 'help':
      case '': {
        const ret = seal.ext.newCmdExecuteResult(true);
        ret.showHelp = true;
        return ret;
      }

      case 'ver':
      case 'version': {
        seal.replyToSender(ctx, msg, `BCDice Version ${Version}`);
        break;
      }

      default: {
        let lastText = '';
        val = cmdArgs.cleanArgs;
        for (let [k, v] of Object.entries(replaceMap)) {
          val = strReplaceAll(val, k, v);
        }
        if (val) {
          try {
            const pairs = bracketParse(val);
            let leftIndex = val.length;
            for (let i = pairs.length - 1; i >= 0; i--) {
              const p = pairs[i];
              const fstr = seal.format(ctx, val.slice(p[0], p[1] + 1));
              lastText = fstr + val.slice(p[1] + 1, leftIndex) + lastText;
              leftIndex = p[0];
            }
            lastText = val.slice(0, leftIndex) + lastText;
            console.log('>DiceText: ' + lastText);
          } catch (e) {
            seal.replyToSender(ctx, msg, '执行失败，可能是对 {} 的使用不规范: ' + e.toString());
            return seal.ext.newCmdExecuteResult(true);
          }
        }
        const ret = curSys.eval(lastText || '');
        if (ret) {
          seal.replyToSender(ctx, msg, ret.text);
        } else {
          // 注: ret 好像总是空的
          seal.replyToSender(ctx, msg, '执行失败，请检查你的式子');
        }
      }
    }
    return seal.ext.newCmdExecuteResult(true);
  }

  ext.cmdMap['sw'] = cmdSW;
}
