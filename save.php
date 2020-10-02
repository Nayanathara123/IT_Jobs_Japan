<?php
	include 'database.php';

	$RectX=$_POST['rectX'];
	$RectY=$_POST['rectY'];
	$RectWidth=$_POST['rectWidth']; 
	$RectHeight=$_POST['rectHeight'];
	$RectText=$_POST['rectText'];

	// echo $_POST['rectX'];
	// echo $_POST['rectY'];
	// echo $_POST['rectWidth'];
	// echo $_POST['rectHeight'];
	// echo $_POST['rectText'];

	$sql = "INSERT INTO TextBoxContent (RectX, RectY, RectWidth, RectHeight, RectText) 
	VALUES ('$RectX','$RectY','$RectWidth','$RectHeight','$RectText')";

	if (mysqli_query($conn, $sql)) {
		echo json_encode(array("statusCode"=>200));
	} 
	else {
		echo json_encode(array("statusCode"=>201));
	}
	mysqli_close($conn);
?>
 