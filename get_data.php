<?php
	include 'database.php';

	// echo $_POST['rectX'];
	// echo $_POST['rectY'];
	// echo $_POST['rectWidth'];
	// echo $_POST['rectHeight'];
	// echo $_POST['rectText'];

	$sql = "SELECT * FROM textboxcontent order by Id desc limit 1";
	$result = $conn->query($sql);

	if ($result->num_rows > 0) {
	  // output data of each row
	  while($row = $result->fetch_assoc()) {
	     echo  $row["RectX"]. "&&&" . $row["RectY"]. "&&&" . $row["RectWidth"]. "&&&". $row["RectHeight"]. "&&&". $row["RectText"];
	  }
	} else {
	  echo "0 results";
	}

	mysqli_close($conn);
?>

