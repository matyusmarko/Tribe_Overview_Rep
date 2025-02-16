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
    createIssue("Hibabejelentesek", "oreg-kh", "hiba/észrevétel", issue.text, token);
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
    $.ajax({
        url: url,
        type: "POST",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "token " + accessToken);
        },
        data: JSON.stringify({
            title: issueTitle,
            body: issueBody
        }),
        success: function(msg) {
            UI.SuccessMessage("Az üzeneted sikeresen továbbítottuk!", 5000);
        },
        error: function() {
            UI.ErrorMessage("Valami hiba történt, nem sikerült elküldeni az adatokat!", 5000);
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
        margin-left: 5px;
        margin-right: 5px;
    }
    #gear img {
        cursor: pointer;
        width: 45px;
        height: 45px;
    }
`);

function readTableData() {
    $("#myTable tr").each(function (index) {
        if (index === 0) return; // Fejléc kihagyása

        let cells = $(this).find("td");

        let playerName = cells.eq(0).text().trim();
        let points = parseInt(cells.eq(1).text().replace(".", ""), 10) || 0;
        let spear = parseInt(cells.eq(2).text().replace(".", ""), 10) || 0;
        let sword = parseInt(cells.eq(3).text().replace(".", ""), 10) || 0;
        let axe = parseInt(cells.eq(4).text().replace(".", ""), 10) || 0;
        let archer = parseInt(cells.eq(5).text().replace(".", ""), 10) || 0;
        let spy = parseInt(cells.eq(6).text().replace(".", ""), 10) || 0;
        let lightCav = parseInt(cells.eq(7).text().replace(".", ""), 10) || 0;
        let marcher = parseInt(cells.eq(8).text().replace(".", ""), 10) || 0;
        let heavyCav = parseInt(cells.eq(9).text().replace(".", ""), 10) || 0;
        let ram = parseInt(cells.eq(10).text().replace(".", ""), 10) || 0;
        let catapult = parseInt(cells.eq(11).text().replace(".", ""), 10) || 0;
        let knight = parseInt(cells.eq(12).text().replace(".", ""), 10) || 0;
        let noble = parseInt(cells.eq(13).text().replace(".", ""), 10) || 0;
        let militia = parseInt(cells.eq(14).text().replace(".", ""), 10) || 0;
        let outgoingCommands = parseInt(cells.eq(15).text().replace(".", ""), 10) || 0;
        let incomingAttacks = parseInt(cells.eq(16).text().replace(".", ""), 10) || 0;

        console.log({
            playerName,
            points,
            spear,
            sword,
            axe,
            archer,
            spy,
            lightCav,
            marcher,
            heavyCav,
            ram,
            catapult,
            knight,
            noble,
            militia,
            outgoingCommands,
            incomingAttacks
        });
    });
}

// Oldal betöltésekor azonnal futtassa az adatfeldolgozást
$(document).ready(function() {
    readTableData();
});

void(0);
