$(document).ready(function() {

	$("#outside").cleditor({width:500, height:180, useCSS:true})[0].focus();

	$("#inside").cleditor({width:500, height:180, useCSS:true})[0].focus();

	$("#outside").cleditor()[0].$area.val("<span style='background-color: rgb(255, 255, 255); '><span style='font-style: normal; font-weight: normal; color: rgb(51, 51, 51); font-family: Arial, Helvetica, FreeSans, sans-serif; line-height: 17px; text-align: left; '>${firstname} ${lastname}</span><br style='color: rgb(51, 51, 51); font-family: Arial, Helvetica, FreeSans, sans-serif; line-height: 17px; text-align: left; '><a href='http://www.company.com/' class='external-link' rel='nofollow' style='font-style: normal; font-weight: normal; color: rgb(0, 109, 175); outline-style: none; outline-width: initial; outline-color: initial; font-family: Arial, Helvetica, FreeSans, sans-serif; line-height: 17px; text-align: left; '>www.company.com</a><span style='font-style: normal; font-weight: normal; color: rgb(51, 51, 51); font-family: Arial, Helvetica, FreeSans, sans-serif; line-height: 17px; text-align: left; '>&nbsp;| ${email}</span><br style='color: rgb(51, 51, 51); font-family: Arial, Helvetica, FreeSans, sans-serif; line-height: 17px; text-align: left; '><span style='color: rgb(51, 51, 51); font-family: Arial, Helvetica, FreeSans, sans-serif; line-height: 17px; text-align: left; font-weight: bold; font-style: italic;'>55 Main Street, London, UK, EC2A 1RE</span><br style='color: rgb(51, 51, 51); font-family: Arial, Helvetica, FreeSans, sans-serif; line-height: 17px; text-align: left; '><span style='font-style: normal; font-weight: normal; color: rgb(51, 51, 51); font-family: Arial, Helvetica, FreeSans, sans-serif; line-height: 17px; text-align: left; '>Company number: 12345678</span></span>");

	$("#outside").cleditor()[0].updateFrame();

	$("#inside").cleditor()[0].$area.val("<span style='font-size: 10pt; font-style: normal; font-variant: normal; font-weight: normal; color: rgb(51, 51, 51); font-family: Arial, Helvetica, FreeSans, sans-serif; line-height: 17px; text-align: left; '>${firstname} ${lastname}</span><br style='color: rgb(51, 51, 51); font-family: Arial, Helvetica, FreeSans, sans-serif; line-height: 17px; text-align: left; '><a href='http://www.company.com/' class='external-link' rel='nofollow' style='font-style: normal; font-weight: normal; color: rgb(0, 109, 175); outline-style: none; outline-width: initial; outline-color: initial; font-family: Arial, Helvetica, FreeSans, sans-serif; line-height: 17px; text-align: left; '>www.company.com</a><span style='font-style: normal; font-weight: normal; color: rgb(51, 51, 51); font-family: Arial, Helvetica, FreeSans, sans-serif; line-height: 17px; text-align: left; '>&nbsp;| ${email}</span>");

	$("#inside").cleditor()[0].updateFrame();

	function register_event_remove_button(){
		$('.remove-prop').click(function(event){
			$(event.target.parentNode.parentNode).remove();
		});
	}

	var data = [
		{
			"notifyEmail" : "pepe@pepe.com",
			"properties" : {
				"Name" : "Pepe",
				"LastName": "Garcia",
				"Phone" : "45454545454"
			}
		},
		{
			"notifyEmail" : "maria@pepe.com",
			"properties" : {
				"Name" : "Maria",
				"LastName": "Perez",
				"Phone" : "123123123"
			}
		},
		{
			"notifyEmail" : "armando@pepe.com",
			"properties" : {
				"Name" : "Amarndo",
				"LastName": "Barreda",
				"Phone" : "87378738"
			}
		},
		{
			"notifyEmail" : "homer@pepe.com",
			"properties" : {
				"Name" : "Homer",
				"LastName": "Simpson",
				"Phone" : "12313231231"
			}
		},
	];

	$('#email-properties').hide();

	$('#table-email').dataTable({
        "bJQueryUI": true,
        'bServerSide': false,
		'bProcessing': true,
		//'sAjaxSource': 'http://test.mxhero.com:8080/webapi/api/v1/domains/mxhero.com/users',
		'bPaginate': true,
        'sPaginationType': 'full_numbers',
        //'sAjaxDataProp': 'elements',
        'aaData' : data,
        'aoColumns': [
				{ "mDataProp": "notifyEmail", "aTargets" : [0] },
				{ 
				  "sDefaultContent": "",
				  "bSearchable": false,
                  "bSortable": false,
                  "fnRender": function (oObj) {
                      return '<button class="edit-email-button" href="#">Edit</button>';
                  },
                  "aTargets" : [1] 
              	},	
			],
		"fnServerData": function ( sSource, aoData, fnCallback ) {
				aoData.push( 
			        { "name":"limit", "value": aoData[4].value },
			        { "name":"offset", "value": aoData[3].value}
			    );
				$.ajax({
				  "type": "POST", 
				  "url": sSource, 
				  "data": aoData, 
				  "dataType": "json",
				  "success": function(json){
					json.iTotalRecords = json.totalElements
					alert(json.iTotalRecords)
					alert(json.totalElements)
					fnCallback(json)
				  },
				});
		},
    });

	$('.edit-email-button').click(function(event){
		clear_properties();
		var email = $(event.target.parentNode.parentNode).children()[0].innerHTML;
		$('#title-configuration').html("Configure Properties for "+email);
		var element = jQuery.grep(data, function(obj) {
			return obj.notifyEmail === email;
		});
		var oTable = $('#property-email');
		var props = element[0].properties;
		var i = 0;
		var odd = "odd";
		for (var key in props) {
			odd = (i%2 === 0)?"even":"odd";
			$('#property-email tbody:last').append('<tr class="'+odd+'"><td class="sorting_1"><input type="text" value="'+key+'"/></td><td><input type="text" value="'+props[key]+'"/></td><td><button class="remove-prop">Remove</button></td></tr>');
			i++;
		}
		register_event_remove_button();
		$('#email-properties').toggle();
		$('#email-list').toggle();
	});

	function clear_properties(){
		$('#property-email tbody:last').children().remove();
		$('#email-properties').hide();
	}

	function toggle_divs(){
		$('#email-list').toggle();
		$('#email-properties').toggle();
		$('#email-properties').hide();
	}

	$('#cancel-email-props').click(function(event){
		clear_properties();
		toggle_divs();
	});

	$('#save-email-props').click(function(event){
		alert("Saving data ...."+$(event.target.parentNode.parentNode).children().html());
		clear_properties();
		toggle_divs();
	});

	$('#dialog').dialog({
		autoOpen : false,
		bigFrame : true,
		height : 530,
		width : 600,
		modal : true,
		position : "top",
		hide: { effect: 'drop', direction: "down" },
		show : { effect: 'drop', direction: "up" },
		title: "Accounts Configuration"
	});

	$('#config-accounts').click(function(event){
		$('#dialog').dialog("open");
	});

	$('#finalize-config').click(function(event){
		alert("Congratulations!!!!");
	});

	$('#add-property').click(function(event){
		var odd = $('#property-email tbody:last').children().last().attr('class')
		odd = (odd === "even")?"odd":"even";
		$('#property-email tbody:last').append('<tr class="'+odd+'"><td class="sorting_1"><input type="text"/></td><td><input type="text"/></td><td><button class="remove-prop">Remove</button></td></tr>');
		register_event_remove_button();
	});

});
