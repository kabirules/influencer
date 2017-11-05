//var validator = require("email-validator");
var config = require("../../shared/config");
var firebase = require("nativescript-plugin-firebase");
var observableModule = require("data/observable");

function User(info) {
    info = info || {};

    // You can add properties to observables on creation
    var viewModel = new observableModule.fromObject({
        email: info.email || "",
        password: info.password || "",
        youtubeChannel: '' || ""
    });

    viewModel.login = function() {
        return firebase.login({
            type: firebase.LoginType.PASSWORD,
            passwordOptions: {
            email: viewModel.get("email"),
            password: viewModel.get("password")
            }
          }).then(
            function (response) {
                config.uid = response.uid
                config.firebaseUser = response;
                return response;
            });
    };
    
    viewModel.register = function() {
        return firebase.createUser({
            email: viewModel.get("email"),
            password: viewModel.get("password")
          }).then(
              function (response) {
                return response;
              }
          );
    };

    viewModel.google_register = function() {
        console.log('viewModel.google_register');
        return firebase.login({
            type: firebase.LoginType.GOOGLE
        }).then(
            function (result) {
                JSON.stringify(result);
            },
            function (errorMessage) {
                console.log(errorMessage);
            }
        );
    }
    /*
    viewModel.isValidEmail = function() {
        var email = this.get("email");
        return validator.validate(email);
    };
*/
    viewModel.init = function(){
        firebase.init({
            url: config.apiUrl
        }).then(
            function (instance) {
            console.log("firebase.init done");
            },
            function (error) {
            console.log("firebase.init error: " + error);
            }
        );
    };
    
    viewModel.add = function(data) {
        return firebase.push( '/Groceries', {
          'Name': data,
          'UID': config.uid
        });
    };

    viewModel.setValue = function(data){
        return firebase.setValue(
            '/companies',
            {foo:data}
        );        
    }

    //TODO it will remove all children from username, fix it
    viewModel.setYoutubeChannel = function(username, channel) {
        username = username.replaceAll(username, ".","-");
        return firebase.setValue(
            username,
            {youtubeChannel: channel}
        );
    }

    //TODO it will remove all children from username, fix it
    viewModel.updateYoutubeChannel = function(username, channel) {
        username = username.replaceAll(username, ".","-");
        return firebase.update(
            username,
            {youtubeChannel: channel}
        );
    }

    viewModel.pushYoutubeChannel = function(username, channel) {
        username = username.replaceAll(username, ".","-");
        return firebase.push( '/users/'+username, 
            {youtubeChannel: channel}
        );
    }    


    viewModel.query = function() {
        firebase.query(
            onQueryEvent,
            "/Groceries",
            {
                singleEvent: true,
                orderBy: {
                    type: firebase.QueryOrderByType.CHILD,
                    value: 'since'
                }
                /*
                },
                ranges: {
                      type: firebase.QueryRangeType.START_AT,
                      value: 1999
                },
                limit: {
                    type: firebase.QueryLimitType.LAST,
                    value: 2
                }
                */
            }
        );
    }

    viewModel.delete = function(index) {
        //var id = viewModel.getItem(index).id;
        id = '-KvI6UEfPfmh0ooH4jT5';
        return firebase.remove("/Groceries/"+id+"");
    };

    return viewModel;
}

var onQueryEvent = function(result) {
    // note that the query returns 1 match at a time
    // in the order specified in the query
    if (!result.error) {
        console.log("Event type: " + result.type);
        console.log("Key: " + result.key);
        console.log("Value: " + JSON.stringify(result.value));
    }
};


function handleErrors(response) {
    if (!response.ok) {
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }
    return response;
}

//Replace all chars from string.
//Useful to remove dots from emails and make them valid for json key.
String.prototype.replaceAll = function(text, search, replacement) {
    console.log('text: ' || text);
    while (text.indexOf(search) > -1) {
        text = text.replace(search,replacement);
        console.log(text);
    }
    return text;
};

module.exports = User;