<?php

include('./systemConfig.php');

class AppVersion
{
    private $dbReference;
    var $dbConnect;
    var $result;

    /**
     *
     */
    function __construct()
    {

    }

    function __destruct()
    {

    }
    function getAllVersion()
    {
        $this->dbReference = new systemConfig();
        $this->dbConnect = $this->dbReference->connectDB();
        if ($this->dbConnect == NULL) {
            $this->dbReference->sendResponse(503, '{"error_message":' . $this->dbReference->getStatusCodeMessage(503) . '}');
        } else {
            $version = $_POST['app_version'];
            if($version!=null){
                //todo
                $sql = "SELECT * FROM AppVersion";
                $this->result = $this->dbConnect->query($sql);
                if($this->result->num_rows > 0){
                    $resultSet = array();
                    while($row = $this->result->fetch_assoc()) {
                        $resultSet[] = $row;
                    }
                    $this->dbReference->sendResponse(200,json_encode($resultSet, JSON_UNESCAPED_UNICODE));
                }
                else{
                    $this->dbReference->sendResponse(200,'{"items":null}');
                }
            }else{
                $sql = "SELECT * FROM AppVersion";
                $this->result = $this->dbConnect->query($sql);
                if($this->result->num_rows > 0){
                    $resultSet = array();
                    while($row = $this->result->fetch_assoc()) {
                        $resultSet[] = $row;
                    }
                    $this->dbReference->sendResponse(200,json_encode($resultSet, JSON_UNESCAPED_UNICODE));
                }
                else{
                    $this->dbReference->sendResponse(200,'{"items":null}');
                }
            }
        }
    }
} ?>