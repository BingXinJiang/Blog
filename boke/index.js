
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
	addEvent(window,'scroll',function () {
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
});













