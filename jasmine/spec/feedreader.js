/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Second test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have valid urls', function() {
            for(const feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });

        /* Third test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have valid names', function() {
            for(const feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });
    });


    /* Second test suite for testing the menu */
    describe('The menu', function() {
        /* First test that ensures the menu element is
         * hidden by default.
         */
        it('should be hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* Second test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * has two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('should change visibility when clicked', function() {
            var menuIcon = $('.menu-icon-link');
            var bodyNode = document.getElementsByTagName('body')[0];

            // click on menu icon and expect menu to open
            menuIcon.trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);

            // click on menu icon again and expect menu to close
            menuIcon.trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* Third test suite for testing initial entries */
    describe('Initial Entries', function() {
        /* First test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('should be created', function() {
            expect($('.feed .entry')).toBeTruthy();
        });
    });

    /* Fourth test suite for testing new feed selection */
    describe('New Feed Selection', function() {
        /* First test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        it('should change content', function(done) {
            loadFeed(0, function() {
                // Get html of feed 0
                var feed0 = document.getElementsByClassName('feed')[0].innerHTML;
                loadFeed(1, function() {
                    // Get html of feed 1 after loadFeed is
                    // called again
                    var feed1 = document.getElementsByClassName('feed')[0].innerHTML;
                    expect(feed0).not.toEqual(feed1);
                    done();
                });
            });
        });
    });
}());
