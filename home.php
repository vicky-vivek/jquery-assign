<html>
<head>
	<title></title>
	   <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
     
      <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
     <!--  <script src="https://cdnjs.cloudflare.com/ajax/libs/twbs-pagination/1.4.1/jquery.twbsPagination.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/twbs-pagination/1.4.1/jquery.twbsPagination.min.js"></script> -->
      <link rel="stylesheet" type="text/css" href="styles.css">
      <!-- <script src="https://code.jquery.com/jquery-1.12.4.js"></script> -->
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
      <script src="app.js"></script>
    
</head>
<body>
	<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="home.php">Home</a>
  
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" href="subcatlist.php">Subcategories</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="brandlist.php">Brands</a>
      </li>
    </ul>
  </div>
</nav>

<div class="row">
  <div class="col-sm-6 well">
    <h3 class="text-center">Add Product</h3>
    <form method="POST" action="" id="pform">
      <div class="form-group">
        <select id="drop_category" class="form-control">
          <option value="">Choose Category</option>
        </select>
        <p id="Errdrop_category"></p>
      </div>

      <div class="form-group">
        <select id="drop_subcat" class="form-control">
          <option value="">Choose Subcategory</option>
        </select>
        <p id="Errdrop_sub_cat"></p>
      </div>

      <div class="form-group">
        <select id="drop_brand" class="form-control">
          <option value="">Choose Brand</option>
        </select>
        <p id="Errdrop_brand"></p>
      </div>

      <div class="form-group">
        <div class="row">
          <div class="col-sm-4">
            <label>Product  Name</label>
          </div>
          <div class="col-sm-8">
            <input type="text" id="pname" name="pname" class="form-control">
            <p id="Errpname"></p>
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="row">
          <div class="col-sm-4">
            <label>Product  Description</label>
          </div>
          <div class="col-sm-8">
            <input type="text" id="pdesc" name="pdesc" class="form-control">
            <p id="Errpdesc"></p>
          </div>
        </div>
      </div>

      <div class="form-group">
        <button id="submit" class="btn btn-sm btn-primary">Submit</button>
      </div>
    </form>
  </div>

  <div class="col-sm-6 text-center">
    <h3>Categories</h3>
    <table class="table table-stripped" align="center" id="cat_list">
      <th>Id</th>
      <th>Name</th>
      <th colspan="2">Action</th>
    </table>
  </div>
</div>


<div class="row">
  <div class="col-sm-12">
  <form method="POST" action="" >
      <div class="row">
        <div class="col-sm-4">
          <div class="form-group">
            <select id="drop_filter_brand" class="form-control">
              <option value="">Choose brand</option>
            </select>
          </div>
        </div>  

      
      <div class="col-sm-4">
        <div class="form-group">
            <select id="status" class="form-control">
              <option value="">Choose Status</option>
              <option value="1">Approve</option>
              <option value="0">Disapprove</option>
            </select>
        </div>
      </div>  

      <div class="col-sm-4">
        <div class="form-group">
          <button id="filter_submit" class="btn btn-sm btn-primary">Search</button>
        </div>
      </div>
    </div>    
    </form>
</div>
</div>


<div class="row">
  <div class="col-sm-8 text-center">
    <h2>Product List</h2>
  </div>
  <div class="col-sm-4">   
    <div class="form-group">
        <select id="action" class="form-control">
          <option value="">Choose Action</option>
          <option value="delete">Delete</option>
          <option value="1">Approve</option>
          <option value="0">Disapprove</option>
        </select>
    </div> 
  </div>  
</div>
   
<div class="row">  
  <div class="col-sm-12 text-center">
    <table class="table table-stripped"  id="productlist">
      <th><input type="checkbox" id="selectAll" value="selectAll"> Select All</th>
      <th>ID</th>
      <th>Name</th>
      <th>Category</th>
      <th>Subcategory</th>
      <th>Description</th>
      <th>Brand</th>
      <th colspan="2">Action</th>
    </table>
  </div>
</div>

<div class="row">  
  <div class="wrapper">
    <div class="container"> 
      <div class="row">
        <div class="col-sm-12">
          <ul id="pagination-demo" class="pagination-sm">
      
          </ul>
        </div>
      </div>
    </div>
  </div>  
</div>




<!-- Modal goes here -->

<div class="modal fade" id="myModal">
  <div class="modal-dialog">
    <div class="modal-content">
    
      <!-- Modal Header -->
      <div class="modal-header">
        <h4 class="modal-title">Edit Details</h4>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>
      
      <!-- Modal body -->
      <div class="modal-body">
        <form method="POST" action="">
      <div class="form-group">
        <select id="edit_drop_category" class="form-control">
          <option value="">Choose Category</option>
        </select>
      </div>

      <div class="form-group">
        <select id="edit_drop_subcat" class="form-control">
          <option value="">Choose Subcategory</option>
        </select>
      </div>

      <div class="form-group">
        <select id="edit_drop_brand" class="form-control">
          <option value="">Choose Brand</option>
        </select>
      </div>

      <div class="form-group">
        <div class="row">
          <div class="col-sm-4">
            <label>Product  Name</label>
          </div>
          <div class="col-sm-8">
            <input type="text" id="editpname" name="pname" class="form-control">
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="row">
          <div class="col-sm-4">
            <label>Product  Description</label>
          </div>
          <div class="col-sm-8">
            <input type="text" id="editpdesc" name="pdesc" class="form-control">
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="row">
          <div class="col-sm-12 text-center">
              <input type="hidden" name="editid" id="editid" value="">
          </div>
        </div>
      </div>

      <div class="form-group">
        <button id="editsubmit" class="btn btn-sm btn-primary">Submit</button>
      </div>
    </form>


      </div>
      
      <!-- Modal footer -->
     <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
     </div>
    </div>
   </div>
</div>


<!-- Modal ends here -->


<!-- Modal goes here -->

<div class="modal fade" id="mycatModal">
  <div class="modal-dialog">
    <div class="modal-content">
    
      <!-- Modal Header -->
      <div class="modal-header">
        <h4 class="modal-title">Edit Details</h4>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>
      
      <!-- Modal body -->
      <div class="modal-body">
        <form method="POST" action="">
      
      <div class="form-group">
        <div class="row">
          <div class="col-sm-4">
            <label>Category  Name</label>
          </div>
          <div class="col-sm-8">
            <input type="text" id="editcatname" name="editcatname" class="form-control">
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="row">
          <div class="col-sm-12 text-center">
              <input type="hidden" name="edicattid" id="editcatid" value="">
          </div>
        </div>
      </div>

      <div class="form-group">
        <button id="editcatsubmit" class="btn btn-sm btn-primary">Submit</button>
      </div>
    </form>


      </div>
      
      <!-- Modal footer -->
     <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
     </div>
    </div>
   </div>
</div>


<!-- Modal ends here -->




</body>
</html>
