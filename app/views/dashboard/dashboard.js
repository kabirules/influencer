var frameModule = require("ui/frame");
var UserViewModel = require("../../shared/view-models/user-view-model");
var config = require("../../shared/config");

var firebaseUser;
var page;
var user;

exports.loaded = function(args) {
    page = args.object;
    user = page.navigationContext.user;
    page.bindingContext = user;
    firebaseUser = config.firebaseUser
    readUserInfo();
    renderUserInfo();
};

exports.setYoutubeChannel = function(args) {
    xmlYoutubeChannel = page.getViewById('youtubeChannel');
    user.youtubeChannel = xmlYoutubeChannel.text;
    user.setYoutubeChannel(user.email, user.youtubeChannel)
    .catch(function(error) {
        console.log(error);
        return Promise.reject();
    })
    .then(function(result) {
        console.log(result);
        //page.getViewById('field1').text = '';
    });
}

exports.updateYoutubeChannel = function(args) {
    xmlYoutubeChannel = page.getViewById('youtubeChannel');
    user.youtubeChannel = xmlYoutubeChannel.text;
    user.setYoutubeChannel(user.email, user.youtubeChannel)
    .catch(function(error) {
        console.log(error);
        return Promise.reject();
    })
    .then(function(result) {
        console.log(result);
        //page.getViewById('field1').text = '';
    });
}

exports.pushYoutubeChannel = function(args) {
    xmlYoutubeChannel = page.getViewById('youtubeChannel');
    user.youtubeChannel = xmlYoutubeChannel.text;
    user.pushYoutubeChannel(user.email, user.youtubeChannel)
    .catch(function(error) {
        console.log(error);
        return Promise.reject();
    })
    .then(function(result) {
        console.log(result);
        //page.getViewById('field1').text = '';
    });
}


function readUserInfo() {
    user.queryYoutubeChannel(user.email);
}

function renderUserInfo() {
    xmlLblWelcome = page.getViewById('lblWelcome');
    xmlLblWelcome.text = "Welcome " + user.email + "!";
}