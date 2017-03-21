# Shadertoy Custom Textures

Allows you to temporarily load custom textures into Shadertoy projects.

To load an image drag and drop it (either your computer or from the web) onto one of the texture preview slots.

Also saving a project after using a custom texture will result in it being replaced with one of the provided textures and the sampler settings resetted to their defaults.

## There are three ways to use this:
1. run the script below in the javascript console
2. create a [javascript bookmark](http://andrewhills.github.io/ShadertoyCustomTextures/bookmark.html)
3. use this Chrome extension

## Note
* only works for 2D textures
* many images on the web maybe blocked due to websites blocked due to [cross-origin HTTP requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS) not being allowed on the servers.

## Source

```javascript

void((function(){
    function setTex(x,url) {
        var fil=document.getElementById('mySamplerFilter'+x);
        var wrp=document.getElementById('mySamplerWrap'+x);
        var filVal=fil.options[fil.selectedIndex].value;
        var wrpVal=wrp.options[wrp.selectedIndex].value;
        var opt=document.getElementById('mySamplingButton'+x);
        if(opt.style.visibility=='hidden') {
            filVal='mipmap';
            wrpVal='repeat';
        };
        gShaderToy.SetTexture(x,{
            mSrc:url,mType:'texture',mID:1,
            mSampler:{filter:filVal,wrap:wrpVal,vflip:'true',srgb:'false',internal:'byte'}});
    };    
    for(var x=0;x<4;x++){
        (function(x){
            var dz=document.getElementById('myUnitCanvas'+x);
            dz.addEventListener('drop',(function(evt){
                evt.stopPropagation();
                evt.preventDefault();
                var text = evt.dataTransfer.getData('text');
                if(text) {
                    console.log('loading:'+text);
                    setTex(x,text);
                } else {
                    var fs=evt.dataTransfer.files;
                    var f=fs[0];
                    var reader=new FileReader();
                    console.log('loading:'+escape(f.name));
                    reader.onload=(function(x){
                        return (function(e){
                            setTex(x,e.target.result);
                        });
                    })(x);
                    reader.readAsDataURL(f);
                }
            }),false);
            dz.addEventListener('dragover',(function(evt){
                evt.stopPropagation();
                evt.preventDefault();
                evt.dataTransfer.dropEffect='link';
            }),false);
        })(x);
    };
})());

```
