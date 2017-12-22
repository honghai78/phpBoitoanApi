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

    function CallAPI($method, $url, $data = false)
    {
        // Get cURL resource
        $curl = curl_init();
// Set some options - we are passing in a useragent too here
        curl_setopt_array($curl, array(
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_URL => 'http://api.lichvansu.net:8080/get-name',
            CURLOPT_USERAGENT => 'Codular Sample cURL Request',
            CURLOPT_POST => 1,
            CURLOPT_POSTFIELDS => array(
                cmd => 'YNT',
                name => 'h'
            )
        ));
// Send the request & save response to $resp
        $resp = curl_exec($curl);
// Close request to clear up some resources
        curl_close($curl);
        return $resp;
    }
} ?>
