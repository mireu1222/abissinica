$(function () {
    headerScroll();
    gnbSubdepth();
    $('header .menu-all').click(function(){
        $(this).hasClass('open') ? gnbClose() : gnbOpen();
    });
    moreMenu('header .menu-all-wrap .dep1-btn');
    subdepthToggle(); // sub depth
    $(this).find('.nice-select').niceSelect(); // selectbox
    fileUpload(); // fileupload
});

$(window).on('load', function(){
    xScroll('.sub-depth-wrap .scroll');
});

// header event
function headerScroll() {
    var didScroll,
        lastScrollTop = 0,
        delta = 5,
        navbarHeight = $('header').outerHeight();

    $(window).scroll(function (e) {
        didScroll = true;
    });
    setInterval(function () {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 150);

    function hasScrolled() {
        var st = $(this).scrollTop();
        if (Math.abs(lastScrollTop - st) <= delta)
            return;

        if (st > lastScrollTop && st > navbarHeight) {
            $('header').addClass('scroll');
        } else if (st < lastScrollTop && st < navbarHeight) {
            $('header').removeClass('scroll');
        }

        lastScrollTop = st;
    }
}

function gnbSubdepth() {
    var depth1 = $('#gnb > a'),
        header = $('header');

    depth1.mouseenter(function(){
        header.addClass('open');
    });
    header.mouseleave(function(){
        header.removeClass('open');
    });
}

function moreMenu(btn) {
    $(btn).click(function() {
        var parent = $(this).parent('.col'),
            allCol = parent.siblings('div'),
            allDepth = allCol.children('ul'),
            allBtn = allCol.children('.dep1-btn'),
            depth = $(this).siblings('ul');

        allDepth.slideUp();
        allBtn.removeClass('open');

        $(this).addClass('open');
        depth.slideDown();
    });
}

function gnbOpen() {
    var header = $('header'),
        gnb = $('header .menu-all-wrap'),
        menuBtn = $('header .menu-all');

    header.addClass('m-open');
    gnb.slideDown();
    menuBtn.addClass('open');
}

function gnbClose() {
    var header = $('header'),
        gnb = $('header .menu-all-wrap'),
        menuBtn = $('header .menu-all');

    gnb.slideUp(200);
    setTimeout(function () {
        menuBtn.removeClass('open');
        header.removeClass('m-open');
    }, 200);
}

function scrollPrevent(prop) {
    if ( prop == true ) {
        $('html, body').scrollTop(0);
        $('body').css({'overflow':'hidden'});
    } else {
        $('body').css({'overflow':'initial'});
    }
}

// sub depth 
function subdepthToggle() {
    var $subdepth = $('.sub-depth-wrap'),
        menus = $subdepth.find('.dropdown-menu'),
        button = $subdepth.find('.selected');

    button.on('click', function(e){
        var prt = $(this).parent('.dropdown-menu');

        e.preventDefault();
        if (prt.hasClass('open')) {
            prt.removeClass('open');
        } else {
            menus.removeClass('open');
            prt.addClass('open');
        }
    });

    $(document).on('click', 'html', function(e){
        var prt = $(e.target).parents();
        if (!prt.is($subdepth) ) {
            menus.removeClass('open');
        }
    });
}

// iscroll outerwidth
function calcWidth(target) {
    var $target = $(target);

    $target.each(function(){
        var child = $(this).children(),
            width = 0;

        child.each(function(){
            width += $(this).outerWidth(true);
        });
        $(this).css('width', width);
    });
}

// iscroll
function xScroll(obj) {
    var $obj = $(obj),
        tabs = $obj.find('.tabs');

    if ( $(obj).length <= 0 ) {
        return
    } else {
        $(window).resize(function(){
            calcWidth(tabs);
        });
        calcWidth(tabs);
        new IScroll(obj , {
            scrollX : true,
            scrollY : false,
            mouseWheel : false,
            autoCenterScroll : true,
            bounce : true
        });
    }
}

// video modal 
function videoModal(obj) {
    var obj = '[data-control="modal"]',
        $obj = $(obj),
        $target = $('#video'),
        $tit = $target.find('.tit'),
        $desc = $target.find('.desc'),
        $date = $target.find('.date'),
        $src = $target.find('iframe'),
        dim = '<div class="common-dim" aria-hidden="true">&nbsp;</div>';

    $obj.on('click', function(e){
        e.preventDefault();
        var infos = $(this).parents('.items').find('.info'),
            tit = infos.find('.tit').text(),
            desc = infos.find('.desc').text(),
            date = infos.find('.date').html();
            src = infos.find('.src').text();
            option = '?controls=0';

        $tit.text(tit);
        $desc.text(desc);
        $date.html(date);
        $src.attr('src', src+option);

        $target.before(dim);
        $target.show();
    });

    var close = $target.find('.btn-close');

    close.on('click', function(){
        $target.hide();
        $('body').find('.common-dim').remove();

        $tit.text(' ');
        $desc.text(' ');
        $date.html(' ');
        $src.attr('src', ' ');
    });
}

// accordion
function accordion() {
    var wrap = $('.ui-accordion'),
        list = wrap.find('li'),
        title = wrap.find('.accord-title'),
        toggle = title.find('.btn-toggle');

    if(wrap.length <= 0) return;

    // 접근성 대응
    list.each(function(){
        var $btn = $(this).find('.accord-title .btn-toggle'),
            $content = $(this).find('.accord-cont'),
            id = $(this).index();

        $btn.attr({
            'id' : 'accord-toggle' + id,
            'aria-controls' : 'accord-cont' + id
        });
        $content.attr({
            'id' : 'accord-cont' + id,
            'role' : 'region',
            'aria-labelledby' : 'accord-toggle' + id
        })
    });

    toggle.click(function(){
        var li = $(this).parent('.accord-title').parent('li'),
            cont = $(this).parent('.accord-title').siblings('.accord-cont'),
            blind = $(this).find('.blind');

        if (li.hasClass('open')) {
            $(this).attr('aria-expanded', 'false');
            cont.slideUp();
            li.removeClass('open');
            blind.text('상세보기');
        } else {
            $(this).attr('aria-expanded', 'true');
            cont.slideDown();
            li.addClass('open');
            blind.text('닫기');
        }
    });
}

// data sorting
function dataSorting() {
    var tab = '[data-type="sortingTab"]',
        $tab = $(tab),
        btn = $tab.find('a');

    var listWrap = '[data-type="sortingTarget"]',
        $wrap = $(listWrap),
        listAll = $wrap.find('li');

    if($tab.length <= 0) return;

    btn.click(function(e){
        var num = $(this).data('category-num'),
            $target = $('[data-category-id='+num+']');

        e.preventDefault();
        $(this).parent('li').siblings().removeClass('active');
        $(this).parent('li').addClass('active');
        listAll.hide();

        var empty = '<li class="empty"><p class="nodata">게시글이 없습니다.</p></li>',
            uls = $wrap.find('.lists');

        if (num === 'all') {
            uls.find('li.empty').remove();
            listAll.show();
        } else {
            if ($target.length <= 0) {
                uls.find('li.empty').remove();
                uls.append(empty);
            } else {
                uls.find('li.empty').remove();
                $target.show();
            }
        }
    });
}

// class toggle
function classToggle() {
    var classToggle = $('[data-toggle="class-toggle"]');

    if (classToggle.length <= 0) return;

    var btns = classToggle.find('button, a');
    
    btns.on('click', function(){
        btns.removeClass('active');
        $(this).addClass('active');    
    });
}

// file upload 
function fileUpload() {
    var obj = $('.inputfile-wrap');
    
    if (obj.length <= 0) return;

    var fileTarget = obj.find('input[type=file]');

    fileTarget.on('change', function(){
        if (window.FileReader) {
            var filename = $(this)[0].files[0].name;
        } else {
            var filename = $(this).val().split('/').pop().split('\\').pop();
        }

        $(this).siblings('input[type=text]').val(filename);
    });
}