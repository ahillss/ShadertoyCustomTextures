# Shadertoy Custom Textures

Allows custom 2D textures, music and videos to temporarily be used in Shadertoy projects.

To load an image/audio/video file/link, drag and drop it (either your computer or from the web (text link)) onto one of the texture preview slots.

## There are four ways to use this:
1. run the code (below) in the browser's javascript console
2. create a javascript bookmark by copying the code to this [Bookmarklet Creator](https://mrcoles.com/bookmarklet)
2. use the [Chrome extension](https://chrome.google.com/webstore/detail/shadertoy-custom-texures/jgeibpcndpjboeebilehgbpkopkgkjda)
3. use the [Firefox extension](https://addons.mozilla.org/en-US/firefox/addon/shadertoy-custom-texures)

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

## Source

```javascript


void((()=>{
    function setTex(mimeType,x,url) {
        var inp=gShaderToy.mEffect.mPasses[gShaderToy.mActiveDoc].mInputs[x];
        var tg=inp?inp.globject:null;
        var wrpEnm=gShaderToy.mEffect.mRenderer.TEXWRP;
        var filEnm=gShaderToy.mEffect.mRenderer.FILTER;
        var wrpStr=(tg&&tg.mWrap==wrpEnm.CLAMP)?'clamp':'repeat';
        var filStr=(tg&&tg.mFilter==filEnm.LINEAR)?'linear':((tg&&tg.mFilter==filEnm.NONE)?'nearest':'mipmap');
        var flpStr=(tg&&!tg.mVFlip)?'false':'true';
        var id=(inp!=null)?inp.mInfo.mID:null;
        var type=(inp!=null)?inp.mInfo.mType:'';
        
        if(mimeType.includes('audio') && type!='music'){
            type='music';
            id='4sXGzn';
            wrpStr='clamp';
            filStr='linear';
            gShaderToy.mNeedsSave=true;
        } else if(mimeType.includes('video') && type!='video'){
            type='video';
            id='4df3zn';
            wrpStr='clamp';
            filStr='linear';
            flpStr='true';
            gShaderToy.mNeedsSave=true;
        } else if(mimeType.includes('image') && type!='texture'){
            type='texture';
            id='4dXGRn';
            wrpStr='repeat';
            filStr='mipmap';
            flpStr='true';
            gShaderToy.mNeedsSave=true;
        };
        
        gShaderToy.mEffect.NewTexture(gShaderToy.mActiveDoc,x,{
            mSrc:url,mType:type,mID:id,
            mSampler:{filter:filStr,wrap:wrpStr,vflip:flpStr,srgb:'false',internal:'byte'}
        });
    };
    
    function getUrlType(url,cb) {
        var xhttp=new XMLHttpRequest();
        xhttp.open('HEAD',url);
        
        xhttp.onreadystatechange=()=>{
            if(this.readyState==this.DONE){
                cb(this.getResponseHeader('Content-Type'));
            };
        };
        
        xhttp.send();
    };
    
    for(var x=0;x<4;x++){
        ((x)=>{
            var dz=document.getElementById('myUnitCanvas'+x);
            
            dz.addEventListener('drop',((evt)=>{
                evt.stopPropagation();
                evt.preventDefault();
                var text = evt.dataTransfer.getData('text');
                
                if(text){
                    console.log('url:'+text);
                    
                    getUrlType(text,(mimeType)=>{
                        console.log('mime:'+mimeType);
                        setTex(mimeType,x,text);
                    });
                } else {
                    var f=evt.dataTransfer.files[0];
                    var reader=new FileReader();
                    console.log('url:'+escape(f.name));
                    console.log('mime:'+f.type);
                    reader.onload=((e)=>{setTex(f.type,x,e.target.result);});
                    reader.readAsDataURL(f);
                };
            }),false);
            
            dz.addEventListener('dragover',((evt)=>{
                evt.stopPropagation();
                evt.preventDefault();
                evt.dataTransfer.dropEffect='link';
            }),false);
        })(x);
    };
})());

```
