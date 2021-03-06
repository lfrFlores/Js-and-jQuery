$(function(){
	var $tvShowsContainer = $('#app-body').find('.tv-shows');
			
	function renderShows(shows){
		shows.forEach(function (show){
				var article = template
					.replace(':name:',show.name)
					.replace(':img:',show.image.medium)
					.replace(':summary:',show.summary)
					.replace(':img alt:', show.name+ "Logo")

				var $article = $(article)
				$article.hide();				
				$tvShowsContainer.append($article);
				$article.show(1000);
			})
	}

	// Submit search form

	$('#app-body')
	.find('form')
	.submit(function(ev){
		ev.preventDefault();

		var busqueda= $(this)
		.find('input[type="text"]').val();
		$tvShowsContainer.find('.tv-show').remove();				 
		var $loader = $('<div class= "loader">');
		$loader.appendTo($tvShowsContainer);

		$.ajax({
			url: 'http://api.tvmaze.com/search/shows',
			data: {
				q: busqueda
			},
			success: function(respuesta,textStatus,xhr){
				$loader.remove();
				var shows = respuesta.map(function (el){
					return el.show;
				})
				 renderShows(shows);				 				 
				}		

		})
	})

	var template= '<article class="tv-show">'+
					'<div class="left img-container">'+
						'<img src=":img:" alt=":img alt:">'+				
					'</div>' +
					'<div class="right info">'+
						'<h1>:name:</h1>'+
						'<p>:summary:</p>'+
					'</div>'+					
				'</article>';						

	$.ajax({
		url: 'http://api.tvmaze.com/shows',
		success: function(shows,textStatus,xhr){
			$tvShowsContainer.find('.loader').remove();
			renderShows(shows);
		}
	})
})
