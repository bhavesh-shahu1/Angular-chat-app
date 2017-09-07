// (function() {
//     'use strict';
//     angular
//         .module('app.chat.common')
//         .directive('schrollBottom', schrollBottom);

//     function schrollBottom() {
//         console.log('---------------');
//         return {
//             scope: {
//                 schrollBottom: "="
//             },
//             link: function(scope, element) {
//                 scope.$watchCollection('schrollBottom', function(newValue) {
//                     if (newValue) {
//                         $(element).scrollTop($(element)[0].scrollHeight+150);
//                         console.log($(element)[0].scrollHeight);
//                         console.log(newValue);
//                     }
//                 });
//             }
//         }
//         // export { schrollBottom };
//     }
// })();
