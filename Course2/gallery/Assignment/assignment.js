var species_template, category_template, animal_template, crumbs_template
// a helper function that instantiates a template
// and displays the results in the content div
var current_species = "", current_category = ""

function showCrumbs(){
	var crumbs = { 
					species: [ current_species , 0 ],
			   		animal:  [ current_category , 1 ]
				 };
	html = crumbs_template( crumbs );
	$('#crumbs').html(html);
	var crumb = document.getElementById("crumbClass");
	for ( x in crumbs ) {
		if ( crumbs[x][0] != undefined) {
				if ( crumbs[x][0].name != undefined ) {
				var li = document.createElement('li');
				var a = document.createElement('a');
				a.href = "#"
				a.id = crumbs[x][1];
				a.onclick = handleClick;
				a.appendChild(document.createTextNode(crumbs[x][0].name));
				li.appendChild(a);
				crumb.appendChild(li);
			}
		}
	}
}

function showTemplate(template, data){
	var html    = template(data);
	$('#content').html(html);
	showCrumbs();
}

function handleClick(e) {
	if ( e.target.id == 0 ) {
		console.log( e.target.id );
		showTemplate(category_template, current_species);
		$(".category-thumbnail").click( function (){
			var index = $(this).data("id");
			current_category = current_species.animals[index];
			showTemplate(animal_template, current_category);
		});
		current_category = undefined;
	}
	showCrumbs()
};
// document read gets called when the whole document
// is loaded, so we put most of the code that needs to run
// in here
$(document).ready(function(){
	var source   = $("#species-template").html();
	species_template = Handlebars.compile(source);
	var source   = $("#category-template").html();
	category_template = Handlebars.compile(source);
	var source   = $("#animal-template").html();
	animal_template = Handlebars.compile(source);

	var source   = $("#crumbs-template").html();
	crumbs_template = Handlebars.compile(source);

	showTemplate( species_template, animals_data );
	$(".species-thumbnail").click( function (){
		var index = $(this).data("id");
		current_species = animals_data.category[index];
		showTemplate(category_template, current_species);
		$(".category-thumbnail").click( function (){
			var index = $(this).data("id");
			current_category = current_species.animals[index];
			showTemplate(animal_template, current_category);
		});
	});
});