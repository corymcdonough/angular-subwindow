angular.module('cjm.directives.bounding', [])
  .factory('cjmBoundingService', ['$window', function($window) {

    return {
      getBoundingContainer: function(element, boundingElement) {
          var container = false;
          var boundToAncestor = false;
          var absoluteOffsetX = 0;
          var absoluteOffsetY = 0;

          if(boundingElement) {
            var ancestorElement = element;
            while (ancestorElement[0].parentElement && !boundToAncestor) {
              ancestorElement = ancestorElement.parent();
              if(ancestorElement[0] === boundingElement[0]) {
                boundToAncestor = true;
              }
              if($window.getComputedStyle(ancestorElement[0], null).getPropertyValue('position') === 'absolute') {
                absoluteOffsetX += ancestorElement[0].offsetLeft;
                absoluteOffsetY += ancestorElement[0].offsetTop;
              }
            }

            if(boundToAncestor) {
              container = {
                left: boundingElement[0].offsetLeft - absoluteOffsetX,
                top: boundingElement[0].offsetTop - absoluteOffsetY,
                width: boundingElement[0].offsetWidth,
                height: boundingElement[0].offsetHeight,
                right: 0,
                bottom: 0
              };
            } else {
              var rectBounding = boundingElement[0].getBoundingClientRect();
              container = {
                left: rectBounding.left - absoluteOffsetX + window.scrollX,
                top: rectBounding.top - absoluteOffsetY + window.scrollY,
                width: boundingElement[0].offsetWidth,
                height: boundingElement[0].offsetHeight,
                right: 0,
                bottom: 0
              };
            }
            container.right = container.left + container.width;
            container.bottom = container.top + container.height;
          }

          return container;
        }

    };
  }]);
