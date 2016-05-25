
$().ready(function(){

	/**个人中心*/
	$('#header .member').hover(function(){
		$('#header .member_ul').show().animate({
			t:30,
			step:10,
			mul:{
				h:120,
				o:100
			}
		});
	},function(){
		$('#header .member_ul').animate({
			t:30,
			step:10,
			mul:{
				o:0,
				h:0
			},
			fn:function () {
				$('#header .member_ul').hide();
			}
		});
	});
	var login = $('#login');
	var screenL = $('#screen');
	var reg = $('#reg');
	/**登陆框*/
	login.center(350,250).resize(function(){
		// login.center(350,250);
		if(login.css('display') == 'block'){
			screenL.lock();
		}
	});
	/**点击登陆按钮*/
	$('#header .login').click(function(){
		login.center(350,250)
		login.css('display','block');
		screenL.lock().animate({
			attr:'o',
			target:30,
			step:2
		});
	});
	/**关闭*/
	$('#login .close').click(function(){
		login.css('display','none');
		screenL.animate({
			attr:'o',
			start:30,
			target:0,
			step:2,
			fn:function () {
				screenL.unlock();
			}
		});
	});
	/**注册框*/
	reg.center(350,250).resize(function(){
		// login.center(350,250);
		if(reg.css('display') == 'block'){
			screenL.lock();
		}
	});
	/**点击注册按钮*/
	$('#header .reg').click(function(){
		reg.center(600,550)
		reg.css('display','block');
		screenL.lock().animate({
			attr:'o',
			target:30,
			step:2
		});
	});
	/**关闭*/
	$('#reg .close').click(function(){
		reg.css('display','none');
		screenL.animate({
			attr:'o',
			start:30,
			target:0,
			step:2,
			fn:function () {
				screenL.unlock();
			}
		});
	});
	/**动画列队*/
	// $('#test').click(function () {
    //
	// 	var _this = this;
	// 	$(_this).animate({
	// 		t:30,
	// 		step:10,
	// 		target:300,
	// 		mul:{
	// 			width:300,
	// 			height:300,
	// 			fontSize:80
	// 		},
	// 		fn:function () {
	// 			// console.log($(_this).css('width'));
	// 			// console.log($(_this).css('height'));
	// 			// console.log($(_this).css('opacity'));
	// 			// console.log($(_this).css('fontSize'));
	// 		}
	// 	});
	//
	// });
	/**滑动导航*/
	$('#nav .about li').hover(function () {
		var target = $(this).first().offsetLeft;
		console.log(target);
		$('#nav .nav_bg').animate({
			attr:'x',
			target:target+20,
			t:30,
			step:10,
			fn:function () {
				$('#nav .white').animate({
					attr:'x',
					target:-target
				});
			}
		});

	},function () {
		$('#nav .nav_bg').animate({
			attr:'x',
			target:20,
			t:30,
			step:10,
			fn:function () {
				$('#nav .white').animate({
					attr:'x',
					target:0
				});
			}
		});
	});

	//拖拽
	login.drag($('#login h2').first());
	reg.drag($('#reg h2').first());

	/**百度分享初始化位置*/
	$('#share').css('top',getScroll().top+(getInner().height-parseInt(getStyle($('#share').first(),'height')))/2+'px');
	/*
	addEvent(window,'scroll',function () {
		$('#share').animate({
			attr:'y',
			target:getScroll().top+(getInner().height-parseInt(getStyle($('#share').first(),'height')))/2
		});
	});
	*/
	$(window).bind('scroll',function () {
		$('#share').animate({
			attr:'y',
			target:getScroll().top+(getInner().height-parseInt(getStyle($('#share').first(),'height')))/2
		});
	});
	/**收缩*/
	$('#share').hover(
		function(){
			$(this).animate({
				attr:'x',
				target:0
			});
		},
		function(){
			$(this).animate({
				attr:'x',
				target:-211
			});
		}
	);
	/**左侧菜单*/
	$('#sidebar h2').toggle(function () {
		$(this).next().animate({
			mul:{
				'h':0,
				'o':0
			}
		});
	},function () {
		$(this).next().animate({
			mul:{
				'h':150,
				'o':100
			}
		});
	});
	/**表单验证*/
	$('form').form('user').bind('focus',function () {
		$('#reg .info_user').css('display','block');
		$('#reg .error_user').css('display','none');
		$('#reg .succ_user').css('display','none');
	}).bind('blur',function () {
		if(trim($(this).value())==''){
			$('#reg .info_user').css('display','none');
			$('#reg .error_user').css('display','none');
			$('#reg .succ_user').css('display','none');
		}else if(!/[a-zA-Z0-9_]{2,20}/.test(trim($(this).value()))){
			$('#reg .info_user').css('display','none');
			$('#reg .error_user').css('display','block');
			('#reg .succ_user').css('display','none');
		}else {
			$('#reg .info_user').css('display','none');
			$('#reg .error_user').css('display','none');
			$('#reg .succ_user').css('display','block');
		}
	});
	/**密码验证*/
	$('form').form('pass').bind('focus',function () {
		$('#reg .info_pass').css('display','block');
		$('#reg .error_pass').css('display','none');
		$('#reg .succ_pass').css('display','none');
	}).bind('blur',function () {
		if(trim($(this).value())==''){
			$('#reg .info_pass').css('display','none');
			$('#reg .error_pass').css('display','none');
			$('#reg .succ_pass').css('display','none');
		}else if(check_pass(this)){
			$('#reg .info_pass').css('display','none');
			$('#reg .error_pass').css('display','none');
			$('#reg .succ_pass').css('display','block');
		}else{
			$('#reg .info_pass').css('display','none');
			$('#reg .error_pass').css('display','block');
			$('#reg .succ_pass').css('display','none');
		}
	});
	/**密码强度验证*/
	$('form').form('pass').bind('keyup',function () {
		check_pass(this);
	});
	//密码验证函数
	function check_pass(_this) {
		var value = trim($(_this).value());
		var value_length = value.length;
		var code_length = 0;
		var flag = false;
		//第一个条件,6-20位
		if(value_length>=6 && value_length<=20){
			$('#reg .info_pass .q1').html('●').css('color','green');
		}else{
			$('#reg .info_pass .q1').html('○').css('color','#666');
		}
		//第二个条件,字母或数字或非空字符,任意一个即可
		if(value.length>0 && !/\s/.test(value)){
			$('#reg .info_pass .q2').html('●').css('color','green');
		}else{
			$('#reg .info_pass .q2').html('○').css('color','#666');
		}
		//第三个条件
		if(/[0-9]/.test(value)){
			code_length++;
		}
		if(/[a-z]/.test(value)){
			code_length++;
		}
		if(/[A-Z]/.test(value)){
			code_length++;
		}
		if(/[^0-9a-zA-z]/.test(value)){
			code_length++;
		}
		if(code_length>=2){
			$('#reg .info_pass .q3').html('●').css('color','green');
		}else{
			$('#reg .info_pass .q3').html('○').css('color','#666');
		}
		//安全级别
		if(value_length>=10 && code_length>=3){
			$('#reg .info_pass .s1').css('color','green');
			$('#reg .info_pass .s2').css('color','green');
			$('#reg .info_pass .s3').css('color','green');
			$('#reg .info_pass .s4').html('高').css('color','green');
		}else if(value_length>=8 && code_length>=2){
			$('#reg .info_pass .s1').css('color','#f60');
			$('#reg .info_pass .s2').css('color','#f60');
			$('#reg .info_pass .s3').css('color','#ccc');
			$('#reg .info_pass .s4').html('中').css('color','#f60');
		}else if(value_length>=1){
			$('#reg .info_pass .s1').css('color','maroon');
			$('#reg .info_pass .s2').css('color','#ccc');
			$('#reg .info_pass .s3').css('color','#ccc');
			$('#reg .info_pass .s4').html('低').css('color','maroon');
		}else{
			$('#reg .info_pass .s1').css('color','#ccc');
			$('#reg .info_pass .s2').css('color','#ccc');
			$('#reg .info_pass .s3').css('color','#ccc');
			$('#reg .info_pass .s4').html('');
		}
		if(value_length>=6 && value_length<=20 && !/\s/.test(value) && code_length>=2){
			flag = true;
		}
		return flag;
	}
	/**密码确认*/
	$('form').form('notpass').bind('focus',function () {
		$('#reg .info_notpass').css('display','block');
		$('#reg .error_notpass').css('display','none');
		$('#reg .succ_notpass').css('display','none');
	}).bind('blur',function () {
		if(trim($(this).value())==''){
			$('#reg .info_notpass').css('display','none');
		}else if(trim($(this).value()) == trim($('form').form('pass').value())){
			$('#reg .info_notpass').css('display','none');
			$('#reg .error_notpass').css('display','none');
			$('#reg .succ_notpass').css('display','block');
		}else{
			$('#reg .info_notpass').css('display','none');
			$('#reg .error_notpass').css('display','block');
			$('#reg .succ_notpass').css('display','none');
		}
	});
	/**回答*/
	$('form').form('ans').bind('focus',function () {
		$('#reg .info_ans').css('display','block');
		$('#reg .error_ans').css('display','none');
		$('#reg .succ_ans').css('display','none');
	}).bind('blur',function () {
		if(trim($(this).value())==''){
			$('#reg .info_ans').css('display','none');
		}else if(trim($(this).value()).length>=2 && trim($(this).value()).length<=32){
			$('#reg .info_ans').css('display','none');
			$('#reg .error_ans').css('display','none');
			$('#reg .succ_ans').css('display','block');
		}else{
			$('#reg .info_ans').css('display','none');
			$('#reg .error_ans').css('display','block');
			$('#reg .succ_ans').css('display','none');
		}
	});
	/**电子邮件*/
	$('form').form('email').bind('focus',function () {
		$('#reg .info_email').css('display','block');
		$('#reg .error_email').css('display','none');
		$('#reg .succ_email').css('display','none');
	}).bind('blur',function () {
		if(trim($(this).value())==''){
			$('#reg .info_email').css('display','none');
		}else if(/^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(trim($(this).value()))){
			$('#reg .info_email').css('display','none');
			$('#reg .error_email').css('display','none');
			$('#reg .succ_email').css('display','block');
		}else{
			$('#reg .info_email').css('display','none');
			$('#reg .error_email').css('display','block');
			$('#reg .succ_email').css('display','none');
		}
	});
});













