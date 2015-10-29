var tpen = angular.module('tpen', ['ui.bootstrap', 'ngRoute', 'ngAnimate','angular-loading-bar', 'cfp.hotkeys']);
tpen.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
// routes
            $routeProvider
                .when('/home', {
                templateUrl: 'components/home/home.html'
                })
            .when('/transcription', {
                templateUrl: 'components/transcription/transcription.html',
                controller: 'transcriptionController'
                })
            .otherwise(({redirectTo: '/home'}));
    }]);
tpen.value('Manifest', {});
tpen.controller('mainController', function ($scope, $location, hotkeys) {
    // welcome functions
    hotkeys.add({
        combo: 'home',
        description: 'RERUM home',
        allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
        callback: function () {
            $location.path('/welcome');
        }
    });
    $scope.hotkeys = hotkeys;
    function tabTo (step) {
//        var elem = document.getElementsByClassName('focused')[0];
        var elem = event.target || window;
        if (elem.type === "number") {
            return elem;
        }
        var list = [].filter.call(document.querySelectorAll('input, button, select, textarea, a[href]'), function (item) {
//            angular.element(item).removeClass('focused');
            return item.tabIndex >= "0";
        });
        var index = list.indexOf(elem);
        if (index + step < 0) {
            elem = list.pop();
        } else {
            do {
                elem = list[index + step] || list[0];
                index += step;
            } while (angular.element(elem).hasClass('ng-hide'))
        }
//        angular.element(elem).addClass('focused');
        return elem;
    };
    /**
     * Convert strings like cmd into symbols like ⌘
     * @param  {String} combo Key combination, e.g. 'mod+f'
     * @return {String}       The key combination with symbols
     */
    $scope.symbolize = function (combo) {
        var map = {
            command: '⌘',
            shift: '⇧',
            left: '←',
            right: '→',
            up: '↑',
            down: '↓',
            'return': '↩',
            backspace: '⌫'
        };
        for (var i = 0; i < combo.length; i++) {
            // try to resolve command / ctrl based on OS:
            if (combo[i] === 'mod') {
                if ($window.navigator && $window.navigator.platform.indexOf('Mac') >= 0) {
                    combo[i] = 'command';
                } else {
                    combo[i] = 'ctrl';
                }
            }
            combo[i] = map[combo[i]] || combo[i];
        }
        return combo.join(' + ');
    };
    hotkeys.add({
        combo: 'T',
        description: 'Term',
        allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
        callback: function () {
            $scope.terminal = !$scope.terminal;
        }
    });
    hotkeys.add({
        combo: 'down',
        description: 'Next',
        allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
        callback: function () {
            tabTo(1).focus();
        }
    });
    hotkeys.add({
        combo: 'up',
        description: 'Previous',
        allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
        callback: function () {
            tabTo(-1).focus();
        }
    });
});