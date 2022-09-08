
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
function calTopLayerBags(baseMat,topLayer,system,bagType){
	
		
	var spreadRate="";
	if(system == "Traqua"){
		if(baseMat == "Concrete"){
			if(topLayer == "10"){
				spreadRate = 2.5;
			}else if(topLayer == "15"){
				spreadRate = 1.5;
			}else if(topLayer == "20"){
				spreadRate = 1.1;	
			}else if(topLayer == "25"){
				spreadRate = 0.9;	
			}
		}else if(baseMat == "Crusher Dust"){
			if(topLayer == "10"){
				spreadRate = 2.1;
			}else if(topLayer == "15"){
				spreadRate = 1.4;
			}else if(topLayer == "20"){
				spreadRate = 1.0;	
			}else if(topLayer == "25"){
				spreadRate = 0.8;	
			}					
		}
	}else if(system == "CovaRubba"){
		if(baseMat == "Concrete"){
			if(topLayer == "10"){
				spreadRate = 2.9;
			}else if(topLayer == "15"){
				spreadRate = 2.1;
			}else if(topLayer == "20"){
				spreadRate = 1.6;	
			}else if(topLayer == "25"){
				spreadRate = 1.25;	
			}
		}else if(baseMat == "Crusher Dust"){
			if(topLayer == "10"){
				spreadRate = 2.8;
			}else if(topLayer == "15"){
				spreadRate = 2.0;
			}else if(topLayer == "20"){
				spreadRate = 1.5;	
			}else if(topLayer == "25"){
				spreadRate = 1.2;	
			}		
		}
	}else if(system == "OneSafe"){			
	
	 if(bagType == 20){
		if(baseMat == "Concrete"){			
			if(topLayer == "10"){
				spreadRate = 2.2;
			}else if(topLayer == "15"){
				spreadRate = 1.75;				
			}else if(topLayer == "20"){
				spreadRate = 1.3;	
			}else if(topLayer == "25"){
				spreadRate = 1.0;	
			}
		}else if(baseMat == "Crusher Dust"){
			if(topLayer == "10"){
				spreadRate = 2.1;
			}else if(topLayer == "15"){
				spreadRate = 1.7;
			}else if(topLayer == "20"){
				spreadRate = 1.25;	
			}else if(topLayer == "25"){
				spreadRate = 0.95;	
			}		
		} else if (baseMat == "Aero Shockpad" || baseMat == "Aero Shockpad Cork") {
			if(topLayer == "10"){
				spreadRate = 2.1;
			}else if(topLayer == "15"){
				spreadRate = 1.7;
			}else if(topLayer == "20"){
				spreadRate = 1.25;	
			}else if(topLayer == "25"){
				spreadRate = 0.95;	
			}		
		}else if(baseMat == "4mesh"){
			if(topLayer == "10"){
				spreadRate = 2.0;
			}else if(topLayer == "15"){
				spreadRate = 1.4;
			}else if(topLayer == "20"){
				spreadRate = 1.1;	
			}else if(topLayer == "25"){
				spreadRate = 0.8;	
			}
		}else if(baseMat == "8-15g"){
			if(topLayer == "10"){
				spreadRate = 2.6;
			}else if(topLayer == "15"){
				spreadRate = 1.9;
			}else if(topLayer == "20"){
				spreadRate = 1.4;	
			}else if(topLayer == "25"){
				spreadRate = 1.0;	
			}
		}else if(baseMat == "4mesh / 8-15g Mix"){
			if(topLayer == "10"){
				spreadRate = 1.9;
			}else if(topLayer == "15"){
				spreadRate = 1.4;
			}else if(topLayer == "20"){
				spreadRate = 1.0;	
			}else if(topLayer == "25"){
				spreadRate = 0.75;	
			}
		}else if(baseMat == "Displaceable"){
			if(topLayer == "15"){
				spreadRate = 1.7;
			}else if(topLayer == "20"){
				spreadRate = 1.2
			}
		}	
	 }else{
		 if(baseMat == "Concrete"){			
			if(topLayer == "10"){
				spreadRate = 3.0;
			}else if(topLayer == "15"){
				spreadRate = 2.2;				
			}else if(topLayer == "20"){
				spreadRate = 1.65;	
			}else if(topLayer == "25"){
				spreadRate = 1.3;	
			}
		}else if(baseMat == "Crusher Dust"){
			if(topLayer == "10"){
				spreadRate = 2.8;
			}else if(topLayer == "15"){
				spreadRate = 2.1;
			}else if(topLayer == "20"){
				spreadRate = 1.6;	
			}else if(topLayer == "25"){
				spreadRate = 1.25;	
			}		
		} else if (baseMat == "Aero Shockpad" || baseMat == "Aero Shockpad Cork") {
			if(topLayer == "10"){
				spreadRate = 2.8;
			}else if(topLayer == "15"){
				spreadRate = 2.1;
			}else if(topLayer == "20"){
				spreadRate = 1.6;	
			}else if(topLayer == "25"){
				spreadRate = 1.25;	
			}		
		}else if(baseMat == "4mesh"){
			if(topLayer == "10"){
				spreadRate = 2.7;
			}else if(topLayer == "15"){
				spreadRate = 2.0;
			}else if(topLayer == "20"){
				spreadRate = 1.5;	
			}else if(topLayer == "25"){
				spreadRate = 1.1;	
			}
		}else if(baseMat == "8-15g"){
			if(topLayer == "10"){
				spreadRate = 2.6;
			}else if(topLayer == "15"){
				spreadRate = 1.9;
			}else if(topLayer == "20"){
				spreadRate = 1.4;	
			}else if(topLayer == "25"){
				spreadRate = 1.0;	
			}
		}else if(baseMat == "4mesh / 8-15g Mix"){
			if(topLayer == "10"){
				spreadRate = 2.7;
			}else if(topLayer == "15"){
				spreadRate = 2.0;
			}else if(topLayer == "20"){
				spreadRate = 1.5;	
			}else if(topLayer == "25"){
				spreadRate = 1.1;	
			}
		}else if(baseMat == "Displaceable"){
			if(topLayer == "15"){
				spreadRate = 2.1;
			}else if(topLayer == "20"){
				spreadRate = 1.6
			}
		}				 
	 }
	} else if (system == "Corplay") {
	   // alert(baseMat + " " + topLayer);
	    if (baseMat == "Aero Shockpad" || baseMat == "Aero Shockpad Cork") {
	    if (topLayer == "10") {
	        spreadRate = 2.8;
	    } else if (topLayer == "15") {
	        spreadRate = 2.5;
	    } else if (topLayer == "20") {
	        spreadRate = 1.8;
	    } else if (topLayer == "25") {
	        spreadRate = 1.6;
	    }
	} else if (baseMat == "4mesh") {
	    if (topLayer == "10") {
	        spreadRate = 2.7;
	    } else if (topLayer == "15") {
	        spreadRate = 2.0;
	    } else if (topLayer == "20") {
	        spreadRate = 1.5;
	    } else if (topLayer == "25") {
	        spreadRate = 1.1;
	    }
	} else if (baseMat == "8-15g") {
	    if (topLayer == "10") {
	        spreadRate = 2.6;
	    } else if (topLayer == "15") {
	        spreadRate = 1.9;
	    } else if (topLayer == "20") {
	        spreadRate = 1.4;
	    } else if (topLayer == "25") {
	        spreadRate = 1.0;
	    }
	} else if (baseMat == "Concrete") {
	    if (topLayer == "10") {
	        spreadRate = 3.0;
	    } else if (topLayer == "15") {
	        spreadRate = 2.2;
	    } else if (topLayer == "20") {
	        spreadRate = 1.65;
	    } else if (topLayer == "25") {
	        spreadRate = 1.3;
	    }
	} else if (baseMat == "Crusher Dust") {
	    if (topLayer == "10") {
	        spreadRate = 2.8;
	    } else if (topLayer == "15") {
	        spreadRate = 2.1;
	    } else if (topLayer == "20") {
	        spreadRate = 1.6;
	    } else if (topLayer == "25") {
	        spreadRate = 1.25;
	    }	
	} else if (baseMat == "4mesh / 8-15g Mix") {
	    if (topLayer == "10") {
	        spreadRate = 2.7;
	    } else if (topLayer == "15") {
	        spreadRate = 2.0;
	    } else if (topLayer == "20") {
	        spreadRate = 1.5;
	    } else if (topLayer == "25") {
	        spreadRate = 1.1;
	    }
	} else if (baseMat == "Displaceable") {
	    if (topLayer == "15") {
	        spreadRate = 2.1;
	    } else if (topLayer == "20") {
	        spreadRate = 1.6
	    }
	}
	} else if (system == "Onesafe Carnivale") {
	    if (baseMat == "Concrete") {
	        if (topLayer == "10") {
	            spreadRate = 3.0;
	        } else if (topLayer == "15") {
	            spreadRate = 2.2;
	        } else if (topLayer == "20") {
	            spreadRate = 1.65;
	        } else if (topLayer == "25") {
	            spreadRate = 1.3;
	        }
	    } else if (baseMat == "Crusher Dust") {
	        if (topLayer == "10") {
	            spreadRate = 2.8;
	        } else if (topLayer == "15") {
	            spreadRate = 2.1;
	        } else if (topLayer == "20") {
	            spreadRate = 1.6;
	        } else if (topLayer == "25") {
	            spreadRate = 1.25;
	        }
	    } else if (baseMat == "Aero Shockpad" || baseMat == "Aero Shockpad Cork") {
	        if (topLayer == 10) {
	            spreadRate = 2.8;
	        } else if (topLayer == "15") {
	            spreadRate = 2.1;
	        } else if (topLayer == "20") {
	            spreadRate = 1.6;
	        } else if (topLayer == "25") {
	            spreadRate = 1.25;
	        }
	    } else if (baseMat == "4mesh") {
	        if (topLayer == "10") {
	            spreadRate = 2.7;
	        } else if (topLayer == "15") {
	            spreadRate = 2.0;
	        } else if (topLayer == "20") {
	            spreadRate = 1.5;
	        } else if (topLayer == "25") {
	            spreadRate = 1.1;
	        }
	    } else if (baseMat == "8-15g") {
	        if (topLayer == "10") {
	            spreadRate = 2.6;
	        } else if (topLayer == "15") {
	            spreadRate = 1.9;
	        } else if (topLayer == "20") {
	            spreadRate = 1.4;
	        } else if (topLayer == "25") {
	            spreadRate = 1.0;
	        }
	    } else if (baseMat == "4mesh / 8-15g Mix") {
	        if (topLayer == "10") {
	            spreadRate = 2.7;
	        } else if (topLayer == "15") {
	            spreadRate = 2.0;
	        } else if (topLayer == "20") {
	            spreadRate = 1.5;
	        } else if (topLayer == "25") {
	            spreadRate = 1.1;
	        }
	    }
	} else if (system == "Luxafe") {
	    if (baseMat == "Concrete") {
	        if (topLayer == "10") {
	            spreadRate = 2.4;
	        } else if (topLayer == "15") {
	            spreadRate = 1.6;
	        } else if (topLayer == "20") {
	            spreadRate = 1.2;
	        } else if (topLayer == "25") {
	            spreadRate = 1.0;
	        }
	    } else if (baseMat == "Crusher Dust") {
	        if (topLayer == "10") {
	            spreadRate = 2.3;
	        } else if (topLayer == "15") {
	            spreadRate = 1.5;
	        } else if (topLayer == "20") {
	            spreadRate = 1.1;
	        } else if (topLayer == "25") {
	            spreadRate = 0.9;
	        }
	    } else if (baseMat == "Aero Shockpad" || baseMat == "Aero Shockpad Cork") {
	        if (topLayer == "10") {
	            spreadRate = 2.3;
	        } else if (topLayer == "15") {
	            spreadRate = 1.5;
	        } else if (topLayer == "20") {
	            spreadRate = 1.1;
	        } else if (topLayer == "25") {
	            spreadRate = 0.9;
	        }
	    } else if (baseMat == "4mesh") {
	        if (topLayer == "10") {
	            spreadRate = 2.2;
	        } else if (topLayer == "15") {
	            spreadRate = 1.4;
	        } else if (topLayer == "20") {
	            spreadRate = 1.0;
	        } else if (topLayer == "25") {
	            spreadRate = 0.8;
	        }
	    } else if (baseMat == "8-15g") {
	        if (topLayer == "10") {
	            spreadRate = 2.0;
	        } else if (topLayer == "15") {
	            spreadRate = 1.3;
	        } else if (topLayer == "20") {
	            spreadRate = 0.9;
	        } else if (topLayer == "25") {
	            spreadRate = 0.75;
	        }
	    } else if (baseMat == "4mesh / 8-15g Mix") {
	        if (topLayer == "10") {
	            spreadRate = 2.2;
	        } else if (topLayer == "15") {
	            spreadRate = 1.4;
	        } else if (topLayer == "20") {
	            spreadRate = 1.0;
	        } else if (topLayer == "25") {
	            spreadRate = 0.8;
	        }
	    } else if (baseMat == "Displaceable") {
	        if (topLayer == "15") {
	            spreadRate = 1.6;
	        } else if (topLayer == "20") {
	            spreadRate = 1.2;
	        }
	    }
	}
	//alert(spreadRate);
	return spreadRate;
}
function calBaseLayerBags(baseMat,baseLayer){
	
	var spreadRate=0;
	
	if(baseMat == "4mesh"){
		if(baseLayer == "10"){
			spreadRate = 4;//5.0;	
		}else if(baseLayer == "15"){
			spreadRate = 2.66;//3.33;
		}else if(baseLayer == "20"){
			spreadRate = 2;//2.5;
		}else if(baseLayer == "25"){
			spreadRate = 1.6;//2.0;
		}else if(baseLayer == "30"){
			spreadRate = 1.33;//1.67;
		}else if(baseLayer == "35"){
			spreadRate = 1.14;//1.43;
		}else if(baseLayer == "40"){
			spreadRate = 1;//1.25;
		}else if(baseLayer == "45"){
			spreadRate = 0.88;//1.11;
		}else if(baseLayer == "50"){
			spreadRate = 0.8;//1.0;
		}else if(baseLayer == "55"){
			spreadRate = 0.72;//0.91;
		}else if(baseLayer == "60"){
			spreadRate = 0.66;//0.83;
		}else if(baseLayer == "65"){
			spreadRate = 0.61;//0.77;
		}else if(baseLayer == "70"){
			spreadRate = 0.56;//0.71;
		}else if(baseLayer == "75"){
			spreadRate = 0.52;//0.66;
		}else if(baseLayer == "80"){
			spreadRate = 0.50;//0.63;
		}else if(baseLayer == "85"){
			spreadRate = 0.47;//0.59;
		}else if(baseLayer == "90"){
			spreadRate = 0.44;//0.56;
		}else if(baseLayer == "95"){
			spreadRate = 0.42;//0.53;
		}else if(baseLayer == "100"){
			spreadRate = 0.4;//0.5;
		}		
	}else if(baseMat == "8-15g"){
		if(baseLayer == "10"){
			spreadRate = 4.0;	
		}else if(baseLayer == "15"){
			spreadRate = 2.67;
		}else if(baseLayer == "20"){
			spreadRate = 2.0;
		}else if(baseLayer == "25"){
			spreadRate = 1.6;
		}else if(baseLayer == "30"){
			spreadRate = 1.33;
		}else if(baseLayer == "35"){
			spreadRate = 1.14;
		}else if(baseLayer == "40"){
			spreadRate = 1.0;
		}else if(baseLayer == "45"){
			spreadRate = 0.89;
		}else if(baseLayer == "50"){
			spreadRate = 0.8;
		}else if(baseLayer == "55"){
			spreadRate = 0.73;
		}else if(baseLayer == "60"){
			spreadRate = 0.67;
		}else if(baseLayer == "65"){
			spreadRate = 0.62;
		}else if(baseLayer == "70"){
			spreadRate = 0.57;
		}else if(baseLayer == "75"){
			spreadRate = 0.53;
		}else if(baseLayer == "80"){
			spreadRate = 0.5;
		}else if(baseLayer == "85"){
			spreadRate = 0.47;
		}else if(baseLayer == "90"){
			spreadRate = 0.44;
		}else if(baseLayer == "95"){
			spreadRate = 0.42;
		}else if(baseLayer == "100"){
			spreadRate = 0.4;
		}
	}
	
	return spreadRate;
}


function openPopUp(area){	

	 $("#hiddenArea").val(area);

		 $.fancybox({
			   'href': '#set',
			 'height': 500,
			  'width': 558,
		  'autoScale': true,
	   'transitionIn': 'elastic',
	   'transitionOut': 'elastic',
			'speedIn': 500,
		   'speedOut': 300,
		   'autoSize': false,
	 'centerOnScroll': true,
		  'scrolling': 'true',
		   afterLoad:function(){
				
				reAddColours(area);
		   },
		   afterClose: function () {
               $(".systems").val("Please select one");
               $("#cmbSystems").val("Please select one");
			   $("#colour-m2").hide();
			   $("#txtColM2").val("");
			   $(".txtColAreas").text("");
			   $("#cfh-cols").find("input[type=text]").val('');  
			   $("#cfh-cols label").text("");  
			   $("#txtAmountLeft").val(""); //empty area amount left 
			   //$("#txtCol1").remove();
  		    //	$("#txtColAreas1").remove();
			//	$("#txtCol1").remove();
			 //   $("#txtColAreas1").remove();
			   
				$('#system-colours').hide();
				$("#cfh-cols").find("input[type=text]").remove();  
				$(".removeArea").remove();
				$('#add-area-btn').hide();
				$(".systems").attr('disabled', false);
				//$("#selected-cols").remove();
				$("#cfh-cols").html("");				
				//count=0;
           }
	 });
		
}

function reAddColours(area){
	
	var num = area;	
	
	if(dataArray.length == 0){	
		
	}else{			
		
		$.each(dataArray, function(index, val) {
			if(val.area === num.toString()){		
				var area =  val.area;
				var systemName = $(".systems option:selected").text();
				var systemColours = val.name;
				var colArea = val.colarea;
				
				var addedColors = $(document.createElement('div'))
						  .attr("id", 'TextBoxDiv2' + val.subArea);
					 
					 addedColors.html('<div class="row">'+
									  	'<div class="large-12 columns">'+
											'<div class="row row-cfh-area">'+
												'<div class="small-4 columns algTxt2"><label id="txtCol'+val.subArea+'">'+systemColours+'</label>'+
												'</div>'+
												'<div class="small-2 columns">'+
													'<input class="txtPCol txtColAreas'+val.subArea+'" type="text" value="'+colArea+'"/>'+
												'</div>'+
												'<div class="algSqrm">m&sup2</div>'+
												'<div class="small-2 columns">'+
													'<a href="#" value="remove" class="removeArea" onClick="removeColourSub('+val.area+','+val.subArea+');return false;"><img src="img/close.png"></a>'+
												'</div>'+
											'</div>'+
										'</div>'+
									'</div>'+
									'<hr class="spacer"/>');		
					 addedColors.appendTo("#cfh-cols");		
					 
				//$(".systems").val(val.system);	 
				//$(".systems").get(0).selectedIndex = 2;
				$(".systems option:contains(" + val.system + ")").attr('selected', 'selected');
				
				
				$("#txtColM2").val("");
				//$(".systems").attr('disabled', false);
				$("#cmbSystems").val("Please select one");
				//count++;
			
				
			}
		});	
		/*var area = $("#hiddenArea").val();
		if(dataObj.area === area){	
		
		alert(area);
			var systemName = $(".systems option:selected").text();
			
			getColour(systemName);
			$('.systems').change(function() {
				var systemName = $(".systems option:selected").text();
				//var area = $("#hiddenArea").val();
				if(systemName === dataObj.system){
					alert("Eaual");	
				}else{
					alert("Are u sure to remove the added system?");	
				}
	  	    });			
		}*/	
		
	}
}

 /*********************************************************************************
 ************************* Remove System colour from pop up
 *********************************************************************************/
function removeColourSub(z,y){
	
	for (var i =0; i < dataArray.length; i++){
	   if (dataArray[i].area === z.toString() && dataArray[i].subArea === y) {		 
	   
		  dataArray.splice(i,1);
		  break;
	   }
	}
	$("#TextBoxDiv2"+y).remove();

}
//calculate Hexagon Edge length
function findSquareRoot(area){
	var x = 0;
	var y = 0;
	var z = 0;
	
	//x = 4*area;
	//y = 6*Math.sqrt(3);
	z = Math.sqrt(4*area / (6*Math.sqrt(3)));	
	alert(z.toFixed(2));
	
//return x
}
//Calculate Equilateral Triangle base
function findEquilateralTriangleBase(area){
	var x =0;	
	x = Math.sqrt(area / Math.sqrt(3));	
	alert(x.toFixed(2));	
}
//Calculate Square of a Base
function findSquareBase(area){
	
	var x = 0;
	x = Math.sqrt(area);	
	$("#square_a").val(x);
	$('#volcal').hide();
	AraPrm.square();
}
//Calculate diameter of a circle
function findDiameter(area){
	var x = 0;
	x = Math.sqrt(area / 3.14159)*2;
	$('#circle_d').val(x);
	$('#volcal').hide();
	AraPrm.circle();
	
}
//Calculate path
function findbase(area){
	var x = 0;
	x = area / 1;
	$('#path_a').val(1);
	$('#path_b').val(x);
	$('#volcal').hide();
	AraPrm.path();
	
}
//Adjust length and height of the Rectangle
function adjustLenHeight(area){
	var x = 0;
	var a = 0;
	var b = 0;
	
	a = Math.sqrt(area * 2);
	b = Math.sqrt(area - (area / 2));
	
	$('#rectangle_a').val(a);
	$('#rectangle_b').val(b);
	$('#volcal').hide();
	AraPrm.rectangle();
	
}

/*****************************************************************
 *Get the CFH
 ****************************************************************/
function openCFH(area){	
		
	   $("#hiddenCFH").val(area);
	   $("#hiddenCFH2").val(area);
	  
	   if($('#id-depth'+area).hasClass("disabled")){
			//alert("You have already added depth, please remove the area if you want to update depth");   
	   }else{
			
		   var sysName = $(".systemType"+area).find("option:selected").text();	
		   
			if(sysName == "CovaRubba" || sysName == "Traqua"){
				
				$('#cfh2').foundation('reveal', 'open');
				$('#cfh2').bind('opened', function() {
					$('#divBinder2').empty();	
					loadDefaultCMB(sysName,area);
				});
				$('#cfh2').bind('closed', function() {
					$('#b-materials').hide();	
					var cfh2Area = $("#hiddenCFH2").val();
					
					var result = $.grep(totArray, function(e){ return e.area == cfh2Area; });
					if(result.length != 0) {					
						displayMessages("alert-box success radius","If you have a ramp select the EDGE TYPE for Area"+ cfh2Area+ " or select COLOUR for Area"+cfh2Area);
					}else{
						displayMessages("alert-box alert radius","<img src='img/bg/exclamation.png' alt='Error' width='2.5%'/> Click on the DEPTH to select Top layer, Sub base, and binder for Area "+ cfh2Area);
					}
				});
			
			}else{
				
				$('#cfh').foundation('reveal', 'open');
				$('#cfh-table').html("");
				$(".baseMat").empty();
				$('.baseMat').append('<option value="2">Aero Shockpad</option><option value="3">4mesh</option>');
				
				$('#shockpadDiv').show();
				$('#shockpadCorkDiv').hide();
				$('.cfhCork').val("Select CFH");
				$('.cfh').val("Select CFH");
				$('#cfhareaval').val(area);
				$('#cfh').bind('opened', function() {
				   $('#divBinder1').empty();	
				   loadDefaultCMB(sysName,area);
				});
				
				$('#cfh').bind('closed', function() {
					var cfh1Area = $("#hiddenCFH").val();					 
				
					var result = $.grep(totArray, function(e){ return e.area == cfh1Area; });
					if(result.length != 0) {					
						displayMessages("alert-box success radius","If you have a ramp select the EDGE TYPE for Area"+ cfh1Area+ " or select COLOUR for Area"+cfh1Area);						
					}else{
						displayMessages("alert-box alert radius","<img src='img/bg/exclamation.png' alt='Error' width='2.5%'/> Click on the DEPTH to select Critical fall height, Base material, binder and sub-base type  for Area"+ cfh1Area);
					}					
					
				   //$(".cfh").val("Select CFH");
				   $("#cmbThickness1").val("");
				   $("#cmbThickness2").val("");
				   $("#cmbThickness3").val("");
					 
				   //$("#cmbThickness1").hide();
				   //$("#cmbThickness2").hide();
				   //$("#cmbThickness3").hide();
					 
				   //$('#cfh-thickness').hide();	  
				   //$("#divBinder").hide();	
				   //$('#b-materials').hide();
				});
				
			}
	   }
}

function loadDefaultCMB(system,area){
	//jQuery.each(sumArray, function(index, item) {
	//	if(item.area.toString() === area.toString()){		
			 
			var binderName = "";
			$('#divBinder1').html("");
			$('#divBinder2').html("");
			if(system == "OneSafe"){
				$('#divBinder1').append('<select id="cmbBinder'+area+'"><option selected="selected">Procure</option></select>');			
				binderName = "Procure";
			}else if(system == "Luxafe"){
			    $('#divBinder1').append('<select id="cmbBinder' + area + '"><option selected="selected">Procure</option></select>');
			    binderName = "Procure";
			}else if(system == "CovaRubba"){
				$('#divBinder2').append('<select id="cmbBinder'+area+'"><option selected="selected">Hardcure</option><option>Procure</option></select>');	
				binderName = "Hardcure";
			}else if(system == "Traqua"){
			    $('#divBinder2').append('<select id="cmbBinder' + area + '"><option selected="selected">Procure</option><option>Hardcure</option></select>');
				binderName = "Procure";
			}else if (system == "Corplay") {
			    $('#divBinder1').append('<select id="cmbBinder' + area + '"><option selected="selected">Procure</option></select>');
			    binderName = "Procure";
			}
			return binderName;				
	//	}
	//});
}

function openRamp(area){
	
	
	if($('#id-ramp'+area).hasClass("disabled")){
	}else{
		
		$("#hiddenRamp").val(area);
		$('.cls-ramp').hide();	
		$('.cls-ramp').hide();	
		$('.cls-ramp-width').hide();
		$('.div-perimeter').css({'display':'none'});
		
		$('.ramp-img').html("<div class='large-10 columns text-center' style='font-size:0.8em;font-weight:bold;margin-top:2%;'>No Ramp for Fixed Edge</div>");
	
		$('#ramp').foundation('reveal', 'open');
		
		$('#ramp').bind('closed', function() {
			$("#cmbRamp").val("Fixed Edge");
			$('#txtRampWidth').val("");
			$("#txtRampPerimeter").val("");
		});	
		
		$('#msg-ramp').removeClass();
		$('#msg-ramp').hide();
		$('#msg-ramp').addClass('alert-box info radius');
		$('.alert-msg-ramp').text("Select the ramp type. Default is Fixed Edge(no ramp)");
		$('.alert-box').fadeIn(500);
				
	}
}

function appendMeters(val){
		var str=""
		str = val + " m&sup2";	
	return str;
}
function removeMeters(val){
		var str=""
		str = val.replace(' ',' ');	
	return str;
}

/******************************************************************************************
 *									Ramping
 *****************************************************************************************/
 //var addPads = false;
$(document).ready(function() { 
	$(".btnAddRamp").click(function(){
			var rampPerimeter = $('#txtRampPerimeter').val();
			var rampType = $("#cmbRamp").find("option:selected").text();	
			var area = $("#hiddenRamp").val();
			var rampWidth = $('#txtRampWidth').val();
			var deep = 0;
			var ramp = 0;
			var strTopLayerImgL = "",strTopLayerImgR = "",strCD="",strStrData="";
		
			if((jQuery.trim(rampPerimeter).length <= 0 || rampPerimeter == 0) && ($('.cls-ramp').is(':visible'))){
			   
				$('#msg-ramp').removeClass();
				$('#msg-ramp').hide();
				$('#msg-ramp').addClass('alert-box alert radius');
				$('.alert-msg-ramp').text("The perimeter is required!");
				$('.alert-box').fadeIn(500); 
					
			}else{		
				if(rampType == "Grass"){
					deep = rampWidth / 1000;	
				}else if(rampType == "Fixed Edge"){
					deep = 1;								
				}else if(rampType == "Bark"){
					deep = rampWidth / 1000;
				}else if(rampType == "Sand"){
					deep = rampWidth / 1000;
				}else if(rampType == "Deep"){
						deep = 0.4;
				}			
				ramp = rampPerimeter * deep;
				addPads = true;	
				run = true;
				
				addRamp(area,ramp,rampType);				
				drawRamp(area);
				displayMessages("alert-box success radius","<img src='img/bg/success.png' alt='Success' width='2.3%'/> Ramp type "+rampType+" was added to Area "+ area + ". Next select colours for Area "+area);							   
				
				if(rampType != "Fixed Edge"){
					if(rampWidth != 150 && rampWidth != 300){
						strCD = "(Custom)";
					}else{
						strCD = "(Default)";	
					}
					strStrData = rampWidth+'mm '+ strCD +' = ' + Math.ceil(ramp) +'m&sup2;</div>';
				}
				
				/*'<div class="rampOnly'+area+' cfhOnly">Ramp - Fixed Edged (default)</div>'+*/
				$('.rampOnly'+area).html("");
				$('.rampOnly'+area).append('Ramp - '+ rampType + ' ' + strStrData);
				
				$('#id-ramp'+area).addClass('small button expand [radius round] full-width disabled');
				$('#ramp').foundation('reveal', 'close');
			}		
							
			return false;
		
	});
	
$('#cmbRamp').change(function() {
		var type = $(this).find("option:selected").text();
		var as=0,recPer=0;
		$('.ramp-img').html("");
		var areaSize = $("#hiddenRamp").val()
		
		
		
		if(type == "Fixed Edge"){
				
		}else{
			
		}		
		
		if(type == "Fixed Edge"){				
			$('.cls-ramp').hide();
			$('.cls-ramp-width').hide();
			$('.div-perimeter').hide();			
			$('.ramp-img').html("<div class='large-12 columns text-center' style='font-size:0.8em;font-weight:bold;margin-top:2%;'>No Ramp for Fixed Edge</div>");
			
		}else if(type == "Grass"){
			$('.ramp-img').append("<img src='img/materials/SyntheticGrass_ramp.png' alt='Grass Ramp' width='100%' /></br><div class='large-12 columns text-center' style='font-size:0.8em;font-weight:bold;'>Grass Ramp</div>");
			$('.cls-ramp').show();
			$('.cls-ramp-width').show();
			$('.div-perimeter').show();		
			$('#txtRampWidth').val(150);			
		}else if(type == "Bark"){
			$('.ramp-img').append("<img src='img/materials/bark_ramp.png' alt='Bark Ramp' width='100%' /></br><div class='large-12 columns text-center' style='font-size:0.8em;font-weight:bold;'>Bark Ramp</div>");
			$('.cls-ramp').show();
			$('.cls-ramp-width').show();
			$('.div-perimeter').show();		
			$('#txtRampWidth').val(300);			
		}else if(type == "Sand"){
			$('.ramp-img').append("<img src='img/materials/sand_ramp.png' alt='Sand Ramp' width='100%' /></br><div class='large-12 columns text-center' style='font-size:0.8em;font-weight:bold;'>Sand Ramp</div>");
			$('.cls-ramp').show();
			$('.cls-ramp-width').show();
			$('.div-perimeter').show();		
			$('#txtRampWidth').val(300);			
		}else if(type == "Deep"){			
			$('.cls-ramp').show();
			$('.cls-ramp-width').hide();			
		}
		$('#msg-ramp').removeClass();
		$('#msg-ramp').hide();
		$('#msg-ramp').addClass('alert-box success radius');
		if(type != "Fixed Edge"){	
			$.each(sumArray, function(index, item) {
			if(item.area == areaSize){
				as = item.areaSize;						  
				}
			});
			recPer = Math.round(Math.sqrt(as) * 4);
			$('.alert-msg-ramp').text("You have selected " + type + " ramp. Now enter perimeter of the ramp. If required, change ramp width");
			$('.alert-box').fadeIn(500);
		}else{
			recPer = 0;			
			$('.alert-msg-ramp').text("You have selected " + type + " ramp.");
			$('.alert-box').fadeIn(500);
		}
		
		$('#txtRampPerimeter').val(recPer);
	});
});



function drawRamp(area){
	var rampType = $("#cmbRamp").find("option:selected").text();
	var strTopLayerImgL="",strTopLayerImgR="",strBottomLayerImgL="",strBottomLayerImgR="",strMostBottomLayerImgL="",strMostBottomLayerImgR="";
	
	jQuery.each(sumArray, function(index, item) {
		if(item.area.toString() === area.toString()){	
			if(item.system.toString() === "OneSafe"){
				
				strTopLayerImgL = "CSBR_edge_ramp_L_top.png";
				strTopLayerImgR = "CSBR_edge_ramp_R_top.png";
				strBottomLayerImgL = "CSBR_edge_ramp_L_bottom.png";
				strBottomLayerImgR = "CSBR_edge_ramp_R_bottom.png";
				strMostBottomLayerImgL = "CSBR_edge_ramp_L_bottomGrass.png";
				strMostBottomLayerImgR = "CSBR_edge_ramp_R_bottomGrass.png";
			}else if (item.system.toString() === "Corplay") {
			    strTopLayerImgL = "Corka_edge_ramp_L_top.png";
			    strTopLayerImgR = "Corka_edge_ramp_R_top.png";
			    strBottomLayerImgL = "Corka_edge_ramp_L_bottom.png";
			    strBottomLayerImgR = "Corka_edge_ramp_R_bottom.png";
			    strMostBottomLayerImgL = "Corka_edge_ramp_L_BottomGrass.png";
			    strMostBottomLayerImgR = "Corka_edge_ramp_R_BottomGrass.png";
			}else if(item.system.toString() === "Luxafe"){
				strTopLayerImgL = "EPDM_edge_ramp_L_top.png";
				strTopLayerImgR = "EPDM_edge_ramp_R_top.png";
				strBottomLayerImgL = "EPDM_edge_ramp_L_bottom.png";
				strBottomLayerImgR = "EPDM_edge_ramp_R_bottom.png";
				strMostBottomLayerImgL = "EPDM_edge_ramp_L_bottom.png";
				strMostBottomLayerImgR = "EPDM_edge_ramp_R_bottom.png";
			}else if(item.system.toString() === "Cova Rubba"){
				strTopLayerImgL = "CSBR_edge_ramp_L_top.png";
				strTopLayerImgR = "CSBR_edge_ramp_R_top.png";
				strBottomLayerImgL = "CSBR_edge_ramp_L_bottom.png";
				strBottomLayerImgR = "CSBR_edge_ramp_R_bottom.png";
				strMostBottomLayerImgL = "CSBR_edge_ramp_L_bottomGrass.png";
				strMostBottomLayerImgR = "CSBR_edge_ramp_R_bottomGrass.png";
			}else if(item.system.toString() === "Traqua"){
				strTopLayerImgL = "EPDM_edge_ramp_L_top.png";
				strTopLayerImgR = "EPDM_edge_ramp_R_top.png";
				strBottomLayerImgL = "";
				strBottomLayerImgR = "";
				strMostBottomLayerImgL = "";
				strMostBottomLayerImgR = "";
			}																				
			
			$('.col-deault'+area+' .div-layLeft').remove();
			$('.col-deault'+area+' .div-layRight').remove();
			$('.shock-top-sideimg'+area+' .div-layLeft').remove()
			$('.shock-top-sideimg'+area+' .div-layRight').remove();
			$('.shock-top-innerimg'+area+' .div-layLeft-inner').remove();
			$('.shock-top-innerimg'+area+' .div-layRight-inner').remove();
			$('.shock-bottom-sideimg'+area+' .div-layLeft').remove();
			$('.shock-bottom-sideimg'+area+' .div-layRight').remove();
			$('.shock-bottom-innerimg'+area+' .div-botLeft-inner').remove();
			$('.shock-bottom-innerimg'+area+' .div-botRight-inner').remove();
			$('.shock-top-innerimg'+area+' .div-GlayLeft-inner').remove();
			$('.shock-top-innerimg'+area+' .div-GlayRight-inner').remove();
			$('.shock-bottom-innerimg'+area+' .div-GbotLeft-inner').remove();
			$('.shock-bottom-innerimg'+area+' .div-GbotRight-inner').remove();
			$('.shock-top-innerimg'+area+' .div-SlayLeft-inner').remove();
			$('.shock-top-innerimg'+area+' .div-SlayRight-inner').remove();
			$('.shock-bottom-sideimg'+area+' .div-SlayRight').remove();
			
			
				if(rampType == "Fixed Edge"){
					
					$('.col-deault'+area).append("<div class='div-layLeft' style='margin-left:-1.7%;'><img src='img/materials/Concrete_fixed_edge.png' width='32%' /></div><div class='div-layRight text-right'><img  src='img/materials/Concrete_fixed_edge.png' width='32%' /></div>");
					$('.shock-top-sideimg'+area).append("<div class='div-layLeft' style='margin-left:-1.7%;'><img src='img/materials/Concrete_fixed_edge.png' width='32%' /></div><div class='div-layRight text-right'><img src='img/materials/Concrete_fixed_edge.png' width='32%' /></div>");				
					$(".shock-top-innerimg"+area).append("<div class='div-layLeft-inner'><img src='img/materials/"+strTopLayerImgL+"' width='100%' /></div><div class='div-layRight-inner'><img src='img/materials/"+strTopLayerImgR+"' width='100%' /></div>");	
					if(item.pads > 0){
						if(item.baseThick1 != 0 && item.baseThick2 != 0){
							//Bottom Layer
							$('.shock-bottom-sideimg'+area).append("<div class='div-layLeft text-left' style='margin-left:0.5%;'>"+
																		"<img src='img/materials/Concrete_fixed_edge.png' width='32%' />"+
																	"</div>"+
																	"<div class='div-layRight text-right'>"+
																		"<img src='img/materials/Concrete_fixed_edge.png' width='32%' />"+
																	"</div>");				
							$(".shock-bottom-innerimg"+area).append("<div class='div-botLeft-inner text-left'>"+
																		"<img src='img/materials/"+strBottomLayerImgL+"' width='55%' />"+
																	"</div>"+
																	"<div class='div-botRight-inner text-right'>"+
																		"<img src='img/materials/"+strBottomLayerImgR+"' width='55%' />"+
																	"</div>");						
						}		
					}
				}else if(rampType == "Grass"){
					$('.col-deault'+area).append("<div class='div-layLeft' style='margin-left:0.5%;'><img src='img/materials/grass_edge_ramp_L.png' width='100%' /></div><div class='div-layRight text-right'  style='margin-right:0.2%;'><img  src='img/materials/grass_edge_ramp_R.png' width='100%' /></div>");	
					$(".shock-top-innerimg"+area).append("<div class='div-GlayLeft-inner'>"+
																	"<img src='img/materials/"+strTopLayerImgL+"' width='100%' />"+
																 "</div>"+
																 "<div class='div-GlayRight-inner' style='margin-right:-0.4%;'>"+
																	"<img src='img/materials/"+strTopLayerImgR+"' width='95%' />"+
																 "</div>");	
					if(item.pads > 0){
							
						if(item.baseThick1 != 0 && item.baseThick2 != 0){
							$(".shock-bottom-innerimg"+area).append("<div class='div-GbotLeft-inner text-left'>"+
																		"<img src='img/materials/"+strMostBottomLayerImgL+"' width='55%' height:100%; />"+
																	"</div>"+
																	"<div class='div-GbotRight-inner text-right'>"+
																		"<img src='img/materials/"+strMostBottomLayerImgR+"' width='55%' height:100%; />"+
																	"</div>");			
						}
					}
				}else if(rampType == "Bark"){
					$('.col-deault'+area).append("<div class='div-layLeft'><img src='img/materials/bark_edge_ramp_L.png' width='90%' /></div><div class='div-layRight text-right'><img  src='img/materials/bark_edge_ramp_R.png' width='90%' /></div>");
					$(".shock-top-innerimg"+area).append("<div class='div-layLeft-inner'>"+
																	"<img src='img/materials/"+strTopLayerImgL+"' width='100%' />"+
																 "</div>"+
																 "<div class='div-layRight-inner'>"+
																	"<img src='img/materials/"+strTopLayerImgR+"' width='100%' />"+
																 "</div>");	
					$(".shock-top-innerimg"+area).append("<div class='div-SlayLeft-inner' style='margin-left:-0.6%;'>"+
																	"<img src='img/materials/bark_edge_ramp_BottomL2.png' width='89%' height:100%; />"+
																 "</div>"+
																 "<div class='div-SlayRight-inner text-right'>"+
																	"<img src='img/materials/bark_edge_ramp_BottomR2.png' width='87%' height:100%; />"+
																 "</div>");
					if(item.pads > 0){
						$('.shock-bottom-sideimg'+area).append("<div class='div-layLeft text-left' style='margin-left:0.4%;'>"+
																		"<img src='img/materials/bark_edge_ramp_Bottom2L2.png' width='97%' />"+
																	"</div>"+
																	"<div class='div-SlayRight text-right'>"+
																		"<img src='img/materials/bark_edge_ramp_Bottom2R2.png' width='97%' />"+
																"</div>");		
						$(".shock-bottom-innerimg"+area).append("<div class='div-botLeft-inner text-left'>"+
																		"<img src='img/materials/"+strMostBottomLayerImgL+"' width='52%' height:100%; />"+
																	"</div>"+
																	"<div class='div-botRight-inner text-right'>"+
																		"<img src='img/materials/"+strMostBottomLayerImgR+"' width='52%' height:100%; />"+
																	"</div>");		
					}
					
				}else if(rampType == "Sand"){
					$('.col-deault'+area).append("<div class='div-layLeft'><img src='img/materials/sand_edge_ramp_L.png' width='90%' /></div><div class='div-layRight text-right'><img  src='img/materials/sand_edge_ramp_R.png' width='90%' /></div>");
					$(".shock-top-innerimg"+area).append("<div class='div-layLeft-inner'>"+
																	"<img src='img/materials/"+strTopLayerImgL+"' width='100%' />"+
																 "</div>"+
																 "<div class='div-layRight-inner'>"+
																	"<img src='img/materials/"+strTopLayerImgR+"' width='100%' />"+
																 "</div>");	
					$(".shock-top-innerimg"+area).append("<div class='div-SlayLeft-inner' style='margin-left:-0.5%;'>"+
																	"<img src='img/materials/sand_edge_ramp_bottomL2.png' width='87%' height:100%; />"+
																 "</div>"+
																 "<div class='div-SlayRight-inner text-right' style='margin-right:-0.2%;'>"+
																	"<img src='img/materials/sand_edge_ramp_bottomR2.png' width='87%' height:100%; />"+
																 "</div>");		
					if(item.pads > 0){
						
						if(item.baseThick1 != 0 && item.baseThick2 != 0){
							//Bottom Layer
							$('.shock-bottom-sideimg'+area).append("<div class='div-layLeft text-left' style='margin-left:0.5%;'>"+
																		"<img src='img/materials/sand_edge_ramp_bottom2L2.png' width='97%' />"+
																	"</div>"+
																	"<div class='div-SlayRight text-right'>"+
																		"<img src='img/materials/sand_edge_ramp_bottom2R2.png' width='97%' />"+
																	"</div>");		
							$(".shock-bottom-innerimg"+area).append("<div class='div-botLeft-inner text-left'>"+
																		"<img src='img/materials/"+strMostBottomLayerImgL+"' width='53%' height:100%; />"+
																	"</div>"+
																	"<div class='div-botRight-inner text-right'>"+
																		"<img src='img/materials/"+strMostBottomLayerImgR+"' width='53%' height:100%; />"+
																	"</div>");			
						}
					}
				}
				if(item.baseMat == "Displaceable"){
					$('.shock-top-innerimg'+area+' .div-GlayLeft-inner').remove();
					$('.shock-top-innerimg'+area+' .div-GlayRight-inner').remove();
					$('.shock-top-innerimg'+area+' .div-SlayLeft-inner').remove();
					$('.shock-top-innerimg'+area+' .div-SlayRight-inner').remove();	
					$('.shock-top-innerimg'+area+' .div-layLeft-inner').remove();
					$('.shock-top-innerimg'+area+' .div-layRight-inner').remove();
					$('.shock-top-innerimg'+area+' .div-layLeft').remove();
					$('.shock-top-innerimg'+area+' .div-layRight').remove();
					$('.shock-top-sideimg'+area+' .div-layLeft').remove(); 
					$('.shock-top-sideimg'+area+' .div-layRight').remove(); 
				}
		}
	});
}

function addRamp(area,ramp,rampType){	
	
	var noOfBags = 0;
	var originalAreaVal = 0;
	var tot = 0;
	shkPadsTot = 0;	
	var retVal = "";
	if(run){
		exe = 2;	
	}else{
		exe = 1;	
	}
		//Get the original area value
	jQuery.each(dataArray, function(index, item) {
		if(item.area.toString() === area.toString()){	
			originalAreaVal = item.areaSize;
		}
	});
	
	jQuery.each(sumArray, function(index, item) {
		if(item.area.toString() === area.toString()){		
			 
			 sumArray.splice(index,1);
			 
			 item.areaSize = Math.ceil(parseInt(originalAreaVal) + ramp);
			
			 
			 if (item.system.toString() === "OneSafe" || item.system.toString() === "Luxafe" || item.system.toString() === "Corplay") {
				 
			    var bagType=""; 
				 
				$('.binder'+item.area).text("");
				$('.bags'+item.area).text("");
				
				if(item.system.toString() === "OneSafe"){	
					bagType = 20;
				}else if(item.system.toString() === "Luxafe"){
					bagType = 25;				
				}else if (item.system.toString() === "Corplay") {
				    bagType = 60;
				}

					noOfBags = calSysBags(calTopLayerBags(item.subBaseType,item.thick2,item.system,bagType),item.areaSize,item.area,item.baseMat,item.system,calPriceTopLayer(item.system));
					calculateBinder(item.leterage,item.baseMat,item.areaSize,noOfBags,item.bagSize,item.area,item.baseThick1,item.baseThick2,item.system,item.topLayer,item.cfh,item.thickness,item.baseLayer1,item.binderName,item.subBaseType,rampType,ramp,item.baseThick3);			
					
				
					$.each(totArray,function(index,items){
						if(items.name.indexOf("Shockpad") >= 0){					
							retVal +='<div class="row"><div class="small-2 columns col-bags2">'+
										'<label class ="txt2">'+items.bags+'</label>'+
									 '</div>'+
									 '<div class="small-1 columns col-bags2">x</div>'+
									 '<div class="small-7 columns col-bags2">Aero Shockpad '+items.name.match(/\d+/)+'mm</div>'+
									 '<div class="small-2 columns col-bags2">'+
										'<label class ="txt2 text-right">$'+addCommas(items.price)+'</label>'+
									 '</div></div>';		
														 
						}
				   });	
				  
				   //$('.shockies').html("");	
				   //$('.shockies').append(retVal);	
							
				
			}else if(item.system.toString() === "CovaRubba" || item.system.toString() === "Traqua"){
				$('.binder'+item.area).text("");
				$('.bags'+item.area).text("");
					
				noOfBags = calSysBags(calTopLayerBags(item.baseMat,item.cmbtLayer,item.system,25),item.areaSize,item.area,item.baseMat,item.system,calPriceTopLayer(item.system));
				calBinder(noOfBags,item.baseMat,item.area,item.areaSize,item.system,item.cmbtLayer,item.binderName,rampType,ramp);	
			}
							
			
			return false;
		}		
	});
}
 /*****************************************************************************************
 *									End of Ramping
 *****************************************************************************************/
/*****************************************************************************************
 *						Calculating color requirments for area
 *****************************************************************************************/
var txtSm = 0;
 function calColour(times,areaSize){	 
  
 	//console.log("Times + " + times + " " + areaSize);
	var totCol = 0;	
	var amount = 0;
	times = times + 1;
	for(var x=0;x<times;x++){	
		
		if($('.txtColM'+x).val() > 0){
			amount = $('.txtColM'+x).val();	
		}else{
			amount =0;
		}		
		txtSm = txtSm + parseInt(amount);	
	}	
	 totCol = txtSm;
	
	 $('.txtColRemM').text(totCol + " bags");		
	
	 if(totCol > areaSize){
		$(".txtColRemM").css({"background-color": "red"});
		$(".txtColRemM").css({"color": "white"});
		
		$(".txtColRemP").css({"background-color": "red"});
		$(".txtColRemP").css({"color": "white"});
		
		$(".txtColSqm").css({"background-color": "red"});
		$(".txtColSqm").css({"color": "white"});
		
	 }else if(totCol < areaSize){
		$(".txtColRemM").css({"background-color": "#ff8c00"});	 
		$(".txtColRemM").css({"color": "#FFFFFF"});
		
		$(".txtColRemP").css({"background-color": "#ff8c00"});	 
		$(".txtColRemP").css({"color": "#FFFFFF"});
		
		$(".txtColSqm").css({"background-color": "#ff8c00"});	 
		$(".txtColSqm").css({"color": "#FFFFFF"});
		
	 }else if(totCol == areaSize){
		$(".txtColRemM").css({"background-color": "#5da423"});
		$(".txtColRemM").css({"color": "white"});
		
		$(".txtColRemP").css({"background-color": "#5da423"});
		$(".txtColRemP").css({"color": "white"});
		
		$(".txtColSqm").css({"background-color": "#5da423"});
		$(".txtColSqm").css({"color": "white"});
	 } 
	 times = 0;	 
	 
 }

 //Calculate total percentage
 function calColourPercentage(times,areaSize){	 
 
 
 	var finalTot = 0;
 	var txtSm = 0,txtSm1=0;
	var amount = 0;
	var amountSqm = 0;
	var tot = 0;
	var ar = $('.hiddenColor').val();
	var aS = 0;
	times = times + 1;
	for(var x=0;x<times;x++){
		
		if($('.txtColM'+x).val() > 0){
			amount = parseFloat($('.txtColM'+x).val());	
			amountSqm = parseFloat($('.txtColSqrMeters'+x).val());	
			
		}else{
			amount =0;
			amountSqm=0;
		}		
		txtSm = txtSm + amount;	
		txtSm1 = txtSm1 + amountSqm;
	}
	
	jQuery.each(sumArray, function(index, item) {
		if(item.area == ar){
			aS = item.areaSize;	
		}
	});
	
	 tot = areaSize - txtSm;
	 totSqm = aS - txtSm1;

	 if (totSqm < 0) {
	     totSqm = 0;
	 }

	 if (parseInt(tot) == 0) {
	     totSqm = 0;
	 }

	// finalTot = tot.toFixed(2);
	// alert(100 - tot);
	 $('.txtColRemP').text(tot + " bags");	
	 $('.txtColSqm').html(totSqm + "m&sup2;");	
	 
	 if(parseInt(tot) > areaSize){
		$(".txtColRemP").css({"background-color": "red"});
		$(".txtColRemP").css({"color": "white"});
		
		$(".txtColSqm").css({"background-color": "red"});
		$(".txtColSqm").css({"color": "white"});
		$(".col-bags-success").html("");
	 }
	 if(parseInt(tot) < areaSize){
		$(".txtColRemP").css({"background-color": "#ff8c00"});	
		$(".txtColRemP").css({"color": "#FFFFFF"});
		
		$(".txtColSqm").css({"background-color": "#ff8c00"});	
		$(".txtColSqm").css({"color": "#FFFFFF"});
		
		$(".col-bags-success").html("");
		$(".col-bags-success").append("<img src='img/bg/exclamation.png' alt='Required' width='65%' data-tooltip class='tip-bottom' title='Click a colour to add more bags' />");
	 }
	 if(parseInt(tot) == 0){
		$(".txtColRemP").css({"background-color": "#5da423"});
		$(".txtColRemP").css({"color": "#FFFFFF"});
		
		$(".txtColSqm").css({"background-color": "#5da423"});
		$(".txtColSqm").css({"color": "#FFFFFF"});
		
		$(".col-bags-success").html("");
		$(".col-bags-success").append("<img src='img/bg/success.png' alt='Success' width='65%' data-tooltip class='tip-bottom' title='You have added all the bags' />");
	 }
	 times = 0;
 }

function calBags(spreadRate,areaSize){
	var noOfBags = 0;
	
	noOfBags = parseFloat(areaSize) / parseFloat(spreadRate);	
	
	return noOfBags;
}

$(".txtColSqrMeters").live('keyup', function(e){
	var part="";
	var value = "",txtValue=0,txtBags=0,colName="",times = 0,bagSize=0,baseMat="",topLayer=0,system="",txtColM=0,amount=0,colTot=0,perVal=0,areaLeft = 0,newBags=0;			
	var h;
	var area = $(".hiddenColor").val();								  
	
	this.value = this.value.replace(/[^0-9]/g,'');
	
	
	if(sumArray.length != 0){
		jQuery.each(sumArray, function(index, item) {
			if(item.area.toString() === area.toString()){	
			    if (item.system.toString() === "OneSafe" || item.system.toString() === "Luxafe") {
					topLayer=item.topLayer;	
					baseMat = item.subBaseType;
			    }else if (item.system.toString() === "Corplay") {
			        topLayer = item.thick2;
			        baseMat = item.subBaseType;
				}else{
					topLayer=item.cmbtLayer;	
					baseMat = item.baseMat;						
				}
				
				areaSize = item.areaSize;
				bagSize = item.bags;
				times = item.times;					
				system=item.system;		
			}				
		});
	}else if(obj.length != 0){
		jQuery.each(obj, function(index, item) {
			if(item.area.toString() === area.toString()){	
			    if (item.systemName.toString() === "OneSafe" || item.systemName.toString() === "Luxafe") {
					topLayer=item.topLayer;	
					baseMat = item.subBaseType;
			    }else if (item.system.toString() === "Corplay") {
			        topLayer = item.thick2;
			        baseMat = item.subBaseType;
				}else{
					topLayer=item.cmbtLayer;	
					baseMat = item.baseMat;		
				}				
				area = item.area;
				areaSize = item.areaSize;
				bagSize = item.totBagSize;
				times = item.times;
				//baseMat = item.subBaseType;			
				system=item.systemName;			
				$(".hiddenColor").val(area);	
			}				
		});		
	}
	
	h = times;
	h = h + 1;
	//console.log("COL " + baseMat);
	for(var x=0;x<h;x++){			
		if($('.txtColSqrMeters'+x).val() > 0){
			amount = $('.txtColSqrMeters'+x).val();	
		}else{
			amount =0;
		}		
		colTot = colTot + parseInt(amount);	
	}	
	
	areaLeft = areaSize - colTot;
	//console.log("Area Left: " + areaLeft);
	part = $(this).attr('class').split(" ")[0];
	part = part.match(/[\d]+$/);
	if(parseInt(colTot) <= parseInt(areaSize)){
		
		value = $(this).val();	
		
		if($(this).val().length <= 0) {
			value = 0;
		}		
		
		colName = $(".col-name"+part).text();
		var bagKG = 25;
		if(getBagSize(colName)){
			bagKG = 20;
		}else{
			bagKG = 25;
		}

		if (system == "Corplay")
		{
		    bagKG = 60;
		}
		
		
		txtBags = Math.ceil(calBags(calTopLayerBags(baseMat,topLayer,system,bagKG),value));
		
		//alert(baseMat + " " + topLayer + " " + system + " " + bagKG);

		$('.txtColM'+part).val();
		txtColM = txtColM + txtBags;
		$('.txtColM'+part).val(txtColM);
		
		perVal= parseInt(txtBags) / bagSize * 100;			
		
		$('.bags-added'+part).html("");
		$('.bags-added-percentage'+part).html("");			
		$('.bags-added'+part).append(txtBags+ " bags");
		$('.bags-added-percentage'+part).append(perVal.toFixed(2)+ "%");
		
		if(isNaN(perVal) || perVal == 0) {
			$('.bags-added'+part).html("");	
			$('.bags-added-percentage'+part).html("");		
		}
						
		$('#msg-color').removeClass();
		$('#msg-color').hide();
		$('#msg-color').addClass('alert-box success radius');
		$('.alert-msg-color').text(""+ txtBags + " bags of "+colName+ " added!");
		$('.alert-box').fadeIn(500);	
		
		calColourPercentage(times,bagSize);
		calColour(times,bagSize);
		plotPie(colName,txtBags);	
		
	}else{
		$('#msg-color').removeClass();
		$('#msg-color').hide();
		$('#msg-color').addClass('alert-box alert radius');
		$('.alert-msg-color').text("You are trying to add more colours than required!");
		$('.alert-box').fadeIn(500);				
	}
	
});

function getBagSize(cName) {

   
	var hasCol = false;
	
		if(cName == 'Terracotta'){
			hasCol= true;
		}else if(cName == 'Aqua'){
			hasCol= true;
		}else if(cName == 'Mid Green'){
			hasCol= true;
		}else if(cName == 'Mid Blue'){
			hasCol= true;
		}else if(cName == 'Purple'){			
			hasCol= true;
		}else if(cName == 'Rose'){
			hasCol= true;
		}else if(cName == 'Dark Green'){	
			hasCol= true;
		}else if(cName == 'Red'){	
			hasCol= true;
		}else if(cName == 'Dark Blue'){	
			hasCol= true;
		}else if(cName == 'Jazz'){	
			hasCol= true;
		}else if(cName == 'Grey'){	
			hasCol= true;
		}else if(cName == 'Sand Yellow'){	
			hasCol= true;
		}else if(cName == 'Auburn'){	
			hasCol= true;
		}else if(cName == 'Emerald Green'){	
			hasCol= true;
		}else if(cName == 'Orchid'){	
			hasCol= true;
		}else if(cName == 'Beige'){	
			hasCol= true;
		}else if(cName == 'Cocoa'){	
			hasCol= true;
		}else if(cName == 'Eggshell'){	
			hasCol= true;			
		}else if(cName == 'Black SBR'){	
			hasCol= true;
		} else if (cName == 'Passion Pop') {
		    hasCol = true;
		} else if (cName == 'Honey Dew') {
		    hasCol = true;
		} else if (cName == 'Ruby Razz') {
		    hasCol = true;
		} else if (cName == 'Pumpkin Pie') {
		    hasCol = true;
		} else if (cName == 'Mint Julep') {
		    hasCol = true;
		} else if (cName == 'Baby Blues') {
		    hasCol = true;
		} else if (cName == 'Outback') {
		    hasCol = true;
		} else if (cName == 'Kakadu') {
		    hasCol = true;
		} else if (cName == 'Keppel') {
		    hasCol = true;
		} else if (cName == 'Daintree') {
		    hasCol = true;
		} else if (cName == 'Pacific') {
		    hasCol = true;
		} else if (cName == 'Harbour') {
		    hasCol = true;
		} else if (cName == 'Oceanic') {
		    hasCol = true;
		} else if (cName == 'Coastal') {
		    hasCol = true;
		} else if (cName == 'Ground') {
		    hasCol = true;
		} else if (cName == 'Jungle') {
		    hasCol = true;
		} else if (cName == 'Phantom') {
		    hasCol = true;
		} else if (cName == 'Envy') {
		    hasCol = true;
		}
		return hasCol;
	
}


$(document).on("click",'.img-controls-add',function(){
		var part="";
		var value = 0;
		var areaSize=0;
		var perVal=0;
		var times = 0;
		var amoynt = 0;
		var h;		
		var colTot = 0;
		var txtValue=0,leftOver=0,spreadRate=0,toSqrMeters=0;
		
		var area = $(".hiddenColor").val();
		
		if(sumArray.length != 0){
			jQuery.each(sumArray, function(index, item) {
				if(item.area.toString() === area.toString()){	
				    if (item.system.toString() === "OneSafe" || item.system.toString() === "Luxafe") {
						topLayer=item.topLayer;	
						baseMat = item.subBaseType;
				    } else if (item.system.toString() === "Corplay") {
				        topLayer = item.topLayer;
				        baseMat = item.subBaseType;
					}else{
						topLayer=item.cmbtLayer;		
						baseMat = item.baseMat;		
					}
					
					areaSize = item.areaSize;
					bagSize = item.bags;
					times = item.times;
						
					system=item.system;		
				}				
			});
			
						
		}else if(obj.length != 0){
			jQuery.each(obj, function(index, item) {
				if(item.area.toString() === area.toString()){	
				    if (item.systemName.toString() === "OneSafe" || item.systemName.toString() === "Luxafe") {
						topLayer=item.topLayer;		
						baseMat = item.subBaseType;
				    } else if (item.systemName.toString() === "Corplay") {
				        topLayer = item.topLayer;
				        baseMat = item.subBaseType;
					}else{
						topLayer=item.cmbtLayer;		
						baseMat = item.baseMat;	
					}				
					area = item.area;
					areaSize = item.areaSize;
					bagSize = item.totBagSize;
					times = item.times;							
					system=item.systemName;			
					$(".hiddenColor").val(area);	
				}				
			});		
		}
		part = $(this).attr('class').split(" ")[0];
		part=part.match(/[\d]+$/);
		
		txtValue = parseInt($('.txtColM'+part).val());
		
		h = times;
		h = h + 1;
		
		for(var x=0;x<h;x++){			
			if($('.txtColM'+x).val() > 0){
				amount = $('.txtColM'+x).val();	
			}else{
				amount =0;
			}		
			colTot = colTot + parseInt(amount);	
		}	
		
		
		if(colTot < bagSize){			
			
			leftOver = bagSize - colTot;
			
			if(leftOver == 1){				
				txtValue = txtValue + 1; 
			}else{
				txtValue = txtValue + 2; 
			}
			
			perVal= parseInt(txtValue) / bagSize * 100;
						
			$('.bags-added'+part).html("");
			$('.bags-added-percentage'+part).html("");			
			$('.bags-added'+part).append(txtValue+ " bags");
			$('.bags-added-percentage'+part).append(perVal.toFixed(2)+ "%");
			
			$('.txtColM'+part).val(txtValue);
			var colName = $(".col-name"+part).text();
			
			var bagKG = 25;
			if(getBagSize(colName)){
				bagKG = 20;
			}else{
				bagKG = 25;
			}

			if (system == "Corplay")
			{
			    bagKG = 60;
			}
				
			spreadRate = calTopLayerBags(baseMat,topLayer,system,bagKG);
			toSqrMeters = txtValue * spreadRate;
			
			//alert(colName + " " + spreadRate + " " + bagSize);
						
			$('.txtColSqrMeters'+part).val(Math.floor(toSqrMeters));			
			
			if(colTot <= bagSize) {				
			
				calColourPercentage(times,bagSize);
				calColour(times,bagSize);
				plotPie(colName,txtValue);		
				
				$('#msg-color').removeClass();
				$('#msg-color').hide();
				$('#msg-color').addClass('alert-box success radius');
				$('.alert-msg-color').text(""+ txtValue + " bags of "+colName+ " added!");
				$('.alert-box').fadeIn(500);				
		
			}else{
				alert("You have already filled the area");	
				return false;
			}
		}else{
			
			$('#msg-color').removeClass();
			$('#msg-color').hide();
			$('#msg-color').addClass('alert-box alert radius');
			$('.alert-msg-color').text("You have filled the area");
			$('.alert-box').fadeIn(500); 	
		}
		if(colTot == bagSize){
			$('#msg-color').removeClass();
			$('#msg-color').hide();
			$('#msg-color').addClass('alert-box success radius');
			$('.alert-msg-color').text("Success! You have filled the area. Now click on ADD TO AREA to add these colours to your area");
			$('.alert-box').fadeIn(500);
		}
});

$(document).on("click",'.img-controls-remove',function(){
		var part="",value = "",areaSize=0,perVal=0,times = 0,amoynt = 0,h,colTot = 0,txtValue=0,spreadRate=0,toSqrMeters=0,leftOver=0;
		var area = $(".hiddenColor").val();		
		
		part = $(this).attr('class').split(" ")[0];
		part=part.match(/[\d]+$/);
		
		txtValue = parseInt($('.txtColM'+part).val());
		
		if(txtValue > 0){
			
			/*jQuery.each(sumArray, function(index, item) {
				if(item.area.toString() === area.toString()){	
					if(item.system.toString() === "OneSafe" || item.system.toString() === "Luxafe"){
						topLayer=item.topLayer;		
					}else{
						topLayer=item.cmbtLayer;		
					}					
					areaSize = item.areaSize;
					bagSize = item.bags;
					times = item.times;
					baseMat = item.baseMat;			
					system=item.system;		
				}				
			});*/
			
			
		if(sumArray.length != 0){
			jQuery.each(sumArray, function(index, item) {
				if(item.area.toString() === area.toString()){	
				    if (item.system.toString() === "OneSafe" || item.system.toString() === "Luxafe") {
				        topLayer = item.topLayer;
				    }else if (item.system.toString() === "Corplay") {
				        topLayer = item.thick2;
					}else{
						topLayer=item.cmbtLayer;		
					}
				    
					areaSize = item.areaSize;
					bagSize = item.bags;
					times = item.times;
					baseMat = item.baseMat;			
					system=item.system;		
				}				
			});
		}else if(obj.length != 0){
			jQuery.each(obj, function(index, item) {
				if(item.area.toString() === area.toString()){	
				    if (item.systemName.toString() === "OneSafe" || item.systemName.toString() === "Luxafe") {
				        topLayer = item.topLayer;
				    } else if (item.systemName.toString() === "Corplay") {
				        topLayer = item.thick2;
					}else{
						topLayer=item.cmbtLayer;		
				    }

				    
					area = item.area;
					areaSize = item.areaSize;
					bagSize = item.totBagSize;
					times = item.times;
					baseMat = item.baseMat;			
					system=item.systemName;			
					$(".hiddenColor").val(area);	
				}				
			});		
		}		
			
			
			
			txtValue = txtValue - 2; 			
			
			h = times;
			h = h + 1;
			
			for(var x=0;x<h;x++){			
				if($('.txtColM'+x).val() > 0){
					amount = $('.txtColM'+x).val();	
				}else{
					amount =0;
				}		
				colTot = colTot + parseInt(amount);	
			}
			
			leftOver = bagSize - colTot;
			
			if(leftOver <= 0){				
				txtValue = txtValue + 1; 
			}else{
				txtValue = txtValue + 1; 
			}
			perVal= parseInt(txtValue) / bagSize * 100;
			
			$('.bags-added'+part).html("");
			$('.bags-added-percentage'+part).html("");		
			$('.bags-added'+part).append(txtValue+ " bags");
			$('.txtColM'+part).val(txtValue);			
			$('.bags-added-percentage'+part).append(perVal.toFixed(2)+ "%");
			var colName = $(".col-name"+part).text();
			
			var bagKG = 25;
			if(getBagSize(colName)){
				bagKG = 20;
			}else{
				bagKG = 25;
			}

			if (system == "Corplay") {
			    bagKG = 60;
			}


			
			spreadRate = calTopLayerBags(baseMat,topLayer,system,bagKG);
			toSqrMeters = txtValue * spreadRate;
            
			if(toSqrMeters == 0){
				
				toSqrMeters = "";
			}else{
				toSqrMeters = Math.floor(toSqrMeters);
			}
			$('.txtColSqrMeters'+part).val(toSqrMeters);
			
			if(colTot >= 0 && colTot <= bagSize) {	
				calColourPercentage(times,bagSize);
				calColour(times,bagSize);
				plotPie(colName,txtValue);		
				
				$('#msg-color').removeClass();
				$('#msg-color').hide();
				$('#msg-color').addClass('alert-box success radius');
				$('.alert-msg-color').text("You removed 1 bag of "+colName+ "!");
				$('.alert-box').fadeIn(500);
				
			}else{
				alert("You have already filled the area");	
				return false;
			}
		}
		if(txtValue == 0){
			$('.bags-added'+part).html("");
			$('.bags-added-percentage'+part).html("");		
		}
		
});



//change to percentage
/*$(".txtColAmount").live('keyup', function(){
    	var part="";
		var value = 0;
		var areaSize=0;
		var perVal=0;
		var times = 0;
		var amoynt = 0;
		var h;		
		var colTot = 0;
				
		var area = $(".hiddenColor").val();
		
		value= $(this).val();
		
	
			var re = value.match(/[^0-9]/g, ''); 
			
			jQuery.each(sumArray, function(index, item) {
				if(item.area.toString() === area.toString()){	
					bagSize = item.bags;
					times = item.times;
				}			
			});
			h = times;
			h = h + 1;
			
			for(var x=0;x<h;x++){			
				if($('.txtColM'+x).val() > 0){
					amount = $('.txtColM'+x).val();	
				}else{
					amount =0;
				}		
				colTot = colTot + parseInt(amount);	
			}
			
			if(re == null) {			
				  if(colTot <= bagSize) {			
			
					$(this).css({"background-color": "white"});	
					$(this).css({"color": "black"});
					
					part = $(this).attr('class').split(" ")[0];
					part=part.match(/[\d]+$/);
					var colName = $(".col-name"+part).text();			
					
								
						perVal= parseInt(value) / bagSize * 100;
						
						if (isNaN(perVal)) {	
							perVal = 0;
							
						}
						$('.txtColP'+part).val(perVal.toFixed(2));
					
					calColourPercentage(times,bagSize);
					
					calColour(times,bagSize);
					plotPie(colName,value);		
					
					var x = $('.txtColRemM').text();
				 }else{
					
					alert("Your entered amount is greater than the required amount");	
					$(this).css({"background-color": "red"});	
					$(this).css({"color": "white"});
					
					//this.value = this.value;
					this.value = 0;
				 } 
			}else{
				this.value = this.value.replace(/[^0-9]/g,'');
			}
			
			h=0;
	
});*/	
$("#txtRampPerimeter").live('keyup', function(){
	this.value = this.value.replace(/[^0-9]/g,'');									  
});

$("#txtRampWidth").live('keyup', function(){
	this.value = this.value.replace(/[^0-9]/g,'');									  
});

//change to square meters
$(".txtColPercentage").live('keyup', function(){
    	var part="";
		var value = 0;
		var areaSize=0;
		var perVal=0;
		var times = 0;
		
		var area = $(".hiddenColor").val();
		
		value= parseInt($(this).val());
		
		part = $(this).attr('class').split(" ")[0];
		part=part.match(/[\d]+$/);
		var colName = $(".col-name"+part).text();
		
		jQuery.each(sumArray, function(index, item) {
			if(item.area.toString() === area.toString()){	
				areaSize = item.areaSize;
				times = item.times;
			}			
			//return false;			
		});
		
		perVal= value * areaSize / 100;
		
		$('.txtColM'+part).val(Math.ceil(perVal).toFixed(0));
		
		calColour(times,areaSize);
		//calColourPercentage(times,areaSize);
		plotPie(colName,Math.ceil(perVal).toFixed(0));		
});


var chartData = [];		
var colData=[];
var pColData = [];

var tot = 0;
var chart;

function plotPie(color,value){	
	//console.log("COL " + color + " VAL " + value);
	var y = 0;	
	var areaSize = 0;
	var added = false;
			
	var area = $(".hiddenColor").val();	
	
	if(sumArray.length != 0){
		jQuery.each(sumArray, function(index, item) {
			if(item.area.toString() === area.toString()){						
				bagSize = item.bags;				
			}				
		});
	}else if(obj.length != 0){
		jQuery.each(obj, function(index, item) {
			if(item.area.toString() === area.toString()){				
				bagSize = item.totBagSize;				
			}				
		});		
	}
	
	y = bagSize - txtSm;	
	
	
	
	//console.log("area size: " + areaSize + " " + y);
	
	$.each(chartData, function(index,item){								   
		if(item.area.toString() === area.toString() && item.title == color){
			chartData.splice(index,1);	
			colData.splice(index,1);	
			
			return false;
		}	
	});			
	chartData.push({area:area,title:color,value:value},{area:area,title: "Remainder",value: y});
	var hex = getHexByColName(color);
		
	colData.push(hex);			
	
	
	$.map(pColData, function(index, indexInArray) {
		if(index.area.toString() == area.toString() && index.title == color) {			
			
		   index.area = area;
		   index.title = color;
		   index.value = value;
		   
		   added = true;
		}
		return false;
	});
	if(!added && value != 0){
		pColData.push({area:area,title:color,value:value});	
	}
	
	$.each(pColData, function(index,item){								   
		if(item.value == 0){
			pColData.splice(index,1);	
			return false;
		}	
	});			
		
	chart.validateData();			
		
	chartData.splice(-1,1);			
	txtSm = 0;
	
	$.each(chartData, function(index, item) {
		if(item.title == "#FFFFFF"){
			chartData.splice(index,1);	
			return false;
		}	
	});	
	
}
var bool = false;
var areaSize; 
var bagSize;

function loadPie(bagSize){
	
		
	var value = 0;
	
	tot = tot + value;
	y = bagSize - tot;
	
	chartData.push({area:1,title: "Remainder",value: y});	
	colData.push("#FFFFFF");	
	
	chart = new AmCharts.AmPieChart();
	chart.valueField = "value";
	chart.titleField = "title";
	chart.dataProvider = chartData;
	chart.fontSize = 13,
	chart.color = "#666666";
	chart.colors=colData;
	chart.labelRadius=8;
	chart.labelsEnabled=true;
	chart.labelText = "[[title]]<br>[[value]] bags";
	chart.radius = 150;
	chart.write("chartdiv");
	/*jQuery.each(chartData, function(index, item) {
		console.log(item);								   
	});
	jQuery.each(colData, function(index, item) {
		console.log(item);								   
	});*/
	
	chartData.length = 0;
	colData.length = 0;
	
}

function openColor(area){
var areaBagSize = 0,size=0;
	if($('#id-color'+area).hasClass("disabled")){
	
	}else{
	
		$('#color').foundation('reveal', 'open');
		$('#color').bind('opened', function() {
		$(this).foundation('section', 'reflow');//Reflow the tabs
			
			
			jQuery.each(sumArray, function(index, item) {
				if(item.area.toString() === area.toString()){					
					 //areaBagSize = item.bags;		
					// areaS = item.areaSize;
					 var ind=getIndexBySystem(item.system);	
					 size = getArrSize(ind);
  					 item.times = size;
					 areaSize = item.areaSize;
					 bagSize = item.bags;		
				}	
			});		
  
			$('.data-carnivale').html(""); 
			$('.data-onesafe').html(""); 
			$('.data-CovaRubba1').html(""); 
			$('.data-CovaRubba2').html(""); 
			$('.colors-gezoflex').html(""); 
			$('.colors-opal').html(""); 
			$('.data-traqua').html("");
			$('.data-corka').html("");
			//$('.section-traqua').html("");
			
			$('.color-data').html(""); 
			$('.txtColRemM').text(0 + " bags");
			$('.txtColRemP').text(bagSize + " bags");
			$('.txtColSqm').html(areaSize + "m&sup2");
			$('#lblAreaSize').html(areaSize + "m&sup2; required");
			$(".col-bags-success").html("");
			
			$(".txtColRemM").css({"background-color": "#ff8c00"});	 
			$(".txtColRemM").css({"color": "#FFFFFF"});
			
			$(".txtColRemP").css({"background-color": "#ff8c00"});	 
			$(".txtColRemP").css({"color": "#FFFFFF"});
			
			$(".txtColSqm").css({"background-color": "#ff8c00"});	 
			$(".txtColSqm").css({"color": "#FFFFFF"});
			
			$(".col-bags-success").append("<img src='img/bg/exclamation.png' alt='Required' width='65%' data-tooltip class='tip-bottom' title='Click a colour to add more bags' />");
			
			$('#msg-color').removeClass();
			$('#msg-color').hide();
			$('#msg-color').addClass('alert-box info radius');
			$('.alert-msg-color').text("Click on + to add colours or - to remove colours. If you have a value, enter in to the square meter box");
			$('.alert-box').fadeIn(500); 
			
			var system = $(".systemType"+area).find("option:selected").text();	
			if(system != "Select System"){
				loadColours(system,area,size,bagSize);								
				$(".hiddenColor").val(area);							
					window.setTimeout(loadPie(bagSize), 1);	
			}			
		});  	
		
		$('#color').bind('closed', function() {			
						
			var result = $.grep(totArray, function(e){ return e.area == area && e.col == 1; });
			if(result.length != 0) {					
				displayMessages("alert-box success radius","<img src='img/bg/success.png' alt='Success' width='1.5%'/> Your selected colours have been added to Area"+area);
			}else if($('#chkBoxNoCol').is(":checked")){
				displayMessages("alert-box success radius","<img src='img/bg/success.png' alt='Success' width='1.5%'/> You haven't selected any colours for Area"+ area + ". Add colours later");
			}else{
				displayMessages("alert-box alert radius","<img src='img/bg/exclamation.png' alt='Error' width='1.5%'/> You haven't selected any colours for Area"+ area);
			}
			
			//displayMessages("alert-box success radius","<img src='img/bg/success.png' alt='Success' width='2.5%'/> Your selected colours have been added to Area"+area);
			$("#chkBoxNoCol").prop("checked", false);	
			//pColData.length = 0;
			chartData.length = 0;
			colData.length = 0;
			colArr.length= 0;//Update Colour
			tot=0;
			txtSm = 0;
			bool = true;
			
			
			
			
			for(var i = pColData.length; i--;){
				if (pColData[i].area.toString() === area.toString()) pColData.splice(i, 1);
			}
			
			plotPie("#FFFFFF",0);
		});
		
	}
}


function reCalculatePercentage(area,append,value){
	
	var perVal = 0;
	
	
	jQuery.each(sumArray, function(index, item) {
		if(item.area.toString() === area.toString()){	
			areaSize = item.bags;	
			times = item.times;
		}			
		//return false;			
	});	
	perVal= value / areaSize * 100;	
	$('.txtColP'+append).val(perVal.toFixed(2));	
	
	
	calColour(times,areaSize);
	calColourPercentage(times,areaSize);
	
}

function getRandomColour(area){
	var col = "",randomNo = 0, colLength = 0;
	
	colLength = pColData.length;
	
	randomNo = Math.floor((Math.random()*colLength)+0);
	
	
	
	$.each(pColData, function(index, item) {
		if(index == randomNo){
			col = item.title;	
		}
	
	});



return col;

}
var colArr = [];
function addColour(){
	var colStr = "",innStr="",colStrInner = "";
	var area = $(".hiddenColor").val();	
	var topLayer;
	var noOfBags = 0,arrLength=0;
	var cc = 0,y = 0, p=0,u=0,quoteNo=0,jobName="",areaSize=0,times=0,topLayer=0,cmbtLayer=0,color=0,system="",sysName,bagSize=0;
	
	colTotal=0; //clear the top layer total		
	$("#dataColour"+area).html("");
	
	var amountAdded = $(".txtColRemM").text();			
	
	var reqAmount = 0;
		
	if(sumArray.length != 0){
		jQuery.each(sumArray, function(index, item) {
			if(item.area.toString() === area.toString()){	
				if(item.system === "CovaRubba" || item.system === "Traqua"){
				    topLayer = item.cmbtLayer;
				    system=item.system;		
				} else if (item.system === "OneSafe" || item.system === "Luxafe" || item.system === "Corplay") {
				    topLayer = item.topLayer;	
			}
				
				areaSize = item.areaSize;
				bagSize = item.bags;
				baseMat = item.baseMat;			
				system=item.system;		
				
			}				
		});
	}else if(obj.length != 0){//Search and add colour		
		jQuery.each(obj, function(index, item) {
			if(item.area.toString() === area.toString()){	
				if(item.system === "CovaRubba" || item.system === "Traqua"){
					topLayer = item.cmbtLayer;
				}else if(item.system === "OneSafe" || item.system === "Luxafe"|| item.system === "Corplay"){
					topLayer = item.topLayer;	
				}	
					jobName = item.jobName;
					quoteNo = item.QuoteNo;
					area = item.area;
					areaSize = item.areaSize;
					bagSize = item.totBagSize;
					color = item.color;
					baseMat = item.baseMat;			
					system=item.systemName;		
					times = item.times;
					topLayer = item.topLayer;
					cmbtLayer = item.cmbtLayer;
					$(".hiddenColor").val(area);						
					
			}
		});		
		colArr.length=0;
				
		jQuery.each(obj, function(index, item) {
			if(item.area.toString() === area.toString()){	
					sysName=item.systemName;							
			}
		});		
			
		
		jQuery.each(pColData, function(index, items) {
			colArr.push({QuoteNo:quoteNo,jobName:jobName,area:items.area,areaSize:areaSize,system:system,color:1,totBagSize:bagSize,times:times,topLayer:topLayer,cmbtLayer:cmbtLayer,name:items.title,bags:items.value,baseMat:baseMat,price:getPriceUpdatedColour(25,items.title,items.value)});	
			
		});
		/******************ADDING COLOURS TO THE DATABASE****************************/
		
		var jsonColArray = JSON.stringify(colArr); 
					
		$.ajax({
			type: "POST",
			url: "update_estimate.php",
			data: {colObj:jsonColArray},
			cache: false,
			success: function(response)
			{
				//alert(response);
				if(response.toString() == "1"){		
					
					//clearArrays();
				}else{
				//	displayMessages(response);
				//	return false;
				}
			}		
		});	
		
	}	
	//console.log(amountAdded + " " + areaSize);	
	if (parseInt(amountAdded) < parseInt(bagSize)) {

	    reqAmount = parseInt(bagSize) - parseInt(amountAdded);
	    
	    if (reqAmount < 0 || reqAmount == "NaN")
	    {
	        reqAmount = 0;
	    }
		
		$('#msg-color').removeClass();
		$('#msg-color').hide();
		$('#msg-color').addClass('alert-box alert radius');
		$('.alert-msg-color').text("You need to add another "+parseInt(reqAmount)+ " bags");
		$('.alert-box').fadeIn(500);
		
		return false;
	}else{
		
		arrLength = pColData.length;
		var x = arrLength -1;
		pColData.sort(function(a,b){
			return a.value-b.value;
		});
		
		for(var c=0; c < 12; c++){	
			colStr = colStr + "<div class='small-1 columns cls-img"+area+c+"' style='padding-left:0;padding-right:0;margin-bottom:-1%;'></div>";
			
			for(var x=0; x < 120; x++){
				colStrInner = colStrInner + "<div class='small-1 columns' style='padding-left:0;padding-right:0;margin-top:-30%;'>"+getImage(getRandomColour(area))+"</div>";						
			}	
		
		}		
	$('.bags'+area).html("");
	//Calculate no of bags
	$.each(pColData, function(index, item) {							  
		if(item.area.toString() == area.toString()) {				
			displayCols(area,item.value,item.title);			
		}
	});
	
	var hasCol = false;
	
	$.each(pColData, function(index, item) {		
		
		if(item.title == 'Terracotta'){
			hasCol= true;
		}else if(item.title == 'Aqua'){
			hasCol= true;
		}else if(item.title == 'Mid Green'){
			hasCol= true;
		}else if(item.title == 'Mid Blue'){
			hasCol= true;
		}else if(item.title == 'Purple'){			
			hasCol= true;
		}else if(item.title == 'Rose'){
			hasCol= true;
		}else if(item.title == 'Dark Green'){	
			hasCol= true;
		}else if(item.title == 'Red'){	
			hasCol= true;
		}else if(item.title == 'Dark Blue'){	
			hasCol= true;
		}else if(item.title == 'Jazz'){	
			hasCol= true;
		}else if(item.title == 'Grey'){	
			hasCol= true;
		}else if(item.title == 'Sand Yellow'){	
			hasCol= true;
		}else if(item.title == 'Auburn'){	
			hasCol= true;
		}else if(item.title == 'Emerald Green'){	
			hasCol= true;
		}else if(item.title == 'Orchid'){	
			hasCol= true;
		}else if(item.title == 'Beige'){	
			hasCol= true;
		}else if(item.title == 'Cocoa'){	
			hasCol= true;
		}else if(item.title == 'Eggshell'){	
			hasCol= true;
		}else if(item.title == 'Black SBR'){	
			hasCol= true;	
		}else if (item.title == 'Passion Pop') {
		    hasCol = true;
		}else if (item.title == 'Honey Dew') {
		    hasCol = true;
		}else if (item.title == 'Ruby Razz') {
		    hasCol = true;
		}else if (item.title == 'Pumpkin Pie') {
		    hasCol = true;
		}else if (item.title == 'Mint Julep') {
		    hasCol = true;
		}else if (item.title == 'Baby Blues') {
		    hasCol = true;
		}else if (item.title == 'Outback') {
		    hasCol = true;
		}else if (item.title == 'Kakadu') {
		    hasCol = true;
		}else if (item.title == 'Keppel') {
		    hasCol = true;
		}else if (item.title == 'Daintree') {
		    hasCol = true;
		}else if (item.title == 'Pacific') {
		    hasCol = true;
		}else if (item.title == 'Harbour') {
		    hasCol = true;
		}else if (item.title == 'Oceanic') {
		    hasCol = true;
		}else if (item.title == 'Coastal') {
		    hasCol = true;
		}else if (item.title == 'Ground') {
		    hasCol = true;
		}else if (item.title == 'Jungle') {
		    hasCol = true;
		}else if (item.title == 'Phantom') {
		    hasCol = true;
		} else if (item.title == 'Envy') {
		    hasCol = true;
		}

		return false;
	});
	
	var leterage =0,bm="",as=0,b=0,bs=0,a="",bt1=0,bt2=0,bt3=0,s="",tl=0,c="",t=0,bl1=0,bn="",sbt="",rt="",r="";

	/**/
	jQuery.each(sumArray, function(index, item) {
		$.each(pColData, function(index, items) {									   
			if(items.area.toString() === item.area.toString()){							
			    if (item.system.toString() === "OneSafe" || item.system.toString() === "Corplay") {
					if(item.bagName == "CSBR" ||items.title == "Terracotta" || items.title == "Aqua" || items.title == "Mid Green" || items.title == "Mid Blue" || items.title == "Purple" || items.title == "Rose" || items.title == "Dark Green" || 
					   items.title == "Red" || items.title == "Dark Blue" || items.title == "Jazz" || items.title == "Grey" || items.title == "Sand Yellow" || items.title == "Auburn" || items.title == "Emerald Green" || items.title == "Orchid" || 
					   items.title == "Beige" || items.title == "Cocoa" || items.title == "Eggshell" || items.title == "Black SBR" || items.title == "Passion Pop" || items.title == "Honey Dew" || items.title == "Ruby Razz" || items.title == "Pumpkin Pie" || items.title == "Mint Julep" || items.title == "Baby Blues"
                        || items.title == "Outback" || items.title == "Kakadu" || items.title == "Keppel" || items.title == "Daintree" || items.title == "Pacific" || items.title == "Harbour" || items.title == "Oceanic" || items.title == "Coastal"
                        || items.title == "Ground" || items.title == "Jungle" || items.title == "Phantom" || items.title == "Envy") {
						leterage = 4;	
					//	calculateBinder(leterage,item.baseMat,item.areaSize,item.bags,item.bagSize,item.area,item.baseThick1,item.baseThick2,item.system,item.topLayer,item.cfh,item.thickness,item.baseLayer1,item.binderName,item.subBaseType,item.rampType,item.ramp);	   
							bm = item.baseMat;
							as=item.areaSize;
							b = item.bags;
							bs= item.bagSize;
							a= item.area;
							bt1=item.baseThick1;
							bt2=item.baseThick2;
							bt3=item.baseThick3;
							s=item.system;
							tl=item.topLayer;
							c=item.cfh;
							t=item.thickness;
							bl1=item.baseLayer1;
							bn=item.binderName;
							sbt=item.subBaseType;
							rt=item.rampType;
							r = item.ramp;

					}else if (items.title == "Mahogany" || items.title == "Turquoise" || items.title == "Cherry" || items.title == "Sapphire" || items.title == "Mandarin" || items.title == "Indigo" || items.title == "Pine" || items.title == "Plum" ||
                      items.title == "Lemon" || items.title == "Walnut" || items.title == "Meadow" || items.title == "Cedar" || items.title == "Lime" || items.title == "Beech" || items.title == "Spruce" || items.title == "Ash" || items.title == "Jade" || items.title == "Mardi-Gras") {
					    leterage = 5.5;
							
			   		}else{		
						leterage = 5;		
						bm = item.baseMat;
							as=item.areaSize;
							b = item.bags;
							bs= item.bagSize;
							a= item.area;
							bt1=item.baseThick1;
							bt2=item.baseThick2;
							bt3=item.baseThick3;
							s=item.system;
							tl=item.topLayer;
							c=item.cfh;
							t=item.thickness;
							bl1=item.baseLayer1;
							bn=item.binderName;
							sbt=item.subBaseType;
							rt=item.rampType;
							r=item.ramp;			
					}					
					
					
			   }		
			   calculateBinder(leterage,bm,as,b,bs,a,bt1,bt2,s,tl,c,t,bl1,bn,sbt,rt,r,bt3);	  
			   return false;
			}				
			
		});
		
	});
	
	 
	
	calcTotals(area);
	//reCalcTotals(area,areaSize);
	
	$('#id-color'+area).addClass('small button expand [radius round] full-width disabled');
	$('#id-ramp'+area).addClass('small button expand [radius round] full-width disabled');
	$('#color').foundation('reveal', 'close');
	
	chart.clear();
    
	drawColPie(area,bagSize,system);
	
	updateSidebar();
	
	
	}
}

function drawColPie(area,bagSize,system){
	var pieCols = [],str = "";	
	var defCols = [];
	
	if(pColData.length != 0) {
		$.each(pColData, function(index,item){
			pieCols.push({title:item.title,value:item.value});			
		});
		str = "[[title]]<br>[[value]] bags ([[percents]]%)";
	}else{	
		
		defCols.push(getColBySystem(system));
		colData = $.extend(true,[],defCols);
		//colData.push(getColBySystem(system));
		pieCols.push({title:getColNameBySystem(system),value:21});
		str = "Default colour<br>[[title]]";
		defCols.length = 0;
	}
		
	setAreaSize(bagSize);
	var chartData = pieCols;			
	var chart = new AmCharts.AmPieChart();
	chart.valueField = "value";
	chart.titleField = "title";
	chart.dataProvider = chartData;
	chart.labelsEnabled=false;
	chart.balloonText = str;
	//chart.autoMargins = false;
	chart.marginTop = 0;
	chart.marginBottom = 0;
	chart.marginLeft = 2;
	chart.marginRight = 2;
	chart.pullOutRadius = 0;
	chart.colors=colData;
	$('.topl-img'+area).html("");
	$('.topl-img'+area).append('<div id="col-pie'+area+'" style="width:100%; height: 150px;"></div>'+getGranSize(system));	
	
	chart.write("col-pie"+area);	
	pieCols.length=0;	
	colData.length=0;
	
} 
function getColBySystem(system){
	var col="";
	if(system == "OneSafe"){
		col = "#2C6336";
	}else if(system == "Luxafe"){
		col = "#7FB56D";
	}else if(system == "CovaRubba"){
		col = "#40804B";	
	}else if(system == "Traqua"){
		col = "#55A16D";	
	}else if (system == "Corplay") {
	    col = "#AD383E";
	}
	
	return col;
}
function getColNameBySystem(system){
	var col="";
	if(system == "OneSafe"){
		col = "Emerald Green";
	}else if(system == "Luxafe"){
		col = "Green Apple";
	}else if(system == "CovaRubba"){
		col = "Shamrock";	
	}else if(system == "Traqua"){
		col = "Ocean Teal";	
	}else if (system == "Corplay") {
	    col = "Cherry";
	}
	return col;
}
function getPriceUpdatedColour(times,product,bags){
	var price = 0,tot=0,preProduct="",preBags="",prePrice="";
	
	$.each(priceObj,function(index,item){
		
		if(item.name === product){
			price = item.price;	
		}
	});	
	tot = (price * times) * bags;	
		
	return  addCommas(tot.toFixed(2));
}





function copyColArrays(){
	
	//copying the chartData Array
	var newChartData = $.extend(true,[],chartData);
	var newColData = $.extend(true,[],colData);
	
	jQuery.each(newChartData, function(index, item) {	
		//console.log(item.title + " " + item.value);		
	});
	jQuery.each(newColData, function(index, item) {	
		//console.log(item);		
	});
	
}
function reAddCols(area){	
	
	var newChartData = $.extend(true,[],chartData);
	var newColData = $.extend(true,[],colData);
	
	chart.dataChanged = true;                                    
	chart.dataProvider = newChartData;
	chart.colors=newColData;
	chart.validateData();
}

function getHexByColName(colName){
	//console.log(colName);
	
	var hex="";
	if(colName == "Sunlight"){
		hex = "#BAB066";
	}else if(colName == "Surf Foam"){
		hex = "#DBDAD3";
	}else if(colName == "Beach Sand"){
		hex = "#E6C8AE";
	}else if(colName == "Ocean Teal"){
		hex = "#80D18F";
	}else if(colName == "Pacific Blue"){
		hex = "#5C8FD6";
	}else if(colName == "Chrome Yellow"){
		hex = "#D9DE59";
	}else if(colName == "Flame Orange"){
		hex = "#F76548";
	}else if(colName == "Chili Red"){
		hex = "#D12626";
	}else if(colName == "Phantom Purple"){
		hex = "#C289D6";
	}else if(colName == "Mocha"){	
		hex = "#5E574D";
	}else if(colName == "Tobacco"){	
		hex = "#69351E";
	}else if(colName == "Cork"){	
		hex = "#CC9F58";
	}else if(colName == "Clay"){	
		hex = "#CC5933";
	}else if(colName == "Claret"){	
		hex = "#8C2323";
	}else if(colName == "Shamrock"){	
		hex = "#30A167";
	}else if(colName == "Gravel"){	
		hex = "#B8B4B4";
	}else if(colName == "Navy"){	
		hex = "#385494";
	}else if(colName == "Fairway"){	
		hex = "#2F6944";
	}else if(colName == "Aqua"){//Onesafe	
		hex = "#48CDD4";
	}else if(colName == "Auburn"){//Onesafe	
		hex = "#3d1906";	
	}else if(colName == "Cocoa"){	
		hex = "#756666";
	}else if(colName == "Dark Blue"){	
		hex = "#13339C";
	}else if(colName == "Dark Green"){	
		hex = "#21703C";
	}else if(colName == "Eggshell"){	
		hex = "#E0E0E0";
	}else if(colName == "Beige"){	
		hex = "#B59C67";
	}else if(colName == "Grey"){	
		hex = "#B5B5B5";	
	}else if(colName == "Orchid"){	
		hex = "#CC7EC7";
	}else if(colName == "Purple"){	
		hex = "#8A7ECC";
	}else if(colName == "Red"){	
		hex = "#CC3535";
	}else if(colName == "Rose"){	
		hex = "#C98BB2";
	}else if(colName == "Sand Yellow"){	
		hex = "#F2E9A0";
	}else if(colName == "Emerald Green"){	
		hex = "#348051";
	}else if(colName == "Terracotta"){	
		hex = "#E04B22";
	}else if(colName == "Jazz"){	
		hex = "#944EBF";
	}else if(colName == "Mid Blue"){	
		hex = "#3243FA";
	}else if(colName == "Sky Blue"){	
		hex = "#3E92ED";
	}else if(colName == "Rainbow Blue"){	
		hex = "#3E55ED";
	}else if(colName == "Sunshine Yellow"){	
		hex = "#E3E34F";
	}else if(colName == "Ochre Gold"){	
		hex = "#EDBE3E";
	}else if(colName == "Rainforest Green"){	
		hex = "#70BA76";
	}else if(colName == "Moonlight"){	
		hex = "#DEDEDE";
	}else if(colName == "Green Apple"){	
		hex = "#30C25E";
	}else if(colName == "Ghost Gum"){	
		hex = "#D1D1D1";
	}else if(colName == "Grape Purple"){	
		hex = "#DB67E6";
	}else if(colName == "Tangerine"){	
		hex = "#F0604D";
	}else if(colName == "Island Teal"){	
		hex = "#8CD496";
	}else if(colName == "Red Earth"){	
		hex = "#E87272";
	}else if(colName == "Cashew"){	
		hex = "#E3C9A6";
	}else if(colName == "Cream"){	
		hex = "#EDE1D1";
	}else if(colName == "Cocoa Bean"){	
		hex = "#BF955A";
	}else if(colName == "Storm Sky"){	
		hex = "#4D4B4B";
	}else if(colName == "Granite Grey"){	
		hex = "#B0B0B0";
	}else if(colName == "Mid Green"){
		hex = "#458A5A";
	}else if(colName == "Passion Pop"){//Carnivale
		hex = "#5DBCD2";
	}else if(colName == "Honey Dew"){
		hex = "#265716";
	}else if(colName == "Ruby Razz"){
		hex = "#5C1434";
	}else if(colName == "Pumpkin Pie"){
		hex = "#E36424";
	}else if(colName == "Mint Julep"){
		hex = "#0A6E11";
	}else if(colName == "Baby Blues"){
		hex = "#1D4382";
	}else if(colName == "Outback"){
		hex = "#540B25";
	}else if(colName == "Kakadu"){
		hex = "#707019";
	}else if(colName == "Keppel"){
		hex = "#094D0B";
	}else if(colName == "Daintree"){
		hex = "#083309";
	}else if(colName == "Pacific"){
		hex = "#436799";
	}else if(colName == "Harbour"){
		hex = "#853A3A";
	}else if(colName == "Oceanic"){
		hex = "#4C96BA";
	}else if(colName == "Coastal"){
		hex = "#99A339";
	}else if(colName == "Ground"){
		hex = "#4F142B";
	}else if(colName == "Jungle"){
		hex = "#1C7023";
	}else if(colName == "Phantom"){
		hex = "#B04DD1";
	}else if(colName == "Envy"){
		hex = "#344A28";
	}else if(colName == "Black"){
		hex = "#242424";
	}else if(colName == "Light Blue 084.1040" || colName == "Light Blue 084.0515"){
		hex = "#2781bb";
	}else if(colName == "Blue 064.1040" || colName == "Blue 064.0515"){
		hex = "#0071b5";
	}else if(colName == "Bright Green 087.1040" || colName == "Bright Green 087.0515"){
		hex = "#4d8542";
	}else if(colName == "Yellow Ochre 069.1040"){
		hex = "#d0b173";
	}else if(colName == "Coral Red 082.1040" || colName == "Coral Red 082.0515"){
		hex = "#cc515e";
	}else if(colName == "Lilac 044.1040" || colName == "Lilac 044.0515"){
		hex = "#7e63a1";
	}else if(colName == "White 060.1040" || colName == "White 060.0515"){
		hex = "#f4f4ed";
	}else if(colName == "Eggshell 056.1040" || colName == "Eggshell 056.0515"){
		hex = "#e6d9bd";
	}else if(colName == "Beige 066.1040" || colName == "Beige 066.0515"){
		hex = "#dfcea1";
	}else if(colName == "Bright Yellow 089.1040" || colName == "Bright Yellow 089.0515"){
		hex = "#d8ba2e";
	}else if(colName == "Brown 046.1040"){
		hex = "#765d4d";
	}else if(colName == "Dark Blue 054.1040"){
		hex = "#00427f";
	}else if(colName == "Dark Green 047.1040"){
		hex = "#0e4438";
	}else if(colName == "Dark Grey 045.1040" || colName == "Dark Grey 045.0515"){
		hex = "#525a60";
	}else if(colName == "Earth Red 062.1040" || colName == "Earth Red 062.0515"){
		hex = "#ab392d";
	}else if(colName == "Green 067.1040"){
		hex = "#87a180";
	}else if(colName == "Grey 065.1040" || colName == "Grey 065.0515"){
		hex = "#b0b3af";
	}else if(colName == "Light Brown 076.1040"){
		hex = "#7b5741";
	}else if(colName == "Mid Grey 055.1040" || colName == "Mid Grey 055.0515"){
		hex = "#7e8082";
	}else if(colName == "Bright Orange 083.1040"){
		hex = "#f46f29";
	}else if(colName == "Pink 052.1040"){
		hex = "#ca5b91";
	}else if(colName == "Black 091"){
		hex = "#252427";
	}else if(colName == "Granite Grey"){
		hex = "#d64c7d";
	}else if(colName == "Scarlet Red"){
		hex = "#ca4c5c";
	}else if(colName == "Storm Sky"){
		hex = "#6ddb99";
	} else if (colName == "Mahogany") {//Corka
	    hex = "#682B23";
	} else if (colName == "Turquoise") {
	    hex = "#3BBFC0";
	} else if (colName == "Cherry") {
	    hex = "#AD383E";
	} else if (colName == "Sapphire") {
	    hex = "#08A2CB";
	} else if (colName == "Mandarin") {
	    hex = "#B45937";
	} else if (colName == "Indigo") {
	    hex = "#085B99";
	} else if (colName == "Pine") {
	    hex = "#B67E2B";
	} else if (colName == "Plum") {
	    hex = "#995B94";
	} else if (colName == "Lemon") {
	    hex = "#D1A52C";
	} else if (colName == "Walnut") {
	    hex = "#785C44";
	} else if (colName == "Meadow") {
	    hex = "#60934C";
	} else if (colName == "Cedar") {
	    hex = "#9D6537";
	} else if (colName == "Lime") {
	    hex = "#3EAC5B";
	} else if (colName == "Beech") {
	    hex = "#CBAE84";
	} else if (colName == "Spruce") {
	    hex = "#00743E";
	} else if (colName == "Ash") {
	    hex = "#D2C4AB";
	} else if (colName == "Jade") {
	    hex = "#19A797";
	} else if (colName == "Mardi-Gras") {
	    hex = "#19A797";
	}
	
	return hex;
}

$(".txtPCol").live('keyup',function() {
									
	var txtVal=$(this).val();
	
	if(!isNaN(txtVal))
	{
	 	$(this).attr('class'); 
		
		var con = $(this).attr('id').replace(/[^0-9]/g, '');
		$('.sys'+con).show();
	}		  
});
$(".txtPCol").live('click',function() {
	
	$(this).attr('class'); 
	var con = $(this).attr('id').replace(/[^0-9]/g, '');
	
	var result = $.grep(totArray, function(e){ return e.area == con; });
	if(result.length != 0) {					
		displayMessages("alert-box alert radius","<img src='img/bg/exclamation.png' alt='Error' width='2.5%'/> You canno't change the area size of Area "+con+" once the DEPTH is selected.");
	}
});
//$(".systemType").live('change',function() {
	
	/*$(this).attr('class'); 
	var con = $(this).attr('id').replace(/[^0-9]/g, '');
	
	var result = $.grep(totArray, function(e){ return e.area == con; });
	if(result.length != 0) {					
		displayMessages("alert-box alert radius","<img src='img/bg/exclamation.png' alt='Error' width='2.5%'/> You canno't change the System of Area "+con+" once the DEPTH is selected.");
	}*/
//});

function checkColExists(color){
	
	var ifFound ="";
	var cols = [
				['Terracotta', 'Aqua','Mid Green','Mid Blue', 'Purple','Rose', 'Dark Green', 'Red','Dark Blue','Jazz', 'Grey', 'Sand Yellow',  'Auburn','Emerald Green', 'Orchid', 'Beige',  'Cocoa','Eggshell','Black SBR','Passion Pop Berry','Passion Pop','Honey Dew Berry','Honey Dew','Ruby Razz Berry','Ruby Razz','Pumpkin Pie Berry','Pumpkin Pie','Mint Julep Berry','Mint Julep','Baby Blues Berry','Baby Blues','Outback Vista','Outback','Kakadu Vista','Kakadu','Keppel Vista','Keppel','Daintree Vista','Daintree ','Pacific Vista','Pacific','Harbour Vista','Harbour','Oceanic Shade','Oceanic','Coastal Shade','Coastal','Ground Shade','Ground','Jungle Shade','Jungle','Phantom Shade','Phantom','Envy Shade','Envy'],
				['Pink 052.1040','Coral Red 082.1040','Earth Red 062.1040','Bright Orange 083.1040','Bright Yellow 089.1040','Yellow Ochre 069.1040','Bright Green 087.1040','Green 067.1040','Dark Green 047.1040','Light Blue 084.1040','Blue 064.1040','Dark Blue 054.1040','Lilac 044.1040','White 060.1040','Eggshell 056.1040','Beige 066.1040','Light Brown 076.1040','Brown 046.1040','Grey 065.1040','Mid Grey 055.1040','Dark Grey 045.1040','Granite Grey', 'Red Earth', 'Scarlet Red','Tangerine', 'Sunshine Yellow','Ochre Gold','Green Apple','Storm Sky','Rainforest Green','Island Teal','Sky Blue', 'Rainbow Blue', 'Grape Purple','Ghost Gum','Moonlight','Cream', 'Cashew','Cocoa Bean'],
				['Gravel','Shamrock','Fairway','Cork','Clay','Claret','Mocha','Tobacco','Navy','Coral Red 082.0515','Bright Yellow 089.0515','Bright Green 087.0515','Light Blue 084.0515', 'Blue 064.0515', 'Lilac 044.0515','White 060.0515','Eggshell 056.0515','Beige 066.0515','Grey 065.0515','Mid Grey 055.0515','Dark Grey 045.0515', 'Earth Red 062.0515'],
				['White 060.0515', 'Eggshell 056.0515', 'Beige 066.0515', 'Bright Yellow 089.0515', 'Coral Red 082.0515', 'Bright Green 087.0515', 'Light Blue 084.0515', 'Blue 064.0515', 'Lilac 044.0515'],
                ['Mahogany', 'Turquoise', 'Cherry', 'Sapphire', 'Mandarin', 'Indigo', 'Pine', 'Plum', 'Lemon', 'Walnut', 'Meadow', 'Cedar', 'Lime', 'Beech', 'Spruce', 'Ash', 'Jade', 'Mardi-Gras']
			   ];
	
	$.each(cols, function(index, value){
		$.each(value, function(key, cell){
			if(color.indexOf(cell) !== -1){				
				ifFound = true;			
			}
		});
	});
	
	
	
	return ifFound;
}
//var Luxafe="";
function updateColor(area,areaBagSize,areaS,id){
	var system = checkSystemById(id);	
	var times = 0;
	//var areaBagSize = 0;
	bagSize=areaBagSize;
	
	
	if($('#id-color'+area).hasClass("disabled")){
	
	}else{
	
		$('#color').foundation('reveal', 'open');
		$('#color').bind('opened', function() {
			$(this).foundation('section', 'reflow');//Reflow the tabs
  			 
			$('.data-carnivale').html(""); 
			$('.data-onesafe').html(""); 
			$('.data-CovaRubba1').html(""); 
			$('.data-CovaRubba2').html(""); 
			$('.colors-gezoflex').html(""); 
			$('.colors-opal').html(""); 
			$('.section-traqua').html(""); 
			
			
			$('.color-data').html(""); 
			$('.txtColRemM').text(0 + " bags");
			$('.txtColRemP').text(areaBagSize + " bags");
			$('#lblAreaSize').html(areaS + "m&sup2; required");
			$('.txtColSqm').html(areaS + "m&sup2;");
			$(".col-bags-success").html("");
			
			$(".txtColRemM").css({"background-color": "#ff8c00"});	 
			$(".txtColRemM").css({"color": "#FFFFFF"});
			
			$(".txtColRemP").css({"background-color": "#ff8c00"});	 
			$(".txtColRemP").css({"color": "#FFFFFF"});
			
			$(".txtColSqm").css({"background-color": "#ff8c00"});	 
			$(".txtColSqm").css({"color": "#FFFFFF"});
			
			$(".col-bags-success").append("<img src='img/bg/exclamation.png' alt='Required' width='65%' data-tooltip class='tip-bottom' title='Click a colour to add more bags' />");
			
			$('#msg-color').removeClass();
			$('#msg-color').hide();
			$('#msg-color').addClass('alert-box info radius');
			$('.alert-msg-color').text("Click on + to add colours or - to remove colours. If you have a value, enter in to the square meter box");
			$('.alert-box').fadeIn(500); 
			
			if(system != "Select System"){
				
				if(system == "OneSafe"){
					times = 36;
				}else if(system == "Luxafe"){
					times = 17;	
				}else if(system == "Cova Rubba"){
					times = 17;	
				}else if(system == "Traqua"){
					times = 8;	
				}
				
				loadColours(system,area,times,areaBagSize);								
				$(".hiddenColor").val(area);							
				window.setTimeout(loadPie(areaBagSize), 1);											
			}			
		});  	
		
		$('#color').bind('closed', function() {
			$("#chkBoxNoCol").prop("checked", false);							
			chartData.length = 0;
			colData.length = 0;
			tot=0;
			txtSm = 0;
			bool = true;
						
			for(var i = pColData.length; i--;){
				if (pColData[i].area.toString() === area.toString()) pColData.splice(i, 1);
			}
			
			
			
			plotPie("#FFFFFF",0);
		});
		
	}
}
/*****************CUSTOMER REGISTRATION*****************/

/*$('#frmRegisterCustomer').on({
    'submit': function(){
        // will prevent browser-submitting the form in any any case:
        return false;
    },
    'valid': function(){
        // bind to abide's event and only care about submitting the stuff AJAX'ly
        $(this).ajaxSubmit({
            // ...
        });
    }
});*/



/*$(document).on('click','#submitRegistration',function(e){
	
	
	e.stopPropagation();
  	e.preventDefault();
	
	$regFormData = $("#frmRegisterCustomer").serializeArray();
	
	
	var invalid_fields = $('#frmRegisterCustomer').find('[data-invalid]');
	if(invalid_fields.length == 0){		
		$.ajax({
			type: 'POST',
			url: 'customerRegistration.php',
			cache: false,
			data: $("#frmRegisterCustomer").serializeArray(),
			success: function (data) {
				alert(data);
			}
		});
	}
	
   

});*/
/**************END OF CUSTOMER REGISTRATION*************/

/*function getCustomerDetails(company){
	var objCustomer = [];
	var compId='',compName='',cusName ='',telephone = '',email = '', address = '',suburb = '',state='',postcode = '',discount='',uName='';
	
	$.ajax({
		type: "POST",
		url: "customerInfo.php",
		data: {company:company},
		cache: false,
		success: function(response)
		{	
			objCustomer = $.parseJSON(response);   				
			$.each(objCustomer, function(index, item){
				compId = item.id;
				compName = item.compName;										 
				cusName = item.conName;
				email = item.email;
				telephone = item.telephone;
				address = item.address;
				suburb = item.suburb;
				state = item.state;
				discount = item.discount;
				postcode = item.postcode;
				uName = item.uName;
				password = item.password;
				
			});		
			
			$('#txtUpCompId').val(compId);			
			$('#txtUpCompName').val(compName);
			$('#txtUpContName').val(cusName);
			$('#txtUpConNumber').val(telephone);
			$('#txtUpEmail').val(email);
			$('#txtUpAddress').val(address);
			$('#txtUpSuburb').val(suburb);
			$('#cmbUpState').val(state);
			$('#txtUpPostcode').val(postcode);
			$('#cmbUpDiscount').val(discount);
			$('#txtUpUsername').val(uName);
			$('#txtUpPassword').val(password);
			$('#txtReUpPassword').val(password);
			$('#txtCusPass').val(password);
			
			$('#user-options').fadeOut(10);			
			$('#cus-update').fadeIn(10);
			
			$('.top-bttns').empty();
			$('.top-bttns').append('<div class="large-5 columns" style="border:solid #F2F2F2;">'+
						   '</div>'+
						   '<div class="large-7 columns">'+
							   '<div class="large-6 columns text-right" style="padding-right:0;padding-left:0;border:solid #F2F2F2;">'+
							   '</div>'+
								
							   '<div class="large-4 columns text-right" style="padding-right:0;padding-left:0;">'+
									'<a href="javascript:void(0);" class="small button round userOptions" title="User options">&nbsp;&nbsp;&nbsp;&nbsp;Options&nbsp;&nbsp;&nbsp;&nbsp;</a>'+	
							   '</div>'+
							   '<div class="large-2 columns text-right" style="padding-right:0;padding-left:0;">'+
									'<a href="javascript:void(0);" class="small button round logOut" title="Log Out from Wetpor Calculator">&nbsp;&nbsp;&nbsp;&nbsp;Log Out&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>'+	
							   '</div>'+  
						  '</div>');
		}
	});	
	
	Foundation.libs.abide.settings.patterns.password = /^\w{6,14}$/;
}*/

function updateCustomer(){
	$.ajax({
		type: 'POST',
		url: 'customerUpdate.php',
		cache: false,
		data: $("#frmUpdateCustomer").serializeArray(),
		success: function (data) {
			
			if(data >= 0){
				$('#cus-update').hide();
				$('#update-success').fadeIn(100);
				$('#txtUpUsername + .username-error').remove();
				$('#txtUpCompName + .compname-error').remove();
				
				
			}else if(data == -1){
				$('#cus-update').show();
				$('#update-success').hide();
				$('#txtUpUsername + .username-error').remove();
				$('#txtUpUsername').after('<small class="username-error">User name already taken. Please enter a different one</small>');				
				
			}
		}
	}); 	
}

function calPallets(){
    var arrSize = 0, noOfBags = 0, noOfSockPads = 0, noOfSockPadCork = 0, noOfBinder = 0, bagPallets = 0, shockPadsPallets = 0, shockPadCorkPallets = 0, binderPallets = 0, totPallets = 0, fPallets = 0, pal = 0, IBCPails = 0, FinalIBCBinder = 0, baseMat = "", bagsToPallet = 0, sysName = "";
	
		
	arrSize = sumArray.length;
	
	if(arrSize != 0){	
			
		 jQuery.each(sumArray, function(index, item) {		
			
			baseMat = item.baseMat;
			sysName = item.system;
			noOfBags += item.bags + item.colorBags;			
			
			
			if(item.pads > 0){				
				if(item.baseThick1 != 0 && item.baseThick2 == 0){						
					noOfSockPads += parseInt(item.pads) * parseInt(item.baseThick1);						
				}
				if(item.baseThick1 != 0 && item.baseThick2 != 0){
									
					noOfSockPads += (parseInt(item.pads)/2) * parseInt(item.baseThick1);
					noOfSockPads += (parseInt(item.pads)/2) * parseInt(item.baseThick2);
				}								
			}

			if (item.padsCork > 0) {
			    if (item.baseThick1 != 0 && item.baseThick2 == 0) {
			        noOfSockPadCork += parseInt(item.padsCork) * parseInt(item.baseThick1);
			    }
			    if (item.baseThick1 != 0 && item.baseThick2 != 0) {

			        noOfSockPadCork += (parseInt(item.padsCork) / 2) * parseInt(item.baseThick1);
			        noOfSockPadCork += (parseInt(item.padsCork) / 2) * parseInt(item.baseThick2);
			    }
			}

			noOfBinder += parseInt(item.pails);
		 });	 
		 
		 
		 jQuery.each(totArray, function(index, item) {			
			if(item.name == "IBC"){
				
				IBCPails = item.bags * 53;
				FinalIBCBinder = noOfBinder - IBCPails;
			 	noOfBinder = FinalIBCBinder;
				return false;
			}else{
				noOfBinder = noOfBinder;
			}
		 });		 
		 if (sysName == "Corplay") {
		     bagsToPallet = 40;
		 } else {
		     if (baseMat == "4mesh") {
		         bagsToPallet = 42;
		     } else {
		         bagsToPallet = 40;
		     }
		 }
		 
		 bagPallets = noOfBags / bagsToPallet;
		 shockPadsPallets = noOfSockPads / 1500;
		 shockPadCorkPallets = noOfSockPadCork / 1500;
		 binderPallets = noOfBinder / 36;
		 
		 totPallets = bagPallets + shockPadsPallets + shockPadCorkPallets + binderPallets;
		 if (sysName == "Corplay") {
		     pal = Math.ceil(totPallets);
		 }
		 else {
		     if (totPallets < 0.3) {
		         pal = 1;
		     } else {
		         var separation = totPallets.toString().split('.');
		         var second = separation[1].charAt(0);
		         var pal = 0;

		         if (parseInt(second) >= 3) {
		             pal = parseInt(separation[0]) + 1;
		         } else {
		             pal = parseInt(separation[0]);

		         }
		     }
		 }
	}
	
	return pal;
}


function clearArrays(){
	dataObj.length=0;
	dataArray.length=0;
	sumObj.length=0;
	sumArray.length=0;
	chartData.length=0;
	colData.length=0;
	pColData.length=0;
	shockPads.length=0;
	totArray.length=0;
	colArr.length=0;	
	obj.length=0;
}



function clearPurchasingFields(){
	$('#txtSEsNo').val("");
	$('#txtSJobName').val("");
	$('#txtSCusName').val("");
	$('#txtSContactName').val("");
	$('#txtSPurchasingOrdNo').val("");
	$('#txtSOrderPlacedBy').val("");
	$('#txtSContactPhone').val("");
	$("#txtSFaxNumber").val("");
	$('#txtDateRequired').val("");
	$('#txtSDispatchDate').val("");
	$("#txtSOnSiteContactName").val("");
	$('#txtSPhoneNoDelivery').val("");
	$('#txtSTransComp').val("");
	$("#cmbSTruckOrderedBy option[value='Select']").attr("selected", "selected");
	$("#cmbSFreight option[value='Select']").attr("selected", "selected");
	$('#txtSDeliveryAddress').val("");
	$("#txtSOtherInstructions").val("");
	$("#txtSFreightInstructions").val("");
}

function LoadInts(objCustomer){
	
	var id=0,status = 0,quoteNo=0,compName="",contactName="",discount=0,message="",staff=0,email=""; 	
	
	$.each(objCustomer,function(index,item){
		id = item.CusID; 
		status = item.status;
		staff = item.staff;
		compName = item.compName;
		contactName = item.contactName;
		discount = item.discount;
		telephone = item.telephone;
		permision = item.permision;
		email = item.email;
		suburb = item.suburb;
		state = item.state;
	});
	
	$('#user-access').val(permision);
	$('#user-id').val(id);
	
	
	if(status === 1){
		
		$('#login-panel').hide();
		$('#user-options').show();
		$('#registration-success').hide();
		
		btnPanelLogin();
	
		if(permision == 10){
			$('.cus-modify').show();
			$('.div-priceList').show();
			$('#opUpdateCustomer').removeClass('button round updateCustomer');
			$('#opUpdateCustomer').addClass('button round updateCustomer disabled');									
		
		    $('#txtCusPass').show();
			$('#opNewEstimate').removeClass('button round newEstimate disabled');
			$('#opNewEstimate').addClass('button round newEstimate');
			
		}else if(permision == 7){		
			
			$('.cus-modify').show();
			$('.div-priceList').hide();			
			$('#opNewEstimate').removeClass('button round newEstimate disabled');
			$('#opNewEstimate').addClass('button round newEstimate');							
			
		}else if(permision == 0){
			
			//$('.cusPanel').hide();
			$('.cus-modify').hide();
			$('#opNewEstimate').removeClass('button round newEstimate disabled');
			$('#opNewEstimate').addClass('button round newEstimate');
			$('#txtCusPass').hide();	
			$('#opUpdateCustomer').removeClass('button round updateCustomer disabled');
			$('#opUpdateCustomer').addClass('button round updateCustomer');
		}						
		
		$('#txtCompanyName').val(compName);	
	
		if(contactName != "Unknown"){
			$('#txtCustomerName').val(contactName);
		}
		$('#txtLocation').val(suburb);
		$('#txtEmail').val(email);
		$('.state').val(state);
		$('#txtDiscount').val(discount);
		$('#txtContactNO').val(telephone);		
		updateSidebar();	
		
	}else if(status === 0){
		displayLoginMessages('alert-box alert radius',message);						
	}

}