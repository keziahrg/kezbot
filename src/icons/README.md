# Icons

Taken from https://www.jamesshopland.com/blog/nextjs-svg-sprites.

This directory contains SVG icons that are used by the app.

Everything in this directory is made into a sprite using `npm run build:icons`.
This file will show in /public/icons/sprite.svg

## Using external icon libraries

To add a new svg icon from an external icon library, such as [lucide-icons](https://lucide.dev/guide/packages/lucide-react),
use [sly-cli](https://sly-cli.fly.dev/).

A `sly.json` config file can be found at the project root.

Run `npx @sly-cli/sly add` in your terminal to add an icon using the cli.
