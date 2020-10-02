<!DOCTYPE html>

<html lang="en">
<head>
  <meta charset="utf-8">

  <title>The HTML5 JS White Board</title>
  <meta name="description" content="The HTML5 JS Whiteboard">
  <meta name="author" content="Test">

  <link rel="stylesheet" href="style.css">

</head>

<body>

<div class="toolSection">
  <span>Type text to for your drawn rectangle</span>
	<input id="sourceText1" type="text" class="sourceText">
	<button id="save" type="submit" onclick="saveCanvas()">Save</button>
    <br>
</div>

	<canvas id="whiteBoard" width="800" height="1200"></canvas>

	

	

 <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js" integrity="sha512-bLT0Qm9VnAYZDflyKcBaQ2gg0hSYNQrJ8RilYldYQ1FxQYoCLtUjuuRuZo+fjqhx/qtq/1itJ0C2ejDxltZVFg==" crossorigin="anonymous"></script>

  <script src="whiteboard_canvas.js"></script>
</body>
</html>