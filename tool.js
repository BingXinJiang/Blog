//浏览器检测
(function(){
	window.sys = {};//让外部可以访问，保存浏览器信息
	var ua = navigator.userAgent.toLowerCase();//获取浏览器信息字符串
	var s; //浏览器名称，版本

	(s = ua.match(/msie([\d.]+)/)) ? sys.ie = s[1] :
	(s = ua.match(/firefox\/([\d.]+)/)) ? sys.firefox = s[1] :
	(s = ua.match(/chrome\/([\d.]+)/)) ? sys.chrome = s[1] :
	(s = ua.match(/opera\/.*version\/([\d.]+)/)) ? sys.opera = s[1] :
	(s = ua.match(/version\/([\d.]+).*safari/)) ? sys.safari = s[1] : 0;

	if(/webkit/.test(ua)) sys.webkit = ua.match(/webkit\/([\d.]+)/)[1];

})();
//DOM加载
function addDomLoaded(fn){
	var isReady = false;
	var timer = null;

	function doReady(fn){
		if(timer) clearInterval(timer);
		if(isReady) return;
		isReady = true;
		fn();
	}

	if((sys.opera && sys.opera < 9) || (sys.firefox && sys.firefox < 3) || (sys.webkit && sys.webkit < 525)){
		timer = setInterval(function(){
			//loaded部分完成加载，complete全部完成加载
			if(/loaded | complete/.test(document.readyState)){
				doReady(fn);
			}
		},1);
	}else if(document.addEventListener){//W3C
		addEvent(document,'DOMContentLoaded',function(){
			fn();
			removeEvent(document,'DOMContentLoaded',arguments.callee);
		});
	}else if(sys.ie && sys.ie < 9){//IE6、7、8
		var timer = null;

		timer = setInterval(function(){
			try{
				document.documentElement.doScroll('left');
				doReady();
			} catch(e){};
		},1);
	}
}
//跨浏览器获取窗口大小
function getInner () {
	if(window.innerWidth != 'underfine'){
		return {
			width:window.innerWidth,
			height:window.innerHeight
		}
	}else{
		return {
			width:document.documentElement.clientWidth,
			height:document.documentElement.clientHeight
		}
	}
}
//跨浏览器获取style
function getStyle(element,attr){
	var value;
	if(typeof window.getComputedStyle != 'undefined'){//W3C
		value = window.getComputedStyle(element,null)[attr];
	}else if(typeof element.currentStyle != 'undefined'){//IE
		value = element.currentStyle[attr];
	}
	return value;
}
//判断class是否存在
function hasClass(element,className){
	return element.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}
//跨浏览器添加link规则
function insertRule(sheet,selector,cssText,index){
	if(typeof sheet.insertRule != 'undefined'){
		sheet.insertRule(selector+'{'+cssText+'}',index);
	}else if(typeof sheet.addRule != 'undefined'){
		sheet.addRule(selector,cssText,index);
	}
}
//跨浏览器移出link规则
function deleteRule(sheet,index){
	if(typeof sheet.insertRule != 'undefined'){
		sheet.deleteRule(index);
	}else if(typeof sheet.addRule != 'undefined'){
		sheet.removeRule(index);
	}
}
//获取Event对象
function getEvent(event){
	return event || window.event;
}
//阻止默认行为
function preDef(event){
	var e = getEvent(event);
	if(typeof e.preventDefault != 'undefined'){//W3C
		e.preventDefault();
	}else{//IE
		e.returnValue = false;
	}
}
//为每个事件分配一个计数器
addEvent.ID = 1;
//跨浏览器事件绑定
function addEvent(obj,type,fn){
	if(typeof obj.addEventListener != 'undefined'){
		obj.addEventListener(type,fn,false);
	}else if(typeof obj.attachEvent != 'undefined'){
		//创建一个存放事件的hash表（散列表）
		if(!obj.events) obj.events = {};
		//第一次执行时执行
		if(!obj.events[type]){
			//创建一个存储事件处理函数的数组
			obj.events[type] = [];
			//把第一次的事件处理函数先储存到第一个位置上
			if(obj['on'+type]) obj.events[type][0] = fn;
		}else{
			//同一个函数进行屏蔽，不添加到计数器中
			if(addEvent.equal(addEvent.events[type],fn))
				return false;
		}
		//从第二次开始我们用事件计数器存储
		obj.events[type][addEvent.ID++] = fn;
		//执行函数
		obj['on'+type] = addEvent.exec;
	}
}
//执行事件处理函数
addEvent.exec = function(event){
	var e = event || addEvent.fixEvent(window.event);
	var es = this.events[e.type];
	for(var i in es){
		es[i].call(this,e);
	}
};
//同一个注册函数进行屏蔽
addEvent.equal = function(es,fn){
	for(var i in es){
		if(es[i] == fn) return true;
	}
	return false;
};
//把IE常用的事件对象配对到W3C中去
addEvent.fixEvent = function(event){
	event.preventDefault = addEvent.fixEvent.preventDefault();
	event.stopPropagation = addEvent.fixEvent.stopPropagation();
	event.target = event.srcElement;
	return event;
};
//IE阻止默认行为
addEvent.fixEvent.preventDefault = function(){
	this.returnValue = false;
};
//IE取消冒泡
addEvent.fixEvent.stopPropagation = function(){
	this.cancelBubble = true;
};
//跨浏览器删除事件
function removeEvent(obj,type,fn){
	if(typeof obj.removeEventListener != 'undefined'){
		obj.removeEventListener(type,fn,false);
	}else if(obj.detachEvent != 'undefined'){
		if(obj.events[type]){
			for(var i in obj.events[type]){
				if(obj.events[type][i] == fn){
					delete obj.events[type][i];
				}
			}
		}
	}
}
//删除左右空格
function trim(str){
	return str.replace(/(^\s*)|(\s*$)/g,'');
}
//跨浏览器获取滚动
function getScroll() {
	return {
		top:document.documentElement.scrollTop || document.body.scrollTop,
		left:document.documentElement.scrollLeft || document.body.scrollLeft
	}
}







