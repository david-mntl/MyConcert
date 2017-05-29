var app2 = angular.module('mainModule', ['angularFileUpload','ngCookies']);

app2.controller('AppController', [ 'FileUploader','$cookies','$scope', function(FileUploader,$cookies,$scope) {
        $scope.item = [];
        $scope.isOneFile = false;
        $scope.reset = function() {
            $scope.isOneFile = false;
        };

        var uploader = $scope.uploader = new FileUploader({
            url: 'upload.php'
        });

        // FILTERS

        uploader.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|gif|'.indexOf(type) !== -1;
            }
        });

        // CALLBACKS

        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed');
        };
        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile');
            $scope.isOneFile = true;
            console.log($scope.uploader.queue);
            console.log($scope.uploader.queue[0].file.name);
            var extension = $scope.uploader.queue[0].file.name.split('.');
            $scope.uploader.queue[0].file.name = $cookies.get("userRegisterEmail") + "."+extension[extension.length-1];
            console.log($scope.uploader.queue[0].file.name);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll');
        };
        uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem');
        };
        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem');
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll');
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem');
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem');
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem');
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem');
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
            console.log($scope.isOneFile);
        };

        console.info('uploader', uploader);
    }]);