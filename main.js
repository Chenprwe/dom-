// create
const div = dom.create("<div>newDiv</div>");
console.log(div);

//after
dom.after(test, div);

//wrap
const div3 = dom.create('<div id="parent"></div>'); //？？？？？
dom.wrap(test, div3);

//empty
const nodes = dom.empty(window.empty); //？？？？？？？
console.log(nodes);

//attr
dom.attr(test, "title", "Hi,I am Frank");
const title = dom.attr(test, "title"); //读取title属性
console.log(`title:${title}`); //?????????

//text
dom.text(test, "你好，这是新的内容");
dom.text(test); //获取text

//style
dom.style(test, { border: "1px solid red", color: "blue" });
console.log(dom.style(test, "border"));
dom.style(test, "border", "1px solid black");

//class
dom.class.add(test, "red");
dom.class.add(test, "blue");
dom.class.remove(test, "blue");
console.log(dom.class.has(test, "blue"));

//click
const fn = () =>{
    console.log('点击了');
}
dom.on(test, "click",fn);
dom.off(test,'click',fn);

//find
const testDiv = dom.find('#test')[0]
console.log(testDiv)
const test2 = dom.find('#test2')[0]
// dom.find('.red',testDiv)//在指定范围内找
console.log(dom.find('.red',test2)[0])

//parent
console.log(dom.parent(test))

//siblings
console.log(dom.siblings(dom.find('#s2')[0]))

//next
// console.log(dom.next(dom.find('#s2')[0]))
const s2 = dom.find('#s2')[0]
console.log(dom.siblings(s2))
console.log(dom.next(s2))

//previous
console.log(dom.previous(s2))

//each
const t = dom.find('#travel')[0]
dom.each(dom.children(t),(n)=> dom.style(n,'color','red'))

//index
console.log(dom.index(s2))