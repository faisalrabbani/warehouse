'use strict';
/**
 * @ngdoc function
 * @name ShoppinPalApp.controller:StoreManagerCtrl
 * @description
 * # StoreManagerCtrl
 * Controller of the ShoppinPalApp
 */
angular.module('ShoppinPalApp')
  .controller('StoreManagerCtrl', function($scope, $anchorScroll, $location, loginService) {

    $anchorScroll.yOffset = 50;
    $scope.storesReport = [];
    $scope.completedReports = [];
    $scope.alphabets = [];
    $scope.editVisible = false;

    /** @method editStore()
     * @param selecte_row
     * This method display the edit functionlity on right swipe
     */
    $scope.editStore = function(selectedRow) {
        $scope.selectedStore = selectedRow;
        $scope.editVisible = true;
    };

    /** @method deleteStore
     * @param storereport
     * This method remove the row from store-report on left swipe
     */
    $scope.deleteStore = function(storereport) {
        for (var i = 0; i < $scope.storesReport.length; i++) {
            if ($scope.storesReport[i].sku == storereport.sku) {
                $scope.completedReports.push($scope.storesReport[i]); //push completed row in completedReports array 
                $scope.storesReport.splice(i, 1); //Remove the particular row from storeReports
            }
        }
    };

    /** @method gotoDepartment
     * @param value
     * This method
     */
    $scope.gotoDepartment = function(value) {
        var jumpToHash = 'jumpto' + 'electronics';
        for (var i = 0; i < $scope.storesReport.length; i++) {
            var type = $scope.storesReport[i].type,
                typefirstChar = type.slice(0, 1).toUpperCase();
            $scope.alphabets.push(typefirstChar);
            if (typefirstChar == value) {
                jumpToHash = 'jumpto' + $scope.storesReport[i].type;
            }
        }
        if ($location.hash() !== jumpToHash) {
            $location.hash(jumpToHash);
        }
        else {
            $anchorScroll();
        }
    };

    /** @method JumtoDepartment
     * This method will return avilable departments firstChar for jumpTo department functionality
     */
    $scope.JumtoDepartment = function() {
        for (var i = 0; i < $scope.storesReport.length; i++) {
            var type = $scope.storesReport[i].type,
                typefirstChar = type.slice(0, 1).toUpperCase();
            $scope.alphabets.push(typefirstChar);
            $.unique($scope.alphabets); // This method remove the duplicates from array
        }
    };

    /** @method showCompletedReport
     * This display completed report on screen
     */
    $scope.showCompletedReport = function() {
        $scope.storesReport = $scope.completedReports;
    };

    /** @method submitToWarehouse
     * This method will submit the store-report to warehouse
     */
    $scope.submitToWarehouse = function() {
        $location.path('/warehouse-report');
    };

    /** @method decreaseQty
     * @param storereport
     * This method decreases the ordered quantity ,when user tap on '-'' sign
     */
    $scope.decreaseQty = function(storereport) {
        storereport.orderqty = parseInt(storereport.orderqty); // parse it from string to integer
        storereport.orderqty -= 1;
    };
    
    /** @method increaseQty
     * @param storereport
     * This method increase the ordered quantity ,when user tap on '+' sign
     */
    $scope.increaseQty = function(storereport) {
        storereport.orderqty = parseInt(storereport.orderqty);
        storereport.orderqty += 1;
    };

    /** @method hideEdit
      *
      */
    $scope.hideEdit = function () {
        //alert("hii");
      if ($scope.editVisible) {
          $scope.editVisible = false;
        }
    };
    /** @method viewContentLoaded
     * This method will load the storesReport from api on view load
     */
    $scope.$on('$viewContentLoaded', function() {
        loginService.getSelectStore().then(function (response) {
               // $scope.storesReport = response;
                $scope.storesReport = response.data.storesReport;
                // $scope.storesReport = response;
                $scope.JumtoDepartment();
        });
    });
});
