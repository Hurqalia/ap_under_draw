// ==UserScript==
// @id             iitc-plugin-apunderdraw
// @name           IITC plugin: Show AP under draw.
// @author         hurqalia22
// @category       Info
// @version        0.1.1.20151025.001
// @namespace      https://github.com/Hurqalia/ap_under_draw
// @updateURL      https://github.com/Hurqalia/ap_under_draw/raw/master/ap_under_draw.meta.js
// @downloadURL    https://github.com/Hurqalia/ap_under_draw/raw/master/ap_under_draw.user.js
// @installURL     https://github.com/Hurqalia/ap_under_draw/raw/master/ap_under_draw.user.js
// @description    [hurqalia22-2015-10-25-001] Show AP under draw.
// @include        https://www.ingress.com/intel*
// @include        http://www.ingress.com/intel*
// @match          https://www.ingress.com/intel*
// @match          http://www.ingress.com/intel*
// @grant          none
// ==/UserScript==

function wrapper(plugin_info) {
        if(typeof window.plugin !== 'function') window.plugin = function() {};
        plugin_info.buildName = 'hurqalia22';
        plugin_info.dateTimeVersion = '20151007.001';
        plugin_info.pluginId = 'apunderdraw';

        // PLUGIN START ////////////////////////////////////////////////////////

        // use own namespace for plugin
        window.plugin.apunderdraw = function() {};
	window.plugin.apunderdraw.datas	= {};

	// STORAGE //////////////////////////////////////////////////////////
	window.plugin.apunderdraw.loadStorage = function( key, store ) {
		if (localStorage[store]) {
			window.plugin.apunderdraw.datas[key] = JSON.parse(localStorage[store]);
		}
	};

	// FUNCTIONS ////////////////////////////////////////////////////////
	window.plugin.apunderdraw.doTheJob = function() {
		window.plugin.apunderdraw.loadStorage('draw', 'plugin-draw-tools-layer');
		var results = window.plugin.apunderdraw.portalUnderDraw();
		if (results) {
	    		window.plugin.apunderdraw.showResults(results);
		}
    	};

	window.plugin.apunderdraw.portalUnderDraw = function() {
		var form_latitude = [];
		var form_longitude = [];
		var links_in  = { 'E' : [], 'R' : [] };
		var links_out = { 'E' : [], 'R' : [] };
		var teams = {'E':[],'R':[],'N':[]};
		var sums  = {'E':{'ap':0,'l':0,'r':0,'p':0},'R':{'ap':0,'l':0,'r':0,'p':0},'N':{'ap':0,'l':0,'r':0,'p':0}};
		var found = false;
		
		$.each(window.plugin.apunderdraw.datas.draw[0]['latLngs'], function(id, obj) {
		    form_latitude.push(obj.lat);	
		    form_longitude.push(obj.lng);	
		});
		
		// portal is under poly
		$.each(window.portals, function(guid, r) { 
		    var i, j;
		    var lat_i, lat_j, lng_i, lng_j;
		    var nodeIn = false;
		    var posX = window.portals[guid].getLatLng()['lng'];
		    var posY = window.portals[guid].getLatLng()['lat'];
		    var nbpoints = form_latitude.length;
		
		    for( i=0, j=1; i < nbpoints; i++, j++){
		        if( j == nbpoints){
		            j = 0;
		        }
		        lat_i = form_latitude[i];
		        lat_j = form_latitude[j];
		        lng_i = form_longitude[i];
		        lng_j = form_longitude[j];
		
		        if((( lat_i  < posY) && ( lat_j >= posY)) ||
		           (( lat_j  < posY) && ( lat_i >= posY)) &&
		           (( lng_i <= posX) || ( lng_j <= posX))) {
		            if( lng_i + (posY - lat_i) /(lat_j -lat_i) *(lng_j -lng_i) < posX){
		                nodeIn = !nodeIn;
		            }
		        }
		    }
		    
		    if (nodeIn) {
		        teams[window.portals[guid].options.data.team].push(guid);
		        found = true;
		    }            
		});
		
		if (!found) {
		    return;
		}
		
		$.each(['E', 'R', 'N'], function(i, letter) {
		    if (!teams[letter].length) {
		        return;
		    }
		    $.each(teams[letter], function(id, guid) {
		        var links  = window.getPortalLinks(guid);
		        var fields = getPortalFieldsCount(guid);
		        var portal_ap = portalApGainMaths(window.portals[guid].options.data.resCount, links.in.length+links.out.length, fields);
		        sums[letter]['ap'] += (portal_ap.destroyResoAp + portal_ap.captureAp);
		        sums[letter]['r']  += window.portals[guid].options.data.resCount;
		        sums[letter]['p']++;
		        if (getPortalLinksCount(guid)) {
		            if (window.getPortalLinks(guid)['out'].length) {
		                $.each(window.getPortalLinks(guid)['out'], function(k,v) { links_out[letter].push(v); });
		            }
		            if (window.getPortalLinks(guid)['in'].length) {
		                $.each(window.getPortalLinks(guid)['in'], function(k,v) { links_in[letter].push(v); });
		            }
		        }
		        
		    });
		});
		
		var count_links_team = function(team_links_in, team_links_out) {
		    // uniq links
		    var count_links = 0;
		    if (team_links_out.length && team_links_in.length) {
		        count_links = $.unique(team_links_out.concat(team_links_in)).length;
		    } else if (team_links_in.length) {
		        count_links = $.unique(team_links_in).length;
		    } else if (team_links_out.length) {
		        count_links = $.unique(team_links_out).length;
		    }
		    return count_links;
		};
		
		sums['R']['l'] = count_links_team(links_in['R'], links_out['R']);
		sums['E']['l'] = count_links_team(links_in['E'], links_out['E']);
		
		return (sums);
	}; 
        
	// show result
	window.plugin.apunderdraw.showResults = function(datas) {
        var html = "<table class='audtable' style='background-color:blue; margin-bottom:5px;'>" 
        + "<thead><tr><th colspan='5'>You are a Resistant</th></tr></thead>"
        + "<tbody>"
        + "<tr><td colspan='5'>Enemy portals ! " + datas['E']['p'] + "&nbsp;&nbsp;Resos : " + datas['E']['r'] + "&nbsp;&nbsp;Links : " +  datas['E']['l'] + " </td></tr>"
        + "<tr><td>Resos destroyed &amp; capture+full deployed</td><td align='right'>" + datas['E']['ap'] + "</td><td>&nbsp;AP</td><td colspan='2'></td></tr>"
        + "<tr><td>Links destroyed</td><td align='right'>" + (datas['E']['l'] * 187) + "</td><td>&nbsp;AP</td><td colspan='2'></td></tr>"
        + "<tr><td>Total Enemy</td><td align='right'>" + (datas['E']['ap'] + (datas['E']['l'] * 187)) + "</td><td>&nbsp;AP</td><td colspan='2'></td></tr>"
        + "<tr><td colspan='5'>&nbsp;</td></tr>"
        + "<tr><td colspan='5'>Neutral portals : " + datas['N']['p'] + "</td></tr>"
        + "<tr><td>Capture+full deployed</td><td align='right'>" + datas['N']['ap'] + "</td><td>&nbsp;AP</td><td colspan='2'></td></tr>"
        + "<tr><td colspan='5'>&nbsp;</td></tr>"
        + "<tr><td>Total</td><td align='right'>" + (datas['E']['ap'] + (datas['E']['l'] * 187) + datas['N']['ap'] ) + "</td><td>&nbsp;AP</td><td colspan='2'></td></tr>"
        + "</tbody>"
        + "</table>";

        html += "<br /><table class='audtable' style='background-color:green;'>" 
        + "<thead><tr><th colspan='5'>You are an Enlightened</th></tr></thead>"
        + "<tbody>"
        + "<tr><td colspan='5'>Enemy portals : " + datas['R']['p'] + "&nbsp;&nbsp;Resos : " + datas['R']['r'] + "&nbsp;&nbsp;Links : " +  datas['R']['l'] + " </td></tr>"
        + "<tr><td>Resos destroyed &amp; capture+full deployed</td><td align='right'>" + datas['R']['ap'] + "</td><td>&nbsp;AP</td><td colspan='2'></td></tr>"
        + "<tr><td>Links destroyed</td><td align='right'>" + (datas['R']['l'] * 187) + "</td><td>&nbsp;AP</td><td colspan='2'></td></tr>"
        + "<tr><td>Total Enemy</td><td align='right'>" + (datas['R']['ap'] + (datas['R']['l'] * 187)) + "</td><td>&nbsp;AP</td><td colspan='2'></td></tr>"
        + "<tr><td colspan='5'>&nbsp;</td></tr>"
        + "<tr><td colspan='5'>Neutral portals : " + datas['N']['p'] + "</td></tr>"
        + "<tr><td>Capture+full deployed</td><td align='right'>" + datas['N']['ap'] + "</td><td>&nbsp;AP</td><td colspan='2'></td></tr>"
        + "<tr><td colspan='5'>&nbsp;</td></tr>"
        + "<tr><td>Total</td><td align='right'>" + (datas['R']['ap'] + (datas['R']['l'] * 187) + datas['N']['ap'] ) + "</td><td>&nbsp;AP</td><td colspan='2'></td></tr>"
        + "</tbody>"
        + "</table>";
        
        if ($('#loadlevel').html() != 'all') {
            html += "<div style='margin:5px; color:red'>"
            + "<strong>Your attention please !</strong><font style='color:white'>Your zoom level is actually <b>" + $('#loadlevel').html() + ".<br />"
            + "A part of portals is not visible and cannot be used to compute AP. Please adjust your zoom level and run AP Under Draw again.</font>"
            + "</div>"
        }

		dialog({
            width:'600px',
		        html: html,
		        id: 'plugin-apunderdraw-box',
		        dialogClass: '',
		        title: 'AP Under Draw - results',
		});
	};
        
        // init setup
        window.plugin.apunderdraw.setup  = function() {
        	console.log('AP Under Draw loaded.');
		if (!localStorage['plugin-draw-tools-layer']) {
		    console.log('ERROR : draw-tools must be used');
		    return false;
		}
                window.plugin.apunderdraw.addButtons();
        };
        
        // toolbox menu
        window.plugin.apunderdraw.addButtons = function() {
            $('head').append('<style>.audtable { border-collapse:collapse; width: 100%; } .audtable > thead > tr > th, .audtable > tbody> tr > td{ border:1px solid black; padding:5px; font-weight:normal; }</style>');
        	$('#toolbox').append('&nbsp;<a onclick="window.plugin.apunderdraw.doTheJob();">AP Under Draw</a>');
        };

        // runrun
        var setup =  window.plugin.apunderdraw.setup;

        setup.info = plugin_info; //add the script info data to the function as a property
        if(!window.bootPlugins) window.bootPlugins = [];
        window.bootPlugins.push(setup);
        // if IITC has already booted, immediately run the 'setup' function
        if(window.iitcLoaded && typeof setup === 'function') {
                setup();
        }

    // PLUGIN END ////////////////////////////////////////////////////////    
} // WRAPPER END ////////////////////////////////////////////////////////    

var script = document.createElement('script');
var info = {};
if (typeof GM_info !== 'undefined' && GM_info && GM_info.script) info.script = { version: GM_info.script.version, name: GM_info.script.name, description: GM_info.script.description };
script.appendChild(document.createTextNode('('+ wrapper +')('+JSON.stringify(info)+');'));
(document.body || document.head || document.documentElement).appendChild(script);


