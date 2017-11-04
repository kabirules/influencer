var dialogsModule = require("ui/dialogs");
var frameModule = require("ui/frame");
var UserViewModel = require("../../shared/view-models/user-view-model");
var user = new UserViewModel({
    email: "javifont@gmail.com",
    password: "123456"
});

var page;
var email;

exports.loaded = function(args) {
    page = args.object;
    page.bindingContext = user;
    user.init();
};

exports.signIn = function() {
    user.set("isLoading", true);
    user.login()
        .catch(function(error) {
            user.set("isLoading", false);
            console.log(error);
            dialogsModule.alert({
                message: "Unfortunately we could not find your account.",
                okButtonText: "OK"
            });
            return Promise.reject();
        })
        .then(function(firebase_user) {
            user.set("isLoading", false);
            var navigationOptions={
                moduleName:'/views/dashboard/dashboard',
                context:{user: user}
            }
            frameModule.topmost().navigate(navigationOptions);
        });
};

exports.register = function() {
    user.set("isLoading", true);
    user.register()
    .catch(function(error) {
        user.set("isLoading", false);
        console.log(error);
        dialogsModule.alert({
            message: "Error while registering",
            okButtonText: "OK"
        });
        return Promise.reject();
    })
    .then(function() {
        user.set("isLoading", false);
        //alert('Succesfully registered');
        frameModule.topmost().navigate("/views/dashboard/dashboard");
    });
};

exports.google_register = function() {
    user.set("isLoading", true);
    console.log('starting google register');
    user.google_register()
    .catch(function(error) {
        user.set("isLoading", false);
        console.log(error);
        dialogsModule.alert({
            message: "Error while registering",
            okButtonText: "OK"
        });
        return Promise.reject();
    })
    .then(function() {
        user.set("isLoading", false);
        frameModule.topmost().navigate("/views/dashboard/dashboard");
    });
};