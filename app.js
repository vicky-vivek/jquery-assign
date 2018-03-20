$(document).ready(function(){

 var page = function pagination(){
	$.ajax({
		url: 'controller.php?page=page',
		type: 'GET',
		success:function(response){
			var data=response;
			var fetchdata=JSON.parse(data);
			var totalpage = fetchdata[0].count;
			var pageno = 1;
			$('#pagination-demo').html('');
			while(pageno <= totalpage){
				$('#pagination-demo').append('<li><button class="btn btn-primary btn-sm" value="pro'+pageno+'">'+pageno+'</button></li>');
					pageno++;
			}
		}
	});
}

page();

	
	$(document).on('click' ,"#pagination-demo :button" ,function(){
		var btnvalue = $(this).val();
		var act = btnvalue.slice(0,3);
		var bval = btnvalue.slice(3 ,btnvalue.length );
		var offset = 5*bval-5;
		if(act == "pro"){
			prodlist(offset);
	    }else if(act == "fil"){
	    	var filterbrand = $('#drop_filter_brand').val();
			var status = $('#status').val();
			var datastring = {"filterbrand" : filterbrand , "status" : status , "offset":offset };
			//console.log(datastring);
			search(filterbrand , status , offset);
	    }
	});



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



	$('#drop_subcat').change(function(){
		var selectedSubCat = $("#drop_subcat option:selected").val();
		$.ajax({
			url: 'controller.php?selectedSubCat='+selectedSubCat,
			type: 'GET',
			success:function(response){
					var data=response;
					var fetchdata=JSON.parse(data);
					$("#drop_brand").html('');
					$("#drop_brand").html('<option value="">Choose brand</option>');
					var arr = $.map( fetchdata, function( obj, i ) {$("#drop_brand").append('<option value="'+obj.name+'">'+obj.name+'</option>'); 
				    });	 
					}
		});
	});



	$('#drop_filter_brand').one('mouseover',function(){
		$.ajax({
			url: 'controller.php?brand_filter=brand_filter',
			type: 'GET',
			success:function(response){
					var data=response;
					var fetchdata=JSON.parse(data);
					$("#drop_filter_brand").html('');
					$("#drop_filter_brand").html('<option value="">Choose brand</option>');
					var arr = $.map( fetchdata, function( obj, i ) {$("#drop_filter_brand").append('<option value="'+obj.name+'">'+obj.name+'</option>'); 
				    });	 
					}
		});
	});



	
	$("#filter_submit").click(function(e){
		e.preventDefault();
		var filterbrand = $('#drop_filter_brand').val();
		var status = $('#status').val();
		datastring = {"filterbrand" : filterbrand , "status" : status };
		//console.log(filterbrand +" "+status);
		$.ajax({
			url:'controller.php',
			type:'POST',
			dataType: 'json',
			data: datastring,
			success:function(response){
				var data = response;
				//var fetchdata = JSON.parse(data);
				console.log(data);
				 var pageno=1;
				 var totalpage = Math.ceil((data[0][0].count)/5);
				 $('#pagination-demo').html('');
					while(pageno <= totalpage){
						$('#pagination-demo').append('<li><button class="btn btn-primary btn-sm" value="fil'+pageno+'">'+pageno+'</button></li>');
							pageno++;
					}

					$("#productlist").html('');
					if(data[0][0].count == 0){
						//alert("No match found");
						$("#action").hide();
						$("#productlist").html('<h3 class="text-center">No match found</h3>');
					}else{
					$("#action").show();	
					$("#productlist").html('<th><input type="checkbox" id="selectAll" value="selectAll"> Select All</th>\
											      <th>ID</th>\
											      <th>Name</th>\
											      <th>Category</th>\
											      <th>Subcategory</th>\
											      <th>Description</th>\
											      <th>Brand</th>\
											      <th colspan="2">Action</th>');
					var arr = $.map( data, function( objj, i ){if(i>0)  $.map( objj, function( obj, i ) {$("#productlist").append('<tr><td><input type="checkbox" name="checkbox[]" value="'+obj.prod_id+'"></td><td>'+obj.prod_id+'</td><td>'+obj.name+'</td><td>'+obj.category_name+'</td><td>'+obj.sub_cat_name+'</td><td>'+obj.product_description+'</td><td>'+obj.brand_name+'</td><td><i class="  fa fa-edit prod-edit" style="font-size:20px;color:black;"></td><td><i class="fa fa-archive prod-delete" style="font-size:20px;color:black;"></td></tr>'); 
				       });
				    });
			    }
			   } 
		});
	});


	var search = function(filterbrand , status , offset){
				if(offset == 0){
				var offset = 1;	
				var datastring = {"filterbrand" : filterbrand , "status" : status , "offset" : offset };
				}else{
				var datastring = {"filterbrand" : filterbrand , "status" : status , "offset" : offset };	
				}
				console.log(datastring);
				$.ajax({
				url:'controller.php',
				type:'POST',
				dataType: 'json',
				data: datastring,
				success:function(response){
					var data = response;

					
					$("#productlist").html('');
					if(data == ""){
						//alert("No match found");
						$("#action").hide();
						$("#productlist").html('<h3 class="text-center">No match found</h3>');
					}else{
					$("#action").show();	
					$("#productlist").html('<th><input type="checkbox" id="selectAll" value="selectAll"> Select All</th>\
											      <th>ID</th>\
											      <th>Name</th>\
											      <th>Category</th>\
											      <th>Subcategory</th>\
											      <th>Description</th>\
											      <th>Brand</th>\
											      <th colspan="2">Action</th>');
					var arr = $.map( data, function( obj, i ) {$("#productlist").append('<tr><td><input type="checkbox" name="checkbox[]" value="'+obj.prod_id+'"></td><td>'+obj.prod_id+'</td><td>'+obj.name+'</td><td>'+obj.category_name+'</td><td>'+obj.sub_cat_name+'</td><td>'+obj.product_description+'</td><td>'+obj.brand_name+'</td><td><i class="  fa fa-edit prod-edit" style="font-size:20px;color:black;"></td><td><i class="fa fa-archive prod-delete" style="font-size:20px;color:black;"></td></tr>'); 
				    });
				    //console.log(data);
				   } 
				}
		});	
	}




	$(document).on('change', '#selectAll', function() {
	    if(this.checked) {
	      $(":checkbox").prop('checked', true);
	    }else{
	      $(":checkbox").prop('checked', false);
	    }
	});

	

	$("#productlist").on('change','[name="checkbox[]"]',function(){
		console.log("cc");
		var l =  $('[name="checkbox[]"]:checked').length;
		var d = $('[name="checkbox[]"]').length;	
			//console.log(l+"  "+d);
		if(l == d){
			$("#selectAll").prop('checked',true);
		}else{
			$("#selectAll").prop('checked',false);
		}
		
	});


	$("#action").change(function(e){
		var action = $("#action").val();
		var ck = [];
		var i=0;
		$(':checkbox:checked').each(function(){
          if($(this).val() != "selectAll")
          ck[i++] = $(this).val();
        });
        var datastring = JSON.stringify(ck);
     
        //console.log(ck+"     "+datastring);
        if(ck == ""){
        	alert("No item selected");
        } else{
        $.ajax({
        	url: 'controller.php',
			type: 'POST',
			dataType: 'json',
			data: "input="+datastring+"&action="+action,
			success:function(response){
				 var data = response;
				 //console.log("data", data);
				//var fetchdata=JSON.parse(data);
				/*$("#productlist").html('');
				$("#productlist").html('<th><input type="checkbox" id="selectAll" value="selectAll"> Select All</th>\
										      <th>ID</th>\
										      <th>Name</th>\
										      <th>Category</th>\
										      <th>Subcategory</th>\
										      <th>Description</th>\
										      <th>Brand</th>\
										      <th colspan="2">Action</th>');
				var arr = $.map( data, function( obj, i ) {$("#productlist").append('<tr><td><input type="checkbox" name="checkbox[]" value="'+obj.prod_id+'"></td><td>'+obj.prod_id+'</td><td>'+obj.name+'</td><td>'+obj.category_name+'</td><td>'+obj.sub_cat_name+'</td><td>'+obj.product_description+'</td><td>'+obj.brand_name+'</td><td><i class="  fa fa-edit prod-edit" style="font-size:20px;color:black;"></td><td><i class="fa fa-archive prod-delete" style="font-size:20px;color:black;"></td></tr>'); 
			    });*/
			    prodlist();
			    if(action == "delete"){
			    	alert("The selected item[s] is/are deleted");
			    }else if(action == '0'){
			    	alert("The selected item[s] is/are disapproved");
			    }else if(action == '1'){
			    	alert("The selected item[s] is/are approved");
			    }
			  $('#filter_submit').trigger("click");  
			}	
        });
       }
       $("#action").html('');
       $("#action").html('<option value="">Choose Action</option>\
          <option value="delete">Delete</option>\
          <option value="1">Approve</option>\
          <option value="0">Disapprove</option>');
	});


	$('#submit').click(function(e){
		e.preventDefault();
		var cat = $("#drop_category").val();
		var subcat = $("#drop_subcat").val();
		var brand = $("#drop_brand").val();
		var pname = $("#pname").val();
		var pdesc = $("#pdesc").val();	
		var datastring = {"cat" : cat , "subcat" : subcat , "brand" : brand , "pname" : pname , "pdesc" : pdesc};
		//alert(datastring);
		if(pname == "" ){
			$("#Errpname").html("Field is required");} if(pdesc == ""){
			$("#Errpdesc").html("Field is required");} if(cat == ""){
			$("#Errdrop_category").html("Field is required");} if(subcat ==""){
			$("#Errdrop_sub_cat").html("Field is required");} if(brand == ""){
			$("#Errdrop_brand").html("Field is required");
		}else{

		$( '#pform' ).each(function(){
			    this.reset();
			});
		$.ajax({
			url: 'controller.php',
			type: 'POST',
			dataType: 'json',
			data: datastring,
			success:function(response){
				 var data = response;
				 //console.log("data", data);
				//var fetchdata=JSON.parse(data);
				$("#productlist").html('');
				$("#productlist").html('<th><input type="checkbox" id="selectAll" value="selectAll"> Select All</th>\
										      <th>ID</th>\
										      <th>Name</th>\
										      <th>Category</th>\
										      <th>Subcategory</th>\
										      <th>Description</th>\
										      <th>Brand</th>\
										      <th colspan="2">Action</th>');
				var arr = $.map( data, function( obj, i ) {$("#productlist").append('<tr><td><input type="checkbox" name="checkbox[]" value="'+obj.prod_id+'"></td><td>'+obj.prod_id+'</td><td>'+obj.name+'</td><td>'+obj.category_name+'</td><td>'+obj.sub_cat_name+'</td><td>'+obj.product_description+'</td><td>'+obj.brand_name+'</td><td><i class="  fa fa-edit prod-edit" style="font-size:20px;color:black;"></td><td><i class="fa fa-archive prod-delete" style="font-size:20px;color:black;"></td></tr>'); 
			    });
			    page();	
			}
		});
	 }

	});




var prodlist = function(offset){
		var datastring = {"offset":offset};
		
		$.ajax({
		url: 'controller.php?prodlist=prodlist',
		type: 'POST',
		dataType:'json',
		data:datastring, 
		success:function(response){
				//alert(response);
				var data = response;
				$("#productlist").html('');
				$("#productlist").html('<th><input type="checkbox" id="selectAll" value="selectAll"> Select All</th>\
										      <th>ID</th>\
										      <th>Name</th>\
										      <th>Category</th>\
										      <th>Subcategory</th>\
										      <th>Description</th>\
										      <th>Brand</th>\
										      <th colspan="2">Action</th>');
				//var fetchdata=JSON.parse(data);
				var arr = $.map( data, function( obj, i ) {$("#productlist").append('<tr><td><input type="checkbox" name="checkbox[]" value="'+obj.prod_id+'"></td><td>'+obj.prod_id+'</td><td>'+obj.name+'</td><td>'+obj.category_name+'</td><td>'+obj.sub_cat_name+'</td><td>'+obj.product_description+'</td><td>'+obj.brand_name+'</td><td><i class="  fa fa-edit prod-edit" style="font-size:20px;color:black;"></td><td><i class="fa fa-archive prod-delete" style="font-size:20px;color:black;"></td></tr>'); 
			    });
			}
	});
	}
prodlist();


	$.ajax({
		url: 'controller.php?catlist=catlist',
		type: 'POST',
		success:function(response){
				var data = response;
				var fetchdata=JSON.parse(data);
				var arr = $.map( fetchdata, function( obj, i ) {$("#cat_list").append('<tr><td>'+obj.id+'</td><td>'+obj.name+'</td><td><i class="  fa fa-edit cat-edit" style="font-size:20px;color:black;"></td><td><i class="  fa fa-archive cat-delete" style="font-size:20px;color:black;"></td></tr>'); 
			    });
			}
	});


	$(document).on('click' , '.cat-edit' , function(e){
			e.preventDefault();
			var editcatid = $(this).closest("tr").find('td:eq(0)').text();
			var editcatname = $(this).closest("tr").find('td:eq(1)').text();
			//console.log(editcatid + editcatname);
			$('#mycatModal').modal('show'); 
			$('#editcatname').val(editcatname);
			$('#editcatid').val(editcatid);
			
	});



	$(document).on('click' , '.cat-delete' , function(e){
			e.preventDefault();
			var deletecatid = $(this).closest("tr").find('td:eq(0)').text();
			console.log(deletecatid);
			
			$.ajax({
				url: 'controller.php?cat-deleteid='+deletecatid,
				type: 'GET',
				success:function(response){
						$('#cat_list').html(''); 
						$('#cat_list').html('<th>Id</th>\
											<th>Name</th>\
											<th colspan="2">Action</th>');
						var data = response;
						var fetchdata=JSON.parse(data);
						var arr = $.map( fetchdata, function( obj, i ) {$("#cat_list").append('<tr><td>'+obj.id+'</td><td>'+obj.name+'</td><td><i class="  fa fa-edit cat-edit" style="font-size:20px;color:black;"></td><td><i class="  fa fa-archive cat-delete" style="font-size:20px;color:black;"></td></tr>'); 
					    });
					}
			});
			
			
	});




	$('#editcatsubmit').click(function(e){
					e.preventDefault();
					var editcatid = $("#editcatid").val();
					var editcatname = $("#editcatname").val();
					var datastring = {"editcatid" : editcatid ,"editcatname" : editcatname};	
					//console.log(editcatid);
					$.ajax({
						url: 'controller.php',
						type: 'POST',
						dataType: 'json',
						data: datastring,
						success:function(response){
				 			//console.log(response);
				 			$('#mycatModal').modal('hide');
				 			$("#cat_list").html('');
				 			$("#cat_list").html('<th>Id</th>\
											      <th>Name</th>\
											      <th colspan="2">Action</th>')
				 			var data = response;
							//var fetchdata=JSON.parse(data);
							var arr = $.map( response, function( obj, i ) {$("#cat_list").append('<tr><td>'+obj.id+'</td><td>'+obj.name+'</td><td><i class="  fa fa-edit cat-edit" style="font-size:20px;color:black;"></td><td><i class="  fa fa-archive" style="font-size:20px;color:black;"></td></tr>'); 
						    });
				        }

				    });

		});			







	$(document).on('click' , '.prod-delete' , function(e){
		e.preventDefault();
		var id = $(this).closest("tr").find('td:eq(1)').text();
		var filterbrand = $('#drop_filter_brand').val();
		var status = $('#status').val();
		//alert(id);
		$.ajax({
		url: 'controller.php?prod-deleteid='+id,
		type: 'GET',
		success:function(response){
				 var data = response;
				var fetchdata=JSON.parse(data);
				//console.log(fetchdata);
				$("#productlist").html('');
				$("#productlist").html('<th><input type="checkbox" id="selectAll" value="selectAll"> Select All</th>\
										      <th>ID</th>\
										      <th>Name</th>\
										      <th>Category</th>\
										      <th>Subcategory</th>\
										      <th>Description</th>\
										      <th>Brand</th>\
										      <th colspan="2">Action</th>');
				var arr = $.map( fetchdata, function( obj, i ) {if(obj.brand_name == filterbrand && status == ""){
					  $("#productlist").append('<tr><td><input type="checkbox" name="checkbox[]" value="'+obj.prod_id+'"></td><td>'+obj.prod_id+'</td><td>'+obj.name+'</td><td>'+obj.category_name+'</td><td>'+obj.sub_cat_name+'</td><td>'+obj.product_description+'</td><td>'+obj.brand_name+'</td><td><i class="  fa fa-edit prod-edit" style="font-size:20px;color:black;"></td><td><i class="fa fa-archive prod-delete" style="font-size:20px;color:black;"></td></tr>'); }
					  else if(obj.brand_name == filterbrand && obj.status == status){
					  		$("#productlist").append('<tr><td><input type="checkbox" name="checkbox[]" value="'+obj.prod_id+'"></td><td>'+obj.prod_id+'</td><td>'+obj.name+'</td><td>'+obj.category_name+'</td><td>'+obj.sub_cat_name+'</td><td>'+obj.product_description+'</td><td>'+obj.brand_name+'</td><td><i class="  fa fa-edit prod-edit" style="font-size:20px;color:black;"></td><td><i class="fa fa-archive prod-delete" style="font-size:20px;color:black;"></td></tr>');
					  }
					  else if(filterbrand == "" && obj.status == status){
					  		$("#productlist").append('<tr><td><input type="checkbox" name="checkbox[]" value="'+obj.prod_id+'"></td><td>'+obj.prod_id+'</td><td>'+obj.name+'</td><td>'+obj.category_name+'</td><td>'+obj.sub_cat_name+'</td><td>'+obj.product_description+'</td><td>'+obj.brand_name+'</td><td><i class="  fa fa-edit prod-edit" style="font-size:20px;color:black;"></td><td><i class="fa fa-archive prod-delete" style="font-size:20px;color:black;"></td></tr>');
 					  }
					  else if(filterbrand == "" && status == ""){
					  		$("#productlist").append('<tr><td><input type="checkbox" name="checkbox[]" value="'+obj.prod_id+'"></td><td>'+obj.prod_id+'</td><td>'+obj.name+'</td><td>'+obj.category_name+'</td><td>'+obj.sub_cat_name+'</td><td>'+obj.product_description+'</td><td>'+obj.brand_name+'</td><td><i class="  fa fa-edit prod-edit" style="font-size:20px;color:black;"></td><td><i class="fa fa-archive prod-delete" style="font-size:20px;color:black;"></td></tr>');
					  }
			    });
			     var pageno=1;
				 var totalpage = Math.ceil((data.length)/5);
				 $('#pagination-demo').html('');
					while(pageno <= totalpage){
						$('#pagination-demo').append('<li><button class="btn btn-primary btn-sm" value="fil'+pageno+'">'+pageno+'</button></li>');
							pageno++;
					}
					$("#filter_submit").trigger("click");
			}
		
		});
	});

	

	



	$('#editsubmit').click(function(e){
					e.preventDefault();
					var cat = $("#edit_drop_category").val();
					var subcat = $("#edit_drop_subcat").val();
					var brand = $("#edit_drop_brand").val();
					var editpname = $("#editpname").val();
					var pdesc = $("#editpdesc").val();
					var editid = $("#editid").val();	
					var datastring = {"editid" : editid ,"cat" : cat , "subcat" : subcat , "brand" : brand , "editpname" : editpname , "pdesc" : pdesc};
					var filterbrand = $('#drop_filter_brand').val();
					var status = $('#status').val();
					//console.log(datastring);
					$.ajax({
						url: 'controller.php',
						type: 'POST',
						dataType: 'json',
						data: datastring,
						success:function(response){
							var fetchdata = response;
							$('#myModal').modal('hide');
							//var fetchdata=JSON.parse(data);
							$("#productlist").html('');
							$("#productlist").html('<th><input type="checkbox" id="selectAll" value="selectAll"> Select All</th>\
										      <th>ID</th>\
										      <th>Name</th>\
										      <th>Category</th>\
										      <th>Subcategory</th>\
										      <th>Description</th>\
										      <th>Brand</th>\
										      <th colspan="2">Action</th>');
							var arr = $.map( fetchdata, function( obj, i ) {if(obj.brand_name == filterbrand && status == ""){
								  $("#productlist").append('<tr><td><input type="checkbox" name="checkbox[]" value="'+obj.prod_id+'"></td><td>'+obj.prod_id+'</td><td>'+obj.name+'</td><td>'+obj.category_name+'</td><td>'+obj.sub_cat_name+'</td><td>'+obj.product_description+'</td><td>'+obj.brand_name+'</td><td><i class="  fa fa-edit prod-edit" style="font-size:20px;color:black;"></td><td><i class="fa fa-archive prod-delete" style="font-size:20px;color:black;"></td></tr>'); }
								  else if(obj.brand_name == filterbrand && obj.status == status){
								  		$("#productlist").append('<tr><td><input type="checkbox" name="checkbox[]" value="'+obj.prod_id+'"></td><td>'+obj.prod_id+'</td><td>'+obj.name+'</td><td>'+obj.category_name+'</td><td>'+obj.sub_cat_name+'</td><td>'+obj.product_description+'</td><td>'+obj.brand_name+'</td><td><i class="  fa fa-edit prod-edit" style="font-size:20px;color:black;"></td><td><i class="fa fa-archive prod-delete" style="font-size:20px;color:black;"></td></tr>');
								  }
								  else if(filterbrand == "" && obj.status == status){
								  		$("#productlist").append('<tr><td><input type="checkbox" name="checkbox[]" value="'+obj.prod_id+'"></td><td>'+obj.prod_id+'</td><td>'+obj.name+'</td><td>'+obj.category_name+'</td><td>'+obj.sub_cat_name+'</td><td>'+obj.product_description+'</td><td>'+obj.brand_name+'</td><td><i class="  fa fa-edit prod-edit" style="font-size:20px;color:black;"></td><td><i class="fa fa-archive prod-delete" style="font-size:20px;color:black;"></td></tr>');
			 					  }
								  else if(filterbrand == "" && status == ""){
								  		$("#productlist").append('<tr><td><input type="checkbox" name="checkbox[]" value="'+obj.prod_id+'"></td><td>'+obj.prod_id+'</td><td>'+obj.name+'</td><td>'+obj.category_name+'</td><td>'+obj.sub_cat_name+'</td><td>'+obj.product_description+'</td><td>'+obj.brand_name+'</td><td><i class="  fa fa-edit prod-edit" style="font-size:20px;color:black;"></td><td><i class="fa fa-archive prod-delete" style="font-size:20px;color:black;"></td></tr>');
								  }
						    });
						    var pageno=1;
							 var totalpage = Math.ceil((fetchdata.length)/5);
							 $('#pagination-demo').html('');
								while(pageno <= totalpage){
									$('#pagination-demo').append('<li><button class="btn btn-primary btn-sm" value="fil'+pageno+'">'+pageno+'</button></li>');
										pageno++;
								}

								$("#filter_submit").trigger("click");
						}
					});
				});



	$(document).on('click' , '.prod-edit' , function(){
			var editid = $(this).closest("tr").find('td:eq(1)').text();
			var editpname = $(this).closest("tr").find('td:eq(2)').text();
			var cat = $(this).closest("tr").find('td:eq(3)').text();
			var subcat = $(this).closest("tr").find('td:eq(4)').text();
			var pdesc = $(this).closest("tr").find('td:eq(5)').text();
			var brand = $(this).closest("tr").find('td:eq(6)').text();
			var datastring = {"editid" : editid ,"cat" : cat , "subcat" : subcat , "brand" : brand , "editpname" : editpname , "pdesc" : pdesc};
			$.ajax({
				url: 'controller.php?all='+editid,
				type: 'GET',
				success:function(response){
					var res = JSON.parse(response);
					console.log(res);
					//console.log(res[0][0].name);
					/*var arr = $.map( res, function( obj, i ) {
						if(i==0)
						$.map(obj, function(objj,j) {console.log(objj.name);})
						if(i==1)$.map(obj, function(objj,j) {console.log(objj.sub_name);})
					});*/
					
					$('#myModal').modal('show'); 
					$('#editpname').val(editpname);
					$('#editpdesc').val(pdesc);
					$('#editid').val(editid);
					$('#edit_drop_category').html('');
					$('#edit_drop_subcat').html('');
					$('#edit_drop_brand').html('');

		
		
					var cat_arr = $.map( res, function( obj, i ) {$.map(obj , function(objj , j){if(i==0){if(cat==objj.name){
							$("#edit_drop_category").append('<option selected value="'+objj.name+'">'+objj.name+'</option>');
							}
							else{
							$("#edit_drop_category").append('<option value="'+objj.name+'">'+objj.name+'</option>');
							}}
					})});



					var subcat_arr = $.map( res, function( obj, i ) {$.map(obj , function(objj , j){

						if(i==1){if(subcat==objj.sub_name){
							$("#edit_drop_subcat").append('<option selected value="'+objj.sub_name+'">'+objj.sub_name+'</option>');
							}
							else{
							$("#edit_drop_subcat").append('<option value="'+objj.sub_name+'">'+objj.sub_name+'</option>');
							}}
					})});


					var brand_arr = $.map( res, function( obj, i ) {$.map(obj , function(objj , j){if(i==2){if(brand==objj.brand_name){
							$("#edit_drop_brand").append('<option selected value="'+objj.brand_name+'">'+objj.brand_name+'</option>');
							}
							else{
							$("#edit_drop_brand").append('<option value="'+objj.brand_name+'">'+objj.brand_name+'</option>');
							}}
					})});

					

					$('#edit_drop_category').change(function(){
					var selectedCat = $("#edit_drop_category option:selected").val();
					$.ajax({
						url: 'controller.php?selectedCat='+selectedCat,
						type: 'GET',
						success:function(response){
								var data=response;
								var fetchdata=JSON.parse(data);
								$("#edit_drop_subcat").html('');
								$("#edit_drop_subcat").html('<option value="">Choose Subcategory</option>');
								var arr = $.map( fetchdata, function( obj, i ) {$("#edit_drop_subcat").append('<option value="'+obj.name+'">'+obj.name+'</option>'); 
							    });	 
								}
						});
					});


					$('#edit_drop_subcat').change(function(){
					var selectedSubCat = $("#edit_drop_subcat option:selected").val();
					$.ajax({
						url: 'controller.php?selectedSubCat='+selectedSubCat,
						type: 'GET',
						success:function(response){
								var data=response;
								var fetchdata=JSON.parse(data);
								$("#edit_drop_brand").html('');
								$("#edit_drop_brand").html('<option value="">Choose brand</option>');
								var arr = $.map( fetchdata, function( obj, i ) {$("#edit_drop_brand").append('<option value="'+obj.name+'">'+obj.name+'</option>'); 
							    });	 
								}
						});
					});



					
				}
			});

			

	});



});



/*$(document).on('click' , '.prod-edit' , function(){
			var id = $(this).closest("tr").find('td:eq(0)').text();
			var pname = $(this).closest("tr").find('td:eq(1)').text();
			var cat = $(this).closest("tr").find('td:eq(2)').text();
			var subcat = $(this).closest("tr").find('td:eq(3)').text();
			var decr = $(this).closest("tr").find('td:eq(4)').text();
			var brand = $(this).closest("tr").find('td:eq(5)').text();
			//alert(id);
			//console.log(id+pname+cat+subcat+decr+brand);
			$('#myModal').modal('show'); 
			$('#editpname').val(pname);
			$('#editpdesc').val(decr);
			$('#editid').val(id);
			//$('#edit_drop_category').html('<option value="'+cat+'">'+cat+'</option>');
			$('#edit_drop_subcat').html('<option value="'+subcat+'">'+subcat+'</option>');
			$('#edit_drop_brand').html('<option value="'+brand+'">'+brand+'</option>');
			

			
			//$('#edit_drop_category').on('click',function(){
				$.ajax({
					url: 'controller.php?cat=cat',
					type: 'GET',
					success:function(response){
						var data=response;
						var fetchdata=JSON.parse(data);
						$("#edit_drop_category").html('');
						//$('#edit_drop_category').append('<option value="'+cat+'">'+cat+'</option>');
						var arr = $.map( fetchdata, function( obj, i ) {
							if(cat==obj.name){
							$("#edit_drop_category").append('<option selected value="'+obj.name+'">'+obj.name+'</option>');
							}
							else{
							$("#edit_drop_category").append('<option value="'+obj.name+'">'+obj.name+'</option>');
							}
					    });
					}
				});
			//});
			

			$('#edit_drop_category').change(function(){
					var selectedCat = $("#edit_drop_category option:selected").val();
					$.ajax({
						url: 'controller.php?selectedCat='+selectedCat,
						type: 'GET',
						success:function(response){
								var data=response;
								var fetchdata=JSON.parse(data);
								$("#edit_drop_subcat").html('');
								$("#edit_drop_subcat").html('<option value="">Choose Subcategory</option>');
								var arr = $.map( fetchdata, function( obj, i ) {$("#edit_drop_subcat").append('<option value="'+obj.name+'">'+obj.name+'</option>'); 
							    });	 
								}
					});
				});



				$('#edit_drop_subcat').change(function(){
					var selectedSubCat = $("#edit_drop_subcat option:selected").val();
					$.ajax({
						url: 'controller.php?selectedSubCat='+selectedSubCat,
						type: 'GET',
						success:function(response){
								var data=response;
								var fetchdata=JSON.parse(data);
								$("#edit_drop_brand").html('');
								$("#edit_drop_brand").html('<option value="">Choose brand</option>');
								var arr = $.map( fetchdata, function( obj, i ) {$("#edit_drop_brand").append('<option value="'+obj.name+'">'+obj.name+'</option>'); 
							    });	 
								}
					});
				});


});*/






