(function() {
        'use strict';

        angular
            .module('app.chat')
            .directive('samePasswordCheck', passwordCheck);

         function passwordCheck(){
        return {
            require: 'ngModel',
            link: function(scope, elem, attrs, ctrl) {
                console.log(attrs);
                var firstPassword = '#' + attrs.samePasswordCheck;
                console.log(firstPassword);
                elem.add(firstPassword).on('keyup', function() {
                    scope.$apply(function() {
                        var v = elem.val() === $(firstPassword).val();
                        ctrl.$setValidity('pwmatch', v);
                    });
                });
            }
        }
    }
})();
