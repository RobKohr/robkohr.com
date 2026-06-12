# blog


Possible design alternatives:
https://www.andreinc.net/

https://edwardtufte.github.io/tufte-css/


Blog article about this blog renderer:

http://robkohr.com/articles/created-a-new-blog-render

Example of it being hosted:
https://robkohr.com

## How to use

- clone this repo into a folder in your obsidian directory. This will host your blog.
- Move example-rename-me-to-blog.md to blog.md
	- update the content, using the format as an example
- update an analytics.html file to root directory with your analytics html code
- empty tags, articles, images directories
- update build.js to use a different title than Rob Kohr's Blog
- run 
```
npm install
npm run build
```

## Dark mode

Dark mode is currently disabled. To turn it back on:

1. In `neat.css`, change `color-scheme: light` to `color-scheme: light dark` and uncomment the `@media (prefers-color-scheme: dark)` block at the bottom of the file.
2. In `build.js`, set `darkMode = true`.
3. Rebuild with `npm start`.

## Possible issues
I use files with no html extensions for output. If you are using nginx you need to add to your config

```
        location / {
                ## whatever you already have here...
                default_type text/html;
        }
```

## Thanks

Style based off of:

https://neat.joeldare.com/

