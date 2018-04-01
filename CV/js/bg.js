window.onload=function () {
    var aBtn=document.getElementsByClassName('btn');
    var oCont=document.getElementById('cont-1');
    var oCon=document.getElementById('cont');
    var it = '';
    var _this = 0;

    for(var i=0;i<aBtn.length;i++)
    {
        aBtn[i].index=i;

        aBtn[i].onclick=function () {
            _this = this.index;
            tim=false;
            for(var j=0;j<aBtn.length;j++)
            {
                aBtn[j].className='btn';
            }
            this.className='active btn';
            it=parseInt(-this.index*oCon.offsetHeight);
            startMove(oCont,it);
            setTimeout(function () {
                tim=true;
            },1000);
        };

        window.onresize = function(){
            startMove1(oCont,-_this*oCon.offsetHeight);

            // startMove(oCont,-_this*oCon.offsetHeight);
        }
    }

    $(document).on("mousewheel DOMMouseScroll", function (e) {

        var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||  // chrome & ie
            (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));              // firefox


        if (delta > 0 && tim && oCont.offsetTop<-100) {
            // 向上滚
            _this -= 1;
            startMove(oCont,-_this*oCon.offsetHeight);
            for(var i=0;i<aBtn.length;i++)
            {
                aBtn[i].className='btn';
            }
            aBtn[_this].className = 'btn active';
            setTimeout(function () {
                tim = true;
            },500);
        } else if (delta < 0 && tim && oCont.offsetTop>(-4*oCon.offsetHeight+100)) {
            // 向下滚
            _this += 1;
            startMove(oCont,-_this*oCon.offsetHeight);
            for(var i=0;i<aBtn.length;i++)
            {
                aBtn[i].className='btn';
            }
            aBtn[_this].className = 'btn active';
            setTimeout(function () {
                tim = true;
            },500);
        }
    });


    var startX, startY, moveEndX, moveEndY, X, Y;

    window.addEventListener('touchstart', function(e) {

        e.preventDefault();

        startX = e.touches[0].pageX;

        startY = e.touches[0].pageY;

    });

    window.addEventListener('touchmove', function(e) {

        e.preventDefault();

        moveEndX = e.changedTouches[0].pageX;

        moveEndY = e.changedTouches[0].pageY;

        X = moveEndX - startX;

        Y = moveEndY - startY;

        if ( Y < 0&& tim && oCont.offsetTop>(-4*oCon.offsetHeight+100))
        {
            _this += 1;
            startMove(oCont,oCont.offsetTop-oCon.offsetHeight);
            for(var i=0;i<aBtn.length;i++)
            {
                aBtn[i].className='btn';
            }
            aBtn[_this].className = 'btn active';
            setTimeout(function () {
                tim = true;
            },500);
        }

        else if ( Y > 0 && tim && oCont.offsetTop<-100)
        {
            _this -= 1;
            startMove(oCont,oCont.offsetTop+oCon.offsetHeight);
            for(var i=0;i<aBtn.length;i++)
            {
                aBtn[i].className='btn';
            }
            aBtn[_this].className = 'btn active';
            setTimeout(function () {
                tim = true;
            },500);
        }
    });

}
var tim=true;



function startMove(obj,iTarget) {

    clearInterval(obj.timer);
    tim = false;

    if(obj.offsetTop==iTarget)
    {
        clearInterval(obj.timer);
    }
    else
    {

        obj.timer=setInterval(function () {

            var speed=(iTarget-obj.offsetTop)/5;

            if(speed>0)
            {
                speed=Math.ceil(speed);
            }
            else
            {
                speed=Math.floor(speed);
            }

            obj.style.top=obj.offsetTop+speed+'px';

        },30);


    }
}

function startMove1(obj,iTarget) {

    clearInterval(obj.timer);

    if(obj.offsetTop==iTarget)
    {
        clearInterval(obj.timer);
    }
    else
    {

        obj.timer=setInterval(function () {

            var speed=(iTarget-obj.offsetTop);

            if(speed>0)
            {
                speed=Math.ceil(speed);
            }
            else
            {
                speed=Math.floor(speed);
            }

            obj.style.top=obj.offsetTop+speed+'px';

        },30);


    }
}