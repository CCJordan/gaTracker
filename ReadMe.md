# gaTracker

Script to Track the GA Requests.

## History
This script is based on the problem, that Asus is not capable or willing to create a website where you can download drivers for their product without being tracked.
When I came along the asus website I was not able to download anything, in the console I saw "ga" is undefined. So I defined the function on the console and the download worked.

This could have been the end of the story, right? Yeah, maybe, but I wanted to track the trackers. I want to know what they would like to send to google. Of course Google Analytics is blocked in my browser, but wouldn't it be nice to see, what the enemy would have seen?
So I made the function, that replaced GA log the requests and added a very basic UI.

## Installation

To install this script, simply add it to your violentmoney scripts.

## What is tracked?

None of your traffic is tracked by this script, it just replaces Google Analytics and counts the calls to this function.
The number of this calls is saved to the localstorage. The details of each call are saved to the current js environment and are gone as you refresh the page.