
/*******************************************************
************FUNCTION TO SELECT SYSTEM COLOURS***********
*******************************************************/

var count = 0;//variable to hold the SYSTEM Colours
var dataObj = {}; // my object
var dataArray = []; // my array
var addPads = true;
var sumObj = {};
var sumArray = [];
//var newSumArray = [];

function getCounter(){	
		
	var area = $("#hiddenArea").val();
	var systemName = $(".systems option:selected").text();
	var systemColours = ""
	systemColours = $("#cmbSystems option:selected").text();
	var size = $("#cfhAreaSize"+area).val();//area size
	var colArea = $("#txtColM2").val();
	$("#txtAmountLeft").val(size);	
	calcAreaLeft(colArea);
	if(dataObj.name !== systemColours){
		var addedColors = $(document.createElement('div'))
				  .attr("id", 'TextBoxDiv2' + count);
				  
			addedColors.html('<div class="row">'+
							 	'<div class="large-12 columns">'+
									'<div class="row row-cfh-area">'+
										'<div class="small-4 columns algTxt2">'+
											'<label id="txtCol'+count+'">'+systemColours+'</label>'+
										'</div>'+
										'<div class="small-2 columns">'+
											'<input class="txtPCol txtColAreas'+count+'" type="text" value="'+colArea+'"/>'+
										'</div>'+
										'<div class="algSqrm">m&sup2</div>'+
										'<div class="small-2 columns">'+
											'<a href="javascript: void(0)" value="remove" class="removeArea" onClick="removeColour('+area+','+count+');return false;"><img src="img/close.png"></a>'+
										'</div>'+
									'</div>'+	
								'</div>'+
							'</div>'+
							'<hr class="spacer"/>');		
			addedColors.appendTo("#cfh-cols");
			 
			dataObj = {
						system:systemName,
						area: area, 
						areaSize:size,
						subArea:count,
						name : systemColours,
						colarea : colArea
				   	  }					  		
		  
			if (_.findWhere(dataArray, dataObj) == null) {
				dataArray.push(dataObj);
			}
					 
			count++;
		
		$("#txtColM2").val("");
		$(".systems").attr('disabled', true);
		$("#cmbSystems").val("Please select one");
	}else{
		
		alert("You have already added "+systemColours);	
		return false;
	}
}
var totArea = 0;
function calcAreaLeft(colArea){
	var areaLeft = 0; 
	var finalAmount = 0;
	totArea = totArea + parseInt(colArea);
	
	areaLeft = $("#txtAmountLeft").val();
	
	finalAmount = areaLeft - totArea;
	//alert(finalAmount);
	
	$("#txtAmountLeft").val(finalAmount);
}
 /*********************************************************************************
 ************************* Remove System colour from pop up
 *********************************************************************************/
function removeColour(a,y){
	
	//dataObj.splice(count,1);
	jQuery.each(dataArray, function(index, item) {
		if(item.area === a.toString() && item.subArea === y){			 
		 
		// alert(index + " " + item.area + " " + item.subArea);
		  	  $("#TextBoxDiv2"+y).remove();	
			  dataArray.splice(index,1);
			 // break;			
		}
	});

}
 /*********************************************************************************
 ***************************System colours front
 *********************************************************************************/

var totAmount = 0;//Total colour area amount

function addToArea(){
		
	var area = $("#hiddenArea").val();
	var systemName = $(".systems option:selected").text();
	var systemColours = $("#cmbSystems option:selected").text();
	var colArea = $("#txtColM2").val();
	var areaVal = $("#cfhAreaSize"+area).val();//Area value
			
	var str="";	
	
	$('.row-area-break'+area).show();	
	
	var container = $(document.createElement('div')).attr("id", 'txtColContainer');
	
	var cont = $('<div />');
	
	jQuery.each(dataArray, function(index, item) {
		if(item.area === area.toString()){			
				
					container.append('<div class="divColCont'+item.subArea+' large-12 columns">'+
										'<div class="row row-cfh-area">'+
											'<div class="small-3 columns algTxt1">'+
												'<label id="lblColName'+item.subArea+'">'+item.name+'</label>'+
											'</div>'+
											'<div class="small-1 columns algTxt1">'+
												'<label id="lblColQty'+item.subArea+'">'+appendMeters(item.colarea)+'</label>'+
											'</div>'+
											'<div class="small-2 columns">'+
												'<label></label>'+
											'</div>'+
											'<div class="small-2 columns">'+
												'<a href="#" value="removeButton" class=" removeButton" onClick="removeMe('+item.area+','+item.subArea+');return false;" title="Remove colours"><img src="img/close.png"></a>'+
											'</div>'+
											'<div class="small-1 columns">&nbsp;</div>'+
										'</div>'+
									'</div>'+
									'<hr class="spacer"/>');					
				
		}
	});	
	
	$("#data"+area).html(container);
	
	
}

/**************************************
 *********REMOVE FRONT COLOUR**********
 **************************************/
function removeMe(id1, id2) {

	for (var i =0; i < dataArray.length; i++)	  
	   if (dataArray[i].area === id1.toString() && dataArray[i].subArea === id2) {
		 
		  dataArray.splice(i,1);
		  $("#data"+id1+" #txtColContainer .divColCont"+id2 ).remove();
		  break;
	   }	
	
	if(id2 == 0){
		$(".row-area-break"+id1).hide();
	}
}

 /*********************************************************************************
 ****************End of adding System colours to front
 *********************************************************************************/
function enableFields(){
	
	$('#colour-m2').show();
	$('#add-area-btn').show();
	
}

function getBinder(area){
	var binder = "";
	var binderSize = 0;
	var system = $(".systemType"+area).find("option:selected").text(); 
	
	if (system == "OneSafe" || system == "Luxafe" || system == "Corplay") {
		binder = $("#cmbBinder"+area).find("option:selected").text();	
	}else if(system == "CovaRubba" || system == "Traqua"){
		binder = $("#cmbBinder"+area).find("option:selected").text();
	}	
	if(binder == ""){
		jQuery.each(sumArray, function(index, item) {	
			if(item.area.toString() === area.toString()){	
				binder = item.binderName;		
			}									   
		});
	}
	if(binder == "Procure"){
		binderSize = "24";
	}else if(binder == "Hardcure"){
		binderSize = "20";
	}else if(binder == "Nypol"){
		binderSize = "20.5";
	}		
	return binderSize;	
}

/*********************************************************************************
****************Function to get the Value from CFH to front page
*********************************************************************************/
var addCFHCount = 0;
function addToCFHArea(){


    cmbBaseMat = $(".baseMat").find("option:selected").text();

    if (cmbBaseMat == "Aero Shockpad Cork") 
        {
        alert('Cork is currently unavailable until further notice. Please select Aero Shockpad or 4 Mesh');
        }
    else
    {       

	$('#cfh').foundation('reveal', 'close');
	
	addCFHCount = count;
	var cmbCfh = "";
	var cmbThickness1 = "";
	var cmbThickness2 = "";
	var cmbThickness3 = "";
	var cmbThickness4 = "";
	var cmbThickness5 = "";
	var leterage = 0;
	var noOfBags = 0;
	var bagSize = 0;
	var x = 0;
	run = false;
	var hiddenCFH = $("#hiddenCFH").val();
	
	
	if (cmbBaseMat == "Aero Shockpad Cork") {
	    cmbCfh = $(".cfhCork").find("option:selected").text();
	}
	else if (cmbBaseMat == "Aero Shockpad" || cmbBaseMat == "4mesh"){
	    cmbCfh = $(".cfh").find("option:selected").text();
	}
	
	binderName = $("#cmbBinder"+hiddenCFH).find("option:selected").text();
	subBaseType = $(".subBaseType").find("option:selected").text(); 
	cmbThickness1 = $("#cmbThickness1").text();
	cmbThickness2 = $("#cmbThickness2").text();
	cmbThickness3 = $("#cmbThickness3").text();
	cmbThickness4 = $("#cmbThickness4").text();
	cmbThickness5 = $("#cmbThickness5").text();
	
	x = cmbThickness3;
	//alert(subBaseType);
	
	if(typeof cmbThickness2 === "undefined")
	{
		cmbThickness2 = 0;
	}else if(typeof cmbThickness3 == "undefined"){
		cmbThickness3 = 0;
	}else if(typeof cmbThickness4 == "undefined"){
		cmbThickness4 = 0;
	}else if(typeof cmbThickness5 == "undefined"){
		cmbThickness5 = 0;
	}
	
	if (cmbBaseMat == "Displaceable") {
        if ($('#shockpadDiv').css('display') == 'none') {
	       
	        cmbCfh = $(".cfhCork").find("option:selected").text();
	        if (cmbCfh == "0.4 - 15mm") {
	            cmbThickness2 = "15";
	        } else if (cmbCfh == "0.5 - 20mm") {
	            cmbThickness2 = "20";
	        }
	    }
	    else if ($('#shockpadCorkDiv').css('display') == 'none') {
	        cmbCfh = $(".cfh").find("option:selected").text();
	        if (cmbCfh == "0.4 - 15mm") {
	            cmbThickness2 = "15";
	        } else if (cmbCfh == "0.5 - 20mm") {
	            cmbThickness2 = "20";
	        }
	    }
	}	
		
	if((cmbBaseMat == "Aero Shockpad" || cmbBaseMat == "Aero Shockpad Cork") && cmbThickness4 != 0 && cmbThickness5 == 0){		
		cmbThickness3=parseFloat(cmbThickness3) + parseFloat(cmbThickness4)		
	}else if ((cmbBaseMat == "Aero Shockpad" || cmbBaseMat == "Aero Shockpad Cork") && cmbThickness5 != 0) {		
		cmbThickness3=parseFloat(cmbThickness3) + parseFloat(cmbThickness4) + parseFloat(cmbThickness5)		
	}else if(cmbThickness4 != 0){
		cmbThickness3=parseFloat(cmbThickness3) + parseFloat(cmbThickness4);		
	}else if(cmbThickness5 != 0){
		cmbThickness3=parseFloat(cmbThickness3) + parseFloat(cmbThickness4) + parseFloat(cmbThickness5);		
	}else if (cmbThickness3 != 0 || cmbThickness3 != ""){		
		cmbThickness3 = cmbThickness3;	
	}

	 //get the system and pass to function
	 $.each(dataArray, function(index, val) {
			
	     if(val.area.toString() === hiddenCFH.toString()){
	         var bagType = 25;
	         if(val.system.toString() == "OneSafe"){	
	             bagType = 20;
	         }else if (val.system.toString() == "Corplay") {
	             bagType = 60;	         
	         }else{
	             bagType = 25;
	         }
						
	         //Calculate System bags			
	         noOfBags = calSysBags(calTopLayerBags(cmbBaseMat, cmbThickness2, val.system, bagType), val.areaSize, val.area, cmbBaseMat, val.system, calPriceTopLayer(val.system));
							
	         var binder = getBinder(hiddenCFH);
			
	         if (val.system.toString() == "OneSafe") {
	             leterage = 4;	
	             bagSize = binder;
	             calculateBinder(leterage,cmbBaseMat,val.areaSize,noOfBags,bagSize,hiddenCFH,x,cmbThickness4,val.system,cmbThickness2,cmbCfh,cmbThickness1,cmbThickness3,binderName,subBaseType,"Fixed",0,cmbThickness5);
	         }else if(val.system.toString() == "Luxafe"){
	             leterage = 4.5;
	             bagSize = binder;
	             calculateBinder(leterage,cmbBaseMat,val.areaSize,noOfBags,bagSize,hiddenCFH,x,cmbThickness4,val.system,cmbThickness2,cmbCfh,cmbThickness1,cmbThickness3,binderName,subBaseType,"Fixed",0,cmbThickness5);
	         }else if (val.system.toString() == "Corplay") {
	             leterage = 5.5;	
	             bagSize = binder;
	             calculateBinder(leterage,cmbBaseMat,val.areaSize,noOfBags,bagSize,hiddenCFH,x,cmbThickness4,val.system,cmbThickness2,cmbCfh,cmbThickness1,cmbThickness3,binderName,subBaseType,"Fixed",0,0);
	         
	         }else if (val.system.toString() == "CovaRubba") {
	             leterage = 6.5;
	             bagSize = binder;
	             calculateBinder(leterage,cmbBaseMat,val.areaSize,noOfBags,bagSize,hiddenCFH,x,cmbThickness4,val.system,cmbThickness2,cmbCfh,cmbThickness1,cmbThickness3,binderName,subBaseType,"Fixed",0,0);
	         }else if(val.system.toString() == "Traqua"){
	             leterage = 5.5;
	             bagSize = binder;
	             calculateBinder(leterage,cmbBaseMat,val.areaSize,noOfBags,bagSize,hiddenCFH,x,cmbThickness4.val.system,cmbThickness2,cmbCfh,cmbThickness1,cmbThickness3,binderName,subBaseType,"Fixed",0,0);
	         }
			    return false;
		}
	 });
	 
	 
    }
	 updateSidebar();
}
function calPriceTopLayer(system){
	var price=0;
	$.each(priceObj,function(index,item){
		
		if(system == "OneSafe"){
			if(item.name === "Emerald Green"){
				price = item.price;
			}
		}else if(system =="Luxafe"){
			if(item.name === "Green Apple"){
				price = item.price;
			}
		}else if(system =="CovaRubba"){
			if(item.name === "Shamrock"){
				price = item.price;
			}
		}else if(system =="Traqua"){
		    if (item.name === "Dark Green 047.1040") {
				price = item.price;
			}
		}else if (system == "Corplay") {
		    if (item.name === "Sapphire"){
		        price = item.price;
		    }
		}
	});	
	
	
	return price;	
	
}

function calculateBinder(leterage,baseMat,areaSize,noOfBags,bagSize,area,baseThick1,baseThick2,system,cmbThickness2,cmbCfh,cmbThickness1,cmbThickness3,binderName,subBaseType,rType,ramp,baseThick3){
	
	var sika = 0;
	var topLayer = 0;
	var binderTop = 0;
	var binderBottom = 0;
	var totPails = 0;
	var baseBags = 0;
	var baseTotThickness = 0;
	var pads = 0;
	var padsCork = 0;
	var str1 = "";
	var str2 = "";
	var str23 = "";
	var str3 = "";
	var str4 = "";
	var padsLayer1 = "",padsLayer2 = "",padsLayer3="";
	var exe = "";
	if(run){
		exe = 2;	
	}else{
		exe = 1;
	}
	
	var origAreasize = $("#cfhAreaSize"+area).val();//area size 
			
	baseThick1 = baseThick1 ? baseThick1 : 0;
	baseThick2 = baseThick2 ? baseThick2 : 0;
	baseThick3 = baseThick3 ? baseThick3 : 0;
	
	//If the binder name is undefined
	if(typeof binderName === 'undefined'){  		
		jQuery.each(sumArray, function(index, item) {
			if(item.area.toString() === area.toString()){	
				binderName=item.binderName;
			}			
		});
    }	
	if(baseMat == "Aero Shockpad"){			
		baseMat = "Aero Shockpad";	
		
		sika = areaSize / 7;
		topLayer = noOfBags * leterage / bagSize;//Binder required
		
		if(baseThick2 != 0 && baseThick3 == 0){
			pads = areaSize * 2;
			padsLayer1 = Math.ceil(areaSize) + ' x ' + baseMat + ' ' + baseThick1 + 'mm ' + ' x ' + calculateBottomPrice(area,0,'Shockpad'+baseThick1,1,Math.ceil(areaSize),exe);
			padsLayer2 = Math.ceil(areaSize) + ' x ' + baseMat + ' ' + baseThick2 + 'mm ' + ' x ' + calculateBottomPrice(area,0,'Shockpad'+baseThick2,1,Math.ceil(areaSize),exe);
		}else if(baseThick2 != 0 && baseThick3 != 0){
			pads = areaSize * 3;
	        padsLayer1 = Math.ceil(areaSize) + ' x ' + baseMat + ' ' + baseThick1 + 'mm ' + ' x ' + calculateBottomPrice(area,0,'Shockpad'+baseThick1,1,Math.ceil(areaSize),exe);
			padsLayer2 = Math.ceil(areaSize) + ' x ' + baseMat + ' ' + baseThick2 + 'mm ' + ' x ' + calculateBottomPrice(area,0,'Shockpad'+baseThick2,1,Math.ceil(areaSize),exe);
			padsLayer3 = Math.ceil(areaSize) + ' x ' + baseMat + ' ' + baseThick3 + 'mm ' + ' x ' + calculateBottomPrice(area,0,'Shockpad'+baseThick3,1,Math.ceil(areaSize),exe);
		}else{
			pads = areaSize;
			padsLayer1 = Math.ceil(pads) + ' x ' + baseMat + ' ' + baseThick1 + 'mm ' + ' x ' + calculateBottomPrice(area,0,'Shockpad'+baseThick1,1,Math.ceil(pads),exe);
			padsLayer2="";
		}
		
		sika = areaSize / 7;//Calculate sikaflex
		
		str1 = padsLayer1; 
		str2 = padsLayer2;
		str23 = padsLayer3;
		str3 = Math.ceil(sika)+' x Unimastic 600' + ' x ' + calculateBottomPrice(area,0,'Sikaflex221',1,Math.ceil(sika),exe);	
		str4 = Math.ceil(topLayer)+' x '+binderName+ ' ' + getBinder(area) + 'Kg pails' + ' x ' + calculateBottomPrice(area,0,binderName,getBinder(area),Math.ceil(topLayer),exe);
		
		totPails = topLayer;
		baseBags = 0;
	} else if (baseMat == "Aero Shockpad Cork") {
	    baseMat = "Aero Shockpad Cork";

	    sika = areaSize / 7;
	    topLayer = noOfBags * leterage / bagSize;//Binder required

	    if (baseThick2 != 0) {
	        padsCork = areaSize * 2;
	        padsLayer1 = Math.ceil(areaSize) + ' x ' + baseMat + ' ' + baseThick1 + 'mm ' + ' x ' + calculateBottomPrice(area, 0, 'ShockpadCork' + baseThick1, 1, Math.ceil(areaSize), exe);
	        padsLayer2 = Math.ceil(areaSize) + ' x ' + baseMat + ' ' + baseThick2 + 'mm ' + ' x ' + calculateBottomPrice(area, 0, 'ShockpadCork' + baseThick2, 1, Math.ceil(areaSize), exe);
	    } else {
	        padsCork = areaSize;
	        padsLayer1 = Math.ceil(padsCork) + ' x ' + baseMat + ' ' + baseThick1 + 'mm ' + ' x ' + calculateBottomPrice(area, 0, 'ShockpadCork' + baseThick1, 1, Math.ceil(padsCork), exe);
	        padsLayer2 = "";
	    }

	    sika = areaSize / 7;//Calculate sikaflex

	    str1 = padsLayer1;
	    str2 = padsLayer2;
	    str3 = Math.ceil(sika) + ' x Unimastic 600' + ' x ' + calculateBottomPrice(area, 0, 'Sikaflex221', 1, Math.ceil(sika), exe);
	    str4 = Math.ceil(topLayer) + ' x ' + binderName + ' ' + getBinder(area) + 'Kg pails' + ' x ' + calculateBottomPrice(area, 0, binderName, getBinder(area), Math.ceil(topLayer), exe);

	    totPails = topLayer;
	    baseBags = 0;
	}else if(baseMat == "4mesh"){			
		
		baseTotThickness = parseFloat(baseThick1) + parseFloat(baseThick2);
		
		baseBags = areaSize / calBaseLayerBags(baseMat,baseTotThickness);
				
		//calculate bincer for top and bottom
		binderTop = noOfBags * leterage; //top layer
		binderBottom = baseBags * 1.6;//bottom layer
		
		totPails = binderTop + binderBottom;
		totPails = totPails/bagSize;
		
		str1 = ''; 
		str2 = Math.ceil(baseBags)+' x SBR 4mesh  20Kg box' + ' x ' + calculateBottomPrice(area,0,baseMat,20,Math.ceil(baseBags),exe);
		str3 = Math.ceil(totPails)+' x '+binderName+ ' ' + getBinder(area)+'Kg pails' + ' x ' + calculateBottomPrice(area,0,binderName,getBinder(area),Math.ceil(totPails),exe);
		
		sika = 0;
		pads = 0;
		padsCork = 0;
	
	}else if(baseMat == "8-15g"){			
		
		baseTotThickness = parseFloat(baseThick1) + parseFloat(baseThick2);
		
		baseBags = areaSize / calBaseLayerBags(baseMat,baseTotThickness);
		//calculate bincer for top and bottom
		binderTop = noOfBags * leterage; //top layer
		binderBottom = baseBags * 2;//bottom layer
					
		totPails = binderTop + binderBottom;
		
		totPails = totPails/bagSize;		
		
		str1 = '';	
		str2 = Math.ceil(baseBags)+' x SBR 8mm-15mm bags' + ' x ' + calculateBottomPrice(area,0,baseMat,25,Math.ceil(baseBags),exe);
		str3 = Math.ceil(totPails)+' x '+binderName+ ' ' + getBinder(area) +'Kg pails' + ' x ' + calculateBottomPrice(area,0,binderName,getBinder(area),Math.ceil(totPails),exe);
		
		sika = 0;
		pads = 0;
		padsCork = 0;
	}else if(baseMat == "Concrete"){			
		
		baseTotThickness = parseFloat(baseThick1) + parseFloat(baseThick2);
		
		baseBags = areaSize / calBaseLayerBags(baseMat,baseTotThickness);
		//calculate bincer for top and bottom
		binderTop = noOfBags * leterage; //binder for top layer
			
		totPails = binderTop/bagSize;
				
		str1 = Math.ceil(totPails)+' x '+binderName+ ' ' + getBinder(area) + 'Kg pails'; 
		str2 = '';
		str3 = '';
		baseBags = 0;
		sika = 0;
		pads = 0;
		padsCork = 0;
		
	}else if(baseMat == "Crusher Dust"){			
		
		baseTotThickness = parseFloat(baseThick1) + parseFloat(baseThick2);
		
		baseBags = areaSize / calBaseLayerBags(baseMat,baseTotThickness);
		//calculate bincer for top and bottom
		binderTop = noOfBags * leterage; //binder for top layer
			
		totPails = binderTop/bagSize;
				
		str1 = Math.ceil(totPails)+' x '+binderName+ ' ' + getBinder(area) + 'Kg pails'; 
		str2 = '';
		str3 = '';
		baseBags = 0;
		sika = 0;
		pads = 0;
		padsCork = 0;
	}else if(baseMat == "Displaceable"){			
		
		baseTotThickness = parseFloat(baseThick1) + parseFloat(baseThick2);
		
		baseBags = areaSize / calBaseLayerBags(baseMat,baseTotThickness);
		//calculate bincer for top and bottom
		binderTop = noOfBags * leterage; //binder for top layer
			
		totPails = binderTop/bagSize;	
				
		str1 = '';																				 
		str2 = Math.ceil(totPails)+' x '+binderName+ ' ' + getBinder(area) + 'Kg pails' + ' x ' + calculateBottomPrice(area,0,binderName,getBinder(area),Math.ceil(totPails),exe);
		str3 = '';
		baseBags = 0;
		sika = 0;
		pads = 0;
		padsCork = 0;
	}
	
	
	if(typeof cmbCfh === 'undefined' || typeof cmbThickness1 === 'undefined' || typeof cmbThickness2 === 'undefined' || typeof cmbThickness3 === 'undefined' || typeof cmbThickness4 === 'undefined'){
  		
		jQuery.each(sumArray, function(index, item) {
			if(item.area.toString() === area.toString()){		
			
				cmbCfh=item.cfh;
				cmbThickness1=item.thickness;
				cmbThickness2=item.topLayer;
				cmbThickness3=item.baseLayer1;
				baseThick2=item.baseLayer2;
				baseThick3=item.baseLayer3;

				sumArray.splice(index,1);
				return false;
			}
		});
    }
	
	sumObj = {
				area:area,
				origAreasize:origAreasize,
				areaSize:areaSize,
				baseMat:baseMat,
				system:system,
				bags:Math.ceil(noOfBags),
				pads: pads,
				padsCork :padsCork,
				sika:Math.ceil(sika),
				colorBags:Math.ceil(baseBags),
				pails:Math.ceil(totPails),
				leterage:leterage,
				baseThick1:baseThick1,
				baseThick2:baseThick2,
				bagSize:bagSize,
				thick2:cmbThickness2,
				cmbtLayer:0,
				cfh:cmbCfh,
				thickness:cmbThickness1,
				topLayer:cmbThickness2,
				baseLayer1:cmbThickness3,
				baseLayer2:baseThick2,
				str1:str1,
				str2:str2,
				str3:str3,
				str4:str4,
				binderName:binderName,
				rampType:rType,
				ramp:ramp,
				bagName:getColBySys(system),
				times:0,
				color:"",
				subBaseType:subBaseType,
				thick3:baseThick3,
				baseThick3:baseThick3,
				str23:str23
			   }					  		
		  
	 if (_.findWhere(sumArray, sumObj) == null) {
		 
		 var result = $.grep(sumArray, function(e){ return e.area == area; });
 		 if(result.length != 0) {
			 for(var i = sumArray.length; i--;){
				if(sumArray[i].area == area){
					sumArray.splice(i, 1);
				}
			 }	
		 }	
		 
		  sumArray.push(sumObj);	
		
	 }
	
	 $('.loader'+area).hide();
	 $('.loaderTxt'+area).hide();
	 displayValues(area);
	 calcTotals(area);
 	 
     $('.ram'+area).show();
	 $('.colr'+area).show();
	 //Display layered images
	 displayBinderImg(area,binderName);
	 displayBaseLayerImg(area,baseMat);
	 displayCfh(area,cmbCfh,system);
		 
	 enableSendEstimate(area);
	 $('#id-depth'+area).addClass('small button expand [radius round] full-width disabled');
	 
	 $('#btnAddAnotherArea').removeClass('small button round btnAddAreas disabled');
	 $('#btnAddAnotherArea').addClass('small button round btnAddAreas');
	 
	var result = $.grep(totArray, function(e){ return e.area == area; });
	if(result.length != 0) {					
		$("#cfhAreaSize"+area).attr("readonly", true); 			
	}	
	jQuery('.margin').prop("disabled", true);	
	
	$('.sendQuote').css('margin-bottom', 75);
	$('#btnAddAnotherArea').css('margin-bottom', 75);
}


function displayBinderImg(area,binder){
	$('.sys-img-front3'+area).html("");
	var str="";
	
	if(binder == "Procure"){
		str = "<img class='x' src='img/logos/procure.png' alt='Procure' />"	
	}else if(binder == "Hardcure"){
		str = "<img class='x' src='img/logos/hardcure.png' alt='Hardcure' />"
	}else if(binder == "Nypol"){
		str = "<img class='x' src='img/materials/nypol.png' alt='Nypol' />"
	}	
	
	$('.binder-img'+area).html("");
	$('.binder-img'+area).append(str);
	$('.x').css({'width' : '110px' , 'height' : '65px','text-align':'center'});
	
	
}
function displayBaseLayerImg(area,baseMat){
	
	var str="";
	$('.rem-base'+area).remove();
	if(baseMat == "Aero Shockpad"){
	    str = str + "<img class='x' src='img/materials/shockpads.png' alt='ShockPads' />";
	} else if (baseMat == "Aero Shockpad Cork") {
	    str = str + "<img class='x' src='img/materials/shockpads.png' alt='ShockPad Cork' />";
	}else if(baseMat == "4mesh"){
		str = str + "<img class='x' src='img/materials/eco_sbr.png' alt='4Mesh' />";	
	}else if(baseMat == "8-15g"){
		str = str + "<img class='x' src='img/materials/eco_sbr.png' alt='8-15g' />";	
	}
	
	$('.system-stack'+area+' > div:nth-child(1)').after('<div class="rem-base'+area+'">'+	
															'<div class="small-1 columns layer-border-plus" style="margin-top:6%;">'+
																'+'+
															'</div>'+	
														'</div>'+		
														'<div class="rem-base'+area+'">'+	
															'<div class="small-2 columns" style="margin-top:3%;padding:0;">'+//base layer
																'<div class="basel-img'+area+'"><img class="x" src="img/logos/plus.png" alt="Plus" /></div>'+
															'</div>'+
														'</div>');
	
	$('.basel-img'+area).html("");
	$('.basel-img'+area).append(str);
	
	if(baseMat == "Displaceable"){
		$('.rem-base'+area).remove();	
	}	
	$('.x').css({'width' : '110px' , 'height' : '65px','text-align':'center'});
}
function displayCfh(area, cfh, system) {

    

	var arr="",strCfh="",strRamp="";
	if (system == "OneSafe" || system == "Luxafe" || system == "Corplay") {
		arr = cfh.split(' -');
		strCfh = 'Critical Fall Height  '+arr[0]+'m = '+arr[1];
		
	}else if(system == "CovaRubba" || system == "Traqua"){
		strCfh = 'Thickness  '+cfh+'mm';
	}else{
		strCfh = "Thickness not available";	
	}
		var arr = cfh.split(' -');
		
		var rampType="";
		var ramp="";
		var rampStr="";
		
		$.each(sumArray,function(index,val){
			if(val.area == area)
			{					
				rampType = val.rampType;
				ramp=Math.ceil(val.ramp);
				
			}
		});

		if(rampType == "Fixed")
		{
			rampStr = "Fixed Edge (Default)";
		}
		else
		{
			rampStr = rampType + " (Custom) = " + ramp +"m&sup2;";
		}
	
	$('.cr'+area).html("");
	$('.cr'+area).append('<div class="small-8 columns layer-border text-left" style="margin-top:2%;margin-left:8%;">'+
							'<div class="cfhOnly'+area+' cfhOnly">'+strCfh+'</div>'+
							'<div class="rampOnly'+area+' cfhOnly">Ramp - ' + rampStr + '</div>'+
						 '</div>');
}

/**************************************************************************************************************
********************************IF THE SYSTEM IS COVARUBBA OR TRAQUA*******************************************
**************************************************************************************************************/
function addToCFHArea2(){
	var bags = 0;
	
	
	
	$('#cfh2').foundation('reveal', 'close');
	
	addCFHCount= count;
	run = false;		
	var hiddenCFH = $("#hiddenCFH2").val();
	
	cmbtLayer = $(".tLayer").find("option:selected").text();	
	cmbBaseMat = $(".cfh2").find("option:selected").text();
	binderName = $("#cmbBinder"+hiddenCFH).find("option:selected").text(); 
	
	 //get the system and pass to function
	 $.each(dataArray, function(index, val) {
			
		if(val.area.toString() === hiddenCFH.toString()){
						
			bags = calSysBags(calTopLayerBags(cmbBaseMat,cmbtLayer,val.system,25),val.areaSize,val.area,cmbBaseMat,val.system,calPriceTopLayer(val.system));
			calBinder(bags,cmbBaseMat,val.area,val.areaSize,val.system,cmbtLayer,binderName,"Fixed",0);			
			return false;
		}
	 });	
}


function calBinder(noOfBags,baseMat,area,areaSize,sys,cmbtLayer,binderName,rType,ramp){
	
	var sika = 0;
	var pales = 0;
	var palesTop = 0;
	var topLayer = 0;
	var totPales = 0;
	var baseMaterial="";
	var str1 = "", str2 = "",str3 = "",str4 = "";
	
	var origAreasize = $("#cfhAreaSize"+area).val();//area size 
	
	baseMaterial = baseMat;
	
	var x = getLiterage(sys);
	
	var binder = getBinder(area);
		
	//If the binder name is undefined
	if(typeof binderName === 'undefined'){  		
		jQuery.each(sumArray, function(index, item) {
			if(item.area.toString() === area.toString()){	
				binderName=item.binderName;
			}			
		});
    }	
	
	if(run){
		exe = 2;	
	}else{
		exe = 1;	
	}
	
	if(baseMat == "Aero Shockpad"){
			
		baseMat = "Aero Shockpad";	
		sika = areaSize / 7;
		
		topLayer = noOfBags * 5 / binder;
		
		str1 = areaSize+' x '+ baseMat;
		str2 = sika.toFixed(0)+' x Unimastic 600';
		str3 = topLayer.toFixed(0) + ' x ' + binderName + ' pails';

	} else if (baseMat == "Aero Shockpad Cork") {

	    baseMat = "Aero Shockpad Cork";
	    sika = areaSize / 7;

	    topLayer = noOfBags * 5 / binder;

	    str1 = areaSize + ' x ' + baseMat;
	    str2 = sika.toFixed(0) + ' x Unimastic 600';
	    str3 = topLayer.toFixed(0) + ' x ' + binderName + ' pails';
	}else if(baseMat == "4mesh"){
		
		palesTop = noOfBags * 5 / binder 
		pales = noOfBags * 1.6 / binder;
		totPales = palesTop + pales;  
		baseMat = "SBR 4mesh";		
		
		str1 = areaSize+' x '+baseMat;
		str2 = totPales.toFixed(0)+' x '+binderName+' pails';
		str3 = '';
	
	}else if(baseMat == "8-15g" || baseMat == "4mesh / 8-15g Mix"){
		
		pales = noOfBags * 2 / binder;
		if(pales <= 1){
			pales = 1;
		}
		baseMat = "Procure";	
		
		str1 = sika.toFixed(0)+' x '+baseMat;
		str2 = pales.toFixed(0)+' x '+ baseMat + ' pails';
		str3 = '';
		
	}else if(sys == "CovaRubba"){

	    pales = (((Math.ceil(noOfBags) * 25) * 26) / 100) / 24;

	    pales = Math.ceil(pales);

		if(pales <= 1){
			pales = 1;
		}
		baseMat = "Hardcure";	
		
		str1 = pales.toFixed(0)+' x '+ binderName + ' ' + getBinder(area) + 'Kg pails' + ' x ' + calculateBottomPrice(area,0,binderName,getBinder(area),pales.toFixed(0),exe);
		str2 = '';
		str3 = '';
		str4 = '';
		
	}else if(sys == "Traqua"){		
		
		pales = (noOfBags * x) / binder;
			
		if(pales <= 1){
			pales = 1;
		}
		baseMat = "Procure";	
		
		str1 = pales.toFixed(0)+' x '+ binderName + ' ' + getBinder(area)+ 'Kg pails' + ' x ' + calculateBottomPrice(area,0,binderName,getBinder(area),pales.toFixed(0),exe);
		str2 = '';
		str3 = '';
		str4 = '';
	}
	
		jQuery.each(sumArray, function(index, item) {
			if(item.area.toString() === area.toString()){		
				sumArray.splice(index,1);				
				return false;
			}
		});
		
		sumObj = {
				area:area,
				origAreasize:origAreasize,
				areaSize:areaSize,
				baseMat:baseMaterial,
				system:sys,
				bags:Math.ceil(noOfBags),
				pads: 0,
    		    padsCork :0,
				sika:0,
				colorBags:0,
				pails:pales.toFixed(0),
				leterage:0,
				baseThick1:0,
				baseThick2:0,
				bagSize:0,
				thick2:0,
				cmbtLayer:cmbtLayer,
				cfh:0,
				thickness:0,
				topLayer:0,
				baseLayer1:0,
				baseLayer2:0,
				str1:str1,
				str2:str2,
				str3:str3,
				str4:str4,
				binderName:binderName,
				bagName:getColBySys(sys),
				times:0,
				color:"",
				subBaseType:"",
				rampType:rType,
				ramp:ramp
			   }					
		  
	 if (_.findWhere(sumArray, sumObj) == null) {
		sumArray.push(sumObj);
	 }
	 
	 addPads = false;
	 displayValues(area);
	 calcTotals(area);
	 $('.loader'+area).hide();
	 $('.loaderTxt'+area).hide();
	 $('.ram'+area).show();
	 $('.colr'+area).show();
	 displayBinderImg(area,binderName);
	 enableSendEstimate(area);
	 $('#id-depth'+area).addClass('small button expand [radius round] full-width disabled');
	 $('#btnAddAnotherArea').removeClass('small button round btnAddAreas disabled');
	 $('#btnAddAnotherArea').addClass('small button round btnAddAreas');
	 jQuery('.margin').prop("disabled", true);
	 
	 var result = $.grep(sumArray, function(e){ return e.area == area; });
	 if(result.length != 0) {					
		$("#cfhAreaSize"+area).attr("readonly", true); 	
	 }
	 displayCfh(area,cmbtLayer,sys);
	 updateSidebar();		
	 $('.sendQuote').css('margin-bottom', 75);
	 $('#btnAddAnotherArea').css('margin-bottom', 75);
}
var run = false;
function calculateBottomPrice(area, col, product, times, bags, exe) {

	var price = 0,tot=0,preProduct="",preBags="",prePrice="";
	
	$.each(priceObj,function(index,item){
		
		if(item.name === product){
			price = item.price;	
		}
	});	
	tot = (price * times) * bags;
		
	var result = $.grep(totArray, function(e){ return e.name == product && e.area == area; });
	if(result.length != 0) {
		if(run){
			for(var i = totArray.length; i--;){
				if(totArray[i].exe == 1 && totArray[i].area == area) totArray.splice(i, 1);
			}
		}
	}
	if(parseInt(area) != 0){
		
		var results = $.grep(totArray, function(e){ return e.name == product && e.area == area; });
		if(results.length != 0) {			
				for(var i = totArray.length; i--;){
					if(totArray[i].col != 1 && totArray[i].area == area && totArray[i].name == product){
						totArray.splice(i, 1);
					}
				}			
		}		
		
		$.each(totArray,function(index,item){
			if(item.area.toString() == area.toString() && item.name.toString() === product.toString()){
				item.col = col;
				item.bags = bags;
				item.price = tot.toFixed(2);
				item.exe = exe;
			}else{
				totArray.push({area:parseInt(area),col:parseInt(col),name:product,bags:parseInt(bags),price:tot.toFixed(2),exe:exe});		
			}
			
			
			return false; 
		});
					
	}
	
	return  addCommas(tot.toFixed(2));
}

function getColBySys(sys){
	var x ="";
	switch (sys)
	{
	case "OneSafe":
	  x="CSBR";
	  break;
	case "Luxafe":
	  x="EPDM";
	  break;
	case "CovaRubba":
	  x="Cova Rubba";
	  break;
	case "Traqua":
	  x="Traqua";
	  break;
    case "Corplay":
	  x = "Corka";
	  break;
	}	
	return x;
}
/*********************************************************************************
 *Get the System
 *********************************************************************************/
function getSystem(sysName,area){
	
	var result = $.grep(sumArray, function(e){ return e.area == area; });
	
	if(result.length != 0) {		
		
		 jQuery.each(sumArray,function(index,item){
			if(item.area.toString() === area.toString()){
				var sName = item.system;
				if(sName.toString() !== sysName.toString()){
					$(".systemType"+area).val(sName);
					displayMessages("alert-box alert radius","<img src='img/bg/exclamation.png' alt='Error' width='2.5%'/> You canno't change the System of Area "+area+" once the DEPTH is selected.");
					hideMessage();
					setTimeout(function(){ 
						displayMessages("alert-box success radius","If you have a ramp select the EDGE TYPE for Area"+ area+ " or select COLOUR for Area"+area);					
					}, 1000);	
				}
			}
		 });
	}else{
		 var size = $("#cfhAreaSize"+area).val();//area size 
		 var margin = $('input:radio[name=radio1]:checked').val();
		 var defstr="",imgStr="",topSides="",subBaseType="",marginAdded=0;
		 $('.def-col').html("");
		 $('.area-info'+area).show();
		 //calculate margin
		 marginAdded = (size * margin)/100;
			
		 marginAdded = parseInt(size) + Math.ceil(marginAdded);
		 size = marginAdded;
		
		 if(sysName != "Select System"){
			displayMessages("alert-box success radius","Next click on the DEPTH for Area"+ area);	 
			$('#id-depth'+area).show();
			//$("#cfhAreaSize"+area).attr("disabled", "disabled"); 
			
		 }else{
			displayMessages("alert-box alert radius","<img src='img/bg/exclamation.png' alt='Error' width='2.5%'/> Select the system. e.g. OneSafe, Luxafe, Cova Rubba or Traqua");	  
			$('#id-depth'+area).hide();
		 }
		 
		 updateSystem(area,sysName);
		 var binderName=loadDefaultCMB(sysName,area);
		 dataObj = {
					system:sysName,
					area: area, 
					areaSize:size,
					}					  		
			  
		 if (_.findWhere(dataArray, dataObj) == null) {
			dataArray.push(dataObj);
		 }	
		 
		 jQuery.each(sumArray,function(index,item){
									   
			 var system = $(".systemType"+area).find("option:selected").text();						   
	
			 if(item.area.toString() === area.toString()){
			     if ((item.system == "CovaRubba" || item.system == "Traqua" || item.system == "Corplay") && (system == "OneSafe" || system == "Luxafe") || (item.system == "OneSafe" || item.system == "Luxafe") || (item.system == "OneSafe" || item.system == "Corplay") && (system == "CovaRubba" || system == "Traqua")) {
					alert("You cannot change from "+item.system + " to " + system);
					$(".systemType"+area).val(item.system);
					return false;			
				}else{
					var binder = getBinder(area);
					var literage = getLiterage(system);				 
									
					item.system = system;
					item.bagSize = binder;
					item.leterage = literage;
					item.binderName = binderName;
					addRamp(area,0,"Fixed");	
				}
				return false
			 }		 
		 });
		 
		 $('.system-stack'+area).html("");
		 $('.system-stack'+area).append('<div class="small-3 columns">'+//top Layer
											'<div class="topl-img'+area+'"></div>'+
										'</div>'+
										'<div class="small-1 columns layer-border-plus" style="margin-top:6%;">'+
											'+'+
										'</div>'+
										'<div class="small-2 columns" style="margin-top:3%;padding:0;">'+//binder
											'<div class="binder-img'+area+'"><img class="x" src="img/logos/plus.png" alt="Plus" /></div>'+
										'</div>'+
										'<div class="small-1 columns layer-border-plus" style="margin-top:6%;">'+
											'='+
										'</div>'+
										'<div class="small-2 columns" style="margin-top:3%;padding:0;">'+//system
											'<div class="system-img'+area+'"><img class="x" src="img/logos/plus.png" alt="Plus" /></div>'+
										'</div>'+
										'<div class="cr'+area+'"></div>');
		 
		 if(sysName == "OneSafe"){
			 imgStr = '<img src="img/materials/emerelad_tiled.png" alt="Emerald Green" title=" Default color Emerald Green" width="100%" />'
			 topSidesL = "<div class='div-layLeft'><img src='img/materials/grass_edge_ramp_L.png' width='86%' /></div>";
			 topSidesR = "<div class='div-layRight text-right'><img  src='img/materials/grass_edge_ramp_R.png' width='86%' /></div>";
			 subBaseType = "Crusher Dust";
			 subBaseTypeTxt = "crusher dust sub-base";
 		   
			 
		 }else if(sysName == "Luxafe"){
			 imgStr = '<img src="img/materials/green_apple_tiled.png" alt="Green Apple" title=" Default color Green Apple" width="100%" />'
			 topSidesL = "<div class='div-layLeft' style='margin-left:-1.7%;'><img src='img/materials/Concrete_fixed_edgeDefault.png' width='34%' /></div>";
			 topSidesR = "<div class='div-layRight text-right'><img src='img/materials/Concrete_fixed_edgeDefault.png' width='34%' /></div>";
			 subBaseType = "Concrete";
			 subBaseTypeTxt = "concrete sub-base";
  		   
		 }else if(sysName == "CovaRubba"){
			 imgStr = '<img src="img/materials/emerelad_tiled.png" alt="Shamrock" title=" Default color Shamrock" width="100%" />'
			 topSidesL = "<div class='div-layLeft'><img src='img/materials/fixed_edge_ramp_L.png' width='86%' /></div>";
			 topSidesR = "<div class='div-layRight text-right'><img  src='img/materials/fixed_edge_ramp_R.png' width='86%' /></div>";
			 subBaseType = "Concrete";
			 subBaseTypeTxt = "concrete sub-base";
			
			 $('.cr'+area).append('<div class="small-1 columns></div>');
		 }else if(sysName == "Traqua"){
			 imgStr = '<img src="img/materials/ocean_teal_tiled.png" alt="Ocean Teal" title=" Default color Ocean Teal" width="100%" />'
			 topSidesL = "<div class='div-layLeft'><img src='img/materials/fixed_edge_ramp_L.png' width='86%' /></div>";
			 topSidesR = "<div class='div-layRight text-right'><img  src='img/materials/fixed_edge_ramp_R.png' width='86%' /></div>";
			 subBaseType = "Concrete";
			 subBaseTypeTxt = "concrete sub-base";			 			
			 $('.cr'+area).append('<div class="small-1 columns></div>');

		 }else if (sysName == "Corplay") {
		     imgStr = '<img src="img/materials/Corplay-Cherry.png" alt="Saphire" title=" Default color Cherry" width="100%" />'
		     topSidesL = "<div class='div-layLeft'><img src='img/materials/grass_edge_ramp_L.png' width='86%' /></div>";
		     topSidesR = "<div class='div-layRight text-right'><img  src='img/materials/grass_edge_ramp_R.png' width='86%' /></div>";
		     subBaseType = "Crusher Dust";
		     subBaseTypeTxt = "crusher dust sub-base";
		 }
		 
		// $('.topl-img'+area).html("");		 
		// $('.topl-img'+area).append(getTopLayerImg(sysName)+getGranSize(sysName));
		 displayBinderImg(area,getBinderNameBySystem(sysName));
		 $('.system-img'+area).html("");
		 $('.system-img'+area).append(getSystemImage(sysName));
		 $('.x').css({'width' : '110px' , 'height' : '65px','text-align':'center'});
			 
		 var container = $(document.createElement('div')).attr("id", 'txtColContainer');
		 container.append('<div class="small-12 columns divColCont'+area+'">'+
							'<div class="row">'+
								'<div class="small-12 columns" style="background-color:#FFFFFF;padding-left:0;padding-right:0;">'+
										'<div class="col-deault'+area+'">'+imgStr+'</div>'+
										'<div class="def-col"></div>'+
										'<div class="top-layer top-layer'+area+'">'+getSystemNameByValue(sysName)+'</div>'+
										'<div id="dataColour'+area+'">'+
										'</div>'+
								'</div>'+
							'</div>'+
							'<div class="row">'+
							'<div class="sub-base-type'+area+'">'+	
								  '<div class="large-12 columns" style="padding-left:0;padding-right:0;">'+
										 '<div class="alg-sub-base-type">'+getSubBaseImg(subBaseType)+''+
								  '</div>'+
								   '<div class="large-12 columns" >'+
										 '<div class="alg-sub-base-type-txt-c">'+subBaseTypeTxt+'</div>'+
								  '</div>'+
							'</div>'+
							'</div>'+
						  '</div>');	
		 
		 $("#data"+area).html(container);		 
		 
		 drawColPie(area,10,sysName);
		 displayTopLayerImg(area,sysName);		 		 
		
		$('.col-deault'+area).append(topSidesL+topSidesR);
		
		 if(sysName != "Select System"){
			$('.dep'+area).show(); 
		 }
		 updateSidebar();
	}
}
function getGranSize(system){
	var str="";
	if (system == "OneSafe" || system == "Corplay") {
		str = "<div class='fcss'>1-4mm granules</div>";	
	}else if(system == "Luxafe"){
		str = "<div class='fcss'>1-4mm granules</div>";	
	}else if(system == "CovaRubba"){
		str = "<div class='fcss'>1-2mm granules</div>";	
	}else if(system == "Traqua"){
		str = "<div class='fcss'>0.5-1.5mm granules</div>"
	}
	return str;
}
function getSystemNameByValue(system){
	var str="";
	if(system == "OneSafe"){
		str= "CSBR"; 	
	}else if(system == "Luxafe"){
		str= "EPDM";
	}else if(system == "CovaRubba"){
		str= "Cova Rubba"; 
	}else if(system == "Traqua"){
		str= "Traqua"; 
	}else if (system == "Corplay") {
	    str = "Corka";
	}
	
	return str;
}
function displayTopLayerImg(area,sysName){
	var imgStr = "";
	if(sysName == "OneSafe"){
		imgStr = "<img src='img/logos/csbr_logo.png' alt='OneSafe' width='105' height='105' />";	 
	}else if(sysName == "Luxafe"){
        imgStr = "<img src='img/logos/Opal.png' alt='OneSafe' width='105' height='105' />";	 	 
 	}else if(sysName == "CovaRubba"){
	    imgStr = "<img src='img/logos/csbr_logo.png' alt='OneSafe' width='105' height='105' />";	 
	}else if(sysName == "Traqua"){
	    imgStr = "<img src='img/logos/Traqua.png' alt='Gezoflex' width='105' height='105' />";	 
	} else if (sysName == "Corplay") {
	    imgStr = "<img src='img/logos/Corka-RGB.png' alt='Corplay' width='105' height='105' />";
	}
	$('.sysOverlay'+area).html(""); 
	$('.sysOverlay'+area).append(imgStr);	
}
function getBinderNameBySystem(system){
	var str="";
	if (system == "OneSafe" || system == "Corplay") {
		str = "Procure";	 
	}else if(system == "Luxafe"){
	    str = "Procure";
 	}else if(system == "CovaRubba"){
	    str = "Hardcure";	 
	}else if(system == "Traqua"){
	    str = "Procure";
	}
	
	return str;
}
function updateSystem(area,sysName){
	jQuery.each(dataArray, function(index, item) {
		if(item.area.toString() === area.toString()){			 
			item.system = sysName;
		}		
	});
}


function getIndexBySystem(system){
	switch (system)
	{
	case "OneSafe":
	  x=0;
	  break;
	case "Luxafe":
	  x=1;
	  break;
	case "CovaRubba":
	  x=2;
	  break;
	case "Traqua":
	  x=3;
	  break;
    case "Corplay":
      x = 4;
      break;
	}	
	return x;	
}


function getLiterage(system){
	var literage = 0;		
	    if (system == "OneSafe" || system == "Corplay") {
			literage = 4;	
		}else if(system == "Luxafe"){
			literage = 4.5;
		}else if(system == "CovaRubba"){
			literage = 6.5;
		}else if(system== "Traqua"){
			literage = 6.5;
		}
	return literage;
}
function enableSendEstimate(area){
	
	var arrLength = sumArray.length;
	if(arrLength == 0){
		$('#sQ').removeClass('button round sendQuote');
		$('#sQ').addClass('button round sendQuote disabled');	
	}else{
		jQuery.each(sumArray, function(index, item){
			if(item.area.toString() === area.toString()){
				$('#sQ').removeClass('button round sendQuote disabled');
				$('#sQ').addClass('button round sendQuote');
				
				$('#btnAddAnotherArea').removeClass('small button round btnAddAreas disabled');
				$('#btnAddAnotherArea').addClass('small button round btnAddAreas');			
					
			}else{
				$('#sQ').removeClass('button round sendQuote');
				$('#sQ').addClass('button round sendQuote disabled');	
			}		
		});
	}
}

var removedArea = [];
var remArea = false;
function removeArea(area){	
			
	var retVal= "";		
	$('span.tooltip:visible').hide();//removing the tooltip ffom dynami content
	enableSendEstimate(area);
	

	jQuery.each(sumArray, function(index, item) {
		if(item.area.toString() === area.toString()){	
			  
			  //If shockpads available
			  if(item.pads > 0){
				jQuery.each(shockPads, function(index, items) {
					if(item.baseThick1 != 0 && item.baseThick2 == 0 && item.baseThick1.toString() === items.Layer.toString()){						
						items.value -= parseInt(item.pads);	
					}
					if(item.baseThick1 != 0 && item.baseThick2 != 0 && item.baseThick1.toString() === items.Layer.toString()){										
						items.value -= parseInt(item.pads/2);	
					}	
					if(item.baseThick1 != 0 && item.baseThick2 != 0 && item.baseThick2.toString() === items.Layer.toString()){
						items.value -= parseInt(item.pads/2);						
					}	
				});
			  }

			  if (item.padsCork > 0) {
			      jQuery.each(shockPadsCork, function (index, items) {
			          if (item.baseThick1 != 0 && item.baseThick2 == 0 && item.baseThick1.toString() === items.Layer.toString()) {
			              items.value -= parseInt(item.padsCork);
			          }
			          if (item.baseThick1 != 0 && item.baseThick2 != 0 && item.baseThick1.toString() === items.Layer.toString()) {
			              items.value -= parseInt(item.padsCork / 2);
			          }
			          if (item.baseThick1 != 0 && item.baseThick2 != 0 && item.baseThick2.toString() === items.Layer.toString()) {
			              items.value -= parseInt(item.padsCork / 2);
			          }
			      });
			  }
		//return false;
		}
		
	});	
	
	for(var i = shockPads.length; i--;){
		if (shockPads[i].value === 0) shockPads.splice(i, 1);
	}

	for (var i = shockPadsCork.length; i--;) {
	    if (shockPadsCork[i].value === 0) shockPadsCork.splice(i, 1);
	}
	
	jQuery.each(sumArray, function(index, item) {
		if(item.area.toString() === area.toString()){	
			dataArray.splice(index,1);
			sumArray.splice(index,1);
   		    chartData.splice(index,1);
			colData.length=0;
		return false;
		}
	});
	for(var i = totArray.length; i--;){
		if (totArray[i].area.toString() === area.toString()) totArray.splice(i, 1);
	}
	
	for(var i = pColData.length; i--;){
		if (pColData[i].area.toString() === area.toString()) pColData.splice(i, 1);
	}
	
	//$("#divSummary"+area).remove();
	$("#TextBoxDiv"+area).animate({		
   		 height: "toggle"
		},{
		"complete" : function() {
			 $('#TextBoxDiv'+area).remove();
		}
	});
	$("#divSummary"+area).animate({		
   		 height: "toggle"
		},{
		"complete" : function() {
			 $('#divSummary'+area).remove();
		}
	});
	//$('#TextBoxDiv'+area).remove();
	$("#dataColour"+area).html("");
	$('.divColCont'+area).text("");
	$('#cfhAreaSize'+area).val("");
	$('.dataCFH'+area).text("");
	$('.systemType'+area).val("Select System");
	$('.bags'+area).text("");
	$('.binder'+area).text("");
	$('.rem-area'+area).hide();
	$('.loaderTxt'+area).hide();	
	$('.loader'+area).show();
	$('.sys-img-front'+area).html("");
	$('.sys-img-front2'+area).html("");
	$('.sys-img-front3'+area).html("");
	$('.txtPCol').attr("readonly",false);
	/*if(area !== 1){
		$('#TextBoxDiv'+area).html("");	
	}*/
	var exe = "";
	if(run){
		exe = 2;	
	}else{
		exe = 1;	
	}
	
	calcTotals(area);
	
   var arrLength = sumArray.length;
   
      displayMessages('alert-box success radius','You have removed Area' + area+'. successfully');
   if(arrLength == 0){
	    var jobName = $("#txtJobName");
		$('#totalAmounts').hide();   
		$('.div-estimate-txt').hide();
		jQuery('.margin').prop("disabled", false);	
		$('.sum-sec').hide();
		$('#TextBoxesGroup').parent().removeClass('textboxes-style');
		if (jobName.val().length > 0) {
    		displayMessages('alert-box success radius','You do not have any areas. Click "Add wetpour area" to add a new area');
		}else{
			displayMessages('alert-box success radius','Enter job name to begin. Click "START" to add a new area');
		}
		$('#btnSratEst').removeClass('small button round disabled');
	    $('#btnSratEst').addClass('small button round');
		
		$('#btnAddAnotherArea').removeClass('small button round btnAddAreas disabled');
	    $('#btnAddAnotherArea').addClass('small button round btnAddAreas');

   }
	
   $('.sys'+area).hide();
   $('.dep'+area).hide();
   $('.ram'+area).hide();
   $('.colr'+area).hide();
	
   $('#id-depth'+area).removeClass('small button expand [radius round] full-width disabled');
   $('#id-depth'+area).addClass('small button expand [radius round] full-width');
	
   $('#id-ramp'+area).removeClass('small button expand [radius round] full-width disabled');
   $('#id-ramp'+area).addClass('small button expand [radius round] full-width');
	
   $('#id-color'+area).removeClass('small button expand [radius round] full-width disabled');
   $('#id-color'+area).addClass('small button expand [radius round] full-width');
	
	//displayMessages("alert-box success radius","<img src='img/bg/success.png' alt='Success' width='1.5%'/> Area"+area+ " has been removed from your estimate");
	//Check if the area is pending
	
	updateSidebar();		
    $('.sendQuote').css('margin-bottom', 75);		
	
		remArea = true;	
		var foundR = $.inArray(area, removedArea) > -1;
		if(!foundR){
			removedArea.push(area);
			removedArea.sort(function(a, b){return a-b});
		}

	if($('.sum-item').css('display') == 'none') {
		$('#btnAddAnotherArea').removeClass('small button round btnAddAreas disabled');
		$('#btnAddAnotherArea').addClass('small button round btnAddAreas');
		
		$('#sQ').removeClass('button round sendQuote disabled');
		$('#sQ').addClass('button round sendQuote');
	}
	
	$.each(sumArray,function(index,item){
	   $('#id-depth'+item.area).removeClass('small button expand [radius round] full-width');
	   $('#id-depth'+item.area).addClass('small button expand [radius round] full-width disabled');
		
	   $('#id-ramp'+item.area).removeClass('small button expand [radius round] full-width');
	   $('#id-ramp'+item.area).addClass('small button expand [radius round] full-width disabled');
		
	   $('#id-color'+item.area).removeClass('small button expand [radius round] full-width');
	   $('#id-color'+item.area).addClass('small button expand [radius round] full-width disabled');				  
							  
	});
	
}

function reAddArea(area){
		var areaSize = $('#cfhAreaSize'+area).val();
		
		if(areaSize.length >= 1){
			displayMessages("alert-box success radius","Select the system for Area"+area+ " e.g. OneSafe, Luxafe, Cova Rubba or Traqua");
		}
}
