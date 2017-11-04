var frameModule = require("ui/frame");
var UserViewModel = require("../../shared/view-models/user-view-model");
var config = require("../../shared/config");

var firebaseUser;
var page;

exports.loaded = function(args) {
    page = args.object;
    user = page.navigationContext.user;
    page.bindingContext = user;
    firebaseUser = config.firebaseUser
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
        console.log('setYoutubeChannel result: ');
        console.log(result);
        //page.getViewById('field1').text = '';
    });
}