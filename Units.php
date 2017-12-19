<?php

class Units
{
    public static function debug_to_console($key, $data)
    {
        $output = $data;
        if (is_array($output))
            $output = implode(',', $output);

        echo "<script>
console.log('$key','$output');
</script>";
    }
}

?>