/* Character affection table - start */
const affection_start = 50;
const affection_cap = 50;
	
var affection_data = {};
var affectionTableCounter = 0;

	
$( document ).ready(function() {
	initAffectionTable();
	$(".affection-level input").on("change mouseup keyup click", function(){affectionChange($(this).closest("table"), $(this).val());});
	$(".affection-data").children("div").on("click", function(){affectionChange($(this).closest("table"),$(this).attr('data-level'));});
});
	

function initAffectionTable(){
	$(".character-affectiontable").each(function(){
		var id = 'affectionTable-'+(++affectionTableCounter);
		$(this).attr('id',id);
		
		var data = {};

		$(this).find(".affection-data > div").each(function(){
			var level = $(this).attr('data-level');
			data[level] = {};
			var bonus = $(this).attr('data-stats').split(' ');

			$.each( bonus, function( index ) {
				bonus[index] = bonus[index].split('+');
				data[level][bonus[index][0]] =  parseInt(bonus[index][1]);
			});
		});
		affection_data[id] = data;

		$(this).find(".affection-level").html('<input type="number" value="'+affection_start+'" step="1" min="1" max="'+affection_cap+'" />'); 
		
		affectionChange($(this), affection_start);
	});
}
	

function affectionChange (affectionTable, level){
	var effective_bonus = {};
	var html_out = '';

	for (var index = 2; index <= level; index++) {
		$.each( affection_data[affectionTable.attr('id')][index], function(stat_name, stat_value){
			if (typeof effective_bonus[stat_name] == 'undefined') effective_bonus[stat_name] = 0;
			effective_bonus[stat_name] += stat_value;
		});
	}
	
	$.each( effective_bonus, function(stat_name, stat_value){
		html_out += '<b>' + stat_name + '</b>' + ' +' + stat_value + ', ';
	});

	affection_data[affectionTable.attr('id')].current = effective_bonus;

	if (affectionTable.find(".affection-level input").val() !== level) affectionTable.find(".affection-level input").val(level);
	affectionTable.find(".affection-total").html(html_out.substring(0,html_out.length-2));
}
/* Character affection table - end */
