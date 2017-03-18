<?php

include("database_api.php");
function bug_get_attachments( $p_bug_id ) {
        $c_bug_id = db_prepare_int( $p_bug_id );

        $t_bug_file_table = db_get_table( 'mantis_bug_file_table' );

        $query = "SELECT id, title, diskfile, filename, filesize, file_type, date_added, user_id
                                FROM $t_bug_file_table
                                WHERE bug_id=" . db_param() . "
                                ORDER BY date_added";
        $db_result = db_query_bound( $query, Array( $c_bug_id ) );
        $num_files = db_num_rows( $db_result );

        $t_result = array();

        for( $i = 0;$i < $num_files;$i++ ) {
                $t_result[] = db_fetch_array( $db_result );
        }

        return $t_result;
}
bug_get_attachments(55);

?>
