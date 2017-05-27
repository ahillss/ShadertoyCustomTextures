# Shadertoy Custom Textures

Allows you to temporarily load custom textures into Shadertoy projects.

To load an image drag and drop it (either your computer or from the web) onto one of the texture preview slots.

## There are three ways to use this:
1. run the script below in the javascript console
2. create a [javascript bookmark](http://andrewhills.github.io/ShadertoyCustomTextures/bookmark.html)
3. use this [Chrome extension](https://chrome.google.com/webstore/detail/shadertoy-custom-texures/jgeibpcndpjboeebilehgbpkopkgkjda)

## Note
* works only for 2D textures
* loading images from the web maybe blocked due to [cross-origin HTTP requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS) not being allowed on their servers

## Updates
* the texture filter and wrap settings are now read from the correct place
* custom loaded textures now use the same ID as one from shadertoy.com, so you can save projects without issue
* the "changes you made may not be saved" popup will now not be triggered when loading a custom texture over an existing texture

## Source

```javascript

void((function(){
    function setTex(x,url) {
        var inp=gShaderToy.mEffect.mPasses[gShaderToy.mActiveDoc].mInputs[x];
        var tg=inp?inp.globject:null;
        var wrpEnm=gShaderToy.mEffect.mRenderer.TEXWRP;
        var filEnm=gShaderToy.mEffect.mRenderer.FILTER;
        var wrpStr=(tg&&tg.mWrap==wrpEnm.CLAMP)?'clamp':'repeat';
        var filStr=(tg&&tg.mFilter==filEnm.LINEAR)?'linear':((tg&&tg.mFilter==filEnm.NONE)?'nearest':'mipmap');
        var flpStr=(tg&&!tg.mVFlip)?'false':'true';
		var lastId=(inp!=null)?inp.mInfo.mID:'4dXGRn';
		if(inp==null){gShaderToy.mNeedsSave=true;};
		gShaderToy.mEffect.NewTexture(gShaderToy.mActiveDoc,x,{
            mSrc:url,mType:'texture',mID:lastId,
            mSampler:{filter:filStr,wrap:wrpStr,vflip:flpStr,srgb:'false',internal:'byte'}});
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
