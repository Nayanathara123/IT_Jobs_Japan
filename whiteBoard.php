<!DOCTYPE html>

<html lang="en">
<head>
  <meta charset="utf-8">

  <title>The HTML5 JS White Board</title>
  <meta name="description" content="The HTML5 JS Whiteboard">
  <meta name="author" content="Test">

  <!-- Latest compiled and minified CSS -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

  <link rel="stylesheet" href="style.css">

</head>

<body>

<div class="toolSection">

  <button id="circle" type="submit" onclick="selectTextBox()">Text Box</button>
  <button id="circle" type="submit" onclick="selectCircle()">Circle</button>
  <button id="line" type="submit" onclick="selectLine()">Line</button>

  <span>Type text to for your drawn rectangle</span>
	<input id="sourceText1" type="text" class="sourceText">
	<button id="save" type="submit" onclick="saveCanvas()">Save</button>
    <br>
</div>

	<canvas id="whiteBoard" width="800" height="1200"></canvas>

	
	
 <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script> -->
 <script type="text/javascript" src="https://code.jquery.com/jquery.min.js"></script> 

 <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

  <script src="whiteboard_canvas.js"></script>
</body>
</html>