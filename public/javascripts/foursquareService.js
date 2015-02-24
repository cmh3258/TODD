
angular.module('bobjones')

//https://api.foursquare.com/v2/venues/4a5a7dabf964a5206eba1fe3/photos&client_id=NIVPQHGRVGDXDF01DNIG1VBEV0QFFMCN5HH3XIBBX3RIHZYH&client_secret=1LRSXS4DWKMI5VVK5MKUGJ03YBROKGSL55TVJM3W2QUIXGRK&v=20141129
//prefix: "https://irs3.4sqi.net/img/general/"
//suffix: "https://irs3.4sqi.net/img/general/1275756_tGksTXAQp-Nm-mXjMVhGj3iIruQShmUaCa0J2DSu3ZI.jpg"


.factory('foursquare', function($http, $window, LocationService){

  return{
    //log in to the dashboard
        exploreTopVenues : function(){   
            client_id = "NIVPQHGRVGDXDF01DNIG1VBEV0QFFMCN5HH3XIBBX3RIHZYH"
            client_secret = "1LRSXS4DWKMI5VVK5MKUGJ03YBROKGSL55TVJM3W2QUIXGRK"

      var call = $http({
                method: 'GET',
                //url: 'https://api.foursquare.com/v2/venues/search?ll=40.7,-74&client_id=NIVPQHGRVGDXDF01DNIG1VBEV0QFFMCN5HH3XIBBX3RIHZYH&client_secret=1LRSXS4DWKMI5VVK5MKUGJ03YBROKGSL55TVJM3W2QUIXGRK&v=20141129'
                //url: 'https://api.foursquare.com/v2/venues/explore?near=AUSTIN,TX&venuePhotos=1&client_id=NIVPQHGRVGDXDF01DNIG1VBEV0QFFMCN5HH3XIBBX3RIHZYH&client_secret=1LRSXS4DWKMI5VVK5MKUGJ03YBROKGSL55TVJM3W2QUIXGRK&v=20141129'
                url: 'https://api.foursquare.com/v2/venues/explore?ll=' +LocationService.lat +  ','+ LocationService.lng +'&venuePhotos=1&client_id=NIVPQHGRVGDXDF01DNIG1VBEV0QFFMCN5HH3XIBBX3RIHZYH&client_secret=1LRSXS4DWKMI5VVK5MKUGJ03YBROKGSL55TVJM3W2QUIXGRK&v=20141129'

                //data:  JSON.stringify({username: username, password: password})
            })
            call.success(function (data, status, headers, config) {
              if(true)
                  console.log("deny call: success: ", data);
            })
            call.error(function (data, status, headers, config){
              if(true)
                  console.log('deny call: error: ', data);
            });
            return call;     
    },  

    //logout the user 
    logout: function(){
      return;
    },

        exploreSection : function(section){   

            var call = $http({
                method: 'GET',
                //url: 'https://api.foursquare.com/v2/venues/search?ll=40.7,-74&client_id=NIVPQHGRVGDXDF01DNIG1VBEV0QFFMCN5HH3XIBBX3RIHZYH&client_secret=1LRSXS4DWKMI5VVK5MKUGJ03YBROKGSL55TVJM3W2QUIXGRK&v=20141129'
                url: 'https://api.foursquare.com/v2/venues/explore?near=AUSTIN,TX&venuePhotos=1&section='+section+'&client_id=NIVPQHGRVGDXDF01DNIG1VBEV0QFFMCN5HH3XIBBX3RIHZYH&client_secret=1LRSXS4DWKMI5VVK5MKUGJ03YBROKGSL55TVJM3W2QUIXGRK&v=20141129'

                //data:  JSON.stringify({username: username, password: password})
            })
            call.success(function (data, status, headers, config) {
                if(true)
                    console.log("exploreSection call: success: ", data);
            })
            call.error(function (data, status, headers, config){
                if(true)
                    console.log('exploreSection call: error: ', data);
            });
            return call;     
        },  

  }

})