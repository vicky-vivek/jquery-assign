<?php
	include_once 'dbConnect.php';
	class controller{

	/*public function __construct(){
			$cat_fetch = $this->cat_fetch();
			$data = json_encode($cat_fetch);
			echo $data;

			//$this->productlist();
		}*/


	public function cat_fetch(){
		try {

            $database = new dbConnect();
         
            $db=$database->openConnection();
            
            $sql = "select name from categories";
            $user = $db-> query($sql);
            
            $result = $user-> fetchAll(PDO::FETCH_ASSOC);
            return $result;            
            $database->closeConnection();
        }
         
        catch (PDOException $e)
         
        {
         
            echo "There is some problem in connection: " . $e->getMessage();
         
        }
	}


	public function addProduct($pname,$category,$sub_cat_name,$brand,$pdesc){
        try {

            $database = new dbConnect();
         
            $db=$database->openConnection();

            $sql = "set @catid = (select id from categories where name ='$category');
                    set @subcatid = (select sub_cat_id from subcategories where name= '$sub_cat_name');
                    set @brandid = (select brand_id from brand where sub_cat_id = @subcatid and cat_id = @catid and name = '$brand');
                    insert into product(name,category_name,sub_cat_name,brand_name,product_description,brand_id,sub_cat_id,cat_id) values('$pname','$category','$sub_cat_name','$brand','$pdesc',@brandid,@subcatid,@catid);";

            $db->exec($sql);
            $database->closeConnection();
            $result = $this->productlist();
            print_r(json_encode($result));
        }
         
        catch (PDOException $e)
         
        {
         
            echo "There is some problem in connection: " . $e->getMessage();
         
        }
    }


    public function productlist($offset){
        try {

            $database = new dbConnect();
         
            $db=$database->openConnection();
            if($offset == ""){
            $sql = "select prod_id, name ,category_name ,sub_cat_name, brand_name , product_description ,status from product where flag = '0' limit 5";
            }else{
             $sql = "select prod_id, name ,category_name ,sub_cat_name, brand_name , product_description , status from product where flag = '0' limit ".$offset.",5 ";   
            }
            //echo $sql;
            
            $user = $db-> query($sql);
            
            $result = $user-> fetchAll(PDO::FETCH_ASSOC);
            return $result;            
            $database->closeConnection();
        }
         
        catch (PDOException $e)
         
        {
         
            echo "There is some problem in connection: " . $e->getMessage();
         
        }
    }



    public function fetch_sub_cat($selectedCat){
        try {

            $database = new dbConnect();
         
            $db=$database->openConnection();
            
            $sql = "select name from subcategories where cat_id = (select id from categories where name = '$selectedCat')";
            $user = $db-> query($sql);
            
            $result = $user-> fetchAll(PDO::FETCH_ASSOC);
            return $result;            
            $database->closeConnection();
        }
         
        catch (PDOException $e)
         
        {
         
            echo "There is some problem in connection: " . $e->getMessage();
         
        }
    }


    public function fetch_brand($selectedSubCat){
        try {

            $database = new dbConnect();
         
            $db=$database->openConnection();
            
            $sql = "select name from brand where sub_cat_id = (select sub_cat_id from subcategories where name = '$selectedSubCat')";
            $user = $db-> query($sql);
            
            $result = $user-> fetchAll(PDO::FETCH_ASSOC);
            return $result;            
            $database->closeConnection();
        }
         
        catch (PDOException $e)
         
        {
         
            echo "There is some problem in connection: " . $e->getMessage();
         
        }
    }
    


    public function catlist(){
        try {

            $database = new dbConnect();
         
            $db=$database->openConnection();
            
            $sql = "select id , name  from categories where flag='0'";
            $user = $db-> query($sql);
            
            $result = $user-> fetchAll(PDO::FETCH_ASSOC);
            return $result;            
            $database->closeConnection();
        }
         
        catch (PDOException $e)
         
        {
         
            echo "There is some problem in connection: " . $e->getMessage();
         
        }
    }


    public function delete_prod($prod_deleteid){
        try {

            $database = new dbConnect();
         
            $db=$database->openConnection();
            
            $sql = "update product set flag = '1' where prod_id ='$prod_deleteid'";
            $db->exec($sql);
            $sql1 = "select prod_id, name ,category_name ,sub_cat_name, brand_name , product_description , status from product where flag = '0'";
            
            $user = $db-> query($sql1);
            
            $result = $user-> fetchAll(PDO::FETCH_ASSOC);
            
            $database->closeConnection();
            print_r(json_encode($result));
            exit();

        }
         
        catch (PDOException $e)
         
        {
         
            echo "There is some problem in connection: " . $e->getMessage();
         
        }
    }


    public function editProduct($editid,$editpname,$category,$sub_cat_name,$brand,$pdesc){
        try {

            $database = new dbConnect();
         
            $db=$database->openConnection();
            
            $sql = "update product set name='$editpname' ,category_name = '$category' ,sub_cat_name = '$sub_cat_name', brand_name = '$brand' , product_description='$pdesc' where prod_id='$editid'";
            $db->exec($sql);
            
           $sql1 = "select prod_id, name ,category_name ,sub_cat_name, brand_name , product_description , status from product where flag = '0'";
            
            $user = $db-> query($sql1);
            
            $result = $user-> fetchAll(PDO::FETCH_ASSOC);
            
            $database->closeConnection();
            print_r(json_encode($result));
            exit();

        }
         
        catch (PDOException $e)
         
        {
         
            echo "There is some problem in connection: " . $e->getMessage();
         
        }
    }


    public function Allitem($editid){
        try {
            
            $database = new dbConnect();
         
            $db=$database->openConnection();
            
           $sql_brand = "select name as brand_name from brand where sub_cat_id = (select sub_cat_id from product where prod_id='$editid')";

            $sql_subcat = "select name as sub_name from subcategories where cat_id = (select cat_id from product where prod_id='$editid')";
           
            $user_brand = $db-> query($sql_brand);
            $user_subcat = $db->query($sql_subcat);
            
            $result_brand = $user_brand-> fetchAll(PDO::FETCH_ASSOC);
            
            $result_subcat = $user_subcat->fetchAll(PDO::FETCH_ASSOC);
           
            $arr2 = $this->cat_fetch();
            $arr = array($arr2,$result_subcat,$result_brand);

            print_r(json_encode($arr));            
                    
            $database->closeConnection();
            exit();
        }
         
        catch (PDOException $e)
         
        {
         
            echo "There is some problem in connection: " . $e->getMessage();
         
        }
    }


    public function editcat($cat_edit , $cat_edit_name){
        try {

            $database = new dbConnect();
         
            $db=$database->openConnection();
            
            $sql = "update categories set name='$cat_edit_name' where id = '$cat_edit'";
            $db->exec($sql);
            
            $database->closeConnection();

            $result = $this->catlist();
            print_r(json_encode($result));
            exit();

        }
         
        catch (PDOException $e)
         
        {
         
            echo "There is some problem in connection: " . $e->getMessage();
         
        }
    }


    public function subcatlist(){
        try {

            $database = new dbConnect();
         
            $db=$database->openConnection();
            
            $sql = "select sub_cat_id as id , c.name as category_name , s.name as subcat_name FROM subcategories as s  join categories as c on(id=cat_id) where s.flag = 0";
            $user = $db-> query($sql);
            
            $result = $user-> fetchAll(PDO::FETCH_ASSOC);
            return $result;            
            $database->closeConnection();
        }
         
        catch (PDOException $e)
         
        {
         
            echo "There is some problem in connection: " . $e->getMessage();
         
        }
    }


    public function brandcatlist(){
        try {

            $database = new dbConnect();
         
            $db=$database->openConnection();
            
            $sql = "select brand_id , name , sub_name , brand_name from categories join (SELECT brand_id , b.name as brand_name ,s.name as sub_name, b.cat_id as catid  FROM `brand` as b join subcategories as s on(b.sub_cat_id = s.sub_cat_id) where b.flag = 0) as t on(id=catid)";
            $user = $db-> query($sql);
            
            $result = $user-> fetchAll(PDO::FETCH_ASSOC);
            return $result;            
            $database->closeConnection();
        }
         
        catch (PDOException $e)
         
        {
         
            echo "There is some problem in connection: " . $e->getMessage();
         
        }
    }


    public function editsubcat($subcat_edit_name , $subcat_edit_id){
        try {

            $database = new dbConnect();
         
            $db=$database->openConnection();
            
            $sql = "update subcategories set name='$subcat_edit_name' where sub_cat_id = '$subcat_edit_id'";
            //echo $sql;
            //exit();
            $db->exec($sql);
            
            $database->closeConnection();

            $result = $this->subcatlist();
            print_r(json_encode($result));
            exit();

        }
         
        catch (PDOException $e)
         
        {
         
            echo "There is some problem in connection: " . $e->getMessage();
         
        }
    }


    public function editbrand($edit_brand_name , $edit_brand_id){
        try {

            $database = new dbConnect();
         
            $db=$database->openConnection();
            
            $sql = "update brand set name='$edit_brand_name' where brand_id = '$edit_brand_id'";
            //echo $sql;
            //exit();
            $db->exec($sql);
            
            $database->closeConnection();

            $result = $this->brandcatlist();
            print_r(json_encode($result));
            exit();

        }
         
        catch (PDOException $e)
         
        {
         
            echo "There is some problem in connection: " . $e->getMessage();
         
        }
    }


    public function delete_subcat($sub_cat_deleteid){
        try {

            $database = new dbConnect();
         
            $db=$database->openConnection();
            
            $sql = "update subcategories set flag = '1' where sub_cat_id ='$sub_cat_deleteid'";
            $db->exec($sql);
            $database->closeConnection();
            $result = $this->subcatlist();
            print_r(json_encode($result));
            exit();

        }
         
        catch (PDOException $e)
         
        {
         
            echo "There is some problem in connection: " . $e->getMessage();
         
        }
    }


    public function delete_brand($brand_deleteid){
        try {

            $database = new dbConnect();
         
            $db=$database->openConnection();
            
            $sql = "update brand set flag = '1' where brand_id ='$brand_deleteid'";
            $db->exec($sql);
            $database->closeConnection();
            $result = $this->brandcatlist();
            print_r(json_encode($result));
            exit();

        }
         
        catch (PDOException $e)
         
        {
         
            echo "There is some problem in connection: " . $e->getMessage();
         
        }
    }


    public function deletecat($cat_deleteid){
        try {

            $database = new dbConnect();
         
            $db=$database->openConnection();
            
            $sql = "update categories set flag = '1' where id ='$cat_deleteid'";
            $db->exec($sql);
            $database->closeConnection();
            $result = $this->catlist();
            print_r(json_encode($result));
            exit();

        }
         
        catch (PDOException $e)
         
        {
         
            echo "There is some problem in connection: " . $e->getMessage();
         
        }
    }


    public function filtersearch($catfiltername , $subcatfiltername){
        try {

            $database = new dbConnect();
         
            $db=$database->openConnection();
            if($subcatfiltername != ""){

            $sql = "select brand_id , name , sub_name , brand_name from categories join (SELECT brand_id , b.name as brand_name ,s.name as sub_name, b.cat_id as catid  FROM `brand` as b join subcategories as s on(b.sub_cat_id = s.sub_cat_id) where b.flag = 0) as t on(id=catid) where name='$catfiltername' and sub_name='$subcatfiltername'";
            }else {
                $sql = "select brand_id , name , sub_name , brand_name from categories join (SELECT brand_id , b.name as brand_name ,s.name as sub_name, b.cat_id as catid  FROM `brand` as b join subcategories as s on(b.sub_cat_id = s.sub_cat_id) where b.flag = 0) as t on(id=catid) where name='$catfiltername'";

            }

            $user = $db-> query($sql);
            
            $result = $user-> fetchAll(PDO::FETCH_ASSOC);
            print_r(json_encode($result));            
            $database->closeConnection();
        }
         
        catch (PDOException $e)
         
        {
         
            echo "There is some problem in connection: " . $e->getMessage();
         
        }
    }

    public function brand_filter(){
        try {

            $database = new dbConnect();
         
            $db=$database->openConnection();
            
            $sql = "SELECT distinct(name) FROM brand ";
            $user = $db-> query($sql);
            
            $result = $user-> fetchAll(PDO::FETCH_ASSOC);
            print_r(json_encode($result));            
            $database->closeConnection();
            exit();

        }
         
        catch (PDOException $e)
         
        {
         
            echo "There is some problem in connection: " . $e->getMessage();
         
        }
    }

    public function filtersearchbrand($filterbrand , $status ){
        try {

            $database = new dbConnect();
         
            $db=$database->openConnection();

            if($status != "" && $filterbrand != ""){

            $sql = "select count(prod_id) as count from product where flag = '0' and brand_name = '$filterbrand' and status='$status'  ";
            $sql1 = "select prod_id, name ,category_name ,sub_cat_name, brand_name , product_description from product where flag = '0' and brand_name = '$filterbrand' and status='$status' limit 5 ";
            }else if($filterbrand == "" && $status != ""){
                
                $sql = "select count(prod_id) as count from product where flag = '0' and status = '$status' ";
                $sql1 = "select prod_id, name ,category_name ,sub_cat_name, brand_name , product_description from product where flag = '0' and status = '$status' limit 5";
            }
            else if($filterbrand != "" && $status == "") {
                
                $sql = "select count(prod_id) as count from product where flag = '0' and brand_name = '$filterbrand' ";
                $sql1 = "select prod_id, name ,category_name ,sub_cat_name, brand_name , product_description from product where flag = '0' and brand_name = '$filterbrand' limit 5";

            }else{
                
                $sql = "select count(prod_id) as count from product where flag = '0'";
                $sql1 = "select prod_id, name ,category_name ,sub_cat_name, brand_name , product_description from product where flag = '0' limit 5";
            }

            
            //echo $sql1."   ".$sql;
            //exit();
            $user = $db-> query($sql);
            $user1 = $db-> query($sql1);

            $result = $user-> fetchAll(PDO::FETCH_ASSOC);
            $result1 = $user1-> fetchAll(PDO::FETCH_ASSOC);
            $arr = array($result , $result1);
            print_r(json_encode($arr));            
            
            $database->closeConnection();
        }
         
        catch (PDOException $e)
         
        {
         
            echo "There is some problem in connection: " . $e->getMessage();
         
        }
    }


    public function action($action , $input){
        try {

            $action_id = implode(",", $input);
            $database = new dbConnect();
         
            $db=$database->openConnection();
            if($action == "delete"){

            $sql = "update product set flag = '1' where prod_id in ($action_id)";
            }else if($action == '1') {
                $sql = "update product set status = '1' where prod_id in ($action_id)";

            }else if($action == '0'){
                $sql = "update product set status = '0' where prod_id in ($action_id)";
            }

            //echo $sql;
            //exit();

            $user = $db-> query($sql);
            
            $result = $this->productlist(); 
            print_r(json_encode($result));            
            $database->closeConnection();
            exit();
        }
         
        catch (PDOException $e)
         
        {
         
            echo "There is some problem in connection: " . $e->getMessage();
         
        }
    }


    public function pagination($count){
        try {

            
            $database = new dbConnect();
         
            $db=$database->openConnection();
            if($count == ""){
            $sql = "select ceiling(count(prod_id)/5) as count from product where flag ='0'";
            }else{
              $sql = "";  
            }

            $user = $db-> query($sql);
            $result = $user-> fetchAll(PDO::FETCH_ASSOC);
            //print_r( $result);
            print_r(json_encode($result));            
            $database->closeConnection();
            exit();
        }
         
        catch (PDOException $e)
         
        {
         
            echo "There is some problem in connection: " . $e->getMessage();
         
        }
    }

    public function filtersearchoffset($filterbrand , $status , $offset){
        try {
            if($offset == 1){
                $offset =0;
            }

            $database = new dbConnect();
         
            $db=$database->openConnection();

            if($status != "" && $filterbrand != ""){

            $sql = "select prod_id, name ,category_name ,sub_cat_name, brand_name , product_description from product where flag = '0' and brand_name = '$filterbrand' and status='$status' limit ".$offset." , 5 ";
            }else if($filterbrand == "" && $status != ""){
                
                $sql = "select prod_id, name ,category_name ,sub_cat_name, brand_name , product_description from product where flag = '0' and status = '$status' limit ".$offset." , 5 ";
            }
            else if($filterbrand != "" && $status == "") {
                
                $sql = "select prod_id, name ,category_name ,sub_cat_name, brand_name , product_description from product where flag = '0' and brand_name = '$filterbrand' limit ".$offset." , 5 ";

            }else{
                
                $sql = "select prod_id, name ,category_name ,sub_cat_name, brand_name , product_description from product where flag = '0' limit ".$offset." , 5 ";
            }

            //echo $sql;
            //exit();
            $user = $db-> query($sql);

            $result = $user-> fetchAll(PDO::FETCH_ASSOC);
            print_r(json_encode($result));            
            $database->closeConnection();
        }
         
        catch (PDOException $e)
         
        {
         
            echo "There is some problem in connection: " . $e->getMessage();
         
        }
    }

    
    
}

$obj = new controller();

//print_r($_POST);exit;

	$pname = $_POST['pname'];
    $category = $_POST['cat'];
    $sub_cat_name = $_POST['subcat'];
    $brand = $_POST['brand'];
    $pdesc = $_POST['pdesc'];
    $editid = $_POST['editid'];
    $editpname = $_POST['editpname'];
    $selectedCat = $_GET['selectedCat'];
    $selectedSubCat = $_GET['selectedSubCat'];
    $prodlist = $_GET['prodlist'];
    $cat = $_GET['cat'];
    $catlist = $_GET['catlist'];
    $subcatlist = $_GET['subcatlist'];
    $brandcatlist = $_GET['brandcatlist'];
    $prod_deleteid = $_GET['prod-deleteid'];
    $cat_edit = $_POST['editcatid'];
    $subcat_edit_name = $_POST['editsubcatname'];
    $subcat_edit_id = $_POST['editsubcatid'];
    $edit_brand_name = $_POST['editbrandname'];
    $edit_brand_id = $_POST['editbrandid'];
    $cat_edit_name = $_POST['editcatname'];
    $all = $_GET['all'];
    $sub_cat_deleteid = $_GET['subcat-deleteid'];
    $brand_deleteid = $_GET['brand-deleteid'];
    $cat_deleteid = $_GET['cat-deleteid'];
    $catfiltername = $_POST['catfiltername'];
    $subcatfiltername = $_POST['subcatfiltername'];
    $brand_filter = $_GET['brand_filter'];
    $filterbrand = $_POST['filterbrand'];
    $status = $_POST['status'];
    $action = $_POST['action'];
    $input = json_decode($_POST['input']);
    $page = $_GET['page'];
    $offset = $_POST['offset'];
    
    

    if($page == "page"){
        $obj->pagination();
    }

    if(isset($action)){
        //print_r($input);
        $obj->action($action , $input);
    }

    if(isset($filterbrand) && empty($offset)){
        //echo "ss".$status.$offset;
        $obj->filtersearchbrand($filterbrand , $status);
    }

    if(isset($filterbrand) && isset($status) && isset($offset)){
        //echo "ddd". $filterbrand . $status . $offset;
        $obj->filtersearchoffset($filterbrand , $status , $offset);
    }

    if($brand_filter == "brand_filter"){
        $obj->brand_filter();
    }

    if(isset($catfiltername)){
        $obj->filtersearch($catfiltername , $subcatfiltername);
    }

    if(isset($all)){
        $obj->Allitem($all);
    }

    if(isset($sub_cat_deleteid)){
        $obj->delete_subcat($sub_cat_deleteid);
    }

    if(isset($brand_deleteid)){
        $obj->delete_brand($brand_deleteid);
    }

    if(isset($cat_edit)){
        $obj->editcat($cat_edit , $cat_edit_name);
    }

    if(isset($cat_deleteid)){
        $obj->deletecat($cat_deleteid);
    }

    if(isset($subcat_edit_id)){
        $obj->editsubcat($subcat_edit_name , $subcat_edit_id);
    }

    if(isset($edit_brand_id)){
        $obj->editbrand($edit_brand_name , $edit_brand_id);
    }


    if(isset($pname)){
	$obj->addProduct($pname,$category,$sub_cat_name,$brand,$pdesc);
    }

    if(isset($editpname)){
    $obj->editProduct($editid,$editpname,$category,$sub_cat_name,$brand,$pdesc);
    }
	


	if(isset($selectedCat)){
    	$sub_cat = $obj->fetch_sub_cat($selectedCat);
    	$data = json_encode($sub_cat);
		echo $data;
    }

    if(isset($selectedSubCat)){
        $brand = $obj->fetch_brand($selectedSubCat);
        $data = json_encode($brand);
        echo $data;
    }

    if(isset($prod_deleteid)){
        $obj->delete_prod($prod_deleteid);
    }
    

    if(isset($editid)){
        $obj->edit_prod($editid);
    }

    if($cat == 'cat'){
       $cat_fetch = $obj->cat_fetch();
       $data = json_encode($cat_fetch);
       echo $data; 
    }

    if($prodlist == 'prodlist'){
    $prod_list = $obj->productlist($offset);
	$data = json_encode($prod_list);
	echo $data;
	}


    if($catlist == 'catlist'){
    $cat_list = $obj->catlist();
    $data = json_encode($cat_list);
    echo $data;
    }

    if($subcatlist == 'subcatlist'){
    $subcat_list = $obj->subcatlist();
    $data = json_encode($subcat_list);
    echo $data;
    }

    if($brandcatlist == 'brandcatlist'){
    $brandcat_list = $obj->brandcatlist();
    $data = json_encode($brandcat_list);
    echo $data;
    }


?>



