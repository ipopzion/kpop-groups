$(document).ready(function () {
    $.getJSON("https://api.npoint.io/3b29185abe05fefc7e11", function (data) {

        const stateManager = {
            totalGroup: data.length,
            data: data, 
            current: 0,
            handleLeftClick: function () {
                this.current = this.current == 0 ? this.totalGroup - 1 : this.current - 1;
                const group = data[this.current]
                loadGroups(group)
            },
            handleRightClick: function () {
                this.current = this.current == this.totalGroup - 1 ? 0 : this.current + 1;
                const group = data[this.current]
                loadGroups(group)
            }
        }

        loadArrows(stateManager)
        loadGroups(data[0])
        $(".popup").click(() => $(".popup").hide())
        $(".popup").hide()
    })
})

function loadGroups(groupData) {
    const groupName = Object.keys(groupData)[0]
    const members = Object.values(groupData)[0]

    $(".header").empty()
    $(".card-container").empty()

    $("<h1/>", {
        text: groupName
    }).appendTo(".header")

    members.forEach(info => {
        $("<div/>", {
            class: "card",
            referrerpolicy: "no-referrer", 
            style: "background-image:linear-gradient(transparent 50%, black),url(" + info.src + ")",
            text: info.name
        }).click(() => showMember(info))
        .appendTo(".card-container")
    })
}

function showMember(info) {
    $(".popup").empty().show()

    const imageDisplay = $("<div/>", {
        class: "minicard",
        referrerpolicy: "no-referrer", 
        style: "background-image:linear-gradient(transparent 50%, black),url(" + info.src + ")",
        text: info.name
    })

    const memberInfo = $("<div/>", {
        class: "bigcardinfo",
        html: info.info.replaceAll("\n", "<br/>")
    })

    $("<div/>", {
        class: "bigcard"
    }).append([imageDisplay, memberInfo])
    .appendTo(".popup")
}


function loadArrows(stateManager) {
    $("<div/>", {
        id: "leftArrow",
        html: `<svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 590.907 590.907" xml:space="preserve" transform="matrix(1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M522.177,42.788l0.977-2.653c4.256-11.545,3.602-21.436-1.949-29.391C516.517,4.015,508.759,0,500.457,0 c-6.744,0-13.326,2.485-20.089,7.586L81.482,262.937l-1.87,1.337c-9.293,7.356-14.642,18.045-14.679,29.324 c-0.037,11.279,5.248,22.001,14.492,29.418l0.899,0.723l400.003,259.454c6.787,5.187,13.406,7.714,20.205,7.714 c8.269,0,16.004-3.999,20.695-10.691c5.548-7.926,6.236-17.791,2.038-29.333l-0.955-2.632L356.08,300.981 c-0.862-4.152-0.851-10.392,0.027-14.547L522.177,42.788z M433.128,497.865L118.462,293.763l2.139-1.371h189.004 c-0.147,9.317,1.126,18.712,3.892,26.322l0.958,2.631L433.128,497.865z"></path> </g> </g> </g></svg>`,
    }).click(() => stateManager.handleLeftClick()).appendTo(".arrows")
    $("<div/>", {
        id: "rightArrow",
        html: `<svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 590.907 590.907" xml:space="preserve" transform="matrix(-1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M522.177,42.788l0.977-2.653c4.256-11.545,3.602-21.436-1.949-29.391C516.517,4.015,508.759,0,500.457,0 c-6.744,0-13.326,2.485-20.089,7.586L81.482,262.937l-1.87,1.337c-9.293,7.356-14.642,18.045-14.679,29.324 c-0.037,11.279,5.248,22.001,14.492,29.418l0.899,0.723l400.003,259.454c6.787,5.187,13.406,7.714,20.205,7.714 c8.269,0,16.004-3.999,20.695-10.691c5.548-7.926,6.236-17.791,2.038-29.333l-0.955-2.632L356.08,300.981 c-0.862-4.152-0.851-10.392,0.027-14.547L522.177,42.788z M433.128,497.865L118.462,293.763l2.139-1.371h189.004 c-0.147,9.317,1.126,18.712,3.892,26.322l0.958,2.631L433.128,497.865z"></path> </g> </g> </g></svg>`,
    }).click(() => stateManager.handleRightClick()).appendTo(".arrows")
}