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

<div class="toolSection" id="toolSection">

    <button id="freeTool" type="submit" onclick="drawFreeTool()">Free Draw Tool</button>
    <button id="red" class="color">Red</button>
    <button id="green" class="color">Green</button>
    <button id="blue" class="color">Blue</button>
    <button id="black" class="color">Black</button>
    <button id="darkgrey" class="color">darkgrey</button>
    <button id="grey" class="color">grey</button>
    <button id="lightgrey" class="color">lightgrey</button>
    <textarea name="backup" id="backup" cols="60" rows="10" style="display: none;"></textarea>   
    <p id="redraw-count" style="display: none;">0</p>
    <button id="clear" style="display: none;">Clear canvas</button>
    <button id="save" style="display: none;">Save canvas</button>
    <button id="restore" style="display: none;">Restore canvas</button>
    <button id="bucket" style="display: none;">Bucket</button> 
    <button id="disable" style="display: none;">Disable</button>
    <button id="enable" style="display: none;">Enable</button> 
    <button id="undo" style="display: none;">Undo</button>
    <button id="redo" style="display: none;">Redo</button> 
    <input id="tolerance" type="text" style="display: none;"/>

    </br></br>



  <button id="circle" type="submit" onclick="selectTextBox()">Text Box</button>
  <button id="circle" type="submit" onclick="selectCircle()">Circle</button>
  <button id="line" type="submit" onclick="selectLine()">Line</button>

  <!-- <span>Type text to for your drawn rectangle</span> -->
	<input id="sourceText1" type="text" class="sourceText" style="display: none;">
	<button id="save" type="submit" onclick="saveCanvas()">Save Your Work</button>
    <br>
</div>

<div class="wrapper">
  <input type="text" id="canvas_text2" style="position:absolute; left=?; top=?;" />
  <canvas id="whiteBoard2" width="800" height="1200"></canvas>

	<canvas id="whiteBoard" width="800" height="1200"></canvas>
  <input type="text" id="canvas_text" style="position:absolute; left=?; top=?;" />
</div>
	
	
 <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script> -->
 <script type="text/javascript" src="https://code.jquery.com/jquery.min.js"></script> 

 <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

 <script src="whiteboard_canvas.js"></script>

 <script src="canvas-free-drawing.js"></script>

  <script>

    function drawFreeTool(){

      freeDrawTool = true; 
      drawLineCheck = false;
      drawCircleCheck = false;

      const cfd = new CanvasFreeDrawing.default({
        elementId: 'whiteBoard',
        width: 500,
        height: 500,
        showWarnings: true,
      });
      const redrawCount = document.getElementById('redraw-count');
      cfd.on({ event: 'redraw', counter: 0 }, () => {
        redrawCount.innerText = parseInt(redrawCount.innerText) + 1;
      });
      const textarea = document.getElementById('backup');
      document
        .getElementById('clear')
        .addEventListener('click', () => cfd.clear());
      document
        .getElementById('disable')
        .addEventListener('click', () => cfd.disableDrawingMode());
      document
        .getElementById('enable')
        .addEventListener('click', () => cfd.enableDrawingMode());
      document.getElementById('save').addEventListener('click', () => {
        textarea.value = cfd.save();
      });
      document.getElementById('restore').addEventListener('click', () => {
        cfd.restore(textarea.value);
      });
      document.getElementById('undo').addEventListener('click', () => cfd.undo());
      document.getElementById('redo').addEventListener('click', () => cfd.redo());
      document.getElementById('bucket').addEventListener('click', () => {
        cfd.configBucketTool({
          tolerance: document.getElementById('tolerance').value,
        });
        const isActive = cfd.toggleBucketTool();
        document.getElementById('bucket').classList.add('active');
        if (isActive) {
        } else {
          document.getElementById('bucket').classList.remove('active');
        }
      });
      document
        .getElementById('red')
        .addEventListener('click', () => cfd.setDrawingColor([255, 0, 0]));
      document
        .getElementById('green')
        .addEventListener('click', () => cfd.setDrawingColor([0, 255, 0]));
      document
        .getElementById('blue')
        .addEventListener('click', () => cfd.setDrawingColor([0, 0, 255]));
      document
        .getElementById('black')
        .addEventListener('click', () => cfd.setDrawingColor([0, 0, 0]));
      document
        .getElementById('darkgrey')
        .addEventListener('click', () => cfd.setDrawingColor([50, 50, 50]));
      document
        .getElementById('grey')
        .addEventListener('click', () => cfd.setDrawingColor([100, 100, 100]));
      document
        .getElementById('lightgrey')
        .addEventListener('click', () => cfd.setDrawingColor([150, 150, 150]));

    }
  </script>
  
</body>
</html>