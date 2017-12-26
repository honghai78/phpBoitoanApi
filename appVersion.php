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
        $this->dbReference = new systemConfig();
        $this->dbConnect = $this->dbReference->connectDB();
    }

    function __destruct()
    {

    }

    function getAllVersion()
    {
        if ($this->dbConnect == NULL) {
            $this->dbReference->sendResponse(503, '{"error_message":' . $this->dbReference->getStatusCodeMessage(503) . '}');
        } else {
            $version = $_POST['app_version'];
            if ($version != null) {
                //todo
                $sql = "SELECT * FROM AppVersion";
                $this->result = $this->dbConnect->query($sql);
                if ($this->result->num_rows > 0) {
                    $resultSet = array();
                    while ($row = $this->result->fetch_assoc()) {
                        $resultSet[] = $row;
                    }
                    $this->dbReference->sendResponse(200, json_encode($resultSet, JSON_UNESCAPED_UNICODE));
                } else {
                    $this->dbReference->sendResponse(200, '{"items":null}');
                }
            } else {
                $sql = "SELECT * FROM AppVersion";
                $this->result = $this->dbConnect->query($sql);
                if ($this->result->num_rows > 0) {
                    $resultSet = array();
                    while ($row = $this->result->fetch_assoc()) {
                        $resultSet[] = $row;
                    }
                    $this->dbReference->sendResponse(200, json_encode($resultSet, JSON_UNESCAPED_UNICODE));
                } else {
                    $this->dbReference->sendResponse(200, '{"items":null}');
                }
            }
        }
    }

    // Method: POST, PUT, GET etc
// Data: array("param" => "value") ==> index.php?param=value

//    function CallAPI($method, $url, $data = false)
//    {
//        $curl = curl_init();
//        curl_setopt($curl, CURLOPT_URL, $url);
//        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
//        curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/x-www-form-urlencoded'));
//        curl_setopt($curl, CURLOPT_HEADER, 1);
//        curl_setopt($curl, CURLOPT_HTTPGET, 1);
//        curl_setopt($curl, CURLOPT_DNS_USE_GLOBAL_CACHE, false );
//        curl_setopt($curl, CURLOPT_DNS_CACHE_TIMEOUT, 2 );
//        curl_setopt($curl, CURLOPT_IPRESOLVE, CURL_IPRESOLVE_V4 );
//        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
//        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST,  0);
//        switch ($method)
//        {
//            case "POST":
//                curl_setopt($curl, CURLOPT_POST, count($data));
//
//                if ($data)
//                    curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
//                break;
//            case "PUT":
//                curl_setopt($curl, CURLOPT_PUT, 1);
//                break;
//            default:
//                if ($data)
//                    $url = sprintf("%s?%s", $url, http_build_query($data));
//        }
//
////        // Optional Authentication:
////        curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
////        curl_setopt($curl, CURLOPT_USERPWD, "username:password");
//
//        $result = curl_exec($curl);
//        if($result === false)
//        {
//            echo 'Curl error: ' . curl_error($curl);
//        }
//        else
//        {
//            echo 'Operation completed without any errors';
//        }
//        curl_close($curl);
//        $this->dbReference->sendResponse(200, $result);
//    }
} ?>
