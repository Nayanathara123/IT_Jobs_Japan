
// setTimeout(function() {
//   location.reload();
// }, 8000);


var canvas = document.getElementById('whiteBoardMgr'),
    ctx = canvas.getContext('2d'),
    rect = {},
    drag = false;

   var rectText = "";

// window.onload = function() {

//   get_TextBox_data();
  
//   setTimeout(draw_rectangle, 1000);
  
// };


// function get_TextBox_data(){

// 	//alert("Get");

// 	$.ajax ({
// 		type: "get",
//         url: "get_data.php",
//         data: { },
//         success: function( result ) {

//         	var rectData = result.split("&&&");

//         	rect.startX = rectData[0];
//         	rect.startY = rectData[1];
//         	rect.w = rectData[2];
//         	rect.h = rectData[3];
//         	rectText = rectData[4];
//             //alert(rect.startX + rect.startY + rect.w + rect.h + rectText);

//         }
//     });
// }

// function draw_rectangle() {
	
// 	//alert(rectText);
// 	ctx.setLineDash([6]);
//     ctx.strokeRect(rect.startX - 150, rect.startY, rect.w, rect.h);

//     //alert(rectText);
//     //wrapText(ctx, rectText, rect.startX, Number(rect.startY)+ 10, rect.w, 30,"Arial");
//     wrapText(ctx, rectText, rect.startX - 150, Number(rect.startY) + 20, rect.w, "16px","Arial", 16);
// }


// function wrapText(context, text, x, y, maxWidth, fontSize, fontFace, lineHeight){

//       var words = text.split(' ');
//       var line = '';
//       var lineHeight = lineHeight*1.2;
//       //var newLineStr = "\n";

//       context.font=fontSize+" "+fontFace;

//       for(var n = 0; n < text.length; n++) {
//         var testLine = line + text[n] + ' ';
//         var metrics = context.measureText(testLine);
//         var testWidth = metrics.width;

//          if(y >= rect.startY+rect.h) {
//          	//alert(y + " " + (rect.startY+rect.h));
           
//          }

//         if(testWidth > maxWidth) {

//             context.fillText(line, x, y);
//             line = text[n] + ' ';
//             y += lineHeight;         
//         }       
//         else {
//           //alert("Ok2");
//           line = testLine;
//         }
//       }

//       context.fillText(line, x, y);
      
//       return(y);
// }