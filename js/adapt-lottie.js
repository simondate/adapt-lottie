define( [
	'core/js/adapt',
	'core/js/views/componentView',
	'core/js/models/componentModel',
	'../libraries/lottie.js',
], function( Adapt, ComponentView, ComponentModel, bodymovin ) {

	var LottieView = ComponentView.extend( {

		events : {
			'click .lottie-play-pause' : 'onPlayPauseClick',
		},

		/**
		 * preRender - Adapt Core Method
		 * Attempts to capture the user's reduced motion settings and creates an event listener
		 * to monitor this setting for changes. Preserves the original autoplay settings.
		 */
		preRender : function() {
			this.onReducedMotionChanged = this.onReducedMotionChanged.bind( this );
			try {
				this.reducedMotionQuery = window.matchMedia( '(prefers-reduced-motion: reduce)' );
				this.reducedMotionQuery.addEventListener( 'change', this.onReducedMotionChanged );
				this.model.set( '_autoplayAuthor', this.model.get( '_autoplay' ) );
				this.onReducedMotionChanged();
			} catch ( e ) {
				// Your failure is... acceptable.
			}
			this.checkIfResetOnRevisit();
		},

		/**
		 * checkIfResetOnRevisit - Adapt Component Requirement
		 * Resets the model for this component if required.
		 */
		checkIfResetOnRevisit : function() {
			var isResetOnRevisit = this.model.get( '_isResetOnRevisit' );
			if ( isResetOnRevisit ) {
				this.model.reset( isResetOnRevisit );
			}
		},

		/**
		 * postRender - Adapt Core Method
		 */
		postRender : function() {
			this.$el.imageready( (
				function() {
					this.setReadyStatus();
					this.animationInit();
					this.$( '.lottie-container' ).on( 'inview', this.inView.bind( this ) );
				}
			).bind( this ) );
		},

		/**
		 * inView - Adapt Lottie Event Handler
		 * Handles the `inview` event, marking the component complete if both the bottom and top have
		 * been viewed by the user.
		 * Shamelessly borrowed from `adapt-contrib-graphic`
		 * @see https://github.com/adaptlearning/adapt-contrib-graphic/blob/v2.0.5/js/adapt-contrib-graphic.js
		 */
		inView : function( event, visible, visiblePartX, visiblePartY ) {
			if ( visible ) {
				if ( visiblePartY === 'top' ) {
					this._isVisibleTop = true;
				} else if ( visiblePartY === 'bottom' ) {
					this._isVisibleBottom = true;
				} else {
					this._isVisibleTop = true;
					this._isVisibleBottom = true;
				}
				if ( this._isVisibleTop && this._isVisibleBottom ) {
					this.$( '.lottie-container' ).off( 'inview' );
					this.setCompletionStatus();
				}
			}
		},

		/**
		 * remove - Overridden ComponentView method
		 * Removes the event-listener for 'inview'.
		 */
		remove : function() {
			this.$( '.lottie-container' ).off( 'inview' );
			ComponentView.prototype.remove.apply( this, arguments );
		},

		/**
		 * animationInit - Adapt Lottie Method
		 * Initializes the bodymovin svg renderer and begins loading the animation json,
		 * adding an event listener to handle the json load event.
		 */
		animationInit : function() {
			var _animation = this.model.get( '_animation' );
			var container = this.$( '.lottie-container' )[ 0 ];
			if ( _animation && _animation.src && container ) {
				this.animation = bodymovin.loadAnimation( {
					container : container,
					renderer : 'svg',
					loop : this.model.get( '_loop' ),
					autoplay : this.model.get( '_autoplay' ),
					path : _animation.src,
				} );
				this.animation.addEventListener( 'data_ready', this.onAnimationLoaded.bind( this ) );
			}
		},

		/**
		 * onAnimationLoaded - Adapt Lottie Event Handler
		 * Hides any fallback content and labels animation with a short and full accessible description
		 * if provided. Displays the "play/pause" button if enabled.
		 */
		onAnimationLoaded : function() {
			this.$( '.lottie-fallback' ).prop( 'hidden', true );
			var id = this.model.get( '_id' );
			var _animation = this.model.get( '_animation' );

			if ( _animation ) {
				var ariaLabel = '';
				if ( _animation.alt ) {
					this.$( '.lottie-label' ).attr( 'id', 'lottie-label-' + id ).removeAttr( 'hidden' );
					ariaLabel += 'lottie-label-' + id;
				}
				if ( _animation.description ) {
					this.$( '.lottie-description' ).attr( 'id', 'lottie-desc-' + id ).removeAttr( 'hidden' );
					ariaLabel += ' lottie-desc-' + id;
				}
				this.$( 'svg' ).attr( { 'aria-role' : 'img', 'aria-labelledby' : ariaLabel } );
				if ( this.model.get( '_showPauseControl' ) ) {
					this.$( '.lottie-play-pause' ).attr( 'aria-label', this.model.get( '_autoplay' ) ? 'pause' : 'play' );
				}
			}
		},

		/**
		 * onPlayPauseClick - Adapt Lottie Event Handler
		 * Toggles the animation and play/paused state of the button.
		 *
		 * @see https://inclusive-components.design/toggle-button/#changinglabels (specifically the last section)
		 * for the accessibility methodology. Guidance was to change the label, rather than change the pressed state.
		 *
		 * @see ../less/lottie.less for the appearance -- it's all handled by the aria-label attribute. No JS required.
		 * @param e ClickEvent
		 */
		onPlayPauseClick : function( e ) {
			e.preventDefault();
			if ( this.animation ) {
				var $button = this.$( '.lottie-play-pause' );
				if ( $button.attr( 'aria-label' ) === 'play' ) {
					this.animation.play();
					$button.attr( 'aria-label', 'pause' );
				} else {
					this.animation.pause();
					$button.attr( 'aria-label', 'play' );
				}
			}
		},

		/**
		 * onReducedMotionChanged - Adapt Lottie Event Handler
		 * Updates the _autoplay setting as well as playing and pausing the animation when the user changes
		 * the OS preference for reduced motion.
		 */
		onReducedMotionChanged : function() {
			if ( this.reducedMotionQuery && this.reducedMotionQuery.matches ) {
				this.model.set( '_autoplay', false );
				if ( this.animation ) {
					this.animation.goToAndStop( this.animation.firstFrame + this.animation.totalFrames - 1, true );
				}
			} else {
				this.model.set( '_autoplay', this.model.get( '_autoplayAuthor' ) );
				if ( this.animation ) {
					this.animation.goToAndPlay( this.animation.firstFrame );
				}
			}
		},
	} );

	// Register and return the component
	return Adapt.register( 'lottie', {
		model : ComponentModel.extend( {} ),
		view : LottieView,
	} );

} );