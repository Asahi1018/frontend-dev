class Main {
    constructor() {
         this.header = document.querySelector('.header');
         this.hero = new HeroSlider('.swiper');
         this.sides = document.querySelectorAll('.side');
         this._observers = [];
         this._init();
        }
        
        destroy() {
            this._observers.forEach(so => so.destroy());
        }

        _init() {
            new MobileMenu;
            Pace.on('done',this._scrollInit.bind(this));
        }

    _scrollInit() {
        this._observers.push(
            new ScrollObserver('.nav-trigger', this._navAnimation.bind(this), {once: false}),
            new ScrollObserver('#main-content', this._sideAnimation.bind(this), {once: false, rootMarign:"-300px 0px" }),
            new ScrollObserver('.swiper', this._toggleSlideAnimation.bind(this), {once: false}),
            new ScrollObserver('.cover-slide', this._inviewAnimation.bind(this)),
            new ScrollObserver('.appear', this._inviewAnimation.bind(this)),
            new ScrollObserver('.tween-animate-tilte', this._textAnimation)
        )
        console.log(this._observers);
    }

    _navAnimation(el, inview) {
        if(inview) {
           this.header.classList.remove('triggered');
        } else {
            this.header.classList.add('triggered');
        }
    }

    _sideAnimation(el, inview) {
        if(inview) {
            this.sides.forEach(side => side.classList.add('inview'));  
        } else {
            this.sides.forEach(side => side.classList.remove('inview')); 
        }
    }


    _inviewAnimation(el, inview) {
        if(inview) {
           el.classList.add('inview');
           console.log("inview");
        } else {
            el.classList.remove('inview');
            console.log("outview");
        }
    }

    _toggleSlideAnimation(el, inview) {
        if(inview) {
           this.hero.start();
        } else {
            this.hero.stop();
        }
    }

    _textAnimation(el, inview) {
        if(inview) {
            const ta = new TweenTextAnimation(el);
            ta.animate();
        }
    }
}

new Main;