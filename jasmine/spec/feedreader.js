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
    describe('RSS Feeds?', function() {
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


        /* Done: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it("url is defined and has valid link", function(){
              allFeeds.forEach(function(feed){
                expect(feed.url).toBeDefined()
                expect(feed.url.length).not.toBeNull();
                expect(feed.url).toMatch(/^(http|https):\/\//);
              });
            });


        /* Done: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

         it("name is defined and it is not empty", function(){
              allFeeds.forEach(function(feed){
                expect(feed.name).toBeDefined()
                expect(feed.name.length).not.toBeNull();
                expect(typeof feed.name).toBe("string");
              });
            });
    });


    /* done: Write a new test suite named "The menu" */
    describe("The menu", function(){

        /* done: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         it("Element menu is hidden by default", function(){
           expect(document.body.className).toBe("menu-hidden");
         });
         /* done: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
         it("Menu changes visibility when menu icon is clicked", function(){
           document.querySelector(".menu-icon-link").click();
           expect(document.body.className).not.toBe("menu-hidden");

           document.querySelector(".menu-icon-link").click();
           expect(document.body.className).toBe("menu-hidden");
         });

      });
    /* done: Write a new test suite named "Initial Entries" */
    describe("Initial Entries", function(){

        /* done: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         let feedEntry = document.querySelector(".feed").getElementsByClassName("entry");
         beforeEach(function (done) {
           loadFeed(0, done);
         });

         it("When loadFeed function is excuted there must be at least one element in .emtry", function(){
           expect(feedEntry.length).toBeGreaterThan(0);
         });

      });
    /* done: Write a new test suite named "New Feed Selection" */
    describe("New Feed Selection", function(){

        /* Done: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
         let oldFeed,
             newFeed;

         beforeEach(function(done){
           loadFeed(0, function(){
             oldFeed = document.querySelector(".feed").innerHTML;

             loadFeed(1, function(){
               newFeed = document.querySelector(".feed").innerHTML;
               done();
             });
           });
         });

         it("when new feed is loaded by loadFeed() content changes", function(){
            expect(newFeed).not.toBe(oldFeed);
         });
       });
}());
