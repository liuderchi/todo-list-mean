angular
.module("modalController", ['ngAnimate', 'ui.bootstrap'])
.controller('ModalInstanceCtrl', ($scope, $uibModalInstance, name) => {
    // NOTE $uibModalInstance dependencies
    // define display of modal content and return value
    $scope.DeleteTaskName = name;
    $scope.ok = () => {
        $uibModalInstance.close('user confirmed');// NOTE pass to modalResult
    };
    $scope.cancel = () => {
        $uibModalInstance.dismiss('user canceled');// NOTE pass to modalResultReject
    };
});
