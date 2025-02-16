javascript:

var gear = "https://raw.githubusercontent.com/oreg-kh/Unit-and-building-simulator/master/gear.png";
let token = atob("ZjRiNDIzZWE4MzgxMDJmZmNkMTdmY2M4MDdmY2Y1MTkxZjlkN2I5Yw==");
var player = game_data.player.name;
var world = game_data.world;
let script = {
	name: "Tribe overview",
	version: "v1.0"
}
let issue = {
	text: ["|Player|World|Script name|Script version|",
		"|---|---|---|---|",
		`|${player}|${world}|${script.name}|${script.version}|`,
		"",
		"Issue:"
	].join("\n")
};

function sendMessage() {
	createIssue("Hibabejelentesek", "oreg-kh", "hiba/ĂŠszrevĂŠtel", issue.text, token);
}

function addURL() {
	var issueText = $("#issue");
	var imageURL = $("#image").val();
	issueText.val(issueText.val() + addBBcodeToURL(imageURL));
	clearURL();
}

function clearURL() {
	return $("#image").val("");
}

function addBBcodeToURL(url) {
	return `![issue-image](${url})`;
}

function createIssue(repoName, repoOwner, issueTitle, issueBody, accessToken) {
	var url = "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/issues";
	var text = $("#issue").val();
	$.ajax({
		url: url,
		type: "POST",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "token " + accessToken);
		},
		data: JSON.stringify({
			title: issueTitle,
			body: issueBody + "\n" + text
		}),
		success: function(msg) {
			UI.SuccessMessage("Az Ăźzeneted sikeresen tovĂĄbbĂ­tottuk!", 5000);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			UI.ErrorMessage("Valami hiba tĂśrtĂŠnt, nem sikerĂźlt elkĂźldeni az adatokat!", 5000);
		}
	})
}

function spinMainIcon(durationMs, deg) {
	$({deg: 0}).animate({deg: deg}, {
		duration: durationMs,
		step: (angle) => {
			$("#gear img").css({
				transform: `rotate(${angle}deg)`
			});
		}
	});
}

sideBarHTML = `
    <div id="gear" onclick="openSideBar()">
        <img src=${gear}>
    </div>
    <div class="sidenav">
        <div class="sidenav-container">
            <div id="closeButton">
                <a onclick="closeSideBar()">&times</a>
            </div>
            <div id="guide">
                <p>Itt tudod bejelenteni, ha hibĂĄt vagy eltĂŠrĂŠst tapasztalsz a script mĹąkĂśdĂŠsĂŠben.</p>
            </div>
            <div id="issueText">
                <textarea id="issue" placeholder="Hiba leĂ­rĂĄsa..." rows="10" cols="50"></textarea>
            </div>
            <div id="sendIssue">
                <button type="button" onclick="sendMessage()">KĂźldĂŠs</button>
            </div>
            </br>
            <div id="imageURL">
                <textarea id="image" placeholder="KĂŠp url" rows="1" cols="50"></textarea>
            </div>
            <div id="addURL">
                <button type="button" onclick="addURL()">HozzĂĄadĂĄs</button>
            </div>
        </div>
    </div>
`;

function createSideBar() {
	$("body").append(sideBarHTML);
}

function openSideBar() {
	spinMainIcon(500, -180);
	$(".sidenav").width(390);
}

function closeSideBar() {
	spinMainIcon(500, 180);
	$(".sidenav").width(0);
}

function initCss(css) {
	$(`<style>${css}</style>`).appendTo("body");
}

initCss(`
    .sidenav {
        height: 100%;
        width: 0px;
        position: fixed;
        z-index: 19;
        top: 35px;
        left: 0px;
        background-color: #111;
        overflow-x: hidden;
        transition: 0.5s;
        padding-top: 60px;
    }
    .sidenav-container {
        display: block;
        margin-left: 5px;
        margin-right: 5px;
    }
    .sidenav a {
        padding: 8px 8px 8px 32px;
        text-decoration: none;
        font-size: 25px;
        color: #818181;
        display: block;
        transition: 0.3s;
    }
    .sidenav a:hover {
        color: #f1f1f1;
    }
    #guide p {
        color: #818181;
    }
    #closeButton a {
        cursor: pointer;
        position: absolute;
        top: 0;
        right: 0px;
        font-size: 36px;
        margin-left: 50px;
    }
    #gear img {
        z-index: 12000;
        position: absolute;
        top: 3px;
        cursor: pointer;
	    width: 45px;
	    height: 45px;
    }
    #sendIssue button, #addURL button {
        cursor: pointer;
    }
`)
createSideBar()
if (game_data.mode == "members_troops") {

	let game = window.image_base;
	let imageSrc = {
		spear: game + "unit/unit_spear.png",
		sword: game + "unit/unit_sword.png",
		archer: game + "unit/unit_archer.png",
		heavy: game + "unit/unit_heavy.png"
	};

	var landzsas,
		kardos,
		bardos,
		ijasz,
		felderito,
		konnyulovas,
		lovasijasz,
		nehezlovas,
		kos,
		katapult,
		lovag,
		nemes_falunkent,
		selector = $("#ally_content .modemenu"),
		selected = $(".input-nicer").find(":selected"),
		idx = 0,
		index = 0;

	// style hozzĂĄadĂĄsa
	function initCss(css) {
		$(`<style>${css}</style>`).appendTo("body");
	}

	// gombok lĂŠtrehozĂĄsa
	function createButtons(buttons) {
		$(".input-nicer").after(buttons);
		moveForm();
	}

	// Ăźzenet lĂŠtrehozĂĄsa
	function createMessage(message, time) {
		UI.SuccessMessage(message, time);
	}

	// a form ĂĄthelyezĂŠse a TĂĄblĂĄzat fĂślĂŠ
	function moveForm() {
		$("form").insertBefore(selector);
	}

	// lĂŠtrehoz a TĂĄblĂĄzat alatt egy sort
	function createSumTable(sum) {
		$(selector).append(`<tbody id="myTable2">${sum}</tbody>`);
	}

	// az ĂśsszegzĂŠs gombra klikkelve Ăśsszeadja a tĂĄbla oszlopokat
	function sumTable() {
		resetTable();
		for (var i = 0; i < 16; i++) {
			for (j = 0; j < $("#myTable").find("tr").length - 1; j++) {
				row = Number($(".column" + i + "").eq(j).text());
				own = Number($(".sum").eq(i).text())
				$(".sum").eq(i).text(own + row);
			}
		}
	}

	// a sumTable() ismĂŠtelt futtatĂĄsakor lenullĂĄzza a tĂĄblĂĄt
	function resetTable() {
		for (var i = 0; i < 16; i++) {
			$(".sum").eq(i).text(0);
		}
	}

	// TĂĄblĂĄzat egy bizonyos sorĂĄnak tĂśrlĂŠse
	function deleteRow(row) {
		var index = row.parentNode.parentNode.sectionRowIndex;
		$("#myTable").find("tr").eq(index).remove();
		storeHTML();
	}

	// TĂĄblĂĄzat eltĂĄrolĂĄsa
	function storeHTML() {
		var tableContent = selector.find("tbody").eq(1)[0].innerHTML;
		localStorage.setItem("tableContent", tableContent);
		createMessage("Az adatok mentĂŠse megtĂśrtĂŠnt!", 2000);
	}

	// eltĂĄrolt adatok tĂśrlĂŠse localStorage-bĂłl, tĂĄbla sorok tĂśrlĂŠse
	function clearStorage() {
		localStorage.removeItem("tableContent");
		var select = selector.find("tbody:eq(1)").find("tr");
		for (var i = 1; i < select.length; i++) {
			select.eq(i).remove();
		}
		for (var attr in localStorage) {
			if (attr > 0) {
				localStorage.removeItem(attr);
			}
		}
		createMessage("A mentett adatok sikeresen tĂśrlĂŠsre kerĂźltek!", 2500);
	}

	// az aktuĂĄlis jĂĄtĂŠkos nevĂŠt adja vissza
	function getName() {
		var name = selected.text().trim();
		return name;
	}

	// az aktuĂĄlis player id-t adja vissza
	function getPlayerId() {
		var id = selected.attr("value");
		return id;
	}

	// ajax-hoz URL-t ad vissza
	function createURL() {
		var url = "https://" +
			location.host +
			game_data.link_base_pure +
			"info_player&id=" +
			getPlayerId();
		return url;
	}

	// a kĂśvetkezĹ gombra klikkelve ĂĄtugrik a kĂśvi jĂĄtĂŠkosra
	function next() {
		removeDisabledOptions();
		var last = $(".input-nicer").find("option").last().is(":selected");
		if (last) {
			$("#button2").prop("disabled", true);
			createMessage("ElĂŠrted az utolĂł jĂĄtĂŠkost!", 2000);
		} else {
			$("#button1").prop("disabled", true);
			$("#button2").prop("disabled", true);
			selected.next().prop("selected", true);
			$(selected).removeAttr("selected");
			selected = $(".input-nicer").find(":selected");
			UI.InfoMessage("VĂĄltĂĄs folyamatban...", 2000);
			get_next_player();
		}
	}
	
	// a kĂśvetkezĹ jĂĄtĂŠkos tĂĄblĂĄzatĂĄnak betĂśltĂŠse
	function get_next_player() {
		var link = "https://" + document.location.host + "/game.php?screen=ally&mode=members_troops&player_id=" + selected.val() + "&village=" + game_data.village.id;
		$.ajax({url: link, async: true, success: function(result){
			$(".table-responsive").html($(result).find(".table-responsive").html());
			$("#button1").prop("disabled", false);
			$("#button2").prop("disabled", false);
			UI.SuccessMessage("KĂŠsz", 1000);
		}});		
	}

	// eltĂĄvolĂ­tja a formbĂłl azokat a jĂĄtĂŠkosokat, akik nem osztottĂĄk meg az adataikat
	function removeDisabledOptions() {
		var options = $(".input-nicer").find("option");
		for (var i = 0; i < options.length; i++) {
			var disabled = options.eq(i).is(":disabled");
			if (disabled) {
				options[i].remove();
			}
		}
	}

	// sereg tĂ­pus ĂŠs nemes szĂĄm eltĂĄrolĂĄsa
	function storeToMap(id, type, nobleman) {
		var object = {
			"type": type,
			"nobleman": nobleman
		};
		localStorage.setItem(id, JSON.stringify(object));
	}

	// fal szint eltĂĄrolĂĄsa
	function storeBuildingsToMap(id, buildingsLevel) {
		var val = localStorage.getItem(id);
		var myObject = JSON.parse(val);
		myObject.buildingsLevel = buildingsLevel;
		localStorage.setItem(id, JSON.stringify(myObject));
	}

	// faluban lĂŠvĹ, beĂŠrkezĹ vĂŠdĹk ĂŠs beĂŠrkezĹ tĂĄmadĂĄs eltĂĄrolĂĄsa
	function storeDefenseToMap(id, in_village, enroute, incoming_attack) {
		var val = localStorage.getItem(id);
		var myObject = JSON.parse(val);
		myObject.in_village = in_village;
		myObject.enroute = enroute;
		myObject.incoming_attack = incoming_attack;
		localStorage.setItem(id, JSON.stringify(myObject));
	}

	// szĂśveg ĂĄtkĂłdolĂĄsa
	function base64(template) {
		return window.btoa(unescape(encodeURIComponent(template)));
	}

	// szĂĄmok tagolĂĄsa
	function numberWithCommas(x) {
		var parts = x.toString().split(".");
		parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		return parts.join(".");
	}

	// lĂŠtrehozza a tĂĄblĂĄt, attĂłl fĂźggĹen, van-e eltĂĄrolva
	function createTable(htmlContent) {
		if (!localStorage.tableContent) {
			selector.append(htmlContent);
		} else {
			selector.append(`<tbody id="myTable" oninput="storeHTML()">` + localStorage.getItem("tableContent") + `</tbody>`);
		}
	}

	// fal ĂŠs vĂŠdĹ oszlop kĂśreinek megvĂĄltoztatja a szĂ­nĂŠt
	function changeColor(selector, index, color) {
		$(selector).eq(index).css("background-color", color);
	}

	function show_hide() {
		var column = $('#myTable tr > *:nth-child(18)');
		if (!column.is(":hidden")) {
			column.hide();
		} else {
			column.show();
		}
	}

	initCss(`
        #myTable {
            width:100%;
            white-space:nowrap;
            text-align:center;
        }
        #myTable th:hover {
            cursor:pointer;
            text-decoration:underline;
        }
        #content_value .sum {
            background-color:white;
            width:100%;
            white-space:nowrap;
            text-align:center;
        }
        .hide {
            visibility:hidden;
        }
        #myTable .circle1 {
            display: inline-block;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: red;
            border: 1px solid grey;
        }
        #myTable .circle2 {
            display: inline-block;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: red;
            border: 1px solid grey;
        }
        button:hover {
            cursor:pointer;
        }
        #myTable tr {
            vertical-align: middle;
        }
    `);

	createButtons(`
        <button type="button" id="button1" onclick="save()">HozzĂĄadĂĄs</button>
        <button type="button" id="button2" onclick="next()">KĂśvetkezĹ</button>
        <button type="button" id="button3" onclick="clearStorage()">TĂśrlĂŠs</button>
        <button type="button" id="button4" onclick="sumTable()">ĂsszegzĂŠs</button>
        <button type="button" id="button5" onclick="tableToExcel()">Excel</button>
        <button type="button" id="button6" onclick="buildings()">ĂpĂźletek</button>
        <button type="button" id="button7" onclick="defense()">VĂŠdekezĂŠs</button>
        <button type="button" id="button8" onclick="show_hide()">Elrejt-Mutat</button>
        <b><code>Created by Ăśreg</code></b>
    `);

	createTable(`
    	<tbody id="myTable" oninput="storeHTML()">
        	<tr>
            	<th onclick="sortTable(0)">NĂŠv</th>
            	<th onclick="sortTable(1)">
              		<center>
                		<font color="black">Vegyes</font> <br><span class="icon header population"></span> T = V
              		</center>
            	</th>
           		<th onclick="sortTable(2)">
              		<center>
                		<font color="black">ĐŃres</font> <br><span class="icon header population"></span> 0
              		</center>
                </th>
                <th onclick="sortTable(3)">
                    <center>
                        <font color="red">Teljes nuke</font> <br><span class="icon header population"></span> 19.300+
                    </center>
                </th>
                <th onclick="sortTable(4)">
                    <center>
                        <font color="red">3/4 nuke</font> <br><span class="icon header population"></span> 15.000-19.300
                    </center>
                </th>
                <th onclick="sortTable(5)">
                    <center>
                        <font color="red">1/2 nuke</font> <br><span class="icon header population"></span> 10.000-15.000
                    </center>
                </th>
                <th onclick="sortTable(6)">
                    <center>
                        <font color="red">1/4 nuke</font> <br><span class="icon header population"></span> 5.000-10.000
                    </center>
                </th>
                <th onclick="sortTable(7)">
                    <center>
                        <font color="red">>1/4 nuke</font> <br><span class="icon header population"></span> 1-5.000
                    </center>
                </th>
                <th onclick="sortTable(8)"><font color="gold">Nemes</font></th>
                <th onclick="sortTable(9)"><font color="red">T</font></th>
                <th><b> : </b></th>
                <th onclick="sortTable(11)"><font color="green">V</font></th>
                <th onclick="sortTable(12)">
                    <center>
                        <font color="green">Teljes vĂŠdĹ</font> <br><span class="icon header population"></span> 19.300+
                    </center>
                </th>
                <th onclick="sortTable(13)">
                    <center>
                        <font color="green">3/4 vĂŠdĹ</font> <br><span class="icon header population"></span> 15.000-19.300
                    </center>
                </th>
                <th onclick="sortTable(14)">
                    <center>
                        <font color="green">1/2 vĂŠdĹ</font> <br><span class="icon header population"></span> 10.000-15.000
                    </center>
                </th>
                <th onclick="sortTable(15)">
                    <center>
                        <font color="green">1/4 vĂŠdĹ</font> <br><span class="icon header population"></span> 5.000-10.000
                    </center>
                </th>
                <th onclick="sortTable(16)">
                    <center>
                        <font color="green">>1/4 vĂŠdĹ</font> <br><span class="icon header population"></span> 1-5.000
                    </center>
                </th>
                <th>
                    <center>
                        <font color="green">vĂŠdĹk</font> <br> lebontĂĄsban
                    </center>
                </th>
                <th>
                    <center>ĂpĂźletek</center>
                </th>
                <th>
                    <center>VĂŠdĹ</center>
                </th>
            </tr>
        </tbody>
    `);

	createSumTable(`
        <tr>
            <td class="hide"></td>
            <td class="sum"></td>
            <td class="sum"></td>
            <td class="sum"></td>
            <td class="sum"></td>
            <td class="sum"></td>
            <td class="sum"></td>
            <td class="sum"></td>
            <td class="sum"></td>
            <td class="sum"></td>
            <td> : </td>
            <td class="sum"></td>
            <td class="sum"></td>
            <td class="sum"></td>
            <td class="sum"></td>
            <td class="sum"></td>
            <td class="sum"></td>
        </tr>
    `);

	// sorbarendezi a tĂĄblĂĄzathoz a th-ra klikkelve, az adott oszlopnak megfelelĹen
	function sortTable(n) {
		var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
		table = document.getElementById("myTable");
		switching = true;
		dir = "asc";
		while (switching) {
			switching = false;
			rows = table.getElementsByTagName("tr");
			for (i = 1; i < rows.length - 1; i++) {
				shouldSwitch = false;
				if (n > 0) {
					x = Number(rows[i].getElementsByTagName("td")[n].innerHTML);
					y = Number(rows[i + 1].getElementsByTagName("td")[n].innerHTML);
					console.log(x, y);
				} else {
					x = rows[i].getElementsByTagName("td")[n].getElementsByTagName("a")[0].innerHTML.toLowerCase();
					y = rows[i + 1].getElementsByTagName("td")[n].getElementsByTagName("a")[0].innerHTML.toLowerCase();
					console.log(x, y);
				}
				if (dir == "asc") {
					if (x > y) {
						shouldSwitch = true;
						break;
					}
				} else if (dir == "desc") {
					if (x < y) {
						shouldSwitch = true;
						break;
					}
				}
			}
			if (shouldSwitch) {
				rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
				switching = true;
				switchcount++;
			} else {
				if (switchcount == 0 && dir == "asc") {
					dir = "desc";
					switching = true;
				}
			}
		}
	}

	// Ăşj sor(jĂĄtĂŠkos) hozzĂĄadĂĄsa a tĂĄblĂĄhoz
	function createNewRow() {
		var row = `<tr style="vertical-align: middle;text-align: center">
                       <td class="player_id" name="${getPlayerId()}">
                           <a href=${createURL()} target="_blank">${getName()}</a>
                       </td>
                       <td contenteditable="true" class="column0">${vegyes}</td>
                       <td contenteditable="true" class="column1">${ures}</td>
                       <td contenteditable="true" class="column2">${teljes_nuke}</td>
                       <td contenteditable="true" class="column3">${haromnegyed_nuke}</td>
                       <td contenteditable="true" class="column4">${fel_nuke}</td>
                       <td contenteditable="true" class="column5">${negyed_nuke}</td>
                       <td contenteditable="true" class="column6">${negyedalatt_nuke}</td>
                       <td contenteditable="true" class="column7">${nemes_osszes}</td>
                       <td contenteditable="true" class="column8">${offensive}</td>
                       <td> : </td>
                       <td contenteditable="true" class="column9">${defensive}</td>
                       <td contenteditable="true" class="column10">${teljes_vedo}</td>
                       <td contenteditable="true" class="column11">${haromnegyed_vedo}</td>
                       <td contenteditable="true" class="column12">${fel_vedo}</td>
                       <td contenteditable="true" class="column13">${negyed_vedo}</td>
                       <td contenteditable="true" class="column14">${negyedalatt_vedo}</td>
                       <td contenteditable="true" style="text-align:left">
                           <dl>
                               <dt><a>
                                   <img src=${imageSrc.spear}>&emsp;&nbsp;${numberWithCommas(spear)}</img>
                               </a></dt>
                               <dt><a>
                                   <img src=${imageSrc.sword}>&emsp;&nbsp;${numberWithCommas(sword)}</img>
                               </a></dt>
                               <dt><a>
                                   <img src=${imageSrc.archer}>&emsp;&nbsp;${numberWithCommas(archer)}</img>
                               </a></dt>
                               <dt><a>
                                   <img src=${imageSrc.heavy}>&emsp;&nbsp;${numberWithCommas(heavy)}</img>
                               </a></dt>
                          </dl>
                      </td>
                      <td><span class="circle1"></span></td>
                      <td><span class="circle2"></span></td>
                      <td><input type="button" value="TĂśrlĂŠs" onclick="deleteRow(this)"></td>
                  </tr>`;
		selector.find("tbody").eq(1).append(row);
	}

	// megnyit egy excel tĂĄblĂĄzatot ĂŠs exportĂĄlja a tĂĄblĂĄzat tartalmĂĄt
	function tableToExcel() {
		if ($("#" + "myTable").length == 1 && $("#" + "myTable2").length == 1) {
			table = document.getElementById("myTable").innerHTML;
			sum = document.getElementById("myTable2").innerHTML;
		} else {
			table = document.getElementById("myTable").innerHTML;
			sum = "";
		}
		var tables = table + sum,
			worksheet = "tĂĄblĂĄzat",
			uri = `data:application/vnd.ms-excel;base64,`,
			template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>${worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>${tables}</table></body></html>`;
		window.location.href = uri + base64(template);
	}

	// fal szintek lekĂŠrdezĂŠse a tĂĄblĂĄzatban szereplĹ jĂĄtĂŠkosok Ăśsszes falujĂĄhoz
	function buildings() {
		$("body").append(`<div id="tarolo" style="display: none"></div>`);
		var player_id = $(".player_id").eq(idx).attr("name");
		$("#tarolo").load("https://" + location.host + game_data.link_base_pure + "ally&mode=members_buildings&player_id=" + player_id + " .w100", function(responseTxt, statusTxt, xhr) {
			if (statusTxt == "success") {
				for (var k = 0; k < $("#tarolo").find(".w100").find("tr").length - 1; k++) {
					var buildingsLevel = [];
					var id = $("#tarolo").find(".w100").find("tr").eq(k + 1).find("a").attr("href").split("id=")[1];
					for (var j = 2; j < $("#tarolo").find(".w100").find("tr").eq(1).find("td").length; j++) {
						buildingsLevel.push(Number($("#tarolo").find(".w100").find("tr").eq(k + 1).find("td").eq(j).text().trim()));
					}
					storeBuildingsToMap(id, buildingsLevel);
				}
				if (idx < $(".player_id").length) {
					changeColor(".circle1", idx, "green");
					idx++;
					buildings();
				}
			}
			if (statusTxt == "error") {
				alert("Error: " + xhr.status + ": " + xhr.statusText);
			}
		});
	}

	// beĂŠrkezĹ erĹsĂ­tĂŠs ĂŠs a faluban lĂŠvĹ vĂŠdĹk(tanyahely szerint) lekĂŠrdezĂŠse a tĂĄblĂĄzatban szereplĹ jĂĄtĂŠkosok Ăśsszes falujĂĄhoz
	function defense() {
		$("body").append(`<div id="tarolo" style="display: none"></div>`);
		var player_id = $(".player_id").eq(index).attr("name");
		$("#tarolo").load("https://" + location.host + game_data.link_base_pure + "ally&mode=members_defense&player_id=" + player_id + " .w100", function(responseTxt, statusTxt, xhr) {
			if (statusTxt == "success") {
				var select = $("#tarolo").find(".w100").find("tr").find("a").length;
				for (var i = 0; i < select; i++) {

					// van ijjĂĄsz
					if (game_data.units[3] == "archer") {

						firstRow = $("#tarolo").find(".w100").find("tr:odd").eq(i).find("td");
						id = firstRow.find("a").attr("href").split("id=")[1];
						spear = Number(firstRow.eq(2).text().trim().replace(".", ""));
						sword = Number(firstRow.eq(3).text().trim().replace(".", ""));
						archer = Number(firstRow.eq(5).text().trim().replace(".", ""));
						heavy = Number(firstRow.eq(9).text().trim().replace(".", ""));
						in_village = spear + sword + archer + heavy * 6;
						incoming_attack = Number(firstRow.last().text().trim().replace(".", ""));

						secondRow = $("#tarolo").find(".w100").find("tr:even").eq(i + 1).find("td");
						spear = Number(secondRow.eq(1).text().trim().replace(".", ""));
						sword = Number(secondRow.eq(2).text().trim().replace(".", ""));
						archer = Number(secondRow.eq(4).text().trim().replace(".", ""));
						heavy = Number(secondRow.eq(8).text().trim().replace(".", ""));
						enroute = spear + sword + archer + heavy * 6;
						storeDefenseToMap(id, in_village, enroute, incoming_attack);

						// nincs ijjĂĄsz
					} else if (game_data.units[3] != "archer") {

						firstRow = $("#tarolo").find(".w100").find("tr:odd").eq(i).find("td");
						id = firstRow.find("a").attr("href").split("id=")[1];
						spear = Number(firstRow.eq(2).text().trim().replace(".", ""));
						sword = Number(firstRow.eq(3).text().trim().replace(".", ""));
						heavy = Number(firstRow.eq(7).text().trim().replace(".", ""));
						in_village = spear + sword + heavy * 6;
						incoming_attack = Number(firstRow.last().text().trim().replace(".", ""));

						secondRow = $("#tarolo").find(".w100").find("tr:even").eq(i + 1).find("td");
						spear = Number(secondRow.eq(1).text().trim().replace(".", ""));
						sword = Number(secondRow.eq(2).text().trim().replace(".", ""));
						heavy = Number(secondRow.eq(6).text().trim().replace(".", ""));
						enroute = spear + sword + heavy * 6;

						storeDefenseToMap(id, in_village, enroute, incoming_attack);
					}
				}
				if (index < $(".player_id").length) {
					changeColor(".circle2", index, "green");
					index++;
					defense();
				}
			}
			if (statusTxt == "error") {
				alert("Error: " + xhr.status + ": " + xhr.statusText);
			}
		});
	}

	// visszaadja milyen tĂ­pusĂş a falu
	function select() {
		if (tamado > vedo) {
			offensive += 1;
			if (tamado >= 0 && tamado < 5000) {
				negyedalatt_nuke += 1;
				type = "negyedalatt_nuke";
			}
			if (tamado >= 5000 && tamado < 10000) {
				negyed_nuke += 1;
				type = "negyed_nuke";
			}
			if (tamado >= 10000 && tamado < 15000) {
				fel_nuke += 1;
				type = "fel_nuke";
			}
			if (tamado >= 15000 && tamado < 19300) {
				haromnegyed_nuke += 1;
				type = "haromnegyed_nuke";
			}
			if (tamado >= 19300) {
				teljes_nuke += 1;
				type = "teljes_nuke";
			}
		} else if (tamado < vedo) {
			defensive += 1;
			if (vedo >= 0 && vedo < 5000) {
				negyedalatt_vedo += 1;
				type = "negyedalatt_vedo";
			}
			if (vedo >= 5000 && vedo < 10000) {
				negyed_vedo += 1;
				type = "negyed_vedo";
			}
			if (vedo >= 10000 && vedo < 15000) {
				fel_vedo += 1;
				type = "fel_vedo";
			}
			if (vedo >= 15000 && vedo < 19300) {
				haromnegyed_vedo += 1;
				type = "haromnegyed_vedo";
			}
			if (vedo >= 19300) {
				teljes_vedo += 1;
				type = "teljes_vedo";
			}
		} else if (tamado + vedo == 0) {
			ures += 1;
			type = "Ăźres";
		} else if (tamado == vedo) {
			vegyes += 1;
			type = "vegyes";
		}
	}

	// eldĂśnti milyen tĂ­pusĂş a falu ĂŠs mibĹl-mennyi egysĂŠg van benne
	function save() {
		ures = 0;
		vegyes = 0;
		offensive = 0;
		defensive = 0;
		teljes_nuke = 0;
		haromnegyed_nuke = 0;
		fel_nuke = 0;
		negyed_nuke = 0;
		negyedalatt_nuke = 0;
		nemes_osszes = 0;
		teljes_vedo = 0;
		haromnegyed_vedo = 0;
		fel_vedo = 0;
		negyed_vedo = 0;
		negyedalatt_vedo = 0;
		spear = 0;
		sword = 0;
		archer = 0;
		heavy = 0;
		length = $(".w100").find("tr").length;
		for (i = 1; i < length; i++) {
			var id = $(".w100").find("tr").eq(i).find("a").attr("href").split("id=")[1];
			var egysegek = $(".w100").find("tr").eq(i).find("td");

			if (game_data.units[3] == "archer") {
			    if (game_data.units.includes("knight")) {
		                tomb = [landzsas, kardos, bardos, ijasz, felderito, konnyulovas, lovasijasz, nehezlovas, kos, katapult, lovag, nemes_falunkent];
				for (k = 0; k < 12; k++) {
				    tomb[k] = Number(egysegek.eq(k + 1)[0].innerText.replace(".", ""));
				}
				nemes_osszes += tomb[tomb.length - 1];
				nemes_falunkent = tomb[tomb.length - 1];
				tamado = tomb[2] + tomb[5] * 4 + tomb[6] * 5 + tomb[7] * 6 + tomb[8] * 5 + tomb[9] * 8;
				vedo = tomb[0] + tomb[1] + tomb[3] + tomb[7] * 6 + tomb[8] * 5 + tomb[9] * 8;
				spear += tomb[0];
				sword += tomb[1];
				archer += tomb[3];
				heavy += tomb[7];
				select();
			    } else {
		                tomb = [landzsas, kardos, bardos, ijasz, felderito, konnyulovas, lovasijasz, nehezlovas, kos, katapult, nemes_falunkent];
				for (k = 0; k < 11; k++) {
				    tomb[k] = Number(egysegek.eq(k + 1)[0].innerText.replace(".", ""));
				}
				nemes_osszes += tomb[tomb.length - 1];
				nemes_falunkent = tomb[tomb.length - 1];
				tamado = tomb[2] + tomb[5] * 4 + tomb[6] * 5 + tomb[7] * 6 + tomb[8] * 5 + tomb[9] * 8;
				vedo = tomb[0] + tomb[1] + tomb[3] + tomb[7] * 6 + tomb[8] * 5 + tomb[9] * 8;
				spear += tomb[0];
				sword += tomb[1];
				archer += tomb[3];
				heavy += tomb[7];
				select();
		            }
			} else {
			    if (game_data.units.includes("knight")) {
		                tomb = [landzsas, kardos, bardos, felderito, konnyulovas, nehezlovas, kos, katapult, lovag, nemes_falunkent];
				for (k = 0; k < 10; k++) {
					tomb[k] = Number(egysegek.eq(k + 1)[0].innerText.replace(".", ""));
				}
				nemes_osszes += tomb[tomb.length - 1];
				nemes_falunkent = tomb[tomb.length - 1];
				tamado = tomb[2] + tomb[4] * 4 + tomb[5] * 6 + tomb[6] * 5 + tomb[7] * 8;
				vedo = tomb[0] + tomb[1] + tomb[5] * 6 + tomb[6] * 5 + tomb[7] * 8;
				spear += tomb[0];
				sword += tomb[1];
				archer = 0;
				heavy += tomb[5];
				select();
			    } else {
		                tomb = [landzsas, kardos, bardos, felderito, konnyulovas, nehezlovas, kos, katapult, nemes_falunkent];
				for (k = 0; k < 9; k++) {
					tomb[k] = Number(egysegek.eq(k + 1)[0].innerText.replace(".", ""));
				}
				nemes_osszes += tomb[tomb.length - 1];
				nemes_falunkent = tomb[tomb.length - 1];
				tamado = tomb[2] + tomb[4] * 4 + tomb[5] * 6 + tomb[6] * 5 + tomb[7] * 8;
				vedo = tomb[0] + tomb[1] + tomb[5] * 6 + tomb[6] * 5 + tomb[7] * 8;
				spear += tomb[0];
				sword += tomb[1];
				archer = 0;
				heavy += tomb[5];
				select();
		 	    }
			}
			storeToMap(id, type, nemes_falunkent);
		}
		// Ăşj sor hozzĂĄadĂĄsa a tĂĄblĂĄzathoz
		createNewRow(
			getPlayerId(),
			createURL(),
			getName(),
			teljes_nuke,
			haromnegyed_nuke,
			fel_nuke,
			negyed_nuke,
			negyedalatt_nuke,
			nemes_osszes,
			offensive,
			defensive,
			teljes_vedo,
			haromnegyed_vedo,
			fel_vedo,
			negyed_vedo,
			negyedalatt_vedo,
			spear,
			sword,
			archer,
			heavy
		);
		storeHTML();
	}

} else if (game_data.screen == "map") {

	// tĂŠrkĂŠp mozgatĂĄs esemĂŠnykezelĹje
	$(window).on("change hashchange", function() {
		indicate()
	})

	// a felsĹ ĂŠs az alĂł szĂśvegdoboz stĂ­lusĂĄt ĂĄllĂ­tja be
	function style(zindex, left, top, backgroundcolor, opacity, width, height, color, borderradius) {
		var styles = {
			"position": "absolute",
			"z-index": zindex,
			"left": left + "px",
			"top": top + "px",
			"font-size": "8pt",
			"font-weight": "bold",
			"background-color": backgroundcolor,
			"opacity": opacity,
			"width": width,
			"height": height,
			"margin-left": "0px",
			"margin-top": "0px",
			"display": "block",
			"color": color,
			"text-align": "center",
			"border-radius": borderradius
		}
		return styles;
	}

	// gomb, jelĂślĹnĂŠgyzet ĂŠs rĂĄdiĂłgomb hozzĂĄadĂĄsa
	function createHTML(content) {
		$("#content_value").find("h2").after(content);
	}

	createHTML(`
        <button type="button" id="button" title="tĂĄblĂĄzat exportĂĄlĂĄsa excelbe!" onclick="tableToExcel()">Excel</button>
            <br>
            <input type="checkbox" id="collect" name="name"></input>
            <label for="collect" title="BepipĂĄlĂĄs utĂĄn a falura kattintva kigyĹąjti annak adatait a lenti tĂĄblĂĄzatba!\nCsak annĂĄl a falunĂĄl mĹąkĂśdik, amelynek korĂĄbban eltĂĄroltuk az adatait!">KigyĹąjtĂŠs</label>
            <br>
            <input type="checkbox" id="own" name="name"></input>
            <label for="own" title="Csak a faluban kikĂŠpzett egysĂŠgeket mutatja!">Falu sajĂĄt egysĂŠgei</label>
            <br>
            <input type="checkbox" id="defense" name="name"></input>
            <label for="defense" title="A falu sajĂĄt vĂŠdĹi + a faluban lĂŠvĹ erĹsĂ­tĂŠs!">Faluban lĂŠvĹ vĂŠdĹk</label>
            <br>
            <select id="select">
                <option selected disabled hidden>EgysĂŠg/ĂpĂźlet</option>
                <option class="disabled" disabled>EgysĂŠgek</option>
                <option id="nobleman">Nemes</option>
                <option id="enroute">beĂŠrkezĹ vĂŠdĹk</option>
                <option id="incoming_attack">beĂŠrkezĹ tĂĄmadĂĄs</option>
                <option class="disabled" disabled><u>ĂpĂźletek</u></option>
                <option class="building" id="main" value="main">FĹhadiszĂĄllĂĄs</option>
                <option class="building" id="barracks" value="barracks">Barakk</option>
                <option class="building" id="stable" value="stable">IstĂĄllĂł</option>
                <option class="building" id="garage" value="garage">MĹąhely</option>
                <option class="building" id="church" value="church">Templom</option>
                <option class="building" id="church_f" value="church_f">ElsĹ templom</option>
                <option class="building" id="watchtower" value="watchtower">Ĺrtorony</option>
                <option class="building" id="snob" value="snob">AkadĂŠmia</option>
                <option class="building" id="smith" value="smith">KovĂĄcsmĹąhely</option>
                <option class="building" id="place" value="place">GyĂźlekezĹhely</option>
                <option class="building" id="statue" value="statue">Szobor</option>
                <option class="building" id="market" value="market">Piac</option>
                <option class="building" id="wood" value="wood">Fatelep</option>
                <option class="building" id="stone" value="stone">AgyagbĂĄnya</option>
                <option class="building" id="iron" value="iron">VasbĂĄnya</option>
                <option class="building" id="farm" value="farm">Tanya</option>
                <option class="building" id="storage" value="storage">RaktĂĄr</option>
                <option class="building" id="hide" value="hide">Rejtekhely</option>
                <option class="building" id="wall" value="wall">Fal</option>
            </select>
    `);

	// letiltja a legĂśrdĂźlĹ listĂĄban a adott szerveren nem lĂŠtezĹ ĂŠpĂźleteket
	let disableBuildings = [];
	let buildings = ["main", "barracks", "stable", "garage", "church", "church_f", "watchtower", "snob", "smith", "place", "statue", "market", "wood", "stone", "iron", "farm", "storage", "hide", "wall"];
	$.ajax({
		url: `https://${document.domain}/interface.php?func=get_building_info`,
		type: 'GET',
		async: true,
		success: function(xml) {
			for (var i = 0; i < buildings.length; i++) {
				if ($(xml).find(`config > ${buildings[i]}`).length == 0) {
					document.getElementById(buildings[i]).disabled = true;
				}
			}
		}
	});

	// a rĂĄdiĂłgombok ĂŠs a jelĂślĹnĂŠgyzeteket szabĂĄlyozza
	$("#own, #defense, #collect").on("change", function(event) {
		if ($("#own").is(":checked")) {
			document.getElementById("defense").disabled = true;
		}
		if ($("#defense").is(":checked")) {
			document.getElementById("own").disabled = true;
		}
		if (!$("#own").is(":checked") && !$("#defense").is(":checked")) {
			document.getElementById("own").disabled = false;
			document.getElementById("defense").disabled = false;
		}
		if ($("#collect").is(":checked")) {
			bind();
		}
		if (!$("#collect").is(":checked")) {
			unBind();
		}
	})

	// zĂśld vagy piros kĂśrĂśk lĂŠtrehozĂĄsa
	function loop(length, left, top, color) {
		for (var i = 0; i < length; i++) {
			if (i > 0) {
				left += 8.4;
			}
			$(`#map_village_${key}`).after($(`<div id=Ăśreg_map_circle${i}_${key}></div>`));
			$(`#Ăśreg_map_circle${i}_${key}`).css(style("6", left, top + 1.5, color, "", "7px", "7px", "black", "7px"));
		}
	}

	// tĂŠrkĂŠp mozgatĂĄsakor eltĂĄvolĂ­tja a korĂĄbbi szĂśvegdobozokat
	function reset(param) {
		$(param).remove();
	}

	// felsĹ ĂŠs alĂł szĂśvegdoboz lĂŠtrehozĂĄsa ĂŠs a szĂśveg beĂ­rĂĄsa
	function indicate() {
		reset("div [id*=Ăśreg_map_]");
		var hossz = $("div [id*=map_village_]");
		for (var i = 0; i < hossz.length; i++) {
			key = hossz[i].id.split("_")[2];
			console.log(key);
			if (localStorage.getItem(key)) {
				var val = localStorage.getItem(key);
				var top = parseInt($(`#map_village_${key}`).css('top'), 10) + 10;
				var left = parseInt($(`#map_village_${key}`).css('left'), 10) + 10;
				if ($("#own").is(":checked")) {
					var sereg_tipus = JSON.parse(val).type;
					console.log(sereg_tipus)
					// create upper box
					$(`#map_village_${key}`).after($(`<div id=Ăśreg_map_upperbox_${key}></div>`));
					$(`#Ăśreg_map_upperbox_${key}`).css(style("5", left, top, "#ffffff", "", "40.5px", "10px", "black", "8px"));
					// create circle
					if (sereg_tipus == "Ăźres") {} else if (sereg_tipus == "vegyes") {
						loop(5, left, top, "#0000ff")
					} else if (sereg_tipus == "teljes_nuke") {
						loop(5, left, top, "#ff0000")
					} else if (sereg_tipus == "haromnegyed_nuke") {
						loop(4, left, top, "#ff0000")
					} else if (sereg_tipus == "fel_nuke") {
						loop(3, left, top, "#ff0000")
					} else if (sereg_tipus == "negyed_nuke") {
						loop(2, left, top, "#ff0000")
					} else if (sereg_tipus == "negyedalatt_nuke") {
						loop(1, left, top, "#ff0000")
					} else if (sereg_tipus == "teljes_vedo") {
						loop(5, left, top, "#008000")
					} else if (sereg_tipus == "haromnegyed_vedo") {
						loop(4, left, top, "#008000")
					} else if (sereg_tipus == "fel_vedo") {
						loop(3, left, top, "#008000")
					} else if (sereg_tipus == "negyed_vedo") {
						loop(2, left, top, "#008000")
					} else if (sereg_tipus == "negyedalatt_vedo") {
						loop(1, left, top, "#008000")
					}
				}
				if ($("#defense").is(":checked")) {
					var suppInVillage = Number(JSON.parse(val).in_village);
					$(`#map_village_${key}`).after($(`<div id=Ăśreg_map_defense_${key}>${suppInVillage}</div>`));
					$(`#Ăśreg_map_defense_${key}`).css(style("5", left, top - 2, "#ffffff", "", "40.5px", "12px", "black", "8px"));
				}
				// create lower box
				if ($("#select :checked")) {
					var selected = $("#select :checked")[0].id;
					if ($("#nobleman").is(":checked")) {
						var nemesdarab = Number(JSON.parse(val)[selected]);
						$(`#map_village_${key}`).after($(`<div id=Ăśreg_map_nobleman_${key}>${nemesdarab}</div>`));
						$(`#Ăśreg_map_nobleman_${key}`).css(style("5", left + 8.4, top + 12, "#ffffff", "", "24px", "12px", "black", "8px"));
					}
					$(".building").not(":disabled").each(function(k, v) {
						if ($(v).is(":checked")) {
							var building = Number(JSON.parse(val).buildingsLevel[k]);
							$(`#map_village_${key}`).after($(`<div id=Ăśreg_map_wall_${key}>${building}</div>`));
							$(`#Ăśreg_map_wall_${key}`).css(style("5", left + 8.4, top + 12, "#ffffff", "", "24px", "12px", "black", "8px"));
						}
					})
					if ($("#enroute").is(":checked")) {
						var support = Number(JSON.parse(val)[selected]);
						$(`#map_village_${key}`).after($(`<div id=Ăśreg_map_enroute_${key}>${support}</div>`));
						$(`#Ăśreg_map_enroute_${key}`).css(style("5", left, top + 12, "#ffffff", "", "40.5px", "12px", "black", "8px"));
					}
					if ($("#incoming_attack").is(":checked")) {
						var attack = Number(JSON.parse(val)[selected]);
						$(`#map_village_${key}`).after($(`<div id=Ăśreg_map_incoming_attack_${key}>${attack}</div>`));
						if (attack > 0) {
							color = "#ff0000";
						} else {
							color = "#ffffff";
						}
						$(`#Ăśreg_map_incoming_attack_${key}`).css(style("5", left, top + 12, color, "", "40.5px", "12px", "black", "8px"));
					}
				}
			}
		}
	}
	indicate()

	// tĂĄblĂĄzat egy bizonyos sorĂĄnak tĂśrlĂŠse
	function deleteRow(row) {
		var index = row.parentNode.parentNode.sectionRowIndex;
		$("#myTable").find("tr").eq(index).remove();
	}

	// tĂŠrkĂŠp alatti tĂĄblĂĄzat lĂŠtrehozĂĄsa
	function createTable(content) {
		$("#map_big").append(content);
	}

	// style hozzĂĄadĂĄsa
	function initCss(css) {
		$(`<style>${css}</style>`).insertBefore("#myTable");
	}

	// szĂĄmok tagolĂĄsa
	function numberWithCommas(x) {
		var parts = x.toString().split(".");
		parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		return parts.join(".");
	}

	// sajĂĄt esemĂŠnykezelĹ hasznĂĄlata
	function bind() {
		TWMap.map._handleClick = handleClick;
	}

	// a jĂĄtĂŠk esemĂŠnykezelĹjĂŠnek hasznĂĄlata
	function unBind() {
		TWMap.map._handleClick = originalHandleClick;
	}

	createTable(`
        <tbody id="myTable" style="text-align:center">
            <tr>
                <th onclick="sortTable(0)">NĂŠv</th>
                <th onclick="sortTable(1)">Falu</th>
                <th onclick="sortTable(2)">BentlĂŠvĹ</th>
                <th onclick="sortTable(3)">BeĂŠrkezĹ</th>
                <th onclick="sortTable(4)">Ăsszes</th>
                <th>Jegyzet</th>
            </tr>
        </tbody>
    `);

	initCss(`
        #myTable th:hover {
            cursor:pointer;
            text-decoration:underline;
        }
        button:hover {
            cursor:pointer;
        }
        #myTable .white {
            background-color:white;
            color:black;
        }
        .disabled {
	        font-weight:bold;
            color:red;
        }
    `);

	// eredeti esemĂŠnykezelĹ
	function originalHandleClick(e) {
		if (this.mover && this.mover.moveDirty) {
			return false;
		}
		var pos = this.coordByEvent(e);
		return this.handler.onClick(pos[0], pos[1], e)
	}

	// sajĂĄt esemĂŠnykezelĹm
	function handleClick(e) {
		var pos = this.coordByEvent(e);
		var x = pos[0];
		var y = pos[1];
		var a = x * 1000 + y;
		var village = TWMap.villages[a];
		if (typeof village != 'undefined' && localStorage[village.id]) {
			url = "https://" + location.host + game_data.link_base_pure + "info_player&id=" + village.owner;
			$('img#map_village_' + village.id).fadeTo(0, 0.5);

			val = localStorage[village.id];
			console.log(val);

			names = TWMap.players[village.owner].name;
			console.log(names);

			coords = pos.join("|");
			console.log(coords);

			bentlevo = Number(JSON.parse(val).in_village);
			console.log(bentlevo);

			beerkezo = Number(JSON.parse(val).enroute);
			console.log(beerkezo);

			osszes = bentlevo + beerkezo;
			console.log(osszes);

			rows = `<tr>
                        <td>
                            <a href=${url} target="_blank">${names}</a>
                        </td>
                        <td contenteditable="true">${coords}</td>
                        <td contenteditable="true">${numberWithCommas(bentlevo)}</td>
                        <td contenteditable="true">${numberWithCommas(beerkezo)}</td>
                        <td contenteditable="true">${numberWithCommas(osszes)}</td>
                        <td class="white" contenteditable="true"></td>
                        <td><input type="button" value="TĂśrlĂŠs" onclick="deleteRow(this)"></td>
                    </tr>`;
			$("#myTable").append(rows);
		}
		return false;
	}

	// sorbarendezi a tĂĄblĂĄzatot a th-ra klikkelve, az adott oszlopnak megfelelĹen
	function sortTable(n) {
		var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
		table = document.getElementById("myTable");
		switching = true;
		dir = "asc";
		while (switching) {
			switching = false;
			rows = table.getElementsByTagName("tr");
			for (i = 1; i < rows.length - 1; i++) {
				shouldSwitch = false;
				if (n > 0) {
					x = Number(rows[i].getElementsByTagName("td")[n].innerHTML);
					y = Number(rows[i + 1].getElementsByTagName("td")[n].innerHTML);
					console.log(x, y);
				} else {
					x = rows[i].getElementsByTagName("td")[n].getElementsByTagName("a")[0].innerHTML.toLowerCase();
					y = rows[i + 1].getElementsByTagName("td")[n].getElementsByTagName("a")[0].innerHTML.toLowerCase();
					console.log(x, y);
				}
				if (dir == "asc") {
					if (x > y) {
						shouldSwitch = true;
						break;
					}
				} else if (dir == "desc") {
					if (x < y) {
						shouldSwitch = true;
						break;
					}
				}
			}
			if (shouldSwitch) {
				rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
				switching = true;
				switchcount++;
			} else {
				if (switchcount == 0 && dir == "asc") {
					dir = "desc";
					switching = true;
				}
			}
		}
	}

	// szĂśveg kĂłdolĂĄsa
	function base64(template) {
		return window.btoa(unescape(encodeURIComponent(template)));
	}

	// megnyit egy excel tĂĄblĂĄzatot ĂŠs exportĂĄlja a tĂĄblĂĄzat tartalmĂĄt
	function tableToExcel() {
		table = document.getElementById("myTable").innerHTML;
		var tables = table,
			worksheet = "TĂĄblĂĄzat",
			uri = `data:application/vnd.ms-excel;base64,`,
			template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>${worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>${tables}</table></body></html>`;
		window.location.href = uri + base64(template);
	}
}
void(0);