window.addEventListener('DOMContentLoaded',function(){
    var navItems = document.querySelectorAll('#wrap #headerWrap .header .nav .navList .navItem');
    var navUps = document.querySelectorAll('#wrap #headerWrap .header .nav .navList .navItem a .up');
    var arrow = document.querySelector('#wrap #headerWrap .header .arrow');
    var content = document.querySelector('#wrap #content');
    var header = document.querySelector('#wrap #headerWrap');
    var contentItems = document.querySelectorAll('#wrap #content .contentList .contentItem');
    var contentList = document.querySelector('#wrap #content .contentList');
    var homeItems = document.querySelectorAll('#wrap #content .contentList .contentItem .contentInner .homeList .homeItem')
    var homeIcons = document.querySelectorAll('#wrap #content .contentList .contentItem .contentInner .homeNav .homeIcon')
    var team3Item = document.querySelectorAll('#wrap #content .contentList .team .team3 .team3Item');
    var team3 = document.querySelector('#wrap #content .contentList .team .team3');
    var menuItems = document.querySelectorAll('#wrap #content .menuList .menuItem');
    var mask = document.querySelector('#wrap #mask');
    var maskDown = document.querySelector('#wrap #mask .maskDown');
    var maskUp = document.querySelector('#wrap #mask .maskUp');

    var maskLine = document.querySelector('#wrap #mask .maskLine');
    var index = 0;
    var timer = null;
    var oldIndex = 0;
    var timeAuto = null;
    var isMoving = false;
    var myCanvas = null;
    var time1 = null;
    var time2 = null;
    // 初始化
    navUps[0].style.width = '100%';
    arrow.style.left = navUps[0].getBoundingClientRect().left + navItems[0].offsetWidth/2 +'px';

    // document.addEventListener('mousewheel',function(event){
    //     event.preventDefault();
    // })
    //响应式缩放
    window.onresize = function(){
        contentBind();
        contentMove(index);
    }
    //头部交互
    headerBind();
    function headerBind(){
        //点击变色
        for(var i = 0; i < navItems.length; i++){
            var item = navItems[i];
            item.index = i;
            item.onclick = function(){
                index = this.index;
                contentMove(this.index);
            }
        };
    };

    //内容区逻辑
    contentBind();
    function contentBind(){
        //动态设置盒子高度
        content.style.height = document.documentElement.clientHeight - header.offsetHeight + 'px';
        for(var i = 0; i<contentItems.length; i++){
            contentItems[i].style.height = document.documentElement.clientHeight - header.offsetHeight + 'px';
        }
    };

    //内容切换函数
    function contentMove(index){
        for(var j = 0; j<navUps.length; j++){
            //清楚所有样式
            navUps[j].style.width = '';
            //当页面切换时，重置所有出场动画
            animationArr[j].outAnimation();
        }
        //字体出现
        navUps[index].style.width = '100%';
        animationArr[index].inAnimation();
        //重置所有侧边栏按钮高亮
        for(var i = 0; i<menuItems.length; i++){
            menuItems[i].className = 'menuItem';
        }
        //给当前加上高亮
        menuItems[index].className = 'menuItem active'
        //小白点移动
        arrow.style.left = navUps[index].getBoundingClientRect().left + navItems[index].offsetWidth/2 +'px';
        //屏幕滚动
        contentList.style.top = -index*(document.documentElement.clientHeight - header.offsetHeight) + 'px';
    };

    mouseScall();
    function mouseScall(){
        //鼠标滚轮事件
        //ie/chrome
        document.onmousewheel = function(event){
            clearTimeout(timer);
            timer = setTimeout(function(){
                scrollMove(event);
            },100);
        }
        //firefox
        if(document.addEventListener){
            document.addEventListener('DOMMouseScroll',function(){
                clearTimeout(timer);
                timer = setTimeout(function(){
                    scrollMove(event);
                },100);
            });

        }

        // document.onkeydown = function(event){
        //     if(event.ctrlKey){
        //         return;
        //     }
        // }
        function scrollMove(event){
            event = event || window.event;

            //监听键盘ctrl事件，
            //若按下滚动滚轮，浏览器缩放，页面不切屏；
            if(event.ctrlKey){
                return;
            }

            var flag = '';
            if(event.wheelDelta){
                //ie/chrome
                if(event.wheelDelta > 0){
                    //上
                    flag = 'up';
                }else {
                    //下
                    flag = 'down'
                }
            }
            else if(event.detail){
                //firefox
                if(event.detail < 0){
                    //上
                    flag = 'up';
                }else {
                    //下
                    flag = 'down'
                }
            };
            //最终判断滚轮的方向
            switch (flag){
                case 'up':
                    //滚轮向上滚动
                    if(index>0){
                        index--
                        contentMove(index)
                    }
                    break;
                case 'down':
                    //滚轮向下滚动
                    if(index < navItems.length-1){
                        index++
                        contentMove(index)
                    }
                    break;
            };

            //禁止默认样式
            event.stopPropagation();
            return false;
        }
    }

    //轮播图切换

    setInterval(function(){
        lunbo();
    }, 3000);
    //点击切换轮播图
    lunbo();
    function lunbo(){
        for(var i = 0; i<homeIcons.length; i++){
            var item = homeIcons[i];
            item.index = i;
            item.onclick = function(){
                //判断动画是否在执行
                if(isMoving){
                    return;
                }
                //标识动画正在执行
                isMoving = true;
                //动画结束，重置状态
                setTimeout(function(){
                    isMoving = false;
                }, 2000);
                //每次点击清除自动轮播
                clearTimeout(timeAuto);
                //1.重置所有小圆点样式
                for(var j = 0; j<homeIcons.length; j++){
                    homeIcons[j].className = 'homeIcon';
                }
                //2.给点击的加高亮状态
                this.className = 'homeIcon active';
                //3.判断当前点击和之前的比较大小，确定是左滑还是右滑
                if(oldIndex < this.index){
                    //说明为向左滑动
                    homeItems[oldIndex].className = 'homeItem leftHide';
                    homeItems[this.index].className = 'homeItem rightShow';
                }else{
                    //说明向右滑动
                    homeItems[oldIndex].className = 'homeItem rightHide';
                    homeItems[this.index].className = 'homeItem leftShow';
                }
                oldIndex = this.index;
                autoPlay();
            }
        }
    }

    //自动轮播
    autoPlay();
    function autoPlay(){
        timeAuto = setInterval(function(){
            //判断是否在滑动过程
            if(isMoving){
                return;
            }
            //标识动画正在进行
            isMoving = true
            //动画结束后，重置状态
            setTimeout(function () {
                isMoving = false
            },2000)
            //重置所有小圆点
            for(var i = 0; i< homeIcons.length; i++){
                homeIcons[i].className = 'homeIcon';
            }
            //切换的下一个加高亮
            homeIcons[oldIndex+1>3?0:oldIndex+1].className = 'homeIcon active';
            //图片切换
            homeItems[oldIndex].className = 'homeItem leftHide';
            homeItems[oldIndex+1>3?0:oldIndex+1].className = 'homeItem rightShow';

            //更新oldIndex
            if(oldIndex < homeItems.length-1){
                oldIndex++;
            }else{
                oldIndex = 0;
            }
        }, 3000);
    }

    //第五屏，鼠标悬浮
    mouseOver();
    function mouseOver(){
        team3.onmouseleave = function(){
            //鼠标移出，重置所有透明度
            for(var j = 0; j<team3Item.length; j++){
                team3Item[j].style.opacity = '0.5';
            }
            myCanvas.remove();
            myCanvas = null;
            clearInterval(time1);
            clearInterval(time2);
        }
        //遍历四个图形
        for(var i = 0; i<team3Item.length; i++){
            var item = team3Item[i];
            //给所有的元素添加移入事件
            item.onmouseenter = function(){
                //重置所有图层为半透明
                for (var j=0; j<team3Item.length; j++ ){
                    team3Item[j].style.opacity = '0.5';
                }
                //重置所有元素的opacity
                this.style.opacity = '1';
                if(!myCanvas){
                    myCanvas = document.createElement('canvas');
                    myCanvas.width = this.offsetWidth;
                    myCanvas.height = this.offsetHeight;
                    team3.appendChild(myCanvas);

                    //添加cancas气泡效果
                    addAnimation();
                }
                myCanvas.style.left = this.offsetLeft + 'px';
            }

        }
    }

    //canvas添加气泡动画
    // ;
    function addAnimation(){
        var painting = myCanvas.getContext('2d');
        arr = [];

        //每隔一段时间，把圆添加到画布上
        time1 = setInterval(function () {
            //清除画布
            painting.clearRect(0, 0, myCanvas.width, myCanvas.height);
            console.log(arr);
            //加工圆
            for(var j = 0; j<arr.length; j++){
                var item = arr[j];
                item.deg++;
                // item.r++;
                // item.a -=0.01;
                item.x = item.startX + Math.sin(item.deg*Math.PI/180)*item.pathScale*0.8;
                item.y = item.startY - (item.deg*Math.PI/180)*item.pathScale*2;
                if(item.y + item.r< 0){
                    arr.splice(j, 1);
                }
            }

            //使用圆
            for(var i = 0; i<arr.length; i++){
                var item = arr[i];
                this.index = i;
                painting.beginPath();
                painting.arc(item.x, item.y, item.r, 0, Math.PI*2);
                painting.fillStyle = 'rgba('+  item.red +','+ item.green +','+ item.blue +','+ item.a +')';
                painting.fill();
            }
        },16);

        //创造圆的工厂
        time2 = setInterval(function () {
            var obj = {};
            obj.r = Math.floor(Math.random()*7+ 5) ;
            // obj.r = 10;
            // obj.x = Math.floor(Math.random()*myCanvas.width);
            obj.y = myCanvas.height + obj.r/2;
            obj.x = Math.floor(Math.random()*myCanvas.height);
            obj.red = Math.floor(Math.random()*255);
            obj.green = Math.floor(Math.random()*255);
            obj.blue = Math.floor(Math.random()*255);
            // obj.a = Math.random();
            obj.a = 1;
            arr.push(obj);

            //曲线运动需要的属性
            obj.startX = obj.x;
            obj.startY = obj.y;
            obj.deg = 0;
            obj.pathScale = Math.floor(Math.random()*80 + 20);

        },50)
    }

    //侧边栏点击事件
    menuClick();
    function menuClick(){
        for(var i = 0; i< menuItems.length; i++){
            var item = menuItems[i];
            item.index = i;
            item.onclick = function(){
                //切换到点击的那一屏
                contentMove(this.index);
                //维护鼠标滚轮计数器
                index = this.index;
            }
        }
    }

    //出如场动画
    var animationArr = [
        //第一屏
        {

            inAnimation:function(){
                var homeList = document.querySelector('#wrap #content .contentList .contentItem .contentInner .homeList');
                var homeNav = document.querySelector('#wrap #content .contentList .contentItem .contentInner .homeNav');
                homeList.style.transform = 'translate(0, 0)';
                homeList.style.opacity = '1';
                homeNav.style.transform = 'translate(0, 0)';
                homeNav.style.opacity = '1';
            },
            outAnimation:function(){
                var homeList = document.querySelector('#wrap #content .contentList .contentItem .contentInner .homeList');
                var homeNav = document.querySelector('#wrap #content .contentList .contentItem .contentInner .homeNav');
                homeList.style.transform = 'translate(0, -200px)';
                homeList.style.opacity = '0.3';
                homeNav.style.transform = 'translate(0, 200px)';
                homeNav.style.opacity = '0.3';
            }
        },
        //第二屏
        {

            inAnimation:function(){
                var plane1 = document.querySelector('#wrap #content .contentList .course .plane1');
                var plane2 = document.querySelector('#wrap #content .contentList .course .plane2');
                var plane3 = document.querySelector('#wrap #content .contentList .course .plane3');
                plane1.style.transform = 'translate(0, 0)';
                plane2.style.transform = 'translate(0, 0)';
                plane3.style.transform = 'translate(0, 0)';
            },
            outAnimation:function(){
                var plane1 = document.querySelector('#wrap #content .contentList .course .plane1');
                var plane2 = document.querySelector('#wrap #content .contentList .course .plane2');
                var plane3 = document.querySelector('#wrap #content .contentList .course .plane3');
                plane1.style.transform = 'translate(-200px, -200px)';
                plane2.style.transform = 'translate(-200px, 200px)';
                plane3.style.transform = 'translate(200px, -200px)';
            }
        },

        //第三屏
        {
            inAnimation:function(){
                var pencel1 = document.querySelector('#wrap #content .contentList .works .pencel1');
                var pencel2 = document.querySelector('#wrap #content .contentList .works .pencel2');
                var pencel3 = document.querySelector('#wrap #content .contentList .works .pencel3');
                pencel1.style.transform = 'translate(0, 0)';
                pencel2.style.transform = 'translate(0, 0)';
                pencel3.style.transform = 'translate(0, 0)';
            },
            outAnimation:function(){
                var pencel1 = document.querySelector('#wrap #content .contentList .works .pencel1');
                var pencel2 = document.querySelector('#wrap #content .contentList .works .pencel2');
                var pencel3 = document.querySelector('#wrap #content .contentList .works .pencel3');
                pencel1.style.transform = 'translate(0, -40px)';
                pencel2.style.transform = 'translate(0, 200px)';
                pencel3.style.transform = 'translate(200px, 200px)';
            }
        },
        //第四屏
        {
            inAnimation:function(){
                var box1 = document.querySelector('#wrap #content .contentList .about .about3 .about3Item:nth-child(1)');
                var box2 = document.querySelector('#wrap #content .contentList .about .about3 .about3Item:nth-child(2)');
                box1.style.transform = 'rotate(0)';
                box2.style.transform = 'rotate(0)';
            },
            outAnimation:function(){
                var box1 = document.querySelector('#wrap #content .contentList .about .about3 .about3Item:nth-child(1)');
                var box2 = document.querySelector('#wrap #content .contentList .about .about3 .about3Item:nth-child(2)');
                box1.style.transform = 'rotate(-30deg)';
                box2.style.transform = 'rotate( 30deg)';
            }
        },
        //第五屏
        {
            inAnimation:function(){
                var team1 = document.querySelector('#wrap #content .contentList .team .team1');
                var team2 = document.querySelector('#wrap #content .contentList .team .team2');
                team1.style.transform = 'translate(0, 0)';
                team2.style.transform = 'translate(0, 0)';
            },
            outAnimation:function(){
                var team1 = document.querySelector('#wrap #content .contentList .team .team1');
                var team2 = document.querySelector('#wrap #content .contentList .team .team2');
                team1.style.transform = 'translate(-200px, 0)';
                team2.style.transform = 'translate(200px, 0)';
            }
        }
    ]


    //临时控制第一屏入场
    for (var i =0; i<animationArr.length; i++){
        var item = animationArr[i];
        item.outAnimation()
    }

    //开机动画
    openAnimation();
    function openAnimation(){
        var arr = ['bg1.jpg','bg2.jpg','bg3.jpg','bg4.jpg','bg5.jpg','about1.jpg','about2.jpg','about3.jpg','about4.jpg','worksimg1.jpg','worksimg2.jpg','worksimg3.jpg','worksimg4.jpg','team.png','greenLine.png','04038.jpg','48812.jpg','plane1.png','plane2.png','plane3.png','pencel1.png','pencel2.png','pencel3.png','team1.png','team.png','zoomico.png'];
        var loaded = 0;
        for(var j=0; j<arr.length; j++){
            var myImage = new Image();
            myImage.src = './img/'+arr[j];
            myImage.onload = function(){
                loaded++;
                var lineWidth = (loaded/arr.length)*100 + '%';
                maskLine.style.width = lineWidth
            }
        }
        maskLine.addEventListener('transitionend', function(){
            maskDown.style.height = '0';
            maskUp.style.height = '0';
            maskLine.remove()
            animationArr[0].inAnimation()
        })
        maskUp.addEventListener('transitionend',function () {
            mask.remove()
        })
    }
});