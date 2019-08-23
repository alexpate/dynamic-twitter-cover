# Dynamic Twitter Cover

A small Node script that generates a new Twitter cover image based on the time of day.

**[View live example](https://twitter.com/alexjpate)**

![Example](example.png)

## What is this?

A node script setup to run every hour (via GitHub Actions), that generates a new cover image based on the time of day. Inspired by the dynamic wallpaper feature on macOS.

Being based in London, the time of day is based off of UTC.

## Running it locally

In order to run this locally, you'll need two things:

1. A recent version of Node (only tested on 12.8)
2. Twitter API credentials. You can get a set from the [Developer portal](https://developer.twitter.com/en/apps).

Then, run the following:

- `npm install`
- `node index.js`
