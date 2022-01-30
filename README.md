# Shadertoy Custom Textures

Allows custom 2D textures, music and videos to temporarily be used in Shadertoy projects.

To load an image/audio/video file/link, drag and drop it (either your computer or from the web (text link)) onto one of the texture preview slots.

Browser extensions available for [Chrome](https://chrome.google.com/webstore/detail/shadertoy-custom-texures/jgeibpcndpjboeebilehgbpkopkgkjda) and [Firefox](https://addons.mozilla.org/en-US/firefox/addon/shadertoy-custom-texures).

The source code can be found in the `inject.js` if you want to make a [javascript bookmark](https://mrcoles.com/bookmarklet/).

## Note

* only textures allowed are 2D
* video and audio formats are only the ones that shadertoy (or the browser) inheritly supports
* loading images from the web maybe blocked due to [cross-origin HTTP requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS) not being allowed on their servers
* only https links will work due to [mixed content restrictions](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content)

## Updates

* the texture filter and wrap settings are now read from the correct place
* custom loaded textures now use the same ID as one from shadertoy.com, so you can save projects without issue
* the "changes you made may not be saved" popup will now not be triggered when loading a custom texture over an existing texture
* added support for audio and videos files
* removed unnecessary tabs permission from manifest file
* updated to manifest v3