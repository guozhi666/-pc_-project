# 说明文档

- 这是一个PC端的页面交互项目，仅限于前台页面，目前没有后台数据的支持。主要运用的知识有原生js，css2的基本样式，css3的动画、渐变、过渡、canvas以及曲线运动等。

- 此外在运用canvas的部分，使用了设计模式中的工厂模式和单例模式，这个不太熟悉需要加强，

## 踩的坑

- ctrl+鼠标滚轮缩放浏览器大小的时候，内容区也跟着切屏

> 解决方案：
> 1. 监听ctrl按下事件，按下时解绑滚轮事件，离开时再绑定
> 2. 在触发滚轮事件之前加个判断：<br>if(event.ctrlkey){ <br>return;<br>}

- 背景图宽高没设置100%，导致缩放浏览器时背景图发生偏移

- 切换其他页面几秒后再切回来，轮播图会混乱

> 解决方案：
> 添加一个窗口切换监听事件，当切换窗口时，禁掉自动轮播定时器，切换回来时再重新打开自动轮播;代码如下
> ```
> document.addEventListener('visibilitychange', function(){
>     if(document.visibilityStart === 'hidden'){
>         //禁掉定时器
>         clearInterval(timeAuto);
>     }else{
>         //打开定时器
>         //调用前面定义的自动轮播方法;
>         autoPlay();
>     }
> })
> ```
