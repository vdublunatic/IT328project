
//This routes the user to a page that allows them to select a category.
Router.route('/', function () {
    this.render('category');
})

Router.route('/game', function () {
    this.render('content');
})

Router.route('/login', function() {
    this.render('login')
})

//This prevents the user from getting into other pages without logging in.
Router.onBeforeAction(function () {
    //make sure the user is logged in
    if(!Meteor.user() && !Meteor.loggingIn()) {
        this.redirect('/login');
    } else{
        this.next(); //tells the router to continue with its business
    }
},{
    except: ['login']
});