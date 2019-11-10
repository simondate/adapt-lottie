define([
    'core/js/adapt',
    'core/js/views/componentView',
    'core/js/models/componentModel',
    '../libraries/lottie.js'
], function (Adapt, ComponentView, ComponentModel, bodymovin) {

    var LottieView = ComponentView.extend({

        preRender: function () {
            this.onReducedMotionChanged = _.bind(this.onReducedMotionChanged, this);
            this.model.set("_autoplayAuthor", this.model.get("_autoplay"));
            try {
                this.reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
                this.reducedMotionQuery.addEventListener('change', this.onReducedMotionChanged);
            } catch (e) {

            }
            this.checkIfResetOnRevisit();
        },

        postRender: function () {
            this.onReducedMotionChanged();
            this.$el.imageready(_.bind(function () {
                this.setReadyStatus();
                this.animationInit();
            }, this));
        },

        onReducedMotionChanged: function () {
            if (this.reducedMotionQuery && this.reducedMotionQuery.matches) {
                this.model.set('_autoplay', false);
                if (this.animation) {
                    this.animation.goToAndStop(this.animation.firstFrame + this.animation.totalFrames - 1, true);
                }
            } else {
                if (this.model.get('_autoplayAuthor')) {
                    this.model.set('_autoplay', true);
                    if(this.animation){
                        this.animation.goToAndPlay(this.animation.firstFrame);
                    }
                }
            }
        },

        checkIfResetOnRevisit: function () {
            var isResetOnRevisit = this.model.get('_isResetOnRevisit');

            if (isResetOnRevisit) {
                this.model.reset(isResetOnRevisit);
            }
        },


        animationInit: function () {
            var _animation = this.model.get('_animation');
            if (_animation && _animation.src) {
                this.animation = bodymovin.loadAnimation({
                    container: this.$('.lottie-container')[0],
                    renderer: 'svg',
                    loop: this.model.get('_loop'),
                    autoplay: this.model.get('_autoplay'),
                    path: _animation.src
                });
                this.animation.addEventListener('data_ready', _.bind(this.animationLoaded, this))
            }
        },

        animationLoaded: function () {
            this.$('.lottie-fallback').prop('hidden', true);
            var id = this.model.get('_id');
            var _animation = this.model.get('_animation');
            var ariaLabel = "";
            if (_animation.alt) {
                this.$('.lottie-label').attr('id', 'lottie-label-' + id).removeAttr('hidden');
                ariaLabel += 'lottie-label-' + id;
            }
            if (_animation.description) {
                this.$('.lottie-description').attr('id', 'lottie-desc-' + id).removeAttr('hidden');
                ariaLabel += ' lottie-desc-' + id;
            }
            this.$('svg').attr({'aria-role': 'img', 'aria-labelledby': ariaLabel});
        }

    });

    return Adapt.register('lottie', {
        model: ComponentModel.extend({}),
        view: LottieView
    });

});