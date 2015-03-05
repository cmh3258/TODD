
angular.module('bobjones', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch', 
    'ui.bootstrap',
    'ngAria',
    'ngMaterial', 
    'ngFlowGrid'
  ])
  
  .config(function ($routeProvider) {
    $routeProvider
      .when('/myboards/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        resolve: {
          boards: ['EntryService', function (EntryService) {
              return EntryService.getAllBoards();
            }]
        }
      })
      .when('/explore/', {
        templateUrl: 'views/explore.html',
        controller: 'ExploreCtrl'
      })
      .otherwise({
        redirectTo: '/myboards/'
      });
  })

  .factory('EntryService', ['$http', function ($http)
  {
    /*var o = {
      boards:[{
        name: 'First Board',
        description: 'sampling desc board',
        date:'',
        id:0,
        entries : [
        {
          title:'test', 
          description:'new desc', 
          upvotes:0, 
          date: '',
          provider_link: '',
          website: '',
          location : {
            address: '',
            city: '',
            zip: '',
            latit: 0,
            longit: 0,
            state: ''
          },
          user_created: '',
          board_id: 0,
          comments:[{
            name:'bob',
            description:'test comment',
            upvotes:0,
            date:''
          }]
        },
        {
          title:'hello there', 
          description:'I am a description', 
          upvotes:0, 
          date: '',
          provider_link: '',
          website: '',
          location : {
            address: '',
            city: '',
            zip: '',
            latit: 0,
            longit: 0,
            state: ''
          },
          user_created: '',
          board_id: 0,
          comments:[{
            name:'joshnny',
            description:'test comment',
            upvotes:0,
            date:''
          }]
        }]
    }]};*/
    var o = {
      boards:[]
    };



    o.getAllBoards = function(){
      return $http.get('/boards').success(function(data){
        angular.copy(data, o.boards);
        /*new_entries = []
        for (var i = 0; i < data.length; i++)
        {
          //console.log('[getAllBoards] ', o.boards[i])
          o.getEntries(data[i]._id).then(function(new_data){
            //console.log('new_data: ', new_data)
            o.boards.push(new_data);
          })
        }

        //console.log('new_entries: ', new_entries)
        */
      });
    };

    o.getEntries = function(boardid){
      return $http.get('/boards/' + boardid).then(function(res){
        return res.data
      })
    };

    o.createBoard = function(board){
      return $http.post('/boards', board).success(function(data){
        o.boards.push(data);
      });
    };

    o.addEntry = function(boardid, entry){
      console.log('boardid ', boardid)
      console.log('boardid ', entry)
      
      //   /boards/:board/entries
      return $http.post('/boards/' + boardid + '/entries', entry).success(function(data){
        //console.log('addentry: ', data)
        //console.log('boards->: ', o.boards)
        //o.boards
        for(var i=0; i < o.boards.length; i++)
        {
          if (data.board == o.boards[i]._id)
          {
            o.boards[i].entries.push(data);
            console.log('factory done.')
            return true;
          }
        }
        return false;
      })
    };



    return o;
  }])

  .controller('MainCtrl', ['$scope','EntryService', '$modal','$anchorScroll','$location','fgDelegate',function($scope, EntryService, $modal, $anchorScroll, $location,fgDelegate) 
  {
    console.log('Loading MainCtrl.')
    $scope.boards = EntryService.boards;

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.reload = function()
        {
          console.log('should reload')
            $scope.$watch('$last',function(){
                fgDelegate.getFlow('homePageGird').itemsChanged();
            });
        }

    $scope.explore = function()
    {
      $location.path('/explore/');
    }

    $scope.boardsGet = function()
    {
      $location.path('/myboards/');
    }


    $scope.addBoard = function()
    {
      var board = $scope.board;
      $scope.board = '';
      console.log('Board: ', board);

      var new_date = new Date();
      var date = new_date.toISOString();

      new_id = EntryService.boards.length

      EntryService.createBoard({
        name: board.name,
        description: board.description,
        created_at: date,
        updated_at: date,
      })
      /*
      EntryService.boards.push({
        name: board.name,
        description: board.description,
        date: date,
        entries: [],
        id:new_id
      });
      */
      $scope.reload()

    };

    $scope.scrollTo = function(id) {
      $location.hash(id);
      $anchorScroll();
   }

    var getdate = function()
    {
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1; //January is 0!
      var yyyy = today.getFullYear();

      if(dd<10) {
          dd='0'+dd
      } 

      if(mm<10) {
          mm='0'+mm
      } 

      today = mm+'/'+dd+'/'+yyyy;
      return today
    }

    $scope.increment = function(entry)
    {
      entry.upvotes += 1;
      //$scope.reload()
    };

      $scope.items = ['item1', 'item2', 'item3'];

    //pop up a modal
    $scope.open = function (index) {

      var modalInstance = $modal.open({
        templateUrl: '/views/myModalContent.html',
        controller: 'EntryCtrl',
        size: 'sm',
        resolve: {
          type: function()
            {
              return 'boards'
            },
          items: function () {
            return index;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });
    };

    $scope.editBoardInfo = function()
    {
      $scope.editboard = true;
    }

    $scope.updateBoard = function(board, index)
    {
      var new_date = new Date();
      var date = new_date.toISOString();

      console.log('updating:J ', EntryService.boards[index])
      $scope.editboard = false

      EntryService.boards[index].date = date;
    }



  }])


/*
* Pop up controller
*/
.controller('EntryCtrl', function ($scope, $modalInstance, type, items, EntryService, fgDelegate) {

  var index = items;

  $scope.boards = EntryService.boards

 

  /*
  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
    console.log('select: ', $scope.selected.item)
  };
  */
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  $scope.reload = function()
  {
    console.log('should reload')
      $scope.$watch('$last',function(){
          fgDelegate.getFlow('homePageGird').itemsChanged();
      });
  }
  
/*
$$hashKey: "object:20"
categories: Array[1]
contact: Object
featuredPhotos: Object
hereNow: Object
hours: Object
id: "49be75ccf964a520ad541fe3"
location: Object
name: "Torchy's Tacos"
newphoto: "https://irs2.4sqi.net/img/general/300x200/7501585_Opn1Zv7d238pgPtE_rlt123UInlRg63uFp1oGx4JJ7U.jpg"
photos: Object
price: Object
rating: 9.6
ratingColor: "00B551"rating
Signals: 449
specials: Object
stats: Object
storeId: ""url: "http://www.torchystacos.com"
verified: true
*/
  $scope.addEntry = function(entry)
      {
        console.log('entry ', entry)

        var new_date = new Date();
        var date = new_date.toISOString();
        /*
        title:'test', 
          description:'new desc', 
          upvotes:0, 
          date: '',
          provider_link: '',
          website: '',
          location : {
            address: '',
            city: '',
            zip: '',
            latit: 0,
            longit: 0,
            state: ''
          },
          user_created: '',
          board_id: 0,
        */

        if(type=='explore')
        {
          console.log('explore == item: ', entry.board)
          for(var i = 0; i < $scope.boards.length ; i++)
          {
            if (entry.board._id == $scope.boards[i]._id)
            {
              console.log(entry.board._id , ' : ', $scope.boards[i]._id)
              break;
            }
          }
          console.log('i: ', i)

          index = i;
          new_entry = {}
          new_entry.title = items.name
          new_entry.description = items.categories[0].name
          new_entry.provider_link = items.link
          new_entry.website = items.url
          new_entry.upvotes = 0
          new_entry.created_at = date
          new_entry.comments = []

          new_entry.location = {}          
          new_entry.location.address = items.location.address
          new_entry.location.city = items.location.city
          new_entry.location.zip = items.location.postalCode
          new_entry.location.latit = items.location.lat
          new_entry.location.longit = items.location.lng
          new_entry.location.state = items.location.state
          new_entry.user_created = entry.item.user_created
          entry = new_entry
        }
        else
        {
          console.log('else find: ', entry)
          new_entry = {}
          new_entry.title = entry.name
          new_entry.description = entry.description
          new_entry.provider_link = ''
          new_entry.website = entry.url
          new_entry.upvotes = 0
          new_entry.created_at = date
          new_entry.comments = []
          new_entry.location = {}          

          if(entry.location !== undefined)
          {
            new_entry.location.address = entry.location.address
            new_entry.location.city = entry.location.city
            new_entry.location.zip = entry.location.postalCode
            new_entry.location.latit = entry.location.lat
            new_entry.location.longit = entry.location.lng
            new_entry.location.state = entry.location.state
          }
          new_entry.user_created = entry.user_created
          new_entry.board_id = index
          entry = new_entry

          console.log('E: ', entry)

        }

        /*console.log('ent: ', EntryService.entries);
        console.log('id ', id, ' entry: ', entry);
        */
        
        /*
        EntryService.boards[index].entries.push(
          entry
          /*{
          title: entry.name,
          description: entry.description,
          upvotes: 0,
          date: date,
          comments: [],
          provider_link: entry.provider_link,
          website: entry.website,
          location : {
            address: entry.location.address,
            city: entry.location.city,
            zip: entry.location.zip,
            latit: entry.location.lat,
            longit: entry.location.lng,
            state: entry.location.state
          },
          user_created: entry.user_created,
          board_id: entry.board_id,
        }*/
        //);

        console.log('the boarfds: ', EntryService.boards)
        console.log('entry being saved: ', entry)
        
        EntryService.addEntry(EntryService.boards[index]._id, entry).then(function(results){
          console.log('results: ', results)
          //$scope.reload();



        })
        
        /*
        $scope.$watch(function($scope){ return $scope.boards[index]._id}, 
            function(newValue, oldValue){
              console.log(' absc; ', newValue , ' : ', oldValue); 
              if (newValue !== undefined) 
              {
                console.log('reloaded')
                $scope.reload();
              } 
            }
        )
        */  

        /*
        if(type != 'explore'){
          console.log('should get here!')
          $scope.reload()
        }
        */
      
        $modalInstance.close();

      };
})
/*
  .controller('EntryCtrl', ['$scope','EntryService', function($scope, EntryService)
  {
    $scope.showNewEntry = function(x)
    {
      $scope.addingEntry = x;
    };

      $scope.addEntry = function(id)
      {
        var entry = $scope.entry;
        $scope.entry = '';
        console.log('ent: ', EntryService.entries);
        console.log('id ', id, ' entry: ', entry);

        EntryService.boards[id].entries.push({
          title: entry.name,
          description: entry.description,
          upvotes: 0,
          comments: []
        });
      };

  }])
*/
  .controller('CommentCtrl', ['$scope','EntryService', function($scope, EntryService)
  {
    $scope.addingComment = false
    $scope.showNewComment = function(x)
    {
      $scope.addingComment = x;
    };

      $scope.addComment = function(is , id)
      {
        console.log('is ',is)
        var comment = $scope.comment;
        $scope.comment = '';
        console.log('ent: ', EntryService.boards);
        console.log('id ', id, ' comment: ', comment);

        var new_date = new Date();
        var date = new_date.toISOString();
        
        EntryService.boards[is].entries[id].comments.push({
          name: comment.name,
          description: comment.description,
          upvotes: 0,
          date:date
        });
        
      };

  }])

 ;


