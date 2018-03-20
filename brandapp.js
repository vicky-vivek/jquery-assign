$(document).ready(function(){


		$.ajax({
		url: 'controller.php?cat=cat',
		type: 'GET',
		success:function(response){
			var data=response;
			var fetchdata=JSON.parse(data);
			var arr = $.map( fetchdata, function( obj, i ) {$("#drop_category").append('<option value="'+obj.name+'">'+obj.name+'</option>'); 
		    });
		}
	});

	


	$('#drop_category').change(function(){
		var selectedCat = $("#drop_category option:selected").val();
		$.ajax({
			url: 'controller.php?selectedCat='+selectedCat,
			type: 'GET',
			success:function(response){
					var data=response;
					var fetchdata=JSON.parse(data);
					$("#drop_subcat").html('');
					$("#drop_subcat").html('<option value="">Choose Subcategory</option>');
					var arr = $.map( fetchdata, function( obj, i ) {$("#drop_subcat").append('<option value="'+obj.name+'">'+obj.name+'</option>'); 
				    });	 
					}
		});
	});





		$.ajax({
		url: 'controller.php?brandcatlist=brandcatlist',
		type: 'GET',
		success:function(response){
				var data = response;
				var fetchdata=JSON.parse(data);
				var arr = $.map( fetchdata, function( obj, i ) {$("#brand_cat_list").append('<tr><td>'+obj.brand_id+'</td><td>'+obj.name+'</td><td>'+obj.sub_name+'</td><td>'+obj.brand_name+'</td><td><i class="  fa fa-edit brand-edit" style="font-size:20px;color:black;"></td><td><i class="  fa fa-archive brand-delete" style="font-size:20px;color:black;"></td></tr>'); 
			    });
			}
		});



		$(document).on('click' , '.brand-edit' , function(e){
			e.preventDefault();
			var editbrandid = $(this).closest("tr").find('td:eq(0)').text();
			var editcatname = $(this).closest("tr").find('td:eq(1)').text();
			var editsubcatname = $(this).closest("tr").find('td:eq(2)').text();
			var editbrandname = $(this).closest("tr").find('td:eq(3)').text();
			//console.log(editcatid + editcatname);
			$('#mybrandModal').modal('show'); 
			$('#editcatname').val(editcatname);
			$('#editbrandid').val(editbrandid);
			$('#editsubcatname').val(editsubcatname);
			$('#editbrandname').val(editbrandname);
			
	    });



		$('#editbrandsubmit').click(function(e){
					e.preventDefault();
					var editbrandid = $("#editbrandid").val();
					var editbrandname = $("#editbrandname").val();
					console.log(editbrandid);
					var datastring = {"editbrandid" : editbrandid ,"editbrandname" : editbrandname};	
					//console.log(editcatid);
					$.ajax({
						url: 'controller.php',
						type: 'POST',
						dataType: 'json',
						data: datastring,
						success:function(response){
				 			//console.log(response);
				 			$('#mybrandModal').modal('hide');
				 			$("#brand_cat_list").html('');
				 			$("#brand_cat_list").html('<th>ID</th>\
												      <th>Category Name</th>\
												      <th>Subcategory Name</th>\
												      <th>Brand Name</th>\
												      <th colspan="2">Action</th>');
				 			var data = response;
							//var fetchdata=JSON.parse(data);
							var arr = $.map( data, function( obj, i ) {$("#brand_cat_list").append('<tr><td>'+obj.brand_id+'</td><td>'+obj.name+'</td><td>'+obj.sub_name+'</td><td>'+obj.brand_name+'</td><td><i class="  fa fa-edit brand-edit" style="font-size:20px;color:black;"></td><td><i class="  fa fa-archive brand-delete" style="font-size:20px;color:black;"></td></tr>'); 
			   				 });
				        }

				    });
		});




		$(document).on('click' , '.brand-delete' , function(e){
		e.preventDefault();
		var id = $(this).closest("tr").find('td:eq(0)').text();
		//alert(id);
		$.ajax({
		url: 'controller.php?brand-deleteid='+id,
		type: 'GET',
		success:function(response){
				 var data = response;
				// console.log("data", data);
				var fetchdata=JSON.parse(data);
				$("#brand_cat_list").html('');
	 			$("#brand_cat_list").html('<th>ID</th>\
									      <th>Category Name</th>\
									      <th>Subcategory Name</th>\
									      <th>Brand Name</th>\
									      <th colspan="2">Action</th>');
				//var fetchdata=JSON.parse(data);
				var arr = $.map( fetchdata, function( obj, i ) {$("#brand_cat_list").append('<tr><td>'+obj.brand_id+'</td><td>'+obj.name+'</td><td>'+obj.sub_name+'</td><td>'+obj.brand_name+'</td><td><i class="  fa fa-edit brand-edit" style="font-size:20px;color:black;"></td><td><i class="  fa fa-archive brand-delete" style="font-size:20px;color:black;"></td></tr>'); 
			    });
			}
		
		});
	});




	$('#filter_submit').click(function(e){
					e.preventDefault();
					var catfiltername = $("#drop_category").val();
					var subcatfiltername = $("#drop_subcat").val();
					console.log(catfiltername + subcatfiltername);
					var datastring = {"catfiltername" : catfiltername ,"subcatfiltername" : subcatfiltername};	
					//console.log(datastring);
					$.ajax({
						url: 'controller.php',
						type: 'POST',
						dataType: 'json',
						data: datastring,
						success:function(response){
				 			$("#brand_cat_list").html('');
				 			$("#brand_cat_list").html('<th>ID</th>\
												      <th>Category Name</th>\
												      <th>Subcategory Name</th>\
												      <th>Brand Name</th>\
												      <th colspan="2">Action</th>');
				 			var data = response;
							//var fetchdata=JSON.parse(data);
							var arr = $.map( data, function( obj, i ) {$("#brand_cat_list").append('<tr><td>'+obj.brand_id+'</td><td>'+obj.name+'</td><td>'+obj.sub_name+'</td><td>'+obj.brand_name+'</td><td><i class="  fa fa-edit brand-edit" style="font-size:20px;color:black;"></td><td><i class="  fa fa-archive brand-delete" style="font-size:20px;color:black;"></td></tr>'); 
			   				 });
				        }

				    });
		});	




	


});