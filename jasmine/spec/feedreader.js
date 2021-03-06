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


        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('URL is defined and not empty', function() {
            for (i in allFeeds) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });


        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it('allFeed is defined and not empty', function() {
            for (i in allFeeds) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
    });


    /* Write a new test suite named "The menu" */
    describe('The menu', function() {
        var menuIcon;
        var menuVisible;

        /* Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

        it('Body has "menu-hidden" as default', function() {
            //Ensures menu element is hidden as default
            menuVisible = document.body.classList.contains('menu-hidden');
            expect(menuVisible).toBeTruthy();
        });

        /* Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */

        it('Body toggles the class "menu-hidden" on clicking menu icon', function() {
            //Tests the menu visibility when icon is clicked
            $('.menu-icon-link').trigger('click'); //Open menu
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').trigger('click');// Closes memu
            expect($('body').hasClass('menu-hidden')).toBe(true);   
        });
    });


    /* Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        beforeEach(function(done) {
            setTimeout(function() {
                loadFeed(0, done);
            }, 1000);
        });

        it('Consists of at least one entry when loaded', function(done) {
            //Tests to see if more than 1 entry is present in load
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });
    });
        /* Write a new test suite named "New Feed Selection" */
        describe('New Feed Selection', function() {
            var getContent0
            var getContent1

            /* Write a test that ensures when a new feed is loaded
             * by the loadFeed function that the content actually changes.
             * Remember, loadFeed() is asynchronous.
             */

            beforeEach(function(done) {
                loadFeed(0, function() {
                    getContent0 = $('.feed').html();
                    loadFeed(1, function() {
                        getContent1 = $('.feed').html();
                        done();
                    });
                });
            });

        //Ensure new feed loads
        it('Ensures new feed loads', function(done) {
            expect(getContent0).not.toEqual(getContent1);
            done();
            });
        });
});
