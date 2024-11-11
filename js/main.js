;(function () {
	
	'use strict';



	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	var fullHeight = function() {

		if ( !isMobile.any() ) {
			$('.js-fullheight').css('height', $(window).height());
			$(window).resize(function(){
				$('.js-fullheight').css('height', $(window).height());
			});
		}

	};


	var counter = function() {
		$('.js-counter').countTo({
			 formatter: function (value, options) {
	      return value.toFixed(options.decimals);
	    },
		});
	};


	var counterWayPoint = function() {
		if ($('#colorlib-counter').length > 0 ) {
			$('#colorlib-counter').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( counter , 400);					
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}
	};

	// Animations
	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated');
							} else {
								el.addClass('fadeInUp animated');
							}

							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '85%' } );
	};


	var burgerMenu = function() {

		$('.js-colorlib-nav-toggle').on('click', function(event){
			event.preventDefault();
			var $this = $(this);

			if ($('body').hasClass('offcanvas')) {
				$this.removeClass('active');
				$('body').removeClass('offcanvas');	
			} else {
				$this.addClass('active');
				$('body').addClass('offcanvas');	
			}
		});



	};

	// Click outside of offcanvass
	var mobileMenuOutsideClick = function() {

		$(document).click(function (e) {
	    var container = $("#colorlib-aside, .js-colorlib-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {

	    	if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-colorlib-nav-toggle').removeClass('active');
			
	    	}
	    	
	    }
		});

		$(window).scroll(function(){
			if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-colorlib-nav-toggle').removeClass('active');
			
	    	}
		});

	};

	var clickMenu = function() {

		$('#navbar a:not([class="external"])').click(function(event){
			var section = $(this).data('nav-section'),
				navbar = $('#navbar');

				if ( $('[data-section="' + section + '"]').length ) {
			    	$('html, body').animate({
			        	scrollTop: $('[data-section="' + section + '"]').offset().top - 55
			    	}, 500);
			   }

		    if ( navbar.is(':visible')) {
		    	navbar.removeClass('in');
		    	navbar.attr('aria-expanded', 'false');
		    	$('.js-colorlib-nav-toggle').removeClass('active');
		    }

		    event.preventDefault();
		    return false;
		});


	};

	// Reflect scrolling in navigation
	var navActive = function(section) {

		var $el = $('#navbar > ul');
		$el.find('li').removeClass('active');
		$el.each(function(){
			$(this).find('a[data-nav-section="'+section+'"]').closest('li').addClass('active');
		});

	};

	var navigationSection = function() {

		var $section = $('section[data-section]');
		
		$section.waypoint(function(direction) {
		  	
		  	if (direction === 'down') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
	  		offset: '150px'
		});

		$section.waypoint(function(direction) {
		  	if (direction === 'up') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
		  	offset: function() { return -$(this.element).height() + 155; }
		});

	};






	var sliderMain = function() {
		
	  	$('#colorlib-hero .flexslider').flexslider({
			animation: "fade",
			slideshowSpeed: 8000,
			directionNav: true,
			start: function(){
				setTimeout(function(){
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			},
			before: function(){
				setTimeout(function(){
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			}

	  	});

	};

	var stickyFunction = function() {

		var h = $('.image-content').outerHeight();

		if ($(window).width() <= 992 ) {
			$("#sticky_item").trigger("sticky_kit:detach");
		} else {
			$('.sticky-parent').removeClass('stick-detach');
			$("#sticky_item").trigger("sticky_kit:detach");
			$("#sticky_item").trigger("sticky_kit:unstick");
		}

		$(window).resize(function(){
			var h = $('.image-content').outerHeight();
			$('.sticky-parent').css('height', h);


			if ($(window).width() <= 992 ) {
				$("#sticky_item").trigger("sticky_kit:detach");
			} else {
				$('.sticky-parent').removeClass('stick-detach');
				$("#sticky_item").trigger("sticky_kit:detach");
				$("#sticky_item").trigger("sticky_kit:unstick");

				$("#sticky_item").stick_in_parent();
			}
			

			

		});

		$('.sticky-parent').css('height', h);

		$("#sticky_item").stick_in_parent();

	};

	var owlCrouselFeatureSlide = function() {
		$('.owl-carousel').owlCarousel({
			animateOut: 'fadeOut',
		   animateIn: 'fadeIn',
		   autoplay: true,
		   loop:true,
		   margin:0,
		   nav:true,
		   dots: false,
		   autoHeight: true,
		   items: 1,
		   navText: [
		      "<i class='icon-arrow-left3 owl-direction'></i>",
		      "<i class='icon-arrow-right3 owl-direction'></i>"
	     	]
		})
	};

	// Document on load.
	$(function(){
		fullHeight();
		counter();
		counterWayPoint();
		contentWayPoint();
		burgerMenu();

		clickMenu();
		// navActive();
		navigationSection();
		// windowScroll();


		mobileMenuOutsideClick();
		sliderMain();
		stickyFunction();
		owlCrouselFeatureSlide();
	});





}());

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var formData = new FormData(this);

    fetch('/api/submitForm', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            alert('Message sent successfully!');
            // Optionally, redirect the user to a thank you page
            // window.location.href = 'thankyou.html';
        } else {
            throw new Error('Failed to send message');
        }
    })
    .catch(error => {
        console.error(error);
        alert('An error occurred while sending the message. Please try again later.');
    });
});



function showInfo(info) {
	var infoBox = document.getElementById('info-box');
	
	// Map button names to their corresponding information
	var infoMap = {
		'MySQL': 'I have managed MySQL databases for projects, proficient in SQL queries and optimizing performance.',
		'Kafka': 'In my Kafka experience, I have explored event-driven architectures in academic projects, implementing concepts like event sourcing and reactive systems with Kafka.',
		'MongoDB': 'I have utilized MongoDB for building both REST and GraphQL APIs, favoring its schema-free approach for rapid prototyping. I am proficient with Mongoose for NodeJS and PyMongo for Python.',
		'Jenkins': 'I have created CI/CD pipelines for an academic project, setting up a Jenkins pipeline to deploy applications ',
		'C++': 'I have built high-performance software solutions across various domains using C++, mastering object-oriented programming and algorithm design.',
		'Javascript': 'JavaScript has been instrumental in my work, enabling the creation of dynamic web applications with enhanced interactivity and functionality.',
		'CSS3': 'I excel in CSS with a deep understanding of the box model, flexbox, grid, and responsive design. I have worked with CSS-in-JS libraries like Styled Components and preprocessors like SASS.',
		'React': 'In my React experience, I have created dynamic and responsive user interfaces for web applications. I am proficient in building reusable components, managing state, and handling asynchronous data with React ecosystem of tools and libraries.',
		'Java': 'I am skilled in Java, having worked on multiple projects. I am familiar with Java EE, Spring Boot, Hibernate, and have experience with RESTful web services.',
		'Python': 'I possess advanced Python skills and have employed them extensively across different domains, such as backend development, data analysis, and machine learning projects.',
		
		'Gen AI': 'In my experience working on an AI-driven healthcare assistant project, I have witnessed the profound impact of Gen AI in personalized healthcare',
		'Natrurl Language Processing': 'I have NLP experience, having worked on text classification, sentiment analysis, named entity recognition, and text generation projects. I am comfortable with NLTK, spaCy, and Gensim libraries.',
		'Machine Learning': 'I understand machine learning well and have implemented algorithms for classification, regression, clustering, and reinforcement learning. I am familiar with TensorFlow, PyTorch, and Scikit-learn.',
		'Docker': 'In Docker, I have containerized applications for efficient deployment and management. I am proficient in creating Docker images, orchestrating containers, and optimizing workflows for development and production environments.',
		'NumPy': 'NumPy has been my go-to tool for efficient numerical computing tasks. I have excelled in array manipulation, mathematical operations, and data analysis using its extensive functionality, contributing to the success of various projects.',
		'Boto3': 'Using Boto3, I have integrated AWS services into Python apps, automating tasks and enhancing efficiency.',
		'HTML5': 'I have crafted web pages and interfaces for numerous projects, utilizing HTML to structure content and create interactive user experiences. I am proficient in semantic HTML5 markup and understand best practices for accessibility and cross-browser compatibility.',
		'AWS': 'I have utilized AWS to build scalable infrastructures for projects, leveraging services like EC2, S3, RDS, and Lambda for deployment, storage, and automation.',
		'REST API': 'I have developed REST APIs for seamless communication between clients and servers, ensuring scalability and reliability across diverse platforms.',
		'PostgreSQL': 'In my PostgreSQL experience, I have used the database extensively beyond academia for building web backends and data warehousing.',
		'Kubernetes': 'In my Kubernetes experience, I have deployed and managed containerized applications for academic projects, showcasing its capabilities in modern cloud-native development.',
		'Go': 'I have crafted a video streaming protocol in Go, utilizing its concurrency and performance features to deliver seamless video content.',
		'Flask': 'In my Flask experience, I have crafted scalable web applications using Python. Leveraging Flasks simplicity, I have built RESTful APIs, microservices, and web services efficiently.',
		'NodeJs': 'I have leveraged Node.js to develop real-time web applications, RESTful APIs, and microservices. My expertise includes working with popular frameworks like Express.js and integrating with databases like MongoDB and PostgreSQL',
		
	};
	
	// Update info-box content with button name as heading and corresponding information
	infoBox.innerHTML = '<h2 class="info-heading">' + info + '</h2><p>' + infoMap[info] + '</p>';
}


