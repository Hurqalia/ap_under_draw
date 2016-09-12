// ==UserScript==
// @id             iitc-plugin-apunderdraw
// @name           IITC plugin:  Show AP under a polygon/draw area.
// @author         hurqalia22, keithel
// @category       Info
// @version        0.1.5.20160911.003
// @namespace      https://github.com/keithel/ap_under_draw
// @updateURL      https://raw.githubusercontent.com/keithel/ap_under_draw/master/ap_under_draw.meta.js
// @downloadURL    https://raw.githubusercontent.com/keithel/ap_under_draw/master/ap_under_draw.user.js
// @installURL     https://raw.githubusercontent.com/keithel/ap_under_draw/master/ap_under_draw.user.js
// @description    [keithel-2016-09-11-003] Show AP under draw.
// @include        https://www.ingress.com/intel*
// @include        http://www.ingress.com/intel*
// @match          https://www.ingress.com/intel*
// @match          http://www.ingress.com/intel*
// @grant          none
// ==/UserScript==

function wrapper(plugin_info) {
    if(typeof window.plugin !== 'function') window.plugin = function() {};
    plugin_info.buildName = 'keithel';
    plugin_info.dateTimeVersion = '20160911.003';
    plugin_info.pluginId = 'apunderdraw';

    var apud_css_ui = "data:text/css;base64,LmFwdWQtYm94IHsgZGlzcGxheTogYm94Ow0KZGlzcGxheTogZmxleDsNCm1hcmdpbjogLTEycHg7DQpwb3NpdGlvbjogcmVsYXRpdmU7DQp9DQouYXB1ZC1ib3gubW9iaWxlIHsNCmJhY2tncm91bmQ6IHRyYW5zcGFyZW50Ow0KcGFkZGluZzogMDsNCmJvcmRlcjogMCBub25lOw0KbWFyZ2luOiAwOw0KaGVpZ2h0OiAxMDAlOw0Kd2lkdGg6IDEwMCU7DQpsZWZ0OiAwOw0KdG9wOiAwOw0KcG9zaXRpb246IGFic29sdXRlOw0Kb3ZlcmZsb3c6IGF1dG87DQp9DQoNCi5hcHVkLWJveCBuYXYgew0KZGlzcGxheTogYmxvY2s7DQptaW4taGVpZ2h0OiAxNTBweDsNCndpZHRoOiAxNTBweDsNCmJvcmRlci1yaWdodDogMXB4IHNvbGlkICMyMEE4QjE7DQp2ZXJ0aWNhbC1hbGlnbjogdG9wOw0KZmxleC1zaHJpbms6IDA7DQpmbGV4LWdyb3c6IDA7DQpib3gtc2hyaW5rOiAwOw0KYm94LWdyb3c6IDA7DQp9DQouYXB1ZC1ib3ggLnRhYnMgew0KcG9zaXRpb246IHJlbGF0aXZlOw0KcGFkZGluZzogMTBweDsNCmZsZXgtc2hyaW5rOiAxOw0KZmxleC1ncm93OiAxOw0KYm94LXNocmluazogMTsNCmJveC1ncm93OiAxOw0KfQ0KLmFwdWQtYm94IG5hdiBhIHsNCmNvbG9yOiB3aGl0ZTsNCnBhZGRpbmc6IDAuNWVtOw0KZGlzcGxheTogYmxvY2s7DQp0ZXh0LWhlaWdodDogNDBweDsNCnRleHQtd2VpZ2h0OiBib2xkOw0KYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICMyMEE4QjE7DQp0ZXh0LWRlY29yYXRpb246IG5vbmU7DQp9DQouYXB1ZC1ib3ggbmF2IGE6bGFzdC1jaGlsZCB7DQpib3JkZXItYm90dG9tLXdpZHRoOiAwOw0KfQ0KLmFwdWQtYm94IG5hdiBhOiBob3ZlciB7DQpiYWNrZ3JvdW5kLWNvbG9yOiAjMDgzQzRFOw0KfQ0KLmFwdWQtYm94IG5hdiBhLmNsaWNrZWQgew0KYmFja2dyb3VuZC1jb2xvcjogIzIwQThCMTsNCn0NCi5hcHVkLWJveCBzZWN0aW9uIGgyIHsNCmZvbnQtc2l6ZTogMThweDsNCm1hcmdpbjogMCAwIDAuNGVtIDA7DQpwYWRkaW5nOiAwOw0KfQ0KLmFwdWQtYm94IHNlY3Rpb24gaDIgc21hbGwgew0KY29sb3I6ICNDQ0NDQ0M7DQp2ZXJ0aWNhbC1hbGlnbjogdG9wOw0KfQ0KLmFwdWQtYm94IGhyIHsNCmJvcmRlcjogMDsNCmhlaWdodDogMXB4Ow0KYmFja2dyb3VuZC1jb2xvcjogIzIwQThCMQ0KfQ0KLmFwdWQtYm94IHAgew0KbWFyZ2luOiAwLjVlbSAwOw0KfQ==";
    var apud_ico_wr = "data:image/png;base64,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";
    var apud_ico_ap = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAGxQTFRF////YGBgcHBwgICAa2treXl5hoaGZGRkgICAj4+Pra2ta2trdHR0e3t7Xl5eubm5bGxsenp6Xl5eZWVlbGxsc3Nzenp6gYGBiIiIj4+PlpaWl5eXnZ2dnp6epKSkpaWlq6urrKyss7Ozurq6UmiuoQAAABJ0Uk5TABAQEBMTE1RUVFRwcHDGxuTki1z6agAAAHZJREFUGNNlz8kOgkAURcFSUcAJkaZxaBz//x9dgNGEysvJ3T4mqvdPBa9/8Fhj/RwKN27cMTZJKUlS3+vh8j1c4VyiHAunf9AVC6uiK1B0EJf1rl5EMUYRWtt2qzVshPlhc8iCEIIATZ6Z5U2OvIH98Wc//d0HokUK52AarhEAAAAASUVORK5CYII=";


    // PLUGIN START ////////////////////////////////////////////////////////
    window.plugin.apunderdraw = function() {};
    window.plugin.apunderdraw.datas = {};

    // STORAGE //////////////////////////////////////////////////////////
    window.plugin.apunderdraw.loadStorage = function( key, store ) {
        if (localStorage[store]) {
            window.plugin.apunderdraw.datas[key] = JSON.parse(localStorage[store]);
        } else {
            window.plugin.apunderdraw.datas[key] = '';
        }
        if (window.plugin.apunderdraw.datas[key] == '') {
            return false;
        }
        return true;
    };

    // FUNCTIONS ////////////////////////////////////////////////////////
    window.plugin.apunderdraw.doTheJob = function() {
        if (! window.plugin.apunderdraw.loadStorage('draw', 'plugin-draw-tools-layer')) {
            var img = '<img style="vertical-align:middle;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAGE0lEQVR4nMWXbWxUWRnHf885985Mh2lnpm8zLeVlS3mp1qGgFigLUyltpcTZalsENST4icSYXXenbDZt4uqaGDG4H0gaNVk0uyvuayK4omY1K1kN8SVGDYlb1oSlVGophYUy05nOzD1+mBkKkgWKLJzkn5Obe+7z/93nec7cOWKM4UEO9UDdAetuHhoaHKo1xpwpLS21EonE7NTFqbbh4eET9w1AKXV0W/c2a8OGDYyPj7sOHjz4uojUGWOcecea7wPxeDwWrgl/fGHFAiYPfZqyEs3SJUtruru7H5tvrLsC8Lg9z2/fvp333/o2iCIzcpSdu3ayds3a/SIS+lAB4k/En2pqavInT5+g1n0FEUX2naNYuSTRaFTv3r37BRHRHxqAz+d7ZmtHO653XwZRoDQoReZPzxKNbmZ5w/IO4KH5xLzjJhyID7wZi8X0xJ9fowTDuasaARBQyXdZ/N5x+vr7GBsb+62IrDLGzNwzgKHBodpgMNgeaVpF5o0DfP2tJD97+51r9+vq6vjFosMs7/why5YtWxyNRvuAF+4k9h2VIJ1On4g9EpN//+YAyhKS6dmb1vjKpph57zB7vryHdevWfV9EgvcEIB6Px+rr6xeXWWnCzgjKY1jguXmdLgFP4nUCfi+RSMTb39//XRGR/xvA4/a8snPXTsxf9qM9oD1QEbBvBijcc8a+SW9vL5GPRfYAdbeLf8se2Dew78CmTZvcF08dp7I0g3KDduWbvziMMWAMyg2I4DIjJNOjdG/frkZHR4+KSIsxJvNBHh+YgaHBoVqfz/fo+vXrKD33E3TR3A1ocByH9MwM01cuk5qZATW3Lb3T3yMSaaKxsbG5vb29964ykEqlXuvq6tJXTh6musRBuUEVAMoDLhJXp0kmk2AMOSeXNxfJ/z5wicTkr9jx+R2Mj48Pi8gbxpird5yBocGhT4bD4fVrm5uonv0D2g3KLSiPoN1QVeUhmUhgWxZ+v59PNJWBMwVMgboCtsZvvUQoVElDQ0Owq6vrK/PKQCaT+XV/f79MvP0M1XIe0pchO4lk00jmEjK7Cq01Pp+P8vJyFoaA2eP5aE5BGlKTAb74pf2cPXv2WyJyyBgzeVuA+BPxp1asWBH0qgT25I8x3ixSkkNZWbTOoWyHRaEslmXh9XqpqKhgVeMl8M0ZY+VnnxpmOvc40WjUGj07+qKIdBtjcrcsQYm35Bv9O/p4/8hWlMtBuxyUO4d252cEFoWyiAgiglIKEcmbuv5Hbih1tfGpLW00LGvoBJbcMgMD8YE3Ozo77MmTR6j2p1Au5wYIFCDgURM8950l+Wt9iY0bz4AUohWlC1JjXJx6hf4d/YyNjf1SRFYbY1I3ARS2Xfvmh1uZer4e5XdQdkEuB9EmbyJQVZmgd9M/uei2qK7KkMteZ2wXAQSUDXioqn6UQHCMNWvWrGhra+sDXrypBLOzs7/r+WyP/OvIV1lQkr3R3HaumaPgzGUPnY+1saV3JRs/s5H/XPTljV1FAAtUGVAJVAEhksmn2fWFXbS0tPxARAI3AMTj8ViwPLi84aE6aqd/jrKcvOz8LGru7dFw8nQZExPnKS8vp6YmzB//Wps3tgHLBRIAKgrm1UAIv/9vaJ2idUOrt6enZ/AGANuyf7p3717GXvocYhnEcuZ0/dsXAFY3JggEAgQCfmpra1kTuVxIuw34gfICQOU1AAij9XN0dnXSvLr5cRFZCKCTieSB5ubmzUsrNd5Tz6ILHX+9is1XrHFZaYbGlWkqq+Ejjf/go5FzuBcoED8QLAAUFSwogG3nuHAhRP2yiGRmM1tij8QOWbZtf62jcyszr27Dqw1SkLLyovhBLdQ/3/nQ2nKe1ofPz2058QGlhQwErpnmr0uBEsCmpubvhMO7CYfDzUCDpbUW5aQ5PXEF7SnDTuXQiRx6Oov25JAihGKuzkW5illRQNl1hgsAT2FR8dNpCppm5coMLreLUCjUYWUymawvUG1tfvoU92skEkkAZ2JiwifGGJ7c9+R5y7KCxpjb/oO5FyOVTs0cO3bsRyMjI7+X4ulYRFzAQvLFul9H5gvyoI/n/wXy2/DuK2rGkQAAAABJRU5ErkJggg=="/>';
            alert(img + ' Please draw a polygon or circle');
            return false;
        }

        var APUnderDraw = function() {
            var t = this;
            this.draw_datas = {};
            this._w_        = {};
            this.summ       = {
                'E': { 'ap' : 0, 'l' : 0, 'r' : 0, 'p' : 0, 'f' : 0 },
                'R': { 'ap' : 0, 'l' : 0, 'r' : 0, 'p' : 0, 'f' : 0 },
                'N': { 'ap' : 0, 'l' : 0, 'r' : 0, 'p' : 0, 'f' : 0 },
                'All': { 'p' : 0 },
                'details' : []
            };
            return t;
        };
        APUnderDraw.prototype.initialize = function(datas) {
            var t = this;
            t._w_ = {
                'draw_coords' : { 'lat' : [], 'lng' : [] },
                'portals'     : { 'E': [], 'R' : [],'N' :[] },
                'links'       : {
                    'in' : { 'E' : [], 'R' : [] },
                    'out' : { 'E' : [], 'R' : [] }
                },
                'count_links'  : { 'E' : 0, 'R' : 0, 'N' : 0 },
                'fields'       : { 'E' : [], 'R' : [] },
                'count_fields' : { 'E' : 0, 'R' : 0, 'N' : 0 },
                'sums'        : {
                    'type'  : datas.type,
                    'color' : datas.color,
                    'E': { 'ap' : 0, 'l' : 0, 'r' : 0, 'p' : 0, 'f' : 0 },
                    'R': { 'ap' : 0, 'l' : 0, 'r' : 0, 'p' : 0, 'f' : 0 },
                    'N': { 'ap' : 0, 'l' : 0, 'r' : 0, 'p' : 0, 'f' : 0 },
                    'All': { 'p' : 0 },
                }
            };
            t.draw_datas = datas;
        };
        APUnderDraw.prototype.run = function() {
            var t = this;
            $.each(window.plugin.apunderdraw.datas.draw, function(id, formdatas) {
                t.initialize(formdatas);
                switch(t.draw_datas.type) {
                    case 'circle':
                        if (!t.underCircle()) {
                            return;
                        }
                        t.countAPPortal();
                        t.summarize();
                        break;
                    case 'polygon':
                        if (!t.underPolygon()) {
                            return;
                        }
                        t.countAPPortal();
                        t.summarize();
                        break;
                    default:
                        console.log('AP Under Draw ERROR : invalid draw type (' + t.draw_datas.type + ')');
                        return;
                        break;
                };
            });
            t.render();
        };
        APUnderDraw.prototype.latlngPolygon = function() {
            var t = this;
            $.each(t.draw_datas.latLngs, function(id, point) {
                t._w_.draw_coords.lat.push(point.lat);
                t._w_.draw_coords.lng.push(point.lng);
            });
        };
        APUnderDraw.prototype.latlngCircle = function() {
            var t = this;
            t._w_.draw_coords.lat.push(t.draw_datas.latLng.lat);
            t._w_.draw_coords.lng.push(t.draw_datas.latLng.lng);
        };
        APUnderDraw.prototype.underPolygon = function() {
            var t = this;
            var found = false;
            t.latlngPolygon();
            $.each(window.portals, function(guid, r) {
                var i, j;
                var lat_i, lat_j, lng_i, lng_j;
                var nodeIn = false;
                var posX = window.portals[guid].getLatLng()['lng'];
                var posY = window.portals[guid].getLatLng()['lat'];
                var nbpoints = t._w_.draw_coords.lat.length;

                for (i=0, j=1; i < nbpoints; i++, j++) {
                    if (j == nbpoints) {
                        j = 0;
                    }
                    lat_i = t._w_.draw_coords.lat[i];
                    lat_j = t._w_.draw_coords.lat[j];
                    lng_i = t._w_.draw_coords.lng[i];
                    lng_j = t._w_.draw_coords.lng[j];

                    if ((( lat_i < posY)  && ( lat_j >= posY)) ||
                        (( lat_j  < posY)  && ( lat_i >= posY)) &&
                        (( lng_i  <= posX) || ( lng_j <= posX))) {
                        if ( lng_i + (posY - lat_i) /(lat_j -lat_i) *(lng_j -lng_i) < posX){
                            nodeIn = !nodeIn;
                        }
                    }
                }

                if (nodeIn) {
                    t._w_.portals[window.portals[guid].options.data.team].push(guid);
                    found = true;
                }
            });
            return found;
        };
        APUnderDraw.prototype.underCircle = function() {
            var t = this;
            var found = false;
            t.latlngCircle();
            var circle = L.circle([t._w_.draw_coords.lat[0], t._w_.draw_coords.lng[0]], t.draw_datas.radius,  '');
            var circlebounds = circle.getBounds();
            var circlecenter = circlebounds.getCenter();
            $.each(window.portals, function(guid, r) {
                if (circlecenter.distanceTo(window.portals[guid].getLatLng()) <= t.draw_datas.radius) {
                    t._w_.portals[window.portals[guid].options.data.team].push(guid);
                    found = true;
                }
            });
            return found;
        };
        APUnderDraw.prototype.countLinks = function() {
            var t = this;
            var uniq = function(arr) {
                return arr.sort().filter(function(item, position, ary) {
                    return !position || item != ary[position - 1];
                })
            };
            $.each(['E', 'R'], function(i, letter) {
                if (t._w_.links.out[letter].length && t._w_.links.in[letter].length) {
                    t._w_.count_links[letter] = uniq(t._w_.links.out[letter].concat(t._w_.links.in[letter])).length;
                } else if (t._w_.links.in[letter].length) {
                    t._w_.count_links[letter] = uniq(t._w_.links.in[letter]).length;
                } else if (t._w_.links.out[letter].length) {
                    t._w_.count_links[letter] = uniq(t._w_.links.out[letter]).length;
                }
            });
            t._w_.sums['E']['l'] = t._w_.count_links['E'];
            t._w_.sums['R']['l'] = t._w_.count_links['R'];
        };
        APUnderDraw.prototype.countFields = function() {
            var t = this;
            $.each(['E', 'R'], function(i, letter) {
                if (t._w_.fields[letter].length) {
                    t._w_.count_fields[letter] = t._w_.fields[letter].length;
                }
            });
            t._w_.sums['E']['f'] = t._w_.count_fields['E'];
            t._w_.sums['R']['f'] = t._w_.count_fields['R'];

        };
        APUnderDraw.prototype.countAPPortal = function() {
            var t = this;
            $.each(['E', 'R', 'N'], function(i, letter) {
                if (!t._w_.portals[letter].length) {
                    return;
                }
                $.each(t._w_.portals[letter], function(id, guid) {
                    var links  = window.getPortalLinks(guid);
                    var fields = getPortalFieldsCount(guid);
                    var portal_ap = portalApGainMaths(window.portals[guid].options.data.resCount, links.in.length+links.out.length, fields);
                    portal_ap.destroyResoAp = (portal_ap.destroyResoAp == 'NaN') ? 0 : portal_ap.destroyResoAp;
                    portal_ap.captureAp     = (portal_ap.captureAp     == 'NaN') ? 0 : portal_ap.captureAp;
                    window.portals[guid].options.data.resCount = (window.portals[guid].options.data.resCount == 'NaN') ? 0 : window.portals[guid].options.data.resCount;
                    t._w_.sums[letter]['ap'] += (portal_ap.destroyResoAp + portal_ap.captureAp);
                    t._w_.sums[letter]['r']  += window.portals[guid].options.data.resCount;
                    t._w_.sums[letter]['p']++;
                    t._w_.sums['All']['p']++;
                    if (getPortalLinksCount(guid)) {
                        if (window.getPortalLinks(guid)['out'].length) {
                            $.each(window.getPortalLinks(guid)['out'], function(k,v) { t._w_.links.out[letter].push(v); });
                        }
                        if (window.getPortalLinks(guid)['in'].length) {
                            $.each(window.getPortalLinks(guid)['in'], function(k,v) { t._w_.links.in[letter].push(v); });
                        }
                    }
                    if (fields) {
                        $.each(window.getPortalFields(guid), function(k, v) { if (t._w_.fields[letter].indexOf(v) === -1) { t._w_.fields[letter].push(v); } });
                    }
                });
            });
            t.countLinks();
            t.countFields();
        };
        APUnderDraw.prototype.summarize = function() {
            var t = this;

            t.summ.details.push(t._w_.sums);

            $.each(['E', 'R', 'N', 'All'], function(i, letter) {
                $.each(t._w_.sums[letter], function(key, value) {
                    t.summ[letter][key] += value;
                });
            });
        };
        APUnderDraw.prototype.render = function() {
            var t = this;

            var template_table = function( team, datas ) {
                var title_team  = (team == 'R') ? 'Enlightened' : 'Resistance';
                var table_color = (team == 'R') ? 'green' : 'blue';
                var html = "<table class='audtable' style='margin-bottom:5px; border: 1px solid #20A8B1;'>"
                + "<thead style='background-color:" + table_color +";'><tr><th colspan='5'>" + title_team  + "</th></tr></thead>"
                + "<tbody>"
                + "<tr><td colspan='3'>Enemy portals : " + datas[team]['p'] + "&nbsp;&nbsp;Resos : " + datas[team]['r'] + "&nbsp;&nbsp;Links : " +  datas[team]['l'] + "&nbsp;&nbsp;Fields : " + datas[team]['f'] + "</td></tr>"
                + "<tr><td>Resos destroyed &amp; capture+full deployed</td><td align='right'>" + datas[team]['ap'] + "</td><td>&nbsp;AP</td></tr>"
                + "<tr><td>Links destroyed</td><td align='right'>" + (datas[team]['l'] * 187) + "</td><td>&nbsp;AP</td></tr>"
                + "<tr><td>Fields destroyed</td><td align='right'>" + (datas[team]['f'] * 750) + "</td><td>&nbsp;AP</td></tr>"
                + "<tr style='font-style:italic; color:#aaa;'><td>Total Enemy</td><td align='right'>" + (datas[team]['ap'] + (datas[team]['l'] * 187) + (datas[team]['f'] * 750) ) + "</td><td>&nbsp;AP</td></tr>"
                + "<tr><td colspan='3'>Neutral portals : " + datas['N']['p'] + "</td></tr>"
                + "<tr><td>Capture+full deployed</td><td align='right'>" + datas['N']['ap'] + "</td><td>&nbsp;AP</td></tr>"
                + "<tr style='color:yellow;'><td>Total</td><td align='right'>" + (datas[team]['ap'] + (datas[team]['l'] * 187) + (datas[team]['f'] * 750) + datas['N']['ap'] ) + "</td><td>&nbsp;AP</td></tr>"
                + "</tbody>"
                + "</table>";
                return html;
            };
            var template_all_table = function( datas ) {
                return "<table class='audtable' style='margin-bottom:5px; border: 1px solid #20A8B1;'>"
                + "<thead><tr><th colspan='5'>All</th></tr></thead>"
                + "<tbody>"
                + "<tr><td colspan='3'>Total portals : " + datas['All']['p'] + "</td></tr>"
                + "</tbody>"
                + "</table>";
            };

            var html = '<div class="apud-box">';
            var nav  = '<nav>';
            var tabs = '<div class="tabs">';

            if (t.summ.details.length > 1) {
                var count_tab = 0;
                $.each(t.summ.details, function(id) {
                    count_tab = id + 1;
                    nav  += '<a href="#" data-section="apud-menu-' + count_tab + '">' +  t.summ.details[id].type + ' #' + count_tab + ' </a>';
                    tabs += '<section id="apud-menu-' + count_tab + '" style="display:none;"><div>'
                          + template_table('E', t.summ.details[id])
                          + template_table('R', t.summ.details[id])
                          + template_all_table(t.summ.details[id])
                          +'</div></section>';
                });
                count_tab++;
                nav  += '<a href="#" data-section="apud-menu-' + count_tab + '" class="clicked"> Total </a>';
                tabs += '<section id="apud-menu-' + count_tab + '"><div>'
                      + template_table('E', t.summ)
                      + template_table('R', t.summ)
                      + template_all_table(t.summ)
                      + '</div></section>';
            } else {
                nav  += '<a href="#" data-section="apud-menu-1" class="clicked">' +  t.summ.details[0].type + ' #1 </a>';
                tabs += '<section id="apud-menu-1"><div>'
                      + template_table('E', t.summ.details[0])
                      + template_table('R', t.summ.details[0])
                      + template_all_table(t.summ.details[0])
                      +'</div></section>';
            }
            nav  += '</nav>';
            tabs += '</div>';
            html += nav + tabs + '</div>';

            if ($('#loadlevel').html() != 'all') {
                html += "<div style='margin:5px; padding-top:10px; color:red'>"
                + "<strong>Attention! </strong><br />"
                + "<font style='color:white'>Zoom level is actually <span style='color:yellow;'><b>" + $('#loadlevel').html() + "</b></span>. "
                + "Some of the portals are not visible and cannot be used to compute AP. Please adjust your zoom level and rerun AP Under Draw again.</font>"
                + "</div>";
            }

            dialog({
                width:'600px',
                html: html,
                id: 'plugin-apunderdraw-box',
                dialogClass: '',
                title: 'AP Under Draw - results',
            });

            $('nav>a').click(function() {
                $('nav>a').removeClass('clicked');
                $(this).addClass('clicked');
                $('.tabs>section').attr('style', 'display:none');
                $('#'+$(this).attr('data-section')).attr('style', 'display:bloc');
            });
        };

        var ap = new APUnderDraw();
        ap.run();
    };

    // init setup
    window.plugin.apunderdraw.setup  = function() {
        console.log('AP Under Draw loaded.');
        if (!localStorage['plugin-draw-tools-layer']) {
            console.log('ERROR : AP Under Draw requires draw-tools. Please install/enable the draw-tools plugin');
            return false;
        }
        window.plugin.apunderdraw.addButtons();
    };

    // toolbox menu
    window.plugin.apunderdraw.addButtons = function() {
        $('head').append('<style>.audtable { border-collapse:collapse; width: 100%; } .audtable > thead > tr > th, .audtable > tbody> tr > td{ border:1px solid #20A8B1;  font-size:12px; padding:3px; font-weight:normal; }</style>');
        $("head").append('<link rel="stylesheet" type="text/css" href="' + apud_css_ui + '" />')
        $('.leaflet-draw-toolbar-top').append('<a onclick="window.plugin.apunderdraw.doTheJob();" class="leaflet-draw-draw-calculator" href="#" title="Show AP under Draw" style="background-image:url(' + apud_ico_ap + ')!important; background-repeat:no-repeat;"></a>');
    };

    // runrun
    var setup =  window.plugin.apunderdraw.setup;

    setup.info = plugin_info; // add the script info data to the function as a property
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
