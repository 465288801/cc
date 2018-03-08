window.onload=function () {
    var bGame=document.getElementById('game');
    var oBox1=document.getElementById('begin');
    var aBegin=oBox1.getElementsByTagName('div');
    var oPlayer=document.getElementById('player');
    var oPlayer2=document.getElementById('player-b');
    var oBu1=document.getElementById('bu1');
    var oBu2=document.getElementById('bu2');
    var oBu3=document.getElementById('bu3');
    var aRock=document.getElementsByClassName('rock');
    var tim=0;
    var wd=false;
    var move=true;
    var aPlane=document.getElementsByClassName('plane-d');
    var aPlaneZd=document.getElementsByClassName('plane-zd');
    var fx=null;
    //初始页面开始
    bGame.onclick=function () {
        storeMove();  //调用石头移动函数
        oPlayer.style.display='block';
        oPlayer.style.top='600px';
        oPlayer.style.left='250px';
        oBox1.style.display='none';
        for(var i=0;i<aBegin.length;i++)
        {
            aBegin[i].style.display='none';
        };
    };
    //初始页面结束
    //键盘控制飞行方向及开火开始
    var left=false;
    var right=false;
    var up=false;
    var down=false;
    var shut=false;

    setInterval(function () {
        if(shut&&tim==0&&move)
        {
            tim=1;
            clearInterval(oBu1.timer);
            clearInterval(oBu2.timer);
            clearInterval(oBu3.timer);

            oBu1.style.display='none';
            oBu1.style.left=oPlayer.offsetLeft+14+'px';
            oBu1.style.top=oPlayer.offsetTop-20+'px';
            startFire();
            setTimeout(function () {
                oBu2.style.display='none';
                oBu2.style.left=oPlayer.offsetLeft+14+'px';
                oBu2.style.top=oPlayer.offsetTop-20+'px';
                startFire1();
            },50);
            setTimeout(function () {
                oBu3.style.display='none';
                oBu3.style.left=oPlayer.offsetLeft+14+'px';
                oBu3.style.top=oPlayer.offsetTop-20+'px';
                startFire2();
            },100);

            setTimeout(function () {
                tim=0;
            },800)
        }
        if(left&&oPlayer.offsetLeft>=5&&move)
        {
            oPlayer.style.left=oPlayer.offsetLeft-2+'px';
        }
        if(right&&oPlayer.offsetLeft<=495&&move)
        {
            oPlayer.style.left=oPlayer.offsetLeft+2+'px';
        }
        if(up&&oPlayer.offsetTop>=5&&move)
        {
            oPlayer.style.top=oPlayer.offsetTop-2+'px';
        }
        if(down&&oPlayer.offsetTop<=695&&move)
        {
            oPlayer.style.top=oPlayer.offsetTop+2+'px';
        }
    },3);




    function startFire() {
        oBu1.timer=setInterval(function () {
            if(oBu1.offsetTop<-100)
            {
                clearInterval(oBu1.timer);
            }
            else
            {
                oBu1.style.display='block';
                oBu1.style.top=oBu1.offsetTop-5+'px';
            }
        },5);
    }

    function startFire1() {
        oBu2.timer=setInterval(function () {
            if(oBu2.offsetTop<-100)
            {
                clearInterval(oBu2.timer);
            }
            else
            {
                oBu2.style.display='block';
                oBu2.style.top=oBu2.offsetTop-5+'px';
            }
        },5);
    }

    function startFire2() {
        oBu3.timer=setInterval(function () {
            if(oBu3.offsetTop<-100)
            {
                clearInterval(oBu3.timer);
            }
            else
            {
                oBu3.style.display='block';
                oBu3.style.top=oBu3.offsetTop-5+'px';
            }
        },5);
    }



    document.onkeydown=function (ev) {
        var oEvent=ev||event;

        switch (oEvent.keyCode)
        {
            case 37:left = true;
                break;
            case 38:up = true;
                break;
            case 39:right = true;
                break;
            case 40:down = true;
                break;
            case 90:shut =true;
                break;
        }
        document.onkeyup=function (ev) {
            var oEvent=ev||event;
            switch (oEvent.keyCode)
            {
                case 37:left = false;
                    break;
                case 38:up = false;
                    break;
                case 39:right = false;
                    break;
                case 40:down = false;
                    break;
                case 90:shut = false;
                    break;
            }
        }
    }



    //键盘控制飞行方向及开火结束
//障碍物移动开始
    function storeMove() {
        for(var i=0;i<aRock.length;i++)
        {
            aRock[i].style.left=parseInt(530*Math.random())+'px';
            aRock[i].style.top=parseInt(-500*Math.random()-70)+'px';
        }
        for(var i=0;i<aPlane.length;i++)
        {
            aPlane[i].style.left=parseInt(530*Math.random())+'px';
            aPlane[i].style.top=parseInt(-500*Math.random()-70)+'px';
        }
    }
    setInterval(function () {
        for(var i=0;i<aRock.length;i++)
        {
            aRock[i].style.top=aRock[i].offsetTop+1+'px';
            if(aRock[i].offsetTop>800)
            {
                aRock[i].style.left=parseInt(530*Math.random())+'px';
                aRock[i].style.top=parseInt(-800*Math.random()-70)+'px';
            }
        }
        for(var i=0;i<aPlane.length;i++)
        {
            aPlane[i].style.top=aPlane[i].offsetTop+3+'px';
            if(aPlane[i].offsetTop>800)
            {
                aPlane[i].style.left=parseInt(530*Math.random())+'px';
                aPlane[i].style.top=parseInt(-800*Math.random()-70)+'px';
            }
        }
    },25);

    setInterval(function () {
        for(var i=0;i<aPlaneZd.length;i++)
        {
            var j=Math.floor(i/3);

            if(aPlane[j].offsetTop<204&&aPlane[j].offsetTop>200)
            {
                aPlaneZd[i].style.top=aPlane[j].offsetTop+100+'px';
                aPlaneZd[i].style.left=aPlane[j].offsetLeft+50+'px';
            }
            switch (i%3)
            {
                case 0:fx=0;
                    break;
                case 1:fx=3;
                    break;
                case 2:fx=-3;
                    break;
            }
                aPlaneZd[i].style.top=aPlaneZd[i].offsetTop+8+'px';
                aPlaneZd[i].style.left=aPlaneZd[i].offsetLeft+fx+'px';
        }
    },25);
//障碍物移动结束

//碰撞开始
    setInterval(function () {
        for(var i=0;i<aRock.length;i++)
        {
            if(impact(oPlayer,aRock[i])==1)
            {
                boom1();
            }
        }
        for(var i=0;i<aPlaneZd.length;i++)
        {
            if(impact(oPlayer,aPlaneZd[i])==1)
            {
                boom1();
            }
        }
        for(var i=0;i<aPlane.length;i++)
        {
            if(impact(oPlayer,aPlane[i])==1)
            {
                boom1();
            }
        }
    },30);


    function impact(obj1,obj2) {
        var l1=obj1.offsetLeft;
        var r1=l1+obj1.offsetWidth;
        var t1=obj1.offsetTop;
        var b1=t1+obj1.offsetHeight;

        var l2=obj2.offsetLeft;
        var r2=l2+obj2.offsetWidth;
        var t2=obj2.offsetTop;
        var b2=t2+obj2.offsetHeight;


        if(r1<l2||b1<t2||l1>r2||t1>b2||wd)
        {
            return 0;
        }
        else
        {
            return 1;
        }
    }

    function fWd() {
        var i=0;
        wd=true;
        var timer=setInterval(function () {
            oPlayer.style.opacity=i++%2?"1":"0.1";
        },30);
        setTimeout(function () {
            clearInterval(timer);
            oPlayer.style.opacity='1';
            wd=false;
        },3000);
    }

    function boom1() {
        oPlayer2.style.left=oPlayer.offsetLeft+19+'px';
        oPlayer2.style.top=oPlayer.offsetTop+'px';
        fWd();
        move=false;
        oPlayer.style.left='250px';
        oPlayer.style.top='1400px';
        var timer=setInterval(function () {
            oPlayer.style.top=oPlayer.offsetTop-5+'px';
        },10);
        setTimeout(function () {
            clearInterval(timer);
            move=true;
        },1500);
        setTimeout(function () {
            oPlayer2.style.background='url(images/boom2.png) -42px 0px no-repeat'
        },50);
        setTimeout(function () {
            oPlayer2.style.background='url(images/boom2.png) -84px 0px no-repeat'
        },100);
        setTimeout(function () {
            oPlayer2.style.background='url(images/boom2.png) -126px 0px no-repeat'
        },150);
        setTimeout(function () {
            oPlayer2.style.background='url(images/boom2.png) -168px 0px no-repeat'
        },200);
        setTimeout(function () {
            oPlayer2.style.top='-100px';
            oPlayer2.style.left='-100px';
            oPlayer2.style.background='url(images/boom2.png) 0px 0px no-repeat';
        },300);



    }

//碰撞结束

    
    

}