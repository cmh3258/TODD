
angular.module('bobjones')

.controller('ExploreCtrl',['$scope','fgDelegate', 'foursquare', function ($scope, fgDelegate, foursquare)
{

    $scope.hellobob = "Hello bob"
    $scope.showthemore = false
    //$scope.isCollapsed8 = true
    //$scope.isCollapsed7 = false
    $scope.selections = [
        "",
        "food",
        "drinks",
        "coffee",
        "shops",
        "arts",
        "outdoors",
        "sights",
        "trending",
        "specials",
        "nextVenues",
        "topPicks",
        "custom"
    ]

    $scope.searchSections = function(section, index)
    {
        console.log('section: ', section)
        console.log('index: ', index)
        $scope.selectedone = index; 

        $scope.exploreFoodData = null

        if(section == "custom")
        {
            console.log('searching custom section')
            $scope.finalarry = []
            $scope.isCollapsed7 = true

            $scope.$watch('$last',function(){
                fgDelegate.getFlow('homePageGir').itemsChanged();
            });
        }
        else
        {  
            foursquare.exploreSection(section)
                .success(function (data) 
                {                 
                    var items = data.response.groups[0].items
                    $scope.exploreFoodData = itemEditing(items)

                    var finalarry = []
                    for(var j = 0; j < items.length; j++)
                    {    
                        finalarry.push(items[j].venue)
                    }
                    $scope.finalarry = finalarry

                    $scope.$watch('$last',function(){

                        fgDelegate.getFlow('homePageGir').itemsChanged();
                    });

                })
                .error(function(error){
                    console.log('exploreFood: ', error.message)
                });
        }
    }

    $scope.itemsNew = [
        {
            imag:'http://placehold.it/300x600/E97452/fff',
            name:'Lorem ipsum dolor sit amet',
            id:'blahdasl'
        },
        {
            imag:'http://placehold.it/300x300/4C6EB4/fff',
            name:'Lorem ipsum dolor sit amet',
        },
        {
            imag:'http://placehold.it/300x250/449F93/fff',
            name:'Lorem ipsum dolor sit amet',
        }]

        $scope.updateGrid = function(){
            var homePageGrid = fgDelegate.getFlow('homePageGir');

            // then you can:
            homePageGrid.minItemWidth += 20;
            homePageGrid.refill(true);
        }

        $scope.reload = function()
        {
            $scope.$watch('$last',function(){
                fgDelegate.getFlow('homePageGir').itemsChanged();
            });
        }

    foursquare.exploreTopVenues()
        .success(function (data) 
        {
           $scope.newData = data.response.venues
           var items = data.response.groups[0].items
            items = itemEditing(items)
           //$scope.exploreFoodData = items
           console.log('bob ' ,$scope.exploreFoodData)
           var finalarry = []
           for(var j = 0; j < items.length; j++)
           {    
            finalarry.push(items[j].venue)
           }
           $scope.finalarry = finalarry
           //getPhotos($scope.exploreFoodData)
            //fgDelegate.getFlow('demoGird2').refill(true);
            //fgDelegate.getFlow('demoGird2').itemsChanged();
$scope.itemsNew1 = [
        {
            imag:'http://placehold.it/300x600/E97452/fff',
            name:'Lorem ipsum dolor sit amet',
        },
        {
            imag:'http://placehold.it/300x300/4C6EB4/fff',
            name:'Lorem ipsum dolor sit amet',
        },
        {
            imag:'http://placehold.it/300x250/449F93/fff',
            name:'Lorem ipsum dolor sit amet',
        }]
        $scope.$watch('$last',function(){
                fgDelegate.getFlow('homePageGir').itemsChanged();
            });
        })
        .error(function(error){
            alert('exploreTopVenues: ', error.message)
        });


    var itemEditing = function(items)
    {
        var i
        for(i = 0; i < items.length; i++)
        {
            //console.log(items[i].venue)
            var photolink = items[i].venue.photos.groups[0].items[0]
            var thephoto = photolink.prefix + "300x200" + photolink.suffix
            //console.log(thephoto)
            items[i].venue["newphoto"] = thephoto

            //var status = items[i].venue.hours.isOpen
            var status = false
            //var closed = items[i].venue.hours.status
            var closed = null
            if(status == false)
            {
                //if(closed == null)
                    //items[i].venue.hours.status = "Closed"
            }
        }
        return items
    }

    $scope.hoverIn = function(){
        this.shouldshow = true;
    };

    $scope.hoverOut = function(){
        this.shouldshow = false;
    };

    $scope.addevent = function(event)
    {
        console.log('addevent ', event)
    }

    $scope.newEvent = function(item)
    {
        console.log('newevent ', item)
        var newitem = item
        //$scope.addeditem = item
        newitem.newphoto = "http://placehold.it/350x500/75A0CC/fff"
        $scope.place = ""
        $scope.finalarry.push(newitem)


        $scope.$watch('$last',function(){
            fgDelegate.getFlow('homePageGir').itemsChanged();
        });
    }

    $scope.moreinfo = function($event, place)
    {
        console.log('moreinfo ', place)
        var parent = angular.element($event.currentTarget).parent().parent().parent().parent()
        console.log('event ', parent)
        console.log('event ', parent[0].id)
        var divid = parent[0].id
        console.log('divid ', divid)

        //getElementById(divid).setAttribute("style","height:1000px");
        document.getElementById(divid).style.height += '500px';
    }

    $scope.moreinfo2 = function(place){
        $scope.moreInfoLink = "http://foursquare.com/v/" + place.id
    }


}]);
