window.dom = {
  create(string) {
    //创建节点
    const container = document.createElement("template");
    container.innerHTML = string.trim(); //trim将标签左右的空格去除
    return container.content.firstChild;
  },

  after(node, node2) {
    //新增弟弟
    node.parentNode.insertBefore(node2, node.nextSibling);
  },

  before(node, node2) {
    //新增哥哥
    node.parentNode.insertBefore(node2, node);
  },

  append(parent, node) {
    //新增儿子
    parent.appendChild(node);
  },

  wrap(node, parent) {
    //新增父亲
    dom.before(node, parent);
    dom.append(parent, node);
  },

  remove(node) {
    //删除节点
    node.parentNode.removeChild(node);
    return node; //保留这个节点的引用
  },

  empty(node) {
    //删除所有后代节点
    const { childNodes } = node; //const childNodes = node.childNodes的简写
    const array = [];

    let x = node.firstChild;
    while (x) {
      array.push(dom.remove(node.firstChild));
      x = node.firstChild;
    }
    return array;
  },

  attr(node, name, value) {
    //重载，兼具读、改属性
    if (arguments.length === 3) {
      node.setAttribute(name, value);
    } else if (arguments.length === 2) {
      return node.getAttribute(name);
    }
  },

  text(node, string) {
    if (arguments.length === 2) {
      //读、改文本内容
      if ("innerText" in node) {
        node.innerText = string;
      } else {
        node.textContent = string;
      }
    } else if (arguments.length === 1) {
      if ("innerText" in node) {
        return node.innerText;
      } else {
        return node.textContent;
      }
    }
  },

  html(node, string) {
    //读、改HTML内容
    if (arguments.length === 2) {
      node.innerHTML = string;
    } else if (arguments.length === 1) {
      return node.innerHTML;
    }
  },

  style(node, name, value) {
    //修改样式 style
    if (arguments.length === 3) {
      // dom.style(div,'color','red')
      node.style[name] = value;
    } else if (arguments.length === 2) {
      if (typeof name === "string") {
        //dom.style(div,'color')
        //如果输入的第二个参数是字符串的话就返回样式属性的值
        return node.style[name];
      } else if (name instanceof Object) {
        //else if (typeof name === "object")
        // dom.style(div,{color:'red'})
        //如果输入的第二个参数是对象的话就执行下面的代码
        const object = name; //把name的值赋值给object变量
        for (let key in object) {
          //在object变量里放入一个key，代表属性值
          node.style[key] = object[key];
        }
      }
    }
  },

  class: {
    add(node, className) {
      node.classList.add(className);
    },
    remove(node, className) {
      node.classList.remove(className);
    },
    has(node, className) {
      return node.classList.contains(className);
    },
  },

  on(node, eventName, fn) {
    //添加事件监听
    node.addEventListener(eventName, fn);
  },
  off(node, eventName, fn) {
    //删除事件监听
    node.removeEventListener(eventName, fn);
  },

  find(selector, scope) {
    //获取标签
    return (scope || document).querySelectorAll(selector);
  },

  parent(node) {
    //获取父元素
    return node.parentNode;
  },

  children(node) {
    //获取子元素
    return node.children;
  },

  siblings(node) {
    //获取兄弟姐妹
    return Array.from(node.parentNode.children).filter((n) => n !== node);
  },

  next(node) {
    //获取弟弟
    // return node.nextSibling 会获取文本
    let x = node.nextSibling;
    while (x && x.nodeType === 3) {
      x = x.nextSibling;
    }
    return x;
  },

  previous(node) {
    //获取哥哥
    let x = node.previousSibling;
    while (x && x.nodeType === 3) {
      x = x.previousSibling;
    }
    return x;
  },

  each(nodeList, fn) {
    //遍历
    for (let i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i]);
    }
  },

  index(node) {
    //在数组里排第几
    const list = dom.children(node.parentNode);
    let i;
    for (i = 0; i < list.length; i++) {
      if (list[i] === node) {
        break;
      }
    }
    return i;
  },
};
