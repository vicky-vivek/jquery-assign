<?php  

include_once 'dbConnect.php';

 
class dbFunction{ 
   
  


    public function ajaxDeleteTeacher($ajaxDeleteId){
       try {
         
            $database = new dbConnect();
         
            $db=$database->openConnection();
            
            $sql = "update teacherdetails set deleteflag = 1 where id = '$ajaxDeleteId'";

            $db->exec($sql);
            header('location:single.php');
            //echo"fine";
            
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
            
            $sql = "insert into product(name,category_name,sub_cat_name,brand_name,product_description) values('$pname','$category','$sub_cat_name','$brand','$pdesc')";

            $db->exec($sql);
            
            $database->closeConnection();
        }
         
        catch (PDOException $e)
         
        {
         
            echo "There is some problem in connection: " . $e->getMessage();
         
        }
    }

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


    public function productlist(){
        try {

            $database = new dbConnect();
         
            $db=$database->openConnection();
            
            $sql = "select * from product";
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


}



?>