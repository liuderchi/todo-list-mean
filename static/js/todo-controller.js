angular
.module("todoController", ['modalController', 'ngAnimate', 'ui.bootstrap'])
.controller("todoController", ['$scope', '$http', '$uibModal', '$log', ($scope, $http, $uibModal, $log) => {  // NOTE $uibModal dependencies

    $scope.tasksDone = [];
    $scope.tasksUndone = [];
    $scope.alerts = []; // alert message

    // NOTE usage progress bar
    $scope.addAlert = (text) => {
        $scope.alerts.splice(0, 0, {msg: text}); // insert
    };
    $scope.closeAlert = (index) => {
        $scope.alerts.splice(index, 1);
    };

    $scope.onClickAddTask = (taskName) => {
        // prepare request url and data
        var url = '/todos/';
        var data = {'task':taskName};

        $http.post(url, data).then((resp) => {
            $log.log('successPOST');
            if (resp.status === 201){
                _sendGetUpdateAngModel();
                $scope.newTaskName = '';                   // clear input
                $scope.addAlert('created task: ' + taskName);
            }
        }, (resp) => {  // handle task limit condition
            if (resp.status === 403){
                alert('reach 30 tasks limit');
            }
            $log.log('errorPOST');
        });
    };

    var _updateTaskAngModel = (resp) => {
        // group tasks by status, update ng model and view
        $scope.tasksDone = [];
        $scope.tasksUndone = [];
        var respData = resp.data.tasks;
        for (var index in respData){
            var task = respData[index];
            if (task.status === true){
                $scope.tasksDone.push(task);
            } else{
                $scope.tasksUndone.push(task);
            }
        }
    };

    var _sendGetUpdateAngModel = (url) => {
        url = url || '/todos/';   // get current host and port
        $http.get(url).then((resp) => {
            _updateTaskAngModel(resp);
            $log.log('successGET');
        }, () => {
            $log.log('errorGET');
        });
    };

    // change task status
    $scope.onClickUpdateTask = (taskID, task) => {
        console.info('task', taskID, ' is gonna update to status ', task.status);
        console.info('task', taskID, ' is gonna update to name ', task.task);

        var url = '/todos/' + taskID;

        // parse request data
        var data = {};
        if(task.status !== 'undefined'){  data.status = task.status;  }
        if(task.task !== 'undefined'){  data.task = task.task;  }

        $http.put(url, data).then((resp) => {
            $log.log('successPUT');
            if (resp.status === 200){
                _sendGetUpdateAngModel();
                $scope.addAlert('update success');
            }
        },() => {
            $log.log('errorPUT');
            _sendGetUpdateAngModel();
        });
    };

    $scope.onClickDeleteTask = (taskID, taskName) => {
        console.info('task ', taskID, ' is gonna be deleted');
        var url = '/todos/' + taskID;

        // confirm modal
        var modalInstance = $uibModal.open({
            templateUrl: 'my_modal_id',
            controller: 'ModalInstanceCtrl',
            size: 'lg',
            resolve: {  // Members that will be resolved and passed to the modal-controller as locals
                name: () => { // NOTE: name should be consistent with argument in modal-controller
                    return taskName;
                }
            }
        });

        modalInstance.result.then((modalResult) => {
            // NOTE resolve function, modalResult passed from modal-controller
            $log.info('[Modal] ' + new Date() + ': ' + modalResult);

            $http.delete(url).then((resp) => {
                $log.log('successDELETE');
                if (resp.status === 200){
                    _sendGetUpdateAngModel();
                    $scope.addAlert(resp.data.result + ' : ' + taskName );
                }
            }, () => {
                $log.log('errorDELETE');
            });
        }, (modalResultReject) => {
            // NOTE reject function, modalResultReject passed from modal-controller
            $log.info('[Modal] ' + new Date() + ': ' + modalResultReject);
        }
        );

    };

    // execute when page is loaded
    $scope.init = () => {
        _sendGetUpdateAngModel();
    };

}]);
