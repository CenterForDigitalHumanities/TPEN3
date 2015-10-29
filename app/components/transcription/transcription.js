tpen.controller('transcriptionController', function ($scope, hotkeys, Manifest) {
    $scope.config = {};
    hotkeys.add({
        combo: 'alt+enter',
        description: 'Fullscreen',
        callback: function () {
            $scope.config.fullscreen = !$scope.config.fullscreen;
        }
    });
    $scope.messages = (function () {
        var msg = [];
        if (!Manifest.label) {
            msg.push({
                text: 'Manifest has no label.',
                type: 'warning'
            });
        }
        if (!Manifest.sequences || Manifest.sequences[0]) {
            msg.push({
                text: 'Manifest has no canvas sequences.',
                type: 'danger'
            });
            return msg;
        }
        if (!Manifest.sequences[0].canvases || !Manifest.sequences[0].canvases.length) {
            msg.push({
                text: 'Manifest sequence has no canvases.',
                type: 'danger'
            });
            return msg;
        }
    }());
});
