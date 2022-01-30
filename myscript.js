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