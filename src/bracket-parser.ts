
export function bracketParse(input: string) {
  let stack = [];
  let pairs: number[][] = [];

  for (let i = 0; i < input.length; i++) {
    const ch = input[i];
    switch (ch) {
      case '{': {
        stack.push(i);
        break;
      }
      case '}': {
        if (!stack.length) throw new Error('存在 } 但找不到对应的 {');
        const pos = stack.pop();
        if (pos !== undefined) {
          pairs.push([pos, i]);
        }
        break;
      }
    }
  }

  if (stack.length) {
    throw new Error('句中有未结束的 {')
  }

  // 洗去重叠部分
  const newPairs: number[][] = [];
  for (let i = 0; i < pairs.length; i++) {
    const a = pairs[i];

    let ok = true;
    for (let j = 0; j < pairs.length; j++) {
      const b = pairs[j];
      if (a[0] > b[0] && a[1] < b[1]) {
        ok = false;
        break;
      }
    }

    if (ok) {
      newPairs.push(a);
    }
  }

  // 最终结果
  // for (let i of newPairs) {
  //   console.log('x', input.slice(i[0], i[1] + 1))
  // }
  // console.log(pairs);
  return newPairs;
}

// bracketParse('aaaa {力量} b· bb   {敏捷 + d10 {2} }')
