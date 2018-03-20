$(document).ready(function(){


		$.ajax({
		url: 'controller.php?subcatlist=subcatlist',
		type: 'GET',
		success:function(response){
				var data = response;
				var fetchdata=JSON.parse(data);
				var arr = $.map( fetchdata, function( obj, i ) {$("#sub_cat_list").append('<tr><td>'+obj.id+'</td><td>'+obj.category_name+'</td><td>'+obj.subcat_name+'</td><td><i class="  fa fa-edit subcat-edit" style="font-size:20px;color:black;"></td><td><i class="  fa fa-archive subcat-delete" style="font-size:20px;color:black;"></td></tr>'); 
			    });
			}
		});
	

		$(document).on('click' , '.subcat-edit' , function(e){
			e.preventDefault();
			var editsubcatid = $(this).closest("tr").find('td:eq(0)').text();
			var editcatname = $(this).closest("tr").find('td:eq(1)').text();
			var editsubcatname = $(this).closest("tr").find('td:eq(2)').text();
			//console.log(editcatid + editcatname);
			$('#mysubcatModal').modal('show'); 
			$('#editcatname').val(editcatname);
			$('#editsubcatid').val(editsubcatid);
			$('#editsubcatname').val(editsubcatname);
			
	    });



		$('#editsubcatsubmit').click(function(e){
					e.preventDefault();
					var editsubcatid = $("#editsubcatid").val();
					var editsubcatname = $("#editsubcatname").val();
					console.log(editsubcatid);
					var datastring = {"editsubcatid" : editsubcatid ,"editsubcatname" : editsubcatname};	
					//console.log(editcatid);
					$.ajax({
						url: 'controller.php',
						type: 'POST',
						dataType: 'json',
						data: datastring,
						success:function(response){
				 			//console.log(response);
				 			$('#mysubcatModal').modal('hide');
				 			$("#sub_cat_list").html('');
				 			$("#sub_cat_list").html('<th>Id</th>\
												      <th>Category Name</th>\
												      <th>Subcategory Name</th>\
												      <th colspan="2">Action</th>')
				 			var data = response;
							//var fetchdata=JSON.parse(data);
							var arr = $.map( data, function( obj, i ) {$("#sub_cat_list").append('<tr><td>'+obj.id+'</td><td>'+obj.category_name+'</td><td>'+obj.subcat_name+'</td><td><i class="  fa fa-edit subcat-edit" style="font-size:20px;color:black;"></td><td><i class="  fa fa-archive subcat-delete" style="font-size:20px;color:black;"></td></tr>'); 
			   				 });
				        }

				    });
		});



		$(document).on('click' , '.subcat-delete' , function(e){
		e.preventDefault();
		var id = $(this).closest("tr").find('td:eq(0)').text();
		//alert(id);
		$.ajax({
		url: 'controller.php?subcat-deleteid='+id,
		type: 'GET',
		success:function(response){
				 var data = response;
				// console.log("data", data);
				var fetchdata=JSON.parse(data);
				$("#sub_cat_list").html('');
	 			$("#sub_cat_list").html('<th>Id</th>\
									      <th>Category Name</th>\
									      <th>Subcategory Name</th>\
									      <th colspan="2">Action</th>');
				//var fetchdata=JSON.parse(data);
				var arr = $.map( fetchdata, function( obj, i ) {$("#sub_cat_list").append('<tr><td>'+obj.id+'</td><td>'+obj.category_name+'</td><td>'+obj.subcat_name+'</td><td><i class="  fa fa-edit subcat-edit" style="font-size:20px;color:black;"></td><td><i class="  fa fa-archive subcat-delete" style="font-size:20px;color:black;"></td></tr>'); 
   				 });
			}
		
		});
	});



});