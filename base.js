// //跨浏览器,添加移除事件
// function addEvent(obj,type,fn){
// 	if(obj.addEventListener){
// 		obj.addEventListener(type,fn,false);
// 	}else if(obj.attachEvent){
// 		obj.attachEvent('on'+type,fn);
// 	}
// }
// function removeEvent(obj,type,fn){
// 	if(obj.removeEventListener){
// 		obj.removeEventListener(type,fn,false);
// 	}else if(obj.detachEvent){
// 		obj.detachEvent('on'+type,fn);
// 	}
// }
//跨浏览器，阻止默认行为
function preDef(evt){
	var e = evt || window.event;
	if(e.preventDefault){
		e.preventDefault();
	}else{
		e.returnValue = false;
	}
}
//跨浏览器获取目标
function getTarget(evt){
	var e = evt || window.event;
	if(e.srcElement){
		if(e.type == 'mouseover'){
			return e.fromElement;
		}else if(e.type == 'mouseout'){
			return e.toElement;
		}
	}else if(e.relatedTarget){
		return e.relatedTarget;
	}
}
//基础库
function $(args){
	return new Base(args);
}

function Base(args){
	this.elements = [];
	if(typeof args == 'string'){
		//css模拟
		if(args.indexOf(' ') != -1){
			var elements = args.split(' ');//把节点拆开分别保存到数组中
			var childElements = [];//存放临时节点对象的数组,解决被覆盖的问题
			var node = [];//用来存放父节点
			for(var i=0; i<elements.length; i++){
				if(node.length == 0) node.push(document); //如果没有父节点 document放入
				switch (elements[i].charAt(0)){
					case '#':
						childElements = []; //清理父节点，以使父节点失效，子节点有效
						childElements.push(this.getId(elements[i].substring(1)));
						node = childElements;//保存父节点，因为childElements要清理
						break;
					case '.':
						childElements = [];
						for(var j=0; j<node.length; j++){
							var temps = this.getClass(elements[i].substring(1), node[j]);
							for(var k=0; k<temps.length; k++){
								childElements.push(temps[k]);
							}
						}
						node = childElements;
						break;
					default:
						childElements = [];
						for(var j=0; j<node.length; j++){
							var temps = this.getTagName(elements[i], node[j]);
							for(var k=0; k<temps.length; k++){
								childElements.push(temps[k]);
							}
						}
						node = childElements;
				}
			}
			this.elements = childElements;
		}else{
			//find模拟
			switch (args.charAt(0)){
				case '#':
					this.elements.push(this.getId(args.substring(1)));
					break;
				case '.':
					this.elements = this.getClass(args.substring(1));
					break;
				default:
					this.elements = this.getTagName(args);
			}
		}
	}else if(typeof args == 'object'){
		if(args != undefined){//带单引号的‘undefined’是typeof返回的
			this.elements[0] = args;
		}
	}else if(typeof args == 'function'){
		this.ready(args);
	}
};
//addDomLoaded
Base.prototype.ready = function(fn){
	addDomLoaded(fn);
};
//设置css选择器子节点
Base.prototype.find = function(str){
	var childElements = [];
	for(var i=0; i<this.elements.length; i++){
		switch (str.charAt(0)){
			case '#':
				childElements.push(this.getId(str.substring(1)));
				break;
			case '.':
				var temps = this.getClass(str.substring(1),this.elements[i]);
				for(var j=0; j<temps.length; j++){
					childElements.push(temps[j]);
				}
				break;
			default:
				// var tags = this.elements[i].getElementsByTagName(str);
				// for(var j=0; j<tags.length; j++){
				// 	childElements.push(tags[j]);
				// }
				var temps = this.getTagName(str,this.elements[i]);
				for(var j=0; j<temps.length; j++){
					childElements.push(temps[j]);
				}
		}
	}
	this.elements = childElements;  
	return this;
};
//通过id获取节点
Base.prototype.getId = function(id){
	return document.getElementById(id);
};
//通过class获取节点
Base.prototype.getClass = function(className,parentNode){
	var node = null;
	var temps = [];
	if(parentNode != undefined){
		node = parentNode;
	}else{
		node = document;
	}
	var all = node.getElementsByTagName('*');
	for(var i=0; i<all.length; i++){
		// if(all[i].className == className){
		if((new RegExp('(\\s|^)'+className+'(\\s|$)')).test(all[i].className)){
			temps.push(all[i]);
		}
	}
	return temps;
}
//获取节点并返回节点
Base.prototype.getElement = function(num){
	return this.elements[num];
};
//获取首个节点，并返回这个节点对象
Base.prototype.first = function(){
	return this.elements[0];
};
//获取末个节点，并返回这个节点对象 
Base.prototype.last = function(){
	return this.elements[this.elements.length-1];
};
/**获取节点并返回Base对象*/
Base.prototype.eq = function(num){
	var element = this.elements[num];
	this.elements = [];
	this.elements.push(element);
	return this;
};
/**获取当前同缀节点的下一个元素节点*/
Base.prototype.next = function () {
	for(var i=0; i<this.elements.length; i++){
		this.elements[i] = this.elements[i].nextSibling;
		if(this.elements[i] == null) throw ('找不到下一个同级元素节点!');
		if(this.elements[i].nodeType == 3) this.next();
	}
	return this;
};
/**获取当前同缀节点的上一个元素节点*/
Base.prototype.prev = function () {
	for(var i=0; i<this.elements.length; i++){
		this.elements[i] = this.elements[i].previousSibling;
		if(this.elements[i] == null) throw ('找不到上一个同级元素节点!');
		if(this.elements[i].nodeType == 3) this.prev();
	}
	return this;
};
/**获取tagName*/
Base.prototype.getTagName = function(tag,parentNode){
	var node = null;
	var temps = [];
	if(parentNode != undefined){
		node = parentNode;
	}else{
		node = document;
	}
	var tags = node.getElementsByTagName(tag);
	for(var i=0; i<tags.length; i++){
		temps.push(tags[i]);
	}
	return temps;
};
/**设置css样式*/
Base.prototype.css = function(attr,value){
	for(var i=0; i<this.elements.length; i++){
		if(arguments.length == 1){
			return getStyle(this.elements[i],attr);
		}
		this.elements[i].style[attr] = value;
	}
	return this;
};
/**添加link或style的css规则*/
Base.prototype.addRule = function(num,selector,cssText,index){
	var sheet = document.styleSheets[num];
	insertRule(sheet,selector,cssText,index);
	return this;
};
/**移除link或style的css规则*/
Base.prototype.removeRule = function(num,index){
	var sheet = document.styleSheets[num];
	deleteRule(sheet,index);
	return this;
};
/**设置表单字段元素*/
Base.prototype.form = function (name) {
	for(var i=0; i<this.elements.length; i++){
		this.elements[i] = this.elements[i][name];
	}
	return this;
};
/**设置表单字段内容获取*/
Base.prototype.value = function(str){
	for(var i=0; i<this.elements.length; i++){
		if(arguments.length == 0){
			return this.elements[i].value;
		}
		this.elements[i].value = str;
	}
	return this;
};
/**设置innerHTML*/
Base.prototype.html = function(str){
	for(var i=0; i<this.elements.length; i++){
		if(arguments.length == 0){
			return this.elements[i].innerHTML;
		}
		this.elements[i].innerHTML = str;
	}
	return this;
};
/**触发点击事件*/
Base.prototype.click = function(fn){
	for(var i=0; i<this.elements.length; i++){
		this.elements[i].onclick = fn;
	}
	return this;
};
/**添加class*/
Base.prototype.addClass = function(className){
	for(var i=0; i<this.elements.length; i++){
		if(!hasClass(this.elements[i],className)){
			this.elements[i].className += ' ' + className;
		}
	}
	return this;
};
/**移除class*/
Base.prototype.removeClass = function(className){
	for(var i=0; i<this.elements.length; i++){
		if(hasClass(this.elements[i],className)){
			this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s|^)' + className + '(\\s|$)'),' ');
		}
	}
	return this;
};
/**设置事件发生器*/
Base.prototype.bind = function (event,fn) {
	for(var i=0; i<this.elements.length; i++){
		addEvent(this.elements[i],event,fn);
	}
	return this;
};
/**鼠标移入移出事件*/
Base.prototype.hover = function(over,out){
	for(var i=0; i<this.elements.length; i++){
		// this.elements[i].onmouseover = over;
		// this.elements[i].onmouseout = out;
		addEvent(this.elements[i],'mouseover',over);
		addEvent(this.elements[i],'mouseout',out);
	}
	return this;
};
/**设置点击切换方法*/
Base.prototype.toggle = function(){
	for(var i=0; i<this.elements.length; i++){
		(function (element,args) {
			var count = 0;
			addEvent(element,'click',function () {
				args[count++ % args.length].call(this);
			});
		})(this.elements[i],arguments);
	}
	return this;
};
/**显示*/
Base.prototype.show = function(){
	for(var i=0; i<this.elements.length; i++){
		this.elements[i].style.display = 'block';
	}
	return this;
};
/**隐藏*/
Base.prototype.hide = function(){
	for(var i=0; i<this.elements.length; i++){
		this.elements[i].style.display = 'none';
	}
	return this;
};
/**设置居中*/
Base.prototype.center = function(width,height){
	var top = (getInner().height - height)/2;
	var left = (getInner().width - width)/2;
	for(var i=0; i<this.elements.length; i++){
		this.elements[i].style.top = top+'px';
		this.elements[i].style.left = left+'px';
	}
	return this;
};
/**浏览器锁屏功能*/
Base.prototype.lock = function(){
	for(var i=0; i<this.elements.length; i++){
		this.elements[i].style.width = getInner().width+'px';
		this.elements[i].style.height = getInner().height+'px';
		this.elements[i].style.display = 'block';
		document.documentElement.style.overflow = 'hidden';
		// addEvent(this.elements[i],'mousedown',function(e){
		// 	e.preventDefault();
		// 	addEvent(document,'mousemove',function(e){
		// 		e.preventDefault();
		// 	});
		// });
		addEvent(window,'scroll',scrollTop);
	}
	return this;
}
/**解除浏览器锁屏功能*/
Base.prototype.unlock = function(){
	for(var i=0; i<this.elements.length; i++){
		this.elements[i].style.display = 'none';
		document.documentElement.style.overflow = 'auto';
		removeEvent(window,'scroll',scrollTop); 
	}
	return this;
}
/**浏览器窗口改变事件*/
Base.prototype.resize = function(fn){
	for(var i=0; i<this.elements.length; i++){
		var element = this.elements[i];
		addEvent(window,'resize',function(){
			fn();
			if(element.offsetLeft > getInner().width - element.offsetWidth){
				element.style.left = getInner().width - element.offsetWidth + 'px';
			}
			if(element.offsetTop > getInner().height - element.offsetHeight){
				element.style.top = getInner().height - element.offsetHeight + 'px';
			}
		});
	}
	return this;
};

/**浏览器滚动清零*/
function scrollTop(){
	document.documentElement.scrollTop = 0;
	document.body.scrollTop = 0;
}
/**设置动画*/
Base.prototype.animate = function(obj){

	for(var i=0; i<this.elements.length; i++){
		var element = this.elements[i];
		//可选，有‘left’和‘top’两种值，不传默认是‘left’
		var attr = obj['attr'] != undefined ? obj['attr'] : 'left';
		var attr = obj['attr'] == 'x' ? 'left':obj['attr']=='y'?'top':
					obj['attr']=='w'?'width':obj['attr']=='h'?'height':
					obj['attr']=='o'? 'opacity' : obj['attr']!=undefined ? obj['attr'] : 'left';
		//可选，不传默认为是css设置的位置点
		var start = obj['start'] != undefined ? obj['start'] : 
			obj['attr'] == 'opacity' ? parseFloat(getStyle(element,attr))*30 : 
										parseInt(getStyle(element,attr));
		//可选，不传默认为50毫秒执行一次
		var t = obj['t'] != undefined ? obj['t'] : 50;
		//可选，不传默认为步长为10px
		var step = obj['step'] != undefined ? obj['step'] : 10;
		
		var delta = obj['delta'];
		var target = obj['target'];
		var mul = obj['mul'];

		var speed = obj['speed'] != undefined ? obj['speed'] : 6;
		var type = obj['type'] == 0 ? 'constant' : obj['type'] == 1 ? 'buffer' : 'buffer';

		if(delta != undefined && target == undefined){
			target = delta + start;
		}else if(delta == undefined && target == undefined && mul == undefined){
			throw new Error('delta增量和target目标量必须传一个！');
		}

		if(start>target) step = -step;
		if(attr == 'opacity'){
			element.style.opacity = parseInt(start) / 100;
			element.style.filter = 'alpha(opacity='+parseInt(start)+')';
		}else{
			// element.style[attr] = start + 'px';
		}

		if(mul == undefined){
			mul = {};
			mul[attr] = target;
		}
		
		clearInterval(element.timer);
		var t = 50;
		element.timer = setInterval(function(){

			/*
			* 问题1:多个动画执行了多个列队动画,我们要求不管多少个动画,只执行一个列队动画
			* 问题2:多个动画数值差别太大,导致动画无法执行到目标值,原因是定时器提前清理掉了
			* 解决1:不管多少个动画,只提供一次列队动画的机会
			* 解决2:多个动画按最后一个分动画执行完毕后清理即可
			*  */
			var flag = true;//用来判断动画队列是否全部执行完毕
			for(var i in mul) {
				attr = i=='x'?'left' : i=='y'?'top' : i=='w'?'width' : i=='h'?'height' : i=='o'?'opacity' : i!=undefined?i : 'left';
				target = mul[i];

				if (type == 'buffer') {
					step = attr == 'opacity' ? (target - parseFloat(getStyle(element, attr)) * 100) / speed :
					(target - parseInt(getStyle(element, attr))) / speed;
					step = step > 0 ? Math.ceil(step) : Math.floor(step);
				}
				if (attr == 'opacity') {

					if (step == 0) {
						setOpacity();
					} else if (step > 0 && Math.abs(parseFloat(getStyle(element, attr)) * 100 - target) <= step) {
						setOpacity();
					} else if (step < 0 && Math.abs(parseFloat(getStyle(element, attr)) * 100 - target) <= -step) {
						setOpacity();
					} else {
						var temp = parseFloat(getStyle(element, attr)) * 100;
						element.style.opacity = parseInt(temp + step) / 100;
						element.style.filter = 'alpha(opacity=' + parseInt(temp + step) + ')';
					}
					if(parseInt(target) != parseInt(parseFloat(getStyle(element,attr))*100)) flag=false;
				} else {

					if (step == 0) {
						setTarget();
					} else if (step > 0 && Math.abs(parseInt(getStyle(element, attr)) - target) <= step) {
						setTarget();
					} else if (step < 0 && Math.abs(parseInt(getStyle(element, attr)) - target) <= -step) {
						setTarget();
					} else {
						element.style[attr] = parseInt(getStyle(element, attr)) + step + 'px';
					}
					if(parseInt(target) != parseInt(getStyle(element,attr))) flag=false;
				}

				// document.getElementById('test').innerHTML += i + '</br>';
			}
			if(flag){
				clearInterval(element.timer);
				if(obj.fn != undefined) obj.fn();
			}
		},t);
	}

	function setTarget(){
		element.style[attr] = target + 'px';
	}
	function setOpacity(){
		element.style.opacity = parseInt(parseFloat(getStyle(element,attr)) * 100 + step)/100;
		element.style.filter = 'alpha(opacity='+parseInt(parseFloat(getStyle(element,attr)) * 100 + step)+')';
	}

	return this;
}
//拖拽
//已封装为插件
//插件入口
Base.prototype.extend = function(name,fn){
	Base.prototype[name] = fn;
};



