var ALPHA= 30;
var BETA = 210;

var pObj = activeDocument.activeLayer.pathItems;

for (var i = 0; i < pObj.length; i++) {
     if (pObj[i].strokeColor.black == 0) { pObj[i].remove(); }
 }

var count = 0;
for (var i = 0; i < pObj.length; i++) {
     if (pObj[i].strokeColor.magenta == 100) { count++; }
 }

for (var i = 0; i < count; i++) {
    copyObj = pObj.add();
    
    copyObj.strokeColor.cyan = 100;
    copyObj.strokeColor.magenta = 0;
    copyObj.strokeColor.yellow = 0;
    copyObj.strokeColor.black = 0;  
}
 
 for (var i = 0; i < pObj.length; i++) {
    if (pObj[i].strokeColor.magenta == 100) {       
        x0 = pObj[i].pathPoints[0].anchor[0];
        y0 = pObj[i].pathPoints[0].anchor[1];
        pObj[i].pathPoints[0].PointType = PointType.SMOOTH;
        
        x1 = pObj[i].pathPoints[1].anchor[0];
        y1 = pObj[i].pathPoints[1].anchor[1];
        pObj[i].pathPoints[1].PointType = PointType.SMOOTH;
       
        unitVector = [x1 - x0, y1 - y0];
        length = Math.sqrt(unitVector[0] * unitVector[0] + unitVector[1] * unitVector[1]);
        unitVector = [unitVector[0] / length, unitVector[1] / length];
        
        tUnitVector1 = [
            unitVector[0] * Math.cos(ALPHA * (Math.PI / 180)) - unitVector[1] * Math.sin(ALPHA * (Math.PI / 180)),
            unitVector[0] * Math.sin(ALPHA * (Math.PI / 180)) + unitVector[1] * Math.cos(ALPHA * (Math.PI / 180))
            ];
        
        pObj[i].pathPoints[0].rightDirection = [tUnitVector1[0] * (length / 2) + x0, tUnitVector1[1] * (length / 2) + y0];
 
        tUnitVector2 = [
            unitVector[0] * Math.cos(BETA * (Math.PI / 180)) - unitVector[1] * Math.sin(BETA * (Math.PI / 180)),
            unitVector[0] * Math.sin(BETA * (Math.PI / 180)) + unitVector[1] * Math.cos(BETA * (Math.PI / 180))
            ];
        
        pObj[i].pathPoints[1].leftDirection = [tUnitVector2[0] * (length / 2) + x1, tUnitVector2[1] * (length / 2) + y1]; 

        for (var j = 0; j < pObj.length; j++) {
            if (pObj[j].strokeColor.cyan ==  100) {   
                pObj[j].strokeColor.cyan =  0;
                pObj[j].strokeWidth = 2 * pObj[i].strokeWidth;
                pObj[j].filled = false;
                
                copyPPObj = pObj[j].pathPoints.add();
                copyPPObj.anchor = [x0, y0];
                copyPPObj.PointType = PointType.SMOOTH;
                copyPPObj.leftDirection = [x0, y0];
                copyPPObj.rightDirection = [tUnitVector1[0] * (length / 2) + x0, tUnitVector1[1] * (length / 2) + y0];
        
                copyPPObj = pObj[j].pathPoints.add();
                copyPPObj.anchor = [x1, y1];
                copyPPObj.PointType = PointType.SMOOTH;
                copyPPObj.leftDirection = [tUnitVector2[0] * (length / 2) + x1, tUnitVector2[1] * (length / 2) + y1];
                copyPPObj.rightDirection = [x1, y1];
                
                pObj[i].move(pObj[j], ElementPlacement.PLACEBEFORE);
                
                break;
            }
        }
    }
}